# pdf_tools/merge.py
import streamlit as st
from PyPDF2 import PdfMerger
import os
import uuid

def merge_pdfs_ui():
    st.header("📎 Merge Multiple PDF Files")

    # Clear logic BEFORE widget rendering
    if st.button("🧹 Clear", key="clear_merge"):
        # Reset by changing uploader key and rerun
        st.session_state.merge_key = str(uuid.uuid4())
        st.session_state.output_filename = "merged_output"
        st.rerun()

    # Initialize session state
    if "merge_key" not in st.session_state:
        st.session_state.merge_key = str(uuid.uuid4())
    if "output_filename" not in st.session_state:
        st.session_state.output_filename = "merged_output"

    # File uploader with dynamic key
    uploaded_files = st.file_uploader(
        "Upload PDF files", 
        type=["pdf"], 
        accept_multiple_files=True, 
        key=st.session_state.merge_key
    )

    output_filename = st.text_input(
        "Output filename (without .pdf)", 
        key="output_filename"
    )

    if st.button("🔄 Merge PDFs"):
        if not uploaded_files:
            st.warning("⚠️ Please upload at least one PDF file.")
            return

        with st.spinner("Merging..."):
            os.makedirs("outputs", exist_ok=True)
            output_path = os.path.join("outputs", f"{output_filename}.pdf")
            merger = PdfMerger()

            progress_bar = st.progress(0)
            for i, pdf in enumerate(uploaded_files):
                merger.append(pdf)
                progress_bar.progress((i + 1) / len(uploaded_files))

            merger.write(output_path)
            merger.close()

            st.success("✅ PDFs merged successfully!")
            with open(output_path, "rb") as f:
                st.download_button("📥 Download Merged PDF", f, file_name=f"{output_filename}.pdf")
