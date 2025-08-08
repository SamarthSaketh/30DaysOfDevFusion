document.getElementById("ageForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const dobInput = document.getElementById("dob").value;
  if (!dobInput) {
    alert("Please enter your date of birth.");
    return;
  }

  const dob = new Date(dobInput);
  const today = new Date();

  if (dob > today) {
    alert("Date of birth cannot be in the future.");
    return;
  }

document.querySelector(".container").classList.add("show"); 


  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }


  const timeDiff = today - dob;
  const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
  const totalMinutes = Math.floor(timeDiff / (1000 * 60));
  const totalSeconds = Math.floor(timeDiff / 1000);

  const daysUntilBirthday = getDaysUntilNextBirthday(dob);


  document.getElementById("cards").style.display = "flex";

 
  document.getElementById("ageCard").innerHTML = `
    🧓 You are <strong>${years}</strong> year(s), <strong>${months}</strong> month(s), and <strong>${days}</strong> day(s) old.
  `;

  document.getElementById("birthdayCard").innerHTML = `
    🎉 Only <strong>${daysUntilBirthday}</strong> day(s) left until your next birthday!
  `;

  document.getElementById("timeCard").innerHTML = `
    🕒 You have lived:
    <ul style="margin-top: 8px; padding-left: 20px;">
      <li>${totalDays} days</li>
      <li>${totalWeeks} weeks</li>
      <li>${totalHours} hours</li>
      <li>${totalMinutes} minutes</li>
      <li><span id="live-seconds">${totalSeconds}</span> seconds</li>
    </ul>
  `;

  let currentSeconds = totalSeconds;
  if (window.liveTimer) clearInterval(window.liveTimer);
  window.liveTimer = setInterval(() => {
    currentSeconds++;
    const secondsSpan = document.getElementById("live-seconds");
    if (secondsSpan) {
      secondsSpan.textContent = currentSeconds;
    }
  }, 1000);

startBirthdayCountdown(dob);


  fetchBirthdayFact(dob.getMonth() + 1, dob.getDate());


  document.getElementById("ageForm").reset();
});


function getDaysUntilNextBirthday(dob) {
  const today = new Date();
  const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const diffTime = nextBirthday - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function fetchBirthdayFact(month, day) {
  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data && data.events && data.events.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.events.length);
        const event = data.events[randomIndex];

        document.getElementById("factCard").innerHTML = `
          🗓️ On this day (${month}/${day}):<br>
          <em>${event.text}</em>
        `;
      } else {
        document.getElementById("factCard").innerHTML = `No fun fact found for this date.`;
      }
    })
    .catch(error => {
      document.getElementById("factCard").innerHTML = `⚠️ Error loading fun fact.`;
      console.error("Fact fetch error:", error);
    });
}

function startBirthdayCountdown(dob) {
  const countdownCard = document.getElementById("countdownCard");

 
  countdownCard.innerHTML = `
    <div class="countdown-grid">
    <div class="countdown-header">Countdown to Your Next Birthday</div>
    <div class="countdown-subheader">Time remaining until your next birthday:</div>
      <div class="countdown-unit">
        <div class="number" id="cd-days">00</div>
        <div class="label">Days</div>
      </div>
      <div class="countdown-unit">
        <div class="number" id="cd-hours">00</div>
        <div class="label">Hours</div>
      </div>
      <div class="countdown-unit">
        <div class="number" id="cd-minutes">00</div>
        <div class="label">Minutes</div>
      </div>
      <div class="countdown-unit">
        <div class="number" id="cd-seconds">00</div>
        <div class="label">Seconds</div>
      </div>
    </div>
  `;


  function updateUnit(id, newValue) {
    const el = document.getElementById(id);
    const formatted = String(newValue).padStart(2, '0');
    if (el && el.textContent !== formatted) {
      el.classList.remove("flip");
      void el.offsetWidth; // force reflow
      el.textContent = formatted;
      el.classList.add("flip");
    }
  }

  function updateCountdown() {
    const now = new Date();
    let nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());

    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }

    const diff = nextBirthday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    updateUnit("cd-days", days);
    updateUnit("cd-hours", hours);
    updateUnit("cd-minutes", minutes);
    updateUnit("cd-seconds", seconds);
  }


  if (window.countdownTimer) clearInterval(window.countdownTimer);

  updateCountdown();
  window.countdownTimer = setInterval(updateCountdown, 1000);
}

