exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let prompt;
  try {
    ({ prompt } = JSON.parse(event.body));
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Bad request body" }) };
  }

  if (!prompt || typeof prompt !== "string" || prompt.length > 8000) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing or oversized prompt" }) };
  }

  if (!process.env.GEMINI_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server is missing GEMINI_API_KEY" }) };
  }

  try {
    const geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY;

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: "application/json", temperature: 0.4 }
      })
    });

    const raw = await response.json();

    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify({ error: raw.error || raw }) };
    }

    const blockReason = raw.promptFeedback && raw.promptFeedback.blockReason;
    if (blockReason) {
      return { statusCode: 422, body: JSON.stringify({ error: "Content was blocked: " + blockReason }) };
    }

    const parts = raw.candidates && raw.candidates[0] && raw.candidates[0].content && raw.candidates[0].content.parts;
    const text = (parts || []).map(p => p.text || "").join("");

    // Normalize into the same shape the frontend already expects from Anthropic's format
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: [{ type: "text", text }] })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
