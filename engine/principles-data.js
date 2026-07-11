/*
  MARGINALIA — Persuasion Principle Library
  ------------------------------------------
  This is a deterministic knowledge base. No AI, no API calls.
  Each entry is hand-authored: detection patterns (regex), a plain-language
  mechanism, guidance on when it tends to read as manipulative, and a pool
  of rewrite templates the engine chooses from based on what was matched.

  To add a new principle later: copy an object below, give it a unique id,
  and fill in the fields. The engine in engine.js will pick it up automatically.
*/

window.MARGINALIA_PRINCIPLES = [

  // ---------- SCARCITY & URGENCY ----------
  {
    id: 'scarcity', name: 'Scarcity', category: 'pressure', reactanceBase: 2,
    mechanism: "People assign more value to things perceived as limited in availability, since scarcity implies competition for the item and raises the felt cost of missing out.",
    patterns: [/\bonly\s+\d+\s+(left|remaining|in stock)\b/i, /\blimited\s+(stock|quantity|supply|availability)\b/i, /\bwhile\s+supplies\s+last\b/i, /\bfew\s+(left|remaining)\b/i, /\bselling\s+(fast|out)\b/i, /\bdown\s+to\s+(our|the)\s+last\b/i, /\brunning\s+low\s+on\b/i, /\balmost\s+sold\s+out\b/i, /\bnearly\s+gone\b/i],
    rewrites: ["{n} left, updated as they sell", "Limited stock — worth checking current availability", "This batch is smaller than usual", "Stock is finite, though there's no need to rush", "Available while the current supply lasts", "Selling steadily — worth checking if it's still around"]
  },
  {
    id: 'urgency', name: 'Urgency', category: 'pressure', reactanceBase: 2,
    mechanism: "Framing a decision as time-limited pushes people to decide quickly, before they've fully weighed the choice, since deliberation feels risky when a window is closing.",
    patterns: [/\bact\s+now\b/i, /\bdon't\s+miss\s+out\b/i, /\bhurry\b/i, /\blast\s+chance\b/i, /\bends\s+(tonight|today|soon)\b/i, /\btime\s+is\s+running\s+out\b/i, /\bbefore\s+time\s+runs\s+out\b/i, /\bdon't\s+wait\s+(too\s+long|around)\b/i, /\bwon't\s+last\s+long\b/i],
    rewrites: ["No countdown — just a heads up this won't stay open indefinitely", "Worth deciding on your own timeline, though it's not open forever", "Closes this week", "A gentle deadline, not a countdown clock", "Take the time you need — this just isn't indefinite", "Closing soon, not closing this second"]
  },
  {
    id: 'fomo', name: 'Fear of Missing Out', category: 'pressure', reactanceBase: 2,
    mechanism: "Highlighting what others already have or are doing taps into a fear of exclusion, which motivates action somewhat independent of the offer's actual merits.",
    patterns: [/\bdon't\s+get\s+left\s+behind\b/i, /\beveryone(?:'s| is)\s+(already\s+)?(doing|using|switching)\b/i, /\bbefore\s+it's\s+gone\b/i, /\bmissing\s+out\b/i],
    rewrites: ["Others have started — no pressure to follow immediately", "Here whenever you decide it's for you", "A number of people are trying this out", "It'll still be here when you're ready", "Some early users are already in, no rush to match them", "Worth a look, entirely on your own pace"]
  },
  {
    id: 'deadline-framing', name: 'Deadline Framing', category: 'pressure', reactanceBase: 1,
    mechanism: "A specific date or time attached to a decision creates a concrete boundary, which people tend to respond to more strongly than a vague or open-ended offer.",
    patterns: [/\boffer\s+ends\b/i, /\bexpires?\s+(on|at|in)\b/i, /\bvalid\s+(until|through)\b/i, /\bclosing\s+date\b/i],
    rewrites: ["This window has a clear end date, though it's not the only chance", "A set date, not an artificial rush", "Open until a specific point, then revisited", "There's an end date, mainly for planning purposes", "A real deadline, stated plainly", "Time-bound, but not urgent"]
  },
  {
    id: 'exclusivity', name: 'Exclusivity', category: 'pressure', reactanceBase: 1,
    mechanism: "Restricting access to a defined group makes an offer feel more valuable, since exclusivity implies scarcity of both the opportunity and the people who qualify.",
    patterns: [/\binvite[- ]only\b/i, /\bmembers[- ]only\b/i, /\bby\s+invitation\b/i, /\bfor\s+select\b/i, /\bearly\s+access\b/i],
    rewrites: ["Open to a specific group right now", "Available to those who sign up early", "A smaller, defined group has access currently", "Rolling out to some people before others", "A phased release, not withheld from everyone else permanently", "Early participants get in first, others follow"]
  },

  // ---------- SOCIAL PROOF & CONSENSUS ----------
  {
    id: 'social-proof', name: 'Social Proof', category: 'social', reactanceBase: 1,
    mechanism: "People look to others' behaviour to judge what's worthwhile, especially in unfamiliar situations, so evidence of widespread use lends an offer credibility.",
    patterns: [/\b(thousands|millions|hundreds)\s+of\s+(customers|users|people)\b/i, /\bjoin\s+(the\s+)?\d[,\d]*\s+/i, /\bmost\s+popular\b/i, /\bcustomers?\s+love\b/i, /\bloved\s+by\b/i, /\btrusted\s+by\s+\d/i],
    rewrites: ["{n} people have used this so far", "A growing group of users", "Used across a range of customers", "Adopted steadily since launch", "A track record built over time, not just claimed", "Trusted by a specific, stated number of people"]
  },
  {
    id: 'bandwagon', name: 'Bandwagon Effect', category: 'social', reactanceBase: 2,
    mechanism: "Framing an action as what the majority is doing nudges people to conform, since going against a perceived trend can feel socially risky.",
    patterns: [/\beveryone(?:'s| is)\s+switching\b/i, /\bthe\s+trend\b/i, /\ball\s+the\s+(cool|smart)\b/i, /\bjoin\s+the\s+movement\b/i],
    rewrites: ["A number of people have adopted this recently", "Gaining traction steadily, still your call", "Increasingly common, though not yet universal", "Some early adopters are on board, more may follow", "Part of a broader shift, still emerging", "Picking up interest lately, at its own pace"]
  },
  {
    id: 'testimonial-cue', name: 'Testimonial / Endorsement Cue', category: 'social', reactanceBase: 0,
    mechanism: "A direct quote or rating from a past user acts as evidence, letting a prospective buyer borrow someone else's experience instead of relying purely on the seller's word.",
    patterns: [/\b\d(\.\d)?\s*(out of|\/)\s*5\b/i, /"[^"]{15,80}"\s*[-–—]\s*[A-Z]/, /\breview[s]?\s+(say|show)\b/i],
    rewrites: ["See what specific customers said, in their own words", "Ratings are visible and unfiltered", "Direct feedback from past buyers, included as-is", "A specific account from someone who used it", "Rated by verified buyers, not curated quotes alone", "Feedback kept in its original form, not paraphrased"]
  },
  {
    id: 'numeric-social-proof', name: 'Numeric Social Proof', category: 'social', reactanceBase: 1,
    mechanism: "A precise number feels more credible than a vague claim of popularity, and large specific numbers signal that many independent people made the same choice.",
    patterns: [/\b\d{2,}[,\d]*\+?\s+(customers|users|members|subscribers|downloads)\b/i, /\b\d{1,3}%\s+of\s+(customers|users)\b/i],
    rewrites: ["{n}, and counting", "A specific, checkable number of users", "Figures updated as they grow, not a static claim", "An exact count, not a rounded estimate", "The number is public and can be verified", "Growing by a measurable, stated amount"]
  },
  {
    id: 'expert-consensus', name: 'Expert Consensus', category: 'trust', reactanceBase: 1,
    mechanism: "Attributing a claim to experts or research borrows their credibility, letting an audience trust a conclusion without independently evaluating the evidence.",
    patterns: [/\bexperts?\s+(agree|recommend|say)\b/i, /\bstudies\s+show\b/i, /\bresearch\s+(shows|confirms)\b/i, /\bdoctors?\s+recommend\b/i],
    rewrites: ["Here's what the research specifically found", "Backed by a cited study, linked for reference", "Supported by named expert opinion, not just 'experts'", "A specific source behind this claim, available to check", "Referenced research, not an unattributed appeal", "Expert opinion, attributed by name"]
  },

  // ---------- AUTHORITY & CREDIBILITY ----------
  {
    id: 'authority', name: 'Authority', category: 'trust', reactanceBase: 1,
    mechanism: "People defer to perceived authority or official-sounding status, which can shortcut critical evaluation of the underlying claim.",
    patterns: [/\bofficially\s+(certified|approved|recognized)\b/i, /\bindustry[- ]leading\b/i, /\b#1\s+(rated|ranked)\b/i, /\baward[- ]winning\b/i],
    rewrites: ["Certified by a named body, checkable", "Recognized within its category, source named", "Holds a specific, named award", "Officially reviewed, with the reviewer named", "A specific ranking, sourced rather than asserted", "Verified standing, not just self-described"]
  },
  {
    id: 'credentialing', name: 'Credentialing', category: 'trust', reactanceBase: 0,
    mechanism: "Credentials act as a shortcut for competence, letting an audience trust a claim based on the messenger's qualifications rather than evaluating the claim itself.",
    patterns: [/\bph\.?d\.?\b/i, /\bcertified\s+(professional|expert|trainer)\b/i, /\blicensed\b/i, /\bboard[- ]certified\b/i],
    rewrites: ["Credentialed, with specifics available on request", "Licensed, and named for verification", "Qualification listed for reference, not just claimed", "Certification named specifically", "Formally trained, credentials on record", "A named qualification behind the claim"]
  },
  {
    id: 'trust-signals', name: 'Trust Signals', category: 'trust', reactanceBase: 0,
    mechanism: "Visible trust markers reduce perceived risk by reassuring the buyer that safeguards exist if the transaction goes wrong.",
    patterns: [/\bmoney[- ]back\s+guarantee\b/i, /\bsecure\s+checkout\b/i, /\bssl\s+(secured|encrypted)\b/i, /\b\d+[- ]day\s+guarantee\b/i],
    rewrites: ["{n}-day guarantee, terms included below", "Guarantee terms spelled out, not just implied", "Secured by a named standard, not just a badge", "The fine print is visible, not buried", "Refund conditions stated plainly upfront", "Coverage is specific, not left vague"]
  },
  {
    id: 'institutional-affiliation', name: 'Institutional Affiliation', category: 'trust', reactanceBase: 1,
    mechanism: "Association with a recognized institution transfers some of that institution's credibility to the offer, even without a direct claim about quality.",
    patterns: [/\bas\s+(seen|featured)\s+(in|on)\b/i, /\bpartnered\s+with\b/i, /\bofficial\s+partner\b/i, /\bbacked\s+by\b/i],
    rewrites: ["Featured by name, linked for verification", "A named partnership, checkable directly", "Affiliated with a specifically named organisation", "Backing named directly, not vaguely implied", "Coverage linked, not just claimed in passing", "A specific, named, verifiable affiliation"]
  },

  // ---------- RECIPROCITY & COMMITMENT ----------
  {
    id: 'reciprocity', name: 'Reciprocity', category: 'commitment', reactanceBase: 0,
    mechanism: "Receiving something first creates a felt obligation to give something back, even when the initial gift was offered without an explicit condition.",
    patterns: [/\bfree\s+(gift|bonus|sample|trial)\b/i, /\bon\s+(us|the house)\b/i, /\bno\s+strings\s+attached\b/i],
    rewrites: ["A trial, with terms stated upfront", "Free to start, conditions listed clearly below", "No obligation, and that's stated plainly, not just implied", "Free access, with the terms made transparent", "Try it first, no purchase required to start", "Given upfront, with no hidden expectation attached"]
  },
  {
    id: 'commitment-consistency', name: 'Commitment & Consistency', category: 'commitment', reactanceBase: 1,
    mechanism: "Getting someone to agree to a small initial step makes them more likely to agree to larger requests later, since people act consistently with prior commitments.",
    patterns: [/\btake\s+the\s+first\s+step\b/i, /\bstart\s+small\b/i, /\bjust\s+(one|a)\s+(click|step|minute)\b/i],
    rewrites: ["A small first step, no bigger ask attached yet", "Start with the smallest version, decide from there", "One step, evaluated entirely on its own", "Low-commitment starting point, nothing implied beyond it", "Begin small — no follow-on commitment assumed", "A first step that stands alone, not a hook"]
  },
  {
    id: 'foot-in-door', name: 'Foot-in-the-Door Framing', category: 'commitment', reactanceBase: 1,
    mechanism: "An easy initial yes lowers resistance to a related, larger request later, since agreeing once shifts a person's self-image toward saying yes to more.",
    patterns: [/\btry\s+it\s+free\s+for\b/i, /\bstart\s+your\s+free\s+trial\b/i, /\bno\s+commitment\s+(required|needed)\b/i],
    rewrites: ["Trial period, with terms stated plainly upfront", "Free for {n} days, then a clear, informed choice", "No auto-commitment implied beyond the trial itself", "Try it, then decide with full information in hand", "A defined trial window, next step entirely your call", "Free access, no automatic continuation afterward"]
  },
  {
    id: 'loss-framed-commitment', name: 'Loss-Framed Commitment', category: 'pressure', reactanceBase: 2,
    mechanism: "Framing inaction as a loss, rather than framing continued action as a gain, leverages loss aversion, since losing something already held feels worse than never gaining it.",
    patterns: [/\bdon't\s+lose\s+your\s+(progress|spot|discount)\b/i, /\byou'll\s+lose\s+access\b/i, /\bkeep\s+your\s+(streak|progress)\b/i],
    rewrites: ["Your progress is saved either way", "Pausing won't erase what you've already done", "Come back anytime — nothing is lost by waiting", "Your data stays put if you step away for a while", "No penalty attached to taking a break", "Progress persists regardless of timing, stated plainly"]
  },

  // ---------- PRICING & VALUE FRAMING ----------
  {
    id: 'anchoring', name: 'Anchoring', category: 'value-framing', reactanceBase: 1,
    mechanism: "Showing an initial, higher reference price shifts the mental benchmark a buyer uses, making the actual price feel like a bargain regardless of its absolute value.",
    patterns: [/\b(was|originally)\s+\$?\d+[,.]?\d*\b/i, /\bstruck[- ]through\b/i, /\bvalued\s+at\s+\$?\d+/i],
    rewrites: ["Priced at {n}, no reference markup shown alongside it", "The price stands on its own, without a comparison point", "One number, no before/after framing attached", "Listed plainly, without an anchor to compare against", "A flat price, evaluated on its own merits", "The number as it is, no inflated reference point"]
  },
  {
    id: 'contrast-principle', name: 'Contrast Principle', category: 'value-framing', reactanceBase: 1,
    mechanism: "Placing an option next to a deliberately weaker alternative makes it look better by comparison, even if it wouldn't stand out judged on its own.",
    patterns: [/\bbefore\s+(and|&)\s+after\b/i, /\bcompared\s+to\s+(other|traditional)\b/i, /\bunlike\s+(other|traditional)\b/i],
    rewrites: ["Here's what this does, judged entirely on its own", "Details listed, without a comparison staged to lose", "Standing on its own features, not a rigged contrast", "The specifics, without a weaker option set up nearby", "Evaluated independently of any competitor", "What it does, not specifically what it beats"]
  },
  {
    id: 'decoy-effect', name: 'Decoy Effect', category: 'value-framing', reactanceBase: 1,
    mechanism: "Adding a third option specifically to make a target option look better by comparison nudges people toward it without an explicit recommendation.",
    patterns: [/\b(basic|standard|premium)\s+plan\b/i, /\bmost\s+popular\b/i, /\brecommended\s+plan\b/i],
    rewrites: ["Plans listed with their actual differences, no steering", "Compare features directly, without a 'popular' flag", "Each tier priced on what it actually includes", "Options presented neutrally, side by side", "Feature-by-feature listing, no nudge label attached", "You compare freely — nothing is flagged for you"]
  },
  {
    id: 'loss-aversion', name: 'Loss Aversion', category: 'pressure', reactanceBase: 2,
    mechanism: "People weigh potential losses more heavily than equivalent gains, so framing an action as loss-prevention motivates more strongly than framing it as a gain.",
    patterns: [/\bdon't\s+(miss|lose)\s+(this|out)\b/i, /\bavoid\s+(losing|missing)\b/i, /\bstop\s+(losing|wasting)\b/i],
    rewrites: ["Here's what you'd gain by switching, stated directly", "Framed as a benefit, not an avoided loss", "What it adds, rather than what it prevents losing", "A positive framing of the same underlying choice", "What you get, described plainly, gain-first", "The upside, stated directly rather than the avoided downside"]
  },
  {
    id: 'mental-accounting', name: 'Mental Accounting', category: 'value-framing', reactanceBase: 1,
    mechanism: "Breaking a cost into a smaller recurring unit makes it feel less significant than the full price, since people mentally categorize small daily amounts differently from lump sums.",
    patterns: [/\bjust\s+\$?\d+(\.\d+)?\s*\/?\s*(a\s+)?(day|month)\b/i, /\bless\s+than\s+a\s+coffee\b/i, /\bfor\s+the\s+price\s+of\b/i],
    rewrites: ["The full price, stated once, clearly", "Total cost shown upfront, without a per-day framing", "One number, not broken into smaller psychological units", "Full amount stated plainly, alongside the per-day figure", "The real total, not reframed to look smaller", "Shown as one payment, for straightforward clarity"]
  },
  {
    id: 'value-stacking', name: 'Value Stacking', category: 'value-framing', reactanceBase: 1,
    mechanism: "Listing multiple bundled items and assigning each a value makes the overall package appear worth far more than its price, even if buyers wouldn't pay for each piece separately.",
    patterns: [/\bplus\s+(a\s+)?free\b/i, /\bbonus(es)?\s+(worth|valued)\b/i, /\beverything\s+included\b/i],
    rewrites: ["What's included, listed without an added-value price tag", "Bundle contents, described without a stacked valuation", "Here's what comes with it, stated plainly", "Contents listed, not individually priced up for effect", "What's in the package, described directly", "Included items, without an inflated combined total"]
  },
  {
    id: 'discount-framing', name: 'Discount Framing', category: 'value-framing', reactanceBase: 0,
    mechanism: "A percentage discount can feel larger or smaller than the same saving expressed in absolute currency, and the framing is often chosen to make the deal look better.",
    patterns: [/\bsave\s+\d{1,3}%/i, /\b\d{1,3}%\s+off\b/i, /\bhalf[- ]price\b/i],
    rewrites: ["The actual amount saved, stated directly alongside the percentage", "Price drop shown in real currency, not just percentage", "Here's the real saving, in numbers you can check", "Discount shown both ways, for full clarity", "The absolute saving, next to the percentage figure", "A concrete number, not only a percentage claim"]
  },

  // ---------- CHOICE & DECISION ARCHITECTURE ----------
  {
    id: 'default-effect', name: 'Default Effect', category: 'value-framing', reactanceBase: 1,
    mechanism: "People tend to stick with whatever option is already selected for them, since changing a default requires extra effort and an active decision to deviate.",
    patterns: [/\bpre[- ]selected\b/i, /\bauto[- ]renew(s|al)?\b/i, /\bopt[- ]out\b/i],
    rewrites: ["You choose the option, nothing is pre-selected", "Opt-in by default, not opt-out", "You'll actively pick your plan, nothing assumed", "No default locked in on your behalf", "Selection left entirely to you, not pre-made", "Requires an active choice from you either way"]
  },
  {
    id: 'framing-effect', name: 'Framing Effect', category: 'value-framing', reactanceBase: 1,
    mechanism: "The same statistic can be framed as a success rate or a failure rate, and people respond differently to each framing even though the underlying number is identical.",
    patterns: [/\b\d{1,3}%\s+(success|effective|accurate)\b/i, /\b\d{1,3}%\s+(fail|failure|risk)\b/i],
    rewrites: ["Shown both ways: success rate and failure rate together", "The full number, framed as neutrally as possible", "Both sides of the same statistic, included", "Presented without favoring the more flattering frame", "The raw figure, left for you to interpret", "One number, described from both angles"]
  },
  {
    id: 'risk-reversal', name: 'Risk Reversal', category: 'trust', reactanceBase: 0,
    mechanism: "Removing the buyer's downside, through a guarantee or free trial, lowers the perceived cost of trying something, making the decision feel safer.",
    patterns: [/\bno\s+risk\b/i, /\brisk[- ]free\b/i, /\b100%\s+guarantee(d)?\b/i],
    rewrites: ["Guarantee terms specified, not just 'risk-free' as a claim", "Here's exactly what's covered, in detail", "The guarantee, spelled out in full below", "Specific terms, rather than a blanket assurance", "What 'guaranteed' actually covers, stated concretely", "Coverage detailed in full, not just asserted"]
  },
  {
    id: 'specificity', name: 'Specificity / Concreteness', category: 'trust', reactanceBase: 0,
    mechanism: "Precise numbers read as more credible than round or vague claims, since specificity implies the figure was measured rather than estimated.",
    patterns: [/\b\d+(\.\d+)?%/, /\bin\s+just\s+\d+\s+(days|minutes|steps)\b/i],
    rewrites: ["The exact figure, alongside its source", "Specific number, with the method behind it stated", "Precise stat, with how it was measured described", "The number, plus where it came from", "A specific figure, not rounded for effect", "Precision backed by a stated methodology"]
  },
  {
    id: 'certainty-language', name: 'Certainty Language', category: 'pressure', reactanceBase: 2,
    mechanism: "Absolute language removes any hedge or nuance from a claim, which can increase persuasive force but also increases scrutiny from readers who know few things are truly universal.",
    patterns: [/\b(guaranteed|100%|always|never|absolutely|completely)\b/i],
    rewrites: ["Usually, in most cases, with the exception noted", "In the majority of cases, honestly qualified", "Typically true, with a caveat included", "Mostly holds, exceptions acknowledged upfront", "A qualified claim, rather than an absolute one", "Reliable in general, not claimed as universal"]
  },

  // ---------- EMOTIONAL & IDENTITY ----------
  {
    id: 'emotional-framing', name: 'Emotional Framing', category: 'identity-emotion', reactanceBase: 1,
    mechanism: "Describing a vivid emotional outcome engages feeling ahead of analysis, since people often decide based on how an option makes them feel before evaluating it logically.",
    patterns: [/\bimagine\s+(how|the)\b/i, /\bpicture\s+yourself\b/i, /\bfeel\s+(the|that)\s+(relief|joy|freedom)\b/i],
    rewrites: ["Here's what changes, in practical terms", "The concrete outcome, not just the feeling around it", "What actually happens, described plainly", "Function first, the feeling follows naturally", "The practical result, stated directly", "A grounded description of the actual outcome"]
  },
  {
    id: 'identity-signalling', name: 'Identity Signalling', category: 'identity-emotion', reactanceBase: 1,
    mechanism: "Framing a product around a type of person invites the reader to see using it as self-expression, tying the purchase to identity rather than to function alone.",
    patterns: [/\bfor\s+people\s+who\b/i, /\bif\s+you're\s+the\s+(kind|type)\s+of\s+person\b/i, /\bbuilt\s+for\s+(doers|leaders|creators)\b/i],
    rewrites: ["Built for this specific use case, stated plainly", "Designed around this particular need", "What it does, regardless of who's using it", "Function-first, no identity framing attached", "For this specific job, described directly", "What it's for, without a persona wrapped around it"]
  },
  {
    id: 'curiosity-gap', name: 'Curiosity Gap', category: 'identity-emotion', reactanceBase: 2,
    mechanism: "Deliberately withholding information creates a gap the reader feels compelled to close, driving attention independent of the content's actual value.",
    patterns: [/\bthe\s+one\s+thing\b/i, /\bwhat\s+no\s+one\s+tells\s+you\b/i, /\byou\s+won't\s+believe\b/i],
    rewrites: ["Here's the specific detail, stated upfront", "The actual point, stated directly, no tease", "Straight to the detail, no withheld hook", "The information itself, not a lead-up to it", "Stated plainly, without a curiosity hook first", "Direct disclosure, rather than a teaser"]
  },
  {
    id: 'novelty', name: 'Novelty', category: 'identity-emotion', reactanceBase: 1,
    mechanism: "People are drawn to novelty because new things carry the possibility of a better solution, even before any evidence confirms the improvement is real.",
    patterns: [/\b(brand[- ]new|all[- ]new|revolutionary|breakthrough)\b/i, /\bnever\s+before\s+seen\b/i, /\bfirst\s+of\s+its\s+kind\b/i],
    rewrites: ["What's actually different here, specifically", "The specific update, described in concrete terms", "New in this particular way, named directly", "Here's what changed, concretely", "The actual improvement, named rather than implied", "Specific changes, not just a novelty claim alone"]
  },
  {
    id: 'peak-end-framing', name: 'Peak-End Framing', category: 'identity-emotion', reactanceBase: 1,
    mechanism: "People judge an experience largely by its most intense point and its ending, so emphasizing a strong final benefit shapes overall impression more than what precedes it.",
    patterns: [/\band\s+that's\s+not\s+all\b/i, /\bbest\s+part\?\b/i, /\bsave\s+the\s+best\s+for\s+last\b/i],
    rewrites: ["All the details matter equally here", "No single 'best part' framing applied", "Everything listed with roughly equal weight", "The whole picture, not just a climactic ending", "Details presented without an engineered closing beat", "Balanced presentation, start to finish"]
  },
  {
    id: 'autonomy-preservation', name: 'Autonomy Preservation', category: 'identity-emotion', reactanceBase: 0,
    mechanism: "Explicitly reassuring someone that they remain free to choose can paradoxically increase compliance, since it lowers the resistance a perceived hard sell would trigger.",
    patterns: [/\bno\s+obligation\b/i, /\bcancel\s+anytime\b/i, /\bopt\s+out\s+whenever\b/i, /\bentirely\s+your\s+choice\b/i],
    rewrites: ["Genuinely optional, stated plainly with the terms attached", "No catch behind 'anytime' — here's what that means exactly", "Your call, with the specific terms spelled out", "Cancel terms, specified exactly rather than left vague", "The 'anytime' part, defined concretely", "Free to leave, with terms attached for real clarity"]
  },
  {
    id: 'social-belonging', name: 'Social Belonging', category: 'social', reactanceBase: 1,
    mechanism: "Framing participation as joining a community appeals to a basic need to belong, which can motivate action somewhat independent of the product's standalone value.",
    patterns: [/\bjoin\s+(our|the)\s+community\b/i, /\bbecome\s+a\s+member\b/i, /\byou're\s+not\s+alone\b/i],
    rewrites: ["Access to a specific group, described plainly", "What membership actually includes, stated concretely", "The community aspect, defined in practical terms", "What you get from joining, specifically listed", "Belonging framed around actual, named features", "Concrete value of joining, rather than the feeling of it"]
  },
  {
    id: 'personalization-cue', name: 'Personalization Cue', category: 'identity-emotion', reactanceBase: 1,
    mechanism: "Suggesting an offer was selected specifically for the individual increases perceived relevance, even when the underlying logic is broad segmentation rather than true personalization.",
    patterns: [/\bjust\s+for\s+you\b/i, /\bpicked\s+for\s+you\b/i, /\btailored\s+to\s+your\b/i],
    rewrites: ["Based on a stated criterion, specifically", "Matched using a described factor, not left vague", "Chosen based on a named input", "Selected using specific, named criteria", "Personalized on defined terms, not just asserted", "The actual basis for this pick, stated plainly"]
  },

  // ---------- ADDITIONAL PRINCIPLES ----------
  {
    id: 'halo-effect', name: 'Halo Effect', category: 'trust', reactanceBase: 1,
    mechanism: "A single strong positive impression, like a trusted name, colors judgment of unrelated qualities, letting one credible trait imply overall quality.",
    patterns: [/\bfrom\s+the\s+makers\s+of\b/i, /\btrusted\s+name\s+in\b/i, /\bmade\s+by\s+the\s+same\s+team\b/i],
    rewrites: ["What this specific product does, on its own", "This item's own track record, not its maker's other work", "Judged on its own features here", "Standing apart from the maker's other products", "This one, evaluated independently", "What's specific to this item, not the brand halo"]
  },
  {
    id: 'ikea-effect', name: 'IKEA Effect', category: 'identity-emotion', reactanceBase: 0,
    mechanism: "People value something more highly when they've had a hand in creating or customizing it, compared to an identical item they didn't help make.",
    patterns: [/\bbuild\s+your\s+own\b/i, /\bcustomi[sz]e\s+(it|yours)\b/i, /\bmade\s+by\s+you\b/i],
    rewrites: ["Customizable, with the base version described plainly", "You adjust the specifics — here's what's fixed and what's not", "Build options listed, without over-claiming the value added", "What you can change, and what stays the same", "Configurable within stated limits", "The customization options, described directly"]
  },
  {
    id: 'sunk-cost-appeal', name: 'Sunk Cost Appeal', category: 'commitment', reactanceBase: 2,
    mechanism: "Reminding someone how much they've already invested encourages them to continue, even when that past investment has no bearing on whether continuing is the better choice now.",
    patterns: [/\byou've\s+already\s+(invested|put in|come this far)\b/i, /\bdon't\s+waste\s+(your|the)\s+(progress|investment|time)\b/i],
    rewrites: ["Here's where things stand — your call either way", "What continuing looks like from here, plainly", "Your progress is saved regardless of what you choose next", "The decision from here, without reference to what's already spent", "What's ahead, judged on its own merits", "Continuing or not — both are fine from here"]
  },
  {
    id: 'goal-gradient', name: 'Goal Gradient Effect', category: 'commitment', reactanceBase: 1,
    mechanism: "Motivation increases the closer someone perceives themselves to be to a goal, so highlighting proximity to completion pushes people to finish rather than abandon a task.",
    patterns: [/\byou're\s+almost\s+(there|done)\b/i, /\bjust\s+one\s+more\s+step\b/i, /\b\d{1,3}%\s+(complete|done)\b/i],
    rewrites: ["Here's exactly what's left to do", "{n} complete — the remaining steps listed plainly", "The remaining steps, stated directly", "What's left, without a 'nearly there' nudge", "The specific remaining tasks, listed", "Progress shown as a fact, not a nudge to finish"]
  },
  {
    id: 'zeigarnik-effect', name: 'Zeigarnik Effect (Open Loops)', category: 'identity-emotion', reactanceBase: 1,
    mechanism: "Unfinished tasks or stories stay more mentally present than completed ones, so leaving something visibly incomplete keeps attention on returning to close it.",
    patterns: [/\bto\s+be\s+continued\b/i, /\bpart\s+\d+\s+of\s+\d+\b/i, /\bfind\s+out\s+what\s+happens\s+next\b/i],
    rewrites: ["Here's the full picture, not split into parts", "The complete version, stated directly", "All of it, rather than a deliberate cliffhanger", "The ending included, not withheld", "Full context given upfront", "Nothing held back for a later part"]
  },
  {
    id: 'liking-principle', name: 'Liking Principle', category: 'identity-emotion', reactanceBase: 0,
    mechanism: "People are more easily persuaded by those they perceive as similar or likeable, so emphasizing shared identity or relatability increases a message's pull independent of its content.",
    patterns: [/\bwe're\s+just\s+like\s+you\b/i, /\bpeople\s+like\s+us\b/i, /\bfrom\s+one\s+\w+\s+to\s+another\b/i],
    rewrites: ["Here's what we do, regardless of who's saying it", "The offer, without a similarity appeal attached", "What it is, stated plainly", "Judged on the merits, not on relatability", "The facts, without the 'people like us' framing", "What's offered, independent of shared identity"]
  },
  {
    id: 'labeling', name: 'Labeling', category: 'identity-emotion', reactanceBase: 2,
    mechanism: "Assigning someone a positive label or identity encourages them to act consistently with that label, since people tend to behave in ways that match how they've just been described.",
    patterns: [/\byou're\s+(clearly|obviously)\s+the\s+kind\s+of\s+person\b/i, /\bas\s+someone\s+who\s+(values|cares about|wants)\b/i],
    rewrites: ["Here's what this does, for anyone considering it", "What it offers, without assuming who you are", "The features, regardless of the label attached to you", "What it does, stated without a personality assumption", "The offer, on its own terms", "Described plainly, without labeling the reader first"]
  },
  {
    id: 'public-commitment', name: 'Public Commitment', category: 'commitment', reactanceBase: 1,
    mechanism: "Committing to something publicly makes people more likely to follow through, since backing out afterward carries a visible social cost a private decision wouldn't.",
    patterns: [/\bshare\s+your\s+goal\b/i, /\bpost\s+your\s+progress\b/i, /\btell\s+(your\s+)?friends\s+you're\b/i],
    rewrites: ["Track your goal privately if you'd rather", "Sharing is optional, not assumed", "Your progress stays private unless you choose otherwise", "No public step required to participate", "Sharing is a choice, not a default", "Private by default, public if you opt in"]
  },
  {
    id: 'live-activity-signal', name: 'Live Activity Signal', category: 'social', reactanceBase: 2,
    mechanism: "Showing that other people are actively engaging with the same item right now creates a sense of live competition for it, pushing a decision to be made sooner.",
    patterns: [/\b\d+\s+people\s+(are\s+)?(viewing|looking at|considering)\b/i, /\bcurrently\s+viewing\b/i, /\bsomeone\s+just\s+bought\s+this\b/i],
    rewrites: ["Availability shown directly, without a live viewer counter", "Stock status, stated plainly", "Here's what's actually in stock right now", "Availability, without a competing-shoppers framing", "The real-time count, without the pressure framing", "What's left, stated as a fact"]
  },
  {
    id: 'freshness-cue', name: 'Freshness / Recency Cue', category: 'value-framing', reactanceBase: 0,
    mechanism: "Framing something as recently made or restocked implies relevance and desirability, since freshness is often associated with higher quality or demand.",
    patterns: [/\bjust\s+(restocked|launched|arrived|dropped)\b/i, /\bnewly\s+added\b/i],
    rewrites: ["Available since {n}, for reference", "Added to the lineup recently, dated for clarity", "Here's when this became available", "Recently added, with the date included", "New to the range, stated plainly", "Available as of a specific point, not just 'new'"]
  },
  {
    id: 'simplicity-framing', name: 'Simplicity Framing', category: 'value-framing', reactanceBase: 0,
    mechanism: "Reducing an apparently complex decision to a single simple choice lowers the mental effort required to decide, independent of whether the underlying choice is actually simple.",
    patterns: [/\bjust\s+one\s+(decision|choice|click)\b/i, /\bno\s+need\s+to\s+compare\b/i],
    rewrites: ["Here are the options, laid out for comparison", "A few factors worth weighing, listed plainly", "What differs between the choices, spelled out", "The comparison, made easy to actually do", "Options presented so you can compare them properly", "The relevant differences, not flattened into 'just pick'"]
  },
  {
    id: 'investment-framing', name: 'Investment Framing', category: 'value-framing', reactanceBase: 1,
    mechanism: "Relabeling a cost as an 'investment' reframes spending as a form of gain rather than a loss, which can make the same expenditure feel more justified.",
    patterns: [/\binvest\s+in\s+(yourself|your future)\b/i, /\bnot\s+an\s+expense,?\s+an\s+investment\b/i],
    rewrites: ["The cost, stated as a cost", "Here's the price, plainly labeled", "What it costs, without a reframe", "The expense, called what it is", "Priced directly, no investment framing applied", "The actual number, without relabeling it"]
  },
  {
    id: 'fear-appeal', name: 'Fear Appeal', category: 'pressure', reactanceBase: 2,
    mechanism: "Highlighting a negative consequence of inaction taps into fear to motivate a decision — effective when the risk is real, but reads as manipulative when the danger is exaggerated.",
    patterns: [/\bwhat\s+happens\s+if\s+you\s+don't\b/i, /\bdon't\s+wait\s+until\s+it's\s+too\s+late\b/i, /\bthe\s+risk\s+of\s+(not|waiting)\b/i],
    rewrites: ["Here's the specific consequence, stated factually", "What waiting actually changes, described plainly", "The real trade-off of delaying, stated directly", "A factual account of the risk, not an amplified one", "What's actually at stake, described soberly", "The consequence, stated without dramatization"]
  },
  {
    id: 'precommitment-device', name: 'Precommitment Device', category: 'pressure', reactanceBase: 1,
    mechanism: "Offering to fix a favorable term in place now, like a price, encourages an immediate decision by attaching a concrete, quantified cost to waiting.",
    patterns: [/\block\s+in\s+(your|this)\s+(rate|price|deal)\b/i, /\bsecure\s+(your|this)\s+(spot|price|rate)\s+now\b/i],
    rewrites: ["Current rate: {n}, subject to change like any price", "Today's price, stated plainly", "The rate as it stands now", "Pricing shown as-is, without a 'lock in' framing", "What it costs today, clearly labeled as today's price", "The current terms, without urgency language attached"]
  },
  {
    id: 'narrative-transportation', name: 'Narrative Transportation', category: 'identity-emotion', reactanceBase: 1,
    mechanism: "A vivid story draws a reader into imagining themselves in the scenario described, which can lower critical scrutiny of a claim compared to a plain factual statement.",
    patterns: [/\bimagine\s+a\s+world\s+where\b/i, /\bpicture\s+this\b/i],
    rewrites: ["Here's what it does, in practical terms", "The facts, without a staged scenario", "What actually happens, described directly", "Function described plainly, no imagined scenario", "The real outcome, stated without narrative framing", "What changes, in concrete terms"]
  },
  {
    id: 'aspirational-projection', name: 'Aspirational Self-Projection', category: 'identity-emotion', reactanceBase: 1,
    mechanism: "Framing an offer as a path to becoming an improved version of oneself appeals to aspiration and self-image, motivating action based on identity rather than function.",
    patterns: [/\bthe\s+best\s+version\s+of\s+(you|yourself)\b/i, /\bunlock\s+your\s+(potential|best self)\b/i],
    rewrites: ["What it actually does, described functionally", "The specific outcome, stated plainly", "What changes in practice, not in self-image", "Function first, described directly", "The concrete result, without a self-improvement frame", "What it does, on its own terms"]
  },
  {
    id: 'warmth-cue', name: 'Warmth / Personal Tone Cue', category: 'identity-emotion', reactanceBase: 0,
    mechanism: "A warm, personal tone builds rapport and reduces the sense of a transactional exchange, which can make requests feel more like a favor between people than a sales pitch.",
    patterns: [/\bwe're\s+so\s+(excited|happy)\s+to\b/i, /\bfrom\s+our\s+(family|team)\s+to\s+yours\b/i],
    rewrites: ["Here's what's on offer, stated plainly", "The details, without the added warmth framing", "What this is, described directly", "The offer itself, separate from the personal tone", "Stated factually, tone aside", "What's being offered, plainly put"]
  }
];
