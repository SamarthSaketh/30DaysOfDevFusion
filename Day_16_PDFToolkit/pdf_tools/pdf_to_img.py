# import streamlit as st
# from pdf2image import convert_from_bytes
# from PIL import Image
# import io
# import zipfile

# def pdf_to_img_ui():
#     POPPLER_PATH = r"C:\poppler-24.08.0\Library\bin"

#     st.header("📸 PDF to Image Converter")

#     if 'images' not in st.session_state:
#         st.session_state.images = None
#     if 'pdf_name' not in st.session_state:
#         st.session_state.pdf_name = None

#     uploaded_file = st.file_uploader("Upload a PDF", type=["pdf"], key="pdf_to_img_upload")
    
#     col1, col2 = st.columns(2)
#     with col1:
#         convert = st.button("🔄 Convert", key="convert_btn")
#     with col2:
#         clear = st.button("❌ Clear", key="clear_btn")

#     if clear:
#         st.session_state.images = None
#         st.session_state.pdf_name = None
#         st.rerun()

#     if convert:
#         if uploaded_file is None:
#             st.error("⚠️ Please upload a PDF file.")
#         else:
#             try:
#                 pdf_bytes = uploaded_file.read()
#                 images = convert_from_bytes(pdf_bytes, dpi=200, poppler_path=POPPLER_PATH)
#                 st.session_state.images = images
#                 st.session_state.pdf_name = uploaded_file.name.replace(".pdf", "")
#                 st.success(f"✅ Converted {len(images)} pages.")
#             except Exception as e:
#                 st.error(f"❌ Error: {e}")

#     if st.session_state.images:
#         st.subheader("🖼️ Preview (First 3 Pages)")
#         for i, img in enumerate(st.session_state.images[:3]):
#             st.image(img, caption=f"Page {i+1}", use_column_width=True)

#         zip_buffer = io.BytesIO()
#         with zipfile.ZipFile(zip_buffer, "w") as zipf:
#             for i, img in enumerate(st.session_state.images):
#                 img_bytes = io.BytesIO()
#                 img.save(img_bytes, format="PNG")
#                 zipf.writestr(f"page_{i+1}.png", img_bytes.getvalue())
#         zip_buffer.seek(0)

#         st.download_button(
#             label="📥 Download All as ZIP",
#             data=zip_buffer,
#             file_name=f"{st.session_state.pdf_name}_images.zip",
#             mime="application/zip"
#         )








import streamlit as st
from pdf2image import convert_from_bytes
from PIL import Image
import io
import zipfile

def pdf_to_img_ui():
    POPPLER_PATH = r"C:\poppler-24.08.0\Library\bin"

    st.header("📸 PDF to Image Converter")

    if 'images' not in st.session_state:
        st.session_state.images = None
    if 'pdf_name' not in st.session_state:
        st.session_state.pdf_name = None

    uploaded_file = st.file_uploader("Upload a PDF", type=["pdf"], key="pdf_to_img_upload")
    
    col1, col2 = st.columns(2)
    with col1:
        convert = st.button("🔄 Convert", key="convert_btn")
    with col2:
        clear = st.button("❌ Clear", key="clear_btn")

    if clear:
        st.session_state.images = None
        st.session_state.pdf_name = None
        st.rerun()

    if convert:
        if uploaded_file is None:
            st.error("⚠️ Please upload a PDF file.")
        else:
            try:
                pdf_bytes = uploaded_file.read()
                images = convert_from_bytes(pdf_bytes, dpi=150, poppler_path=POPPLER_PATH)
                st.session_state.images = images
                st.session_state.pdf_name = uploaded_file.name.replace(".pdf", "")
                st.success(f"✅ Converted {len(images)} pages.")
            except Exception as e:
                st.error(f"❌ Error: {e}")

    if st.session_state.images:
        st.subheader("🖼️ Preview (First 3 Pages)")

        for i, img in enumerate(st.session_state.images[:3]):
            # Resize image for preview (e.g., 30% scale)
            preview_width = 300
            aspect_ratio = img.height / img.width
            resized_img = img.resize((preview_width, int(preview_width * aspect_ratio)))
            st.image(resized_img, caption=f"Page {i+1}", use_column_width=False)

        # Create ZIP
        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, "w") as zipf:
            for i, img in enumerate(st.session_state.images):
                img_bytes = io.BytesIO()
                img.save(img_bytes, format="PNG")
                zipf.writestr(f"page_{i+1}.png", img_bytes.getvalue())
        zip_buffer.seek(0)

        st.download_button(
            label="📥 Download All as ZIP",
            data=zip_buffer,
            file_name=f"{st.session_state.pdf_name}_images.zip",
            mime="application/zip"
        )
