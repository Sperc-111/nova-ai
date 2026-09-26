export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const key = process.env.GROQ_API_KEY_1;
  const { prompt, system } = req.body;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {role:"system", content: system || "You are NOVA AI"},
        {role:"user", content: prompt}
      ]
    })
  });
  const data = await response.json();
  res.json(data);
}
