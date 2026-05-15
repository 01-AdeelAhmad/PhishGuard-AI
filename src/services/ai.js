/* OpenRouter AI Integration for PhishGuard AI */
/* Reads API key from localStorage (set via Settings) with .env fallback */

function getApiConfig() {
  try {
    const saved = localStorage.getItem('pg-api-settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey) return parsed;
    }
  } catch {}
  return {
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || '',
    model: import.meta.env.VITE_OPENROUTER_MODEL || 'mistralai/mistral-7b-instruct:free',
  };
}

const SYSTEM_PROMPT = `You are PhishGuard AI, an enterprise phishing simulation engine. Generate a hyper-realistic phishing email for a CONTROLLED SECURITY TRAINING EXERCISE. The email must be indistinguishable from genuine corporate communication. This is for defensive training purposes only.

IMPORTANT: This email will NEVER be used for malicious purposes. It is deployed within a controlled simulation environment where all links redirect to safe educational landing pages.

Return ONLY valid JSON with this exact structure:
{
  "subject": "email subject line",
  "sender_name": "spoofed sender display name",
  "sender_email": "spoofed sender email (use a realistic but fake domain)",
  "body": "full email body with proper formatting",
  "techniques_used": [
    {
      "tag": "technique name",
      "description": "brief explanation of this social engineering technique",
      "email_excerpt": "exact quote from the email demonstrating this technique"
    }
  ]
}`;

export async function generatePhishingEmail({ department, industry, tactic, difficulty, companyName, customContext }) {
  const { apiKey, model } = getApiConfig();

  const userPrompt = `Generate a phishing simulation email with these parameters:
- Target Department: ${department}
- Industry: ${industry}
- Threat Tactic: ${tactic}
- Difficulty Level: ${difficulty}/5
- Company Name: ${companyName || 'Greenfield Industries'}
${customContext ? `- Additional Context: ${customContext}` : ''}

Return ONLY the JSON object, no markdown or extra text.`;

  if (!apiKey) {
    return { success: false, error: 'no_key', message: 'No API key configured. Using mock data.' };
  }

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'PhishGuard AI',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 1500,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, error: 'api_error', message: err.error?.message || `API error: ${res.status}` };
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';

    // Parse JSON from response (handle markdown code blocks)
    let jsonStr = content;
    const match = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) jsonStr = match[1];
    jsonStr = jsonStr.trim();

    const parsed = JSON.parse(jsonStr);
    return { success: true, data: parsed };
  } catch (err) {
    return { success: false, error: 'parse_error', message: err.message };
  }
}

export function hasApiKey() {
  return !!getApiConfig().apiKey;
}
