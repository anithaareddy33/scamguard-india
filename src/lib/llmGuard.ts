export async function askLLM(message: string) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an Indian cyber fraud detection expert."
        },
        {
          role: "user",
          content: `Classify this message as SAFE, SUSPICIOUS, or SCAM and explain briefly:\n${message}`
        }
      ]
    })
  });

  const data = await res.json();
  return data.choices[0].message.content;
}
