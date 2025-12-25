document.addEventListener("DOMContentLoaded", () => {

  // Remove intro
  setTimeout(() => {
    const intro = document.getElementById("intro");
    if (intro) intro.remove();
  }, 6000);

  const API_KEY = "525c5159-e21d-4c92-b8e4-ed414146febc";
  const API_URL = "https://api.sambanova.ai/v1/chat/completions";

  const input = document.getElementById("study-input");
  const level = document.getElementById("level");
  const button = document.getElementById("explain-btn");
  const result = document.getElementById("result");

  button.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    result.classList.add("hidden");
    result.innerHTML = "Explaining...";

    const prompt = `
Explain the following topic at a ${level.value} level:

"${text}"

Make the explanation clear, structured, and easy to understand.
`;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "Meta-Llama-3.1-8B-Instruct",
          messages: [
            {
              role: "system",
              content: "You are Studify, an AI study assistant created by Jeff. You explain concepts clearly and accurately."
            },
            { role: "user", content: prompt }
          ]
        })
      });

      const data = await res.json();
      result.innerHTML = data.choices[0].message.content;
      result.classList.remove("hidden");

    } catch {
      result.innerHTML = "Something went wrong. Please try again.";
      result.classList.remove("hidden");
    }
  });

});
