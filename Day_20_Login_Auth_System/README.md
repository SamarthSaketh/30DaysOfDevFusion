# 🔐 Day 20 – Advanced Login & Signup System with Session Management

## 💡 Description

A **modern and secure login/register system** built with **Node.js, Express, MongoDB, and EJS**.  
It features **session-based authentication**, **password hashing**, a stylish **glassmorphism UI**, and a **dynamic navbar** that changes between `Login / Signup` and `Username / Logout` based on user state.  

---

## 🚀 Features

* 📝 **User Registration** with password hashing (**bcrypt**)
* 🎯 Redirects to **attractive home page** after successful login
* 👤 Displays logged-in **username** with a **Logout** button
* 🪟 **Glassmorphism UI** with smooth animations
* 🖋 Floating labels for clean and modern form inputs
* 🛡 Password strength meter + regex validation:
  - At least 1 lowercase letter
  - At least 1 uppercase letter
  - At least 1 number
  - At least 1 special character
  - Minimum 5 characters
* ❌ Register button disabled until password is valid
* 🎊 Confetti animation on successful registration
* 📱 Fully responsive design

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js, MongoDB, Mongoose
* **Frontend:** HTML, CSS, JavaScript, EJS Templates
* **Security:** bcrypt for password hashing, express-session for authentication
* **UI:** Glassmorphism design, Font Awesome icons, Google Fonts

---

## ⚙️ How to Run

1. Clone or download the repository
2. Open the folder in **VS Code**
3. Install dependencies:
```bash
   npm install
````

4. Start MongoDB locally or connect to your MongoDB Atlas cluster add Mongo URL in file **.env**
5. Run the server:

```bash
   npm start
```
6. Open in your browser:

```
   http://localhost:3000
```

---

## 📁 Project Structure

```
Login_Auth_System/
├── public/               # CSS, JS, Images
│   ├── css/
│   ├── js/
│   └── images/
├── views/                # EJS templates (login, signup, home)
├── models/               # Mongoose user schema
├── routes/               # Express routes
├── app.js                # Main server file
└── package.json
```

---

## 📌 Completed on: August 7, 2025



https://github.com/user-attachments/assets/cba03e30-b05c-44e6-9002-4575f68e806d



[![View on LinkedIn](https://img.shields.io/badge/View%20on%20LinkedIn-%230077B5.svg?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/posts/vuppaladhadium-sai-samarth-saketh-036679201_30daysofdevfusion-loginsystem-authentication-activity-7359610933586915328--yXf?utm_source=share&utm_medium=member_desktop&rcm=ACoAADOIy-oB5VvUIX7e3yGzeHJf-_xkXM2ZAqA)


