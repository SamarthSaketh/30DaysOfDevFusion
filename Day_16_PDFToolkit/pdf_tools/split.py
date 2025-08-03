# pdf_tools/split.py
import streamlit as st
from PyPDF2 import PdfReader, PdfWriter
import os
import uuid

def split_pdf_ui():
    st.header("✂️ Split PDF File by Page Range")

    if "split_key" not in st.session_state:
        st.session_state.split_key = str(uuid.uuid4())  # Generate unique key

    uploaded_file = st.file_uploader("Upload a PDF file", type=["pdf"], key=st.session_state.split_key)

    if uploaded_file:
        reader = PdfReader(uploaded_file)
        total_pages = len(reader.pages)
        st.write(f"📄 Total pages: {total_pages}")

        start = st.number_input("Start Page (1-based)", min_value=1, max_value=total_pages, value=1)
        end = st.number_input("End Page (inclusive)", min_value=start, max_value=total_pages, value=total_pages)

        output_filename = st.text_input("Output filename (without .pdf)", value="split_output")

        if st.button("✂️ Split PDF"):
            with st.spinner("Splitting PDF..."):
                writer = PdfWriter()
                for i in range(start - 1, end):
                    writer.add_page(reader.pages[i])

                output_path = os.path.join("outputs", f"{output_filename}.pdf")
                with open(output_path, "wb") as f:
                    writer.write(f)

                st.success("✅ PDF split successfully!")
                with open(output_path, "rb") as f:
                    st.download_button("📥 Download Split PDF", f, file_name=f"{output_filename}.pdf")

    else:
        st.warning("⚠️ Please upload a PDF file to split.")

    # ✅ Clear Button: Reset the uploader
    if st.button("🧹 Clear"):
        st.session_state.split_key = str(uuid.uuid4())  # Reset the file uploader by changing its key
        st.rerun()

