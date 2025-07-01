import os
import shutil
import tkinter as tk
from tkinter import filedialog, messagebox
import subprocess  

FILE_TYPES = {
    "Images": [".jpg", ".jpeg", ".png", ".gif", ".bmp"],
    "Documents": [".pdf", ".docx", ".txt", ".xlsx", ".pptx"],
    "Videos": [".mp4", ".mkv", ".avi", ".mov"],
    "Music": [".mp3", ".wav", ".aac"],
    "Archives": [".zip", ".rar", ".7z"],
    "Scripts": [".py", ".js", ".html", ".css"],
    "Others": []
}

def organize_files_gui(folder_path):
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if os.path.isfile(file_path):
            file_ext = os.path.splitext(filename)[1].lower()
            moved = False
            for folder, extensions in FILE_TYPES.items():
                if file_ext in extensions:
                    move_file(file_path, os.path.join(folder_path, folder))
                    moved = True
                    break
            if not moved:
                move_file(file_path, os.path.join(folder_path, "Others"))

def move_file(src, dest_folder):
    os.makedirs(dest_folder, exist_ok=True)
    shutil.move(src, os.path.join(dest_folder, os.path.basename(src)))

def browse_folder():
    folder_selected = filedialog.askdirectory()
    folder_var.set(folder_selected)
    if folder_selected:
        open_folder(folder_selected)  

def organize_action():
    folder = folder_var.get()
    if folder:
        organize_files_gui(folder)
        messagebox.showinfo("Success", "✅ Files organized successfully!")
        open_folder(folder)  
    else:
        messagebox.showwarning("⚠️ Warning", "Please select a folder!")

def open_folder(path):
    if os.name == 'nt':  
        os.startfile(path)
    elif os.name == 'posix': 
        subprocess.Popen(['open', path])


root = tk.Tk()
root.title("Python File Organizer")
root.geometry("400x150")
root.resizable(False, False)

folder_var = tk.StringVar()

tk.Label(root, text="📂 Select Folder:").pack(pady=5)
tk.Entry(root, textvariable=folder_var, width=45).pack()
tk.Button(root, text="Browse", command=browse_folder).pack(pady=5)
tk.Button(root, text="Organize Files", command=organize_action, bg="#4CAF50", fg="white").pack(pady=5)

root.mainloop()
