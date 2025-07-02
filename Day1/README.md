# 📁 Day 1 - File Organizer using Python

## 📝 Description
This project is a **File Organizer** that automatically sorts files in a directory into folders based on their file types (like `.pdf`, `.jpg`, `.mp3`, etc.).  
It helps keep to your downloads or working directories **clean and structured** using a simple Python script.

---

## 🚀 Features

- Automatically creates folders for each file type
- Moves files into corresponding folders
- Supports multiple file extensions
- Easy to customize with more extensions

---

## 💻 Technologies Used

- **Python 3.x**
- **OS Module** – Interacts with the file system and directory structure.
- **Shutil Module** – Handles moving and organizing files.
- **Tkinter** – Provides a simple GUI to select folders and run the script visually.


---

## 📂 How It Works

1. You specify the target directory.
2. The script scans all files in that directory.
3. Files are moved into folders based on their extensions.

---

## ⚙️ Setup & Usage

1. Clone the repo or copy the script.
2. Make sure you have Python installed.
3. Run the script:

```bash
python File_Organizer.py
````

4. Enter the **full path** to the folder you want to organize.

---

## 🧠 Example

**Before running:**

```
Downloads/
├── image1.jpg
├── doc1.pdf
├── song1.mp3
```

**After running:**

```
Downloads/
├── Images/
│   └── image1.jpg
├── Documents/
│   └── doc1.pdf
├── Audio/
│   └── song1.mp3
```

---

## 📌 Completed on: July 1, 2025

---

✅ A great way to start the challenge by solving a **real-life productivity problem**!
