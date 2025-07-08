
# 🧠Day 8 -  AI Text Summarizer

A simple and interactive web app that uses AI to generate concise summaries from long text content. Built using Python, Flask, and Hugging Face Transformers with a clean Bootstrap-based frontend.

---

## 📌 Project Info

- **Project Name:** AI Text Summarizer  
- **Date:** Day 8 – 08 July 2025  
- **Challenge:** #30DaysOfDevFusion  
- **Type:** Full Stack (Frontend + AI Backend)  
- **Goal:** Summarize long paragraphs using NLP

---

## ✨ Features

- ✅ Summarizes long text using AI
- 🗂️ Upload `.txt` files for input
- 🌗 Dark/Light mode toggle
- 🖨️ Print summary button
- ⚡ Bootstrap 5 styled responsive UI
- 💾 Remembers theme preference via localStorage

---

## 🧰 Tech Stack

| Layer      | Tech Used                                |
|------------|-------------------------------------------|
| Frontend   | HTML, CSS, JavaScript, Bootstrap 5        |
| Backend    | Python, Flask                             |
| AI/NLP     | Hugging Face Transformers (`bart-large-cnn`) |
| Other      | FileReader API, LocalStorage, Fetch API   |

---

## 📁 Folder Structure

```

AI-Text-Summarizer/
├── app.py
├── requirements.txt
├── templates/
│   └── index.html
├── static/
│   ├── index.css
│   └── index.js
└── README.md

````

---

## 🔧 Installation

### 1. Clone the Repository

```
git clone 
cd foldername
````

### 2. Install Dependencies

```
pip install -r requirements.txt
```

### 3. Run the Application

```
python app.py
```

### 4. Open in Browser

Visit:

```
http://127.0.0.1:5000
```

---

## 🖥️ How to Use

1. Paste any large text into the textarea
2. Or upload a `.txt` file
3. Click **Summarize** to generate a summary
4. Use **Print Summary** to export
5. Use **Dark Mode toggle** for better viewing

---



## ✅ Example Models

* [`facebook/bart-large-cnn`](https://huggingface.co/facebook/bart-large-cnn)
* (You can replace it with `distilbart-cnn-12-6` for faster performance)

---


