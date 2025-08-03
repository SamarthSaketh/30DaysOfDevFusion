document.getElementById("send-btn").addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value.trim();
  const model = document.getElementById("model").value;
  if (!userInput) return;

  const chatBox = document.getElementById("chat-box");

  // Add user message box
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerHTML = `<div class="msg-header">👤 You</div><div class="msg-content">${escapeHtml(userInput)}</div>`;
  chatBox.appendChild(userMsg);

  document.getElementById("user-input").value = "";
  document.getElementById("loading").classList.remove("hidden");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput, model }),
    });

    const data = await res.json();
    const raw = data.response;
    const formatted = formatBotMessage(raw);
    const lines = formatted.split("\n");

    // Create bot response box
    const botBox = document.createElement("div");
    botBox.className = "message bot";
    botBox.innerHTML = `<div class="msg-header">🤖 Chatbot <button class="copy-btn">📋 Copy</button></div><div class="msg-content"></div>`;
    chatBox.appendChild(botBox);

    const msgContent = botBox.querySelector(".msg-content");
    let lineIndex = 0;

    const typeLine = () => {
      if (lineIndex < lines.length) {
        msgContent.innerHTML += lines[lineIndex] + "<br>";
        chatBox.scrollTop = chatBox.scrollHeight;
        lineIndex++;
        setTimeout(typeLine, 50); // Adjust typing speed here
      } else {
        document.getElementById("loading").classList.add("hidden");
      }
    };
    typeLine();

    // Copy button functionality
    botBox.querySelector(".copy-btn").addEventListener("click", () => {
      const text = msgContent.innerText;
      navigator.clipboard.writeText(text).then(() => {
        botBox.querySelector(".copy-btn").innerText = "✅ Copied";
        setTimeout(() => {
          botBox.querySelector(".copy-btn").innerText = "📋 Copy";
        }, 1500);
      });
    });

  } catch (err) {
    chatBox.innerHTML += `<div class="message bot"><div class="msg-header">❌ Error</div><div class="msg-content">${escapeHtml(err.message)}</div></div>`;
    document.getElementById("loading").classList.add("hidden");
  }

  chatBox.scrollTop = chatBox.scrollHeight;
});

// Escape HTML
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Format bot response
function formatBotMessage(raw) {
  let formatted = raw.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang = "", code) => {
    return `<pre><code class="language-${lang.toLowerCase()}">${escapeHtml(code.trim())}</code></pre>`;
  });

  formatted = formatted.replace(/`([^`\n]+)`/g, (_, code) => {
    const isFilename = /\.(png|jpe?g|gif|svg|bmp|webp|txt|csv|pdf|docx?|xlsx?|pptx?|zip|tar\.gz|mp4|mp3|avi|js|ts|jsx|tsx|py|java|c|cpp|cs|go|rb|php|html|css|json|md)$/i.test(code.trim());
    if (isFilename) return escapeHtml(code);
    return `<code>${escapeHtml(code)}</code>`;
  });

  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");

  return formatted;
}
