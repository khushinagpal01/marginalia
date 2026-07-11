/*
  MARGINALIA — Analysis Engine
  ----------------------------
  Deterministic, rule-based. No AI, no API, no network call.
  Given the same input, this always produces the same output.

  Pipeline:
    1. scanText()      — run every principle's patterns against the copy
    2. scoreReactance() — per-match risk scoring from local signals
    3. selectTop()      — dedupe to one instance per principle, rank, cap
    4. scoreDensity()   — overall stacking/concentration across the WHOLE text
    5. findGaps()       — rule-based "what's missing" suggestions
    6. buildSummary()   — template sentence assembly, never generated text
    7. pickAlternatives() — deterministic template selection per match

  To swap in a private LLM-backed version later (per your note about a
  future internal build): only analyze() below needs to change its return
  shape stays identical, so index.html never needs to know which engine
  produced the result.
*/

(function () {
  const ABSOLUTE_WORDS = /\b(guaranteed|100%|always|never|absolutely|completely|totally|instantly|effortlessly)\b/i;
  const STACK_WINDOW_CHARS = 70; // ~ within a sentence or so

  function extractNumber(quote, context) {
    const inQuote = quote.match(/\d[\d,.]*/);
    if (inQuote) return inQuote[0];
    const inContext = context.match(/\d[\d,.]*/);
    return inContext ? inContext[0] : null;
  }

  function hashString(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }
    return h;
  }

  function pickAlternatives(principle, quote, number) {
    const pool = principle.rewrites;
    const usable = pool.filter(t => number || !t.includes('{n}'));
    const base = hashString(quote + principle.id);
    const first = usable[base % usable.length];
    let second = usable[(base + Math.floor(usable.length / 2) + 1) % usable.length];
    if (second === first) second = usable[(usable.indexOf(first) + 1) % usable.length];
    const fill = (t) => number ? t.replace('{n}', number) : t;
    return [fill(first), fill(second)];
  }

  function scanText(text) {
    const raw = [];
    window.MARGINALIA_PRINCIPLES.forEach(principle => {
      principle.patterns.forEach(pattern => {
        const re = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g');
        let m;
        while ((m = re.exec(text)) !== null) {
          raw.push({
            principle,
            quote: m[0],
            start: m.index,
            end: m.index + m[0].length
          });
          if (m.index === re.lastIndex) re.lastIndex++; // safety against zero-length loops
        }
      });
    });
    return raw;
  }

  function scoreReactance(match, allMatches, text) {
    const contextStart = Math.max(0, match.start - 40);
    const contextEnd = Math.min(text.length, match.end + 40);
    const context = text.slice(contextStart, contextEnd);

    let score = match.principle.reactanceBase;
    const factors = [];

    if (/!/.test(context)) { score += 1; factors.push('punctuation'); }
    if (/\b[A-Z]{3,}\b/.test(context)) { score += 1; factors.push('caps'); }
    if (ABSOLUTE_WORDS.test(context) && match.principle.id !== 'certainty-language') { score += 1; factors.push('absolute'); }

    const nearbyOther = allMatches.some(other =>
      other !== match &&
      other.principle.id !== match.principle.id &&
      Math.abs(other.start - match.start) < STACK_WINDOW_CHARS
    );
    if (nearbyOther) { score += 1; factors.push('stacking'); }

    let level = 'low';
    if (score >= 4) level = 'high';
    else if (score >= 2) level = 'medium';

    let note;
    if (factors.includes('stacking') && factors.length > 1) {
      note = "This sits close to another persuasion cue and carries emphatic wording — together they read as a heavier pitch to a skeptical reader.";
    } else if (factors.includes('stacking')) {
      note = "This sits close to another persuasion technique in the copy — the combination reads more like a stacked pitch than either would alone.";
    } else if (factors.includes('absolute')) {
      note = "The absolute wording nearby invites scrutiny from readers who know few claims are truly universal.";
    } else if (factors.includes('punctuation') || factors.includes('caps')) {
      note = "The emphasis here (punctuation or capitalization) adds a sense of pressure that plainer wording wouldn't carry.";
    } else if (level === 'low') {
      note = "Stated plainly and without exaggeration, this is unlikely to read as pushy on its own.";
    } else {
      note = "A fairly standard use of this technique — worth watching if it's repeated elsewhere in the same piece.";
    }

    return { level, note, contextStart, contextEnd };
  }

  function selectTop(allMatches, text, limit) {
    const bestPerPrinciple = new Map();
    allMatches.forEach(match => {
      const existing = bestPerPrinciple.get(match.principle.id);
      if (!existing || match.start < existing.start) {
        bestPerPrinciple.set(match.principle.id, match);
      }
    });

    const scored = Array.from(bestPerPrinciple.values()).map(match => {
      const reactance = scoreReactance(match, allMatches, text);
      const riskWeight = { low: 0, medium: 1, high: 2 }[reactance.level];
      return { match, reactance, significance: riskWeight * 2 + 1 };
    });

    scored.sort((a, b) => b.significance - a.significance || a.match.start - b.match.start);
    return scored.slice(0, limit);
  }

  function scoreDensity(allMatches, text) {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length || 1;
    const rate = (allMatches.length / wordCount) * 100;

    let stackingPairs = 0;
    for (let i = 0; i < allMatches.length; i++) {
      for (let j = i + 1; j < allMatches.length; j++) {
        if (allMatches[i].principle.id !== allMatches[j].principle.id &&
            Math.abs(allMatches[i].start - allMatches[j].start) < STACK_WINDOW_CHARS) {
          stackingPairs++;
        }
      }
    }

    let level = 'low';
    if (rate >= 3.5 || stackingPairs >= 4) level = 'high';
    else if (rate >= 1.5 || stackingPairs >= 1) level = 'medium';

    const uniquePrinciples = new Set(allMatches.map(m => m.principle.id)).size;
    let note;
    if (level === 'high') {
      note = `${allMatches.length} persuasion cues across ${uniquePrinciples} distinct techniques, several sitting close together — this concentration is the kind a careful reader is more likely to notice and react against.`;
    } else if (level === 'medium') {
      note = `${allMatches.length} persuasion cues across ${uniquePrinciples} distinct techniques — a moderate amount, spaced reasonably well through the copy.`;
    } else {
      note = `${allMatches.length || 'No'} clearly-matched persuasion cue${allMatches.length === 1 ? '' : 's'} detected — a light touch, unlikely to read as a hard sell.`;
    }
    return { level, note };
  }

  function findGaps(allMatches) {
    const categories = new Set(allMatches.map(m => m.principle.category));
    const hasSpecificity = allMatches.some(m => m.principle.id === 'specificity');
    const hasRiskReversal = allMatches.some(m => m.principle.id === 'risk-reversal' || m.principle.id === 'trust-signals');

    const candidates = [];
    if (!categories.has('trust')) {
      candidates.push({ technique: 'Authority or Credibility Cues', note: "No expert references, certifications, or named trust markers were detected. A specific, checkable credibility signal is worth testing here — only if there's a genuine one to point to." });
    }
    if (!categories.has('social')) {
      candidates.push({ technique: 'Social Proof', note: "No testimonials, user counts, or endorsements were detected. A specific number or a real customer quote could be worth testing, if the data exists to back it." });
    }
    if (!hasSpecificity) {
      candidates.push({ technique: 'Specificity', note: "The copy leans on general claims rather than precise, sourced numbers. Concrete figures tend to read as more credible than round claims, when they're accurate." });
    }
    if (!hasRiskReversal) {
      candidates.push({ technique: 'Risk Reversal', note: "There's no guarantee or risk-reducing statement present. If one genuinely applies, naming it explicitly can lower the perceived cost of trying something new." });
    }
    return candidates.slice(0, 3);
  }

  const CATEGORY_LABELS = {
    pressure: 'urgency and scarcity',
    trust: 'authority and trust signals',
    social: 'social proof',
    'value-framing': 'pricing and value framing',
    commitment: 'reciprocity and commitment',
    'identity-emotion': 'emotional and identity appeals'
  };

  function buildSummary(allMatches, selected, density, gaps) {
    if (allMatches.length === 0) {
      return "No clearly-matched persuasion techniques were detected in this copy — either it's written in a fairly neutral, informational register, or it uses phrasing outside this engine's current pattern library.";
    }
    const counts = {};
    allMatches.forEach(m => { counts[m.principle.category] = (counts[m.principle.category] || 0) + 1; });
    const topCategory = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    const dominant = CATEGORY_LABELS[topCategory] || topCategory;
    const highRisk = selected.filter(s => s.reactance.level === 'high').length;

    let out = `This copy leans mainly on ${dominant}. `;
    if (density.level === 'high') out += "Several persuasion cues sit close together, which tends to read as a heavier pitch. ";
    else if (density.level === 'medium') out += "There's a moderate concentration of persuasion cues, reasonably spread out. ";
    else out += "Persuasion cues are used sparingly here. ";

    if (highRisk > 0) out += `${highRisk} of the flagged line${highRisk === 1 ? '' : 's'} carr${highRisk === 1 ? 'ies' : 'y'} a higher risk of reading as pushy to a skeptical reader. `;
    else out += "None of the flagged lines score as especially high-risk on their own. ";

    if (gaps.length) out += `Worth considering: ${gaps.map(g => g.technique).join(', ')}.`;
    return out.trim();
  }

  function analyze(text) {
    const allMatches = scanText(text);
    const top = selectTop(allMatches, text, 8);

    const techniques = top.map(({ match, reactance }) => {
      const context = text.slice(reactance.contextStart, reactance.contextEnd);
      const number = extractNumber(match.quote, context);
      const alternatives = pickAlternatives(match.principle, match.quote, number);
      return {
        name: match.principle.name,
        quote: match.quote,
        mechanism: match.principle.mechanism,
        reactance_risk: reactance.level,
        reactance_note: reactance.note,
        alternatives
      };
    });

    const density = scoreDensity(allMatches, text);
    const gaps = findGaps(allMatches);
    const summary = buildSummary(allMatches, top, density, gaps);

    return { techniques, density, gaps, summary };
  }

  window.MarginaliaEngine = { analyze };
})();
