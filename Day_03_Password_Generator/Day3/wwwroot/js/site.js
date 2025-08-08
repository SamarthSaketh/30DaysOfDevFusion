document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('toggle-theme');
    const body = document.body;
    const card = document.getElementById('main-card');
    const textElementsSelector = 'label, p, code, .form-label, .alert, .progress, .btn-outline-dark, .card-title, .result-output, .fst-italic, .text-muted';

    function applyTheme(theme) {
        const textElements = document.querySelectorAll(textElementsSelector);

        if (theme === 'dark') {
            body.classList.add('bg-dark', 'text-light');
            card?.classList.add('bg-dark', 'text-light');
            textElements.forEach(el => el.classList.add('text-light'));


            const crackTime = document.getElementById('crack-time');
            if (crackTime) {
                crackTime.classList.add('text-light');
                crackTime.style.color = '#ccc';
            }

            document.querySelectorAll('.alert-warning').forEach(alert => {
                alert.classList.add('text-dark'); 
            });
        } else {
            body.classList.remove('bg-dark', 'text-light');
            card?.classList.remove('bg-dark', 'text-light');
            textElements.forEach(el => el.classList.remove('text-light'));

            const crackTime = document.getElementById('crack-time');
            if (crackTime) {
                crackTime.classList.remove('text-light');
                crackTime.style.color = '';
            }

            document.querySelectorAll('.alert-warning').forEach(alert => {
                alert.classList.remove('text-dark');
            });
        }
    }


    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    toggleBtn?.addEventListener('click', () => {
        const newTheme = body.classList.contains('bg-dark') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });


    window.copyPassword = function () {
        const passwordText = document.getElementById("password-output")?.innerText;
        if (!passwordText || passwordText.startsWith("⚠️")) return;
        navigator.clipboard.writeText(passwordText).then(() => {
            alert("✅ Password copied to clipboard!");
        });
    };

    window.resetPassword = function () {
        const form = document.getElementById("password-form");
        const resultBox = document.getElementById("result-box");
        const inputs = form?.querySelectorAll("input[type='number']");


        inputs?.forEach(input => {
            if (input.name === "Length") {
                input.value = ""; 
            } else {
                input.value = "0";
            }
        });


        if (resultBox) resultBox.style.display = "none";
        resetUI();
    };

    const passwordEl = document.getElementById("password-output");
    const password = passwordEl?.innerText?.trim();

    const bar = document.getElementById("strength-bar");
    const text = document.getElementById("strength-text");
    const crackTime = document.getElementById("crack-time");

    if (!password || password.startsWith("⚠️")) {
        resetUI();
        return;
    }

    const length = password.length;
    let sets = 0;
    if (/[a-z]/.test(password)) sets += 26;
    if (/[A-Z]/.test(password)) sets += 26;
    if (/[0-9]/.test(password)) sets += 10;
    if (/[^a-zA-Z0-9]/.test(password)) sets += 32;

    const entropy = Math.log2(Math.pow(sets, length));
    const timeToCrackSec = Math.pow(2, entropy) / 1e9;

    let crackText;
    if (timeToCrackSec < 1) crackText = "🕐 Instantly cracked 😬";
    else if (timeToCrackSec < 60) crackText = `🕐 Cracked in ${Math.floor(timeToCrackSec)} seconds`;
    else if (timeToCrackSec < 3600) crackText = `🕐 Cracked in ${Math.floor(timeToCrackSec / 60)} minutes`;
    else if (timeToCrackSec < 86400) crackText = `🕐 Cracked in ${Math.floor(timeToCrackSec / 3600)} hours`;
    else if (timeToCrackSec < 31536000) crackText = `🕐 Cracked in ${Math.floor(timeToCrackSec / 86400)} days`;
    else crackText = `🛡️ Cracked in ${Math.floor(timeToCrackSec / 31536000)}+ years 🚀`;

    let strength = 0;
    if (length >= 8) strength += 1;
    if (length >= 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

    const strengthLevels = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
    const strengthColors = ["#dc3545", "#fd7e14", "#ffc107", "#0d6efd", "#198754"];
    const level = Math.min(strength, strengthLevels.length - 1);

    bar.style.width = `${(level + 1) * 20}%`;
    bar.style.backgroundColor = strengthColors[level];
    bar.innerText = strengthLevels[level];

    text.innerText = `Estimated entropy: ${entropy.toFixed(2)} bits`;
    crackTime.innerText = crackText;


    function resetUI() {
        if (bar) {
            bar.style.width = "0%";
            bar.innerText = "Weak";
            bar.style.backgroundColor = "#dc3545";
        }
        if (text) text.innerText = "";
        if (crackTime) crackTime.innerText = "";
        if (passwordEl) passwordEl.innerText = "";
    }
});
