# app.py
import streamlit as st
from pdf_tools import merge, split, pdf_to_img, img_to_pdf

st.set_page_config(page_title="PDF Toolkit", layout="wide")

# Theme toggle (Streamlit auto-applies based on system theme)
st.markdown("## 🧰 PDF Toolkit")

# Sidebar
st.sidebar.title("🛠️ Tools")
tool = st.sidebar.radio("Select a tool:", [
    "📎 Merge PDFs",
    "✂️ Split PDF",
    "🖼️ PDF to Images",
    "📄 Images to PDF",
])

# Tool Loader
if tool == "📎 Merge PDFs":
    merge.merge_pdfs_ui()
elif tool == "✂️ Split PDF":
    split.split_pdf_ui()  # 👈 Add this
elif tool == "🖼️ PDF to Images":
    pdf_to_img.pdf_to_img_ui()
elif tool == "📄 Images to PDF":
    img_to_pdf.img_to_pdf_ui()
else:
    st.info("🔧 This tool is coming soon. Stay tuned!")
