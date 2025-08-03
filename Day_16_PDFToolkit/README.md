# 🧰 Day 16 – PDF Toolkit

## 📄 Description

A powerful and user-friendly **PDF Toolkit Web App** built with **Python and Streamlit** that allows you to manipulate PDF files easily. This tool provides features to **merge PDFs**, **split PDF pages**, **convert PDF to images**, and **convert images into a single PDF** — all from your browser with a clean and intuitive interface.

---

## 🚀 Features

- 🔗 **PDF Merge** – Combine multiple PDF files into one.
- ✂️ **PDF Split** – Split a PDF into individual pages or a specific page range.
- 🖼️ **PDF to Images** – Convert every page of a PDF into high-quality PNG images.
- 🧾 **Images to PDF** – Merge multiple images (JPG, PNG) into a single PDF.

---

## 💻 Tech Stack

- **Frontend/UI:** Streamlit
- **Backend:** Python
- **Libraries Used:**
  - `PyPDF2`, `pdf2image` – for PDF manipulation
  - `FPDF` – for converting images to PDF
  - `PIL` – for image processing

---

## ⚙️ How to Run

1. Clone the repository:
```bash
git clone https://github.com/SamarthSaketh/30DaysOfDevFusion.git
````

2. Navigate to the project directory:

```bash
cd Day_16_PDFToolkit
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. (Optional) Install poppler if not already available (required for `pdf2image`):

* **Windows:**
  Download from: [https://github.com/oschwartz10612/poppler-windows/releases](https://github.com/oschwartz10612/poppler-windows/releases)
  Add `bin/` to PATH.

* **Mac:**

  ```bash
  brew install poppler
  ```

* **Linux:**

  ```bash
  sudo apt install poppler-utils
  ```

5. Run the app:

```bash
streamlit run app.py
```

6. Open your browser and go to:

```
http://localhost:8501
```

---

## 📁 Project Structure

```
Day_16_PDFToolkit/
├── pdf_tools/
│   ├── merge.py          # PDF merge logic
│   ├── split.py          # PDF splitting logic
│   ├── pdf_to_img.py     # Convert PDF pages to images
│   └── img_to_pdf.py     # Convert images into a single PDF
├── app.py                # Streamlit main entry point
├── requirements.txt      # List of Python dependencies
└── README.md             # Project documentation
```

---

## 📌 Completed on: August 3, 2025



https://github.com/user-attachments/assets/413226b6-e783-4443-9f62-07f3ea848e5a


[![View on LinkedIn](https://img.shields.io/badge/View%20on%20LinkedIn-%230077B5.svg?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/posts/vuppaladhadium-sai-samarth-saketh-036679201_30daysofdevfusion-python-streamlit-activity-7357836895067783170-JGrv?utm_source=share&utm_medium=member_desktop&rcm=ACoAADOIy-oB5VvUIX7e3yGzeHJf-_xkXM2ZAqA)
