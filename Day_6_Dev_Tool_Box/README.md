
# Day 6 - DevToolbox – All-in-One Developer Toolkit

## 📝 Description
**DevToolbox** is a sleek and powerful **developer productivity suite** that bundles multiple essential tools into a single React app.  
Whether you're working with JSON, decoding JWTs, generating UUIDs, testing regex patterns, or converting text — DevToolbox has you covered.

---

## 🚀 Features

- 🧩 JSON Formatter & Validator  
- 🔐 JWT Decoder  
- 🔑 UUID Generator  
- 🧪 Base64 Encoder/Decoder (Text + File)  
- 🔍 Regex Tester  
- 🧾 HTML ↔ Markdown Converter with validation  
- 📤 JSON → CSV Converter  
- 🎨 Color Picker (with HEX, RGB, HSL)  
- 📚 Text Case Converter (camelCase, snake_case, etc.)  
- 📁 File → Base64 Encoder  

Includes:

- 🌗 Light/Dark Theme Toggle  
- 🔗 Easy navigation with Button-based Navbar  
- 📱 Fully responsive and clean UI  
- 💾 External CSS styling (no inline clutter)

---

## 💻 Technologies Used

- **React 18+**  
- **React Router DOM** – Routing between tools  
- **UUID, marked, turndown, jsonlint-mod** – Tool libraries  
- **Copy-to-clipboard** – One-click copy output  
- **Custom ToolLayout & CSS** – Consistent UI  
- **Icons** – React Icons

---

## 🧭 Project Structure

```

src/
├── components/
│   └── ToolLayouts.jsx
├── tools/
│   ├── JsonFormatter.jsx
│   ├── JwtDecoder.jsx
│   ├── UuidGenerator.jsx
│   ├── Base64Tool.jsx
│   ├── FileToBase64.jsx
│   ├── RegexTester.jsx
│   ├── HtmlMarkdownConverter.jsx
│   ├── JsonToCsv.jsx
│   ├── ColorPicker.jsx
│   └── TextCaseConverter.jsx
├── styles/
│   ├── ToolStyles.css
│   └── Home.css
└── App.jsx

````

---

## ⚙️ Setup & Usage

1. Clone the repository  
2. Install dependencies  
   ```bash
   npm install
````

3. Start the app

   ```bash
   npm start
   ```
4. Open in browser:
   [http://localhost:3000](http://localhost:3000)

---

## 🧠 Example Inputs (for testing tools)

> 📥 Paste the following into appropriate tools during testing:

* **JSON Formatter:**

  ```json
  { "name": "DevToolbox", "tools": 10 }
  ```

* **JWT Decoder:**

  ```
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGV2ZWxvcGVyIn0.abc123
  ```

* **Regex Tester Pattern:**

  ```
  \b\w{4,}\b
  ```

* **HTML → Markdown:**

  ```html
  <h1>Hello</h1><p>This is HTML</p>
  ```

* **Markdown → HTML:**

  ```md
  ## Title  
  * Item 1  
  ```

---

## 📌 Completed on: July 6, 2025

---

✅ A perfect Swiss Army Knife for any developer’s day-to-day toolbox!

