from fpdf import FPDF
import streamlit as st
from PIL import Image
import io

def img_to_pdf_ui():
    st.header("🖼️ Images to PDF Converter")

    if 'converted_pdf' not in st.session_state:
        st.session_state.converted_pdf = None

    uploaded_files = st.file_uploader(
        "Upload one or more images",
        type=["jpg", "jpeg", "png"],
        accept_multiple_files=True,
        key="img_to_pdf_uploader"
    )

    col1, col2 = st.columns(2)
    with col1:
        convert = st.button("🔄 Convert to PDF", key="convert_img_to_pdf")
    with col2:
        clear = st.button("❌ Clear", key="clear_img_to_pdf")

    if clear:
        st.session_state.converted_pdf = None
        st.rerun()

    if convert:
        if not uploaded_files:
            st.warning("⚠️ Please upload at least one image.")
            return

        pdf = FPDF(unit="pt", format="A4")
        for uploaded_file in uploaded_files:
            image = Image.open(uploaded_file).convert("RGB")
            img_width, img_height = image.size
            a4_width, a4_height = 595, 842  # A4 at 72 DPI

            # Resize while preserving aspect ratio
            ratio = min(a4_width / img_width, a4_height / img_height)
            new_size = (int(img_width * ratio), int(img_height * ratio))
            image = image.resize(new_size)

            # Save image to buffer
            img_buffer = io.BytesIO()
            image.save(img_buffer, format="JPEG")
            img_buffer.seek(0)

            # Save image to temp file (needed for fpdf)
            temp_path = f"temp_img.jpg"
            with open(temp_path, "wb") as f:
                f.write(img_buffer.read())

            pdf.add_page()
            x = (a4_width - new_size[0]) // 2
            y = (a4_height - new_size[1]) // 2
            pdf.image(temp_path, x=x, y=y, w=new_size[0], h=new_size[1])

        # Output PDF bytes
        pdf_bytes = pdf.output(dest="S").encode("latin1")
        output_pdf = io.BytesIO(pdf_bytes)
        output_pdf.seek(0)
        st.session_state.converted_pdf = output_pdf

        st.success("✅ Images converted to PDF!")

    if st.session_state.converted_pdf:
        st.download_button(
            label="📄 Download PDF",
            data=st.session_state.converted_pdf,
            file_name="converted.pdf",
            mime="application/pdf"
        )
