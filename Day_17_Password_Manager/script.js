// DOM Elements
const form = document.getElementById('credentialForm');
const websiteInput = document.getElementById('website');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const credentialsList = document.getElementById('credentialsList');
const searchInput = document.getElementById('searchInput');
const strengthMeter = document.getElementById('strengthMeter');
const generateBtn = document.getElementById('generatePassword');
const themeToggle = document.getElementById('themeToggle');
const saveBtn = document.getElementById('saveBtn');

// Password rules elements
const ruleLower = document.getElementById('rule-lower');
const ruleUpper = document.getElementById('rule-upper');
const ruleNumber = document.getElementById('rule-number');
const ruleSpecial = document.getElementById('rule-special');

const togglePassword = document.getElementById('togglePassword');
togglePassword.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  togglePassword.textContent = isHidden ? '👁️' : '👁️';
});

// Encryption Key (Should be more secure in production)
const MASTER_KEY = 'super_secret_key';

// ==== 🔐 Encrypt & Decrypt ====
function encrypt(text) {
  return CryptoJS.AES.encrypt(text, MASTER_KEY).toString();
}

function decrypt(ciphertext) {
  try {
    return CryptoJS.AES.decrypt(ciphertext, MASTER_KEY).toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return '';
  }
}

// ==== 💾 Save to localStorage ====
function saveCredential(cred) {
  const data = JSON.parse(localStorage.getItem('credentials') || '[]');
  data.push(cred);
  localStorage.setItem('credentials', JSON.stringify(data));
}
const exportBtn = document.getElementById('exportBtn');

exportBtn.addEventListener('click', () => {
  const data = JSON.parse(localStorage.getItem('credentials') || '[]');
  if (data.length === 0) {
    alert('No credentials to export!');
    return;
  }

  const rows = [
    ['Website', 'Username', 'Password'],
    ...data.map(cred => [
      decrypt(cred.website),
      decrypt(cred.username),
      decrypt(cred.password),
    ]),
  ];

  const csvContent = rows.map(e => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'credentials.csv';
  link.click();
});

// ==== 🧹 Clear Form ====
function clearForm() {
  websiteInput.value = '';
  usernameInput.value = '';
  passwordInput.value = '';
  strengthMeter.dataset.strength = '';
  saveBtn.disabled = true;
  updatePasswordRules('', true); // Reset visual indicators
}
const passwordRules = document.getElementById('passwordRules');

function showRules() {
  passwordRules.hidden = false;
}

function hideRules() {
  // Use a short timeout to allow click events inside the list
  setTimeout(() => {
    passwordRules.hidden = true;
  }, 150);
}

// ==== 🧾 Render All Credentials ====
function renderCredentials(filter = '') {
  const data = JSON.parse(localStorage.getItem('credentials') || '[]');
  credentialsList.innerHTML = '';

  data
    .filter(item =>
      decrypt(item.website).toLowerCase().includes(filter.toLowerCase()) ||
      decrypt(item.username).toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'credential';

      const website = decrypt(item.website);
      const username = decrypt(item.username);
      const password = decrypt(item.password);

      div.innerHTML = `
        <div>
          <span><strong>🌐</strong> ${website}</span>
          <span><strong>👤</strong> ${username}</span>
          <span><strong>🔑</strong> ${password}</span>
        </div>
        <div class="credential-actions">
          <button onclick="editCredential(${index})">✏️</button>
          <button onclick="deleteCredential(${index})">🗑️</button>
        </div>
      `;
      credentialsList.appendChild(div);
    });
}

// ==== 🧯 Delete Credential ====
function deleteCredential(index) {
  const data = JSON.parse(localStorage.getItem('credentials') || '[]');
  data.splice(index, 1);
  localStorage.setItem('credentials', JSON.stringify(data));
  renderCredentials(searchInput.value);
}

// ==== 📝 Edit Credential ====
function editCredential(index) {
  const data = JSON.parse(localStorage.getItem('credentials') || '[]');
  const cred = data[index];

  websiteInput.value = decrypt(cred.website);
  usernameInput.value = decrypt(cred.username);
  passwordInput.value = decrypt(cred.password);

  // Remove old and re-add on submit
  data.splice(index, 1);
  localStorage.setItem('credentials', JSON.stringify(data));
  renderCredentials(searchInput.value);
}

// ==== 🔍 Live Search ====
searchInput.addEventListener('input', () => {
  renderCredentials(searchInput.value);
});

// ==== 🔁 Theme Toggle ====
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// ==== 🌗 Load Theme ====
(function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');
})();

// ==== 📏 Password Rule Checker & Strength Meter ====
function updatePasswordRules(val, reset = false) {
  const hasLower = /[a-z]/.test(val);
  const hasUpper = /[A-Z]/.test(val);
  const hasNumber = /[0-9]/.test(val);
  const hasSpecial = /[^A-Za-z0-9]/.test(val);
  const longEnough = val.length >= 8;

  if (!reset) {
    ruleLower.classList.toggle('valid', hasLower);
    ruleUpper.classList.toggle('valid', hasUpper);
    ruleNumber.classList.toggle('valid', hasNumber);
    ruleSpecial.classList.toggle('valid', hasSpecial);
  } else {
    ruleLower.classList.remove('valid');
    ruleUpper.classList.remove('valid');
    ruleNumber.classList.remove('valid');
    ruleSpecial.classList.remove('valid');
  }

  // Set strength bar visually
  let strength = 0;
  if (hasLower) strength++;
  if (hasUpper) strength++;
  if (hasNumber) strength++;
  if (hasSpecial) strength++;
  if (longEnough) strength++;

  strengthMeter.dataset.strength = Math.min(strength, 4);

  // Enable Save button only if all conditions met
  saveBtn.disabled = !(hasLower && hasUpper && hasNumber && hasSpecial && longEnough);
}

// ==== 🔒 Listen for Password Input ====
passwordInput.addEventListener('input', () => {
  const val = passwordInput.value;
  updatePasswordRules(val);
});

// ==== 🔑 Generate Password ====
generateBtn.addEventListener('click', () => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+';
  const allChars = lowercase + uppercase + numbers + special;

  let password = '';
  // Guarantee at least one from each category
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Fill the rest of the password
  for (let i = 4; i < 16; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to prevent predictable patterns
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  passwordInput.value = password;
  passwordInput.dispatchEvent(new Event('input')); // Trigger validation
});


// ==== 📥 Form Submission ====
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("SUBMIT triggered");
  console.log("Website:", websiteInput.value);
  console.log("Username:", usernameInput.value);
  console.log("Password:", passwordInput.value);

  const cred = {
    website: encrypt(websiteInput.value),
    username: encrypt(usernameInput.value),
    password: encrypt(passwordInput.value),
  };

  saveCredential(cred);
  clearForm();
  renderCredentials(searchInput.value);
});
document.getElementById('clear').addEventListener('click', () => {
  document.getElementById('credentialForm').reset();

  // Clear validation UI
  updatePasswordRules('');
  
  // Disable save button after clearing
  document.getElementById('saveBtn').disabled = true;
});


// Initial render
renderCredentials();
