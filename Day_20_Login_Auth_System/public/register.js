  const form = document.getElementById('registerForm');
  const passwordInput = document.getElementById('password');
  const strengthBar = document.getElementById('strength-bar');
  const submitBtn = form.querySelector('button');

  const strengthLabels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  const strengthColors = ['#f00', '#f90', '#ff0', '#9f0', '#0f0'];

  // Create label element
  const label = document.createElement('div');
  label.id = 'strength-label';
  label.style.marginTop = '5px';
  label.style.fontSize = '12px';
  label.style.color = '#ccc';
  strengthBar.after(label);

  const validatePassword = (pwd) => {
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*]/.test(pwd);
    const isLong = pwd.length >= 5;
    return hasLower && hasUpper && hasNumber && hasSpecial && isLong;
  };

  passwordInput.addEventListener('input', () => {
    const pwd = passwordInput.value;
    let strength = 0;

    if (/[a-z]/.test(pwd)) strength += 1;
    if (/[A-Z]/.test(pwd)) strength += 1;
    if (/\d/.test(pwd)) strength += 1;
    if (/[!@#$%^&*]/.test(pwd)) strength += 1;
    if (pwd.length >= 5) strength += 1;

    // Show bar only when user starts typing
    if (pwd.length > 0) {
      strengthBar.style.display = 'block';
      label.style.display = 'block';
      strengthBar.style.width = `${strength * 20}%`;
      strengthBar.style.background = strengthColors[strength - 1] || '#eee';
      label.textContent = strengthLabels[strength - 1] || '';
    } else {
      strengthBar.style.display = 'none';
      label.style.display = 'none';
    }

    submitBtn.disabled = !validatePassword(pwd);
  });

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");

  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";

  eyeIcon.classList.toggle("fa-eye");
  eyeIcon.classList.toggle("fa-eye-slash");
}


  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });

        Swal.fire({
          icon: 'success',
          title: 'Account Created 🎉',
          text: 'Redirecting to login...',
          timer: 2000,
          showConfirmButton: false
        });

        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: data.message || 'Something went wrong'
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Please try again later.'
      });
    }
  });