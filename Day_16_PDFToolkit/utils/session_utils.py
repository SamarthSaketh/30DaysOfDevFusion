# utils/session_utils.py

import streamlit as st

def clear_tool_state(upload_key: str, result_key: str):
    """Clears uploaded files and result from session state and reruns app."""
    if upload_key in st.session_state:
        st.session_state[upload_key] = []
    if result_key in st.session_state:
        st.session_state[result_key] = None
    st.experimental_rerun()
