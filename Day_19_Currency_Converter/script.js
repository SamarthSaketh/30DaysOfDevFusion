let country_list = {
  USD: "US",
  INR: "IN",
  EUR: "EU",
  GBP: "GB",
  JPY: "JP",
  AUD: "AU",
  CAD: "CA",
  CHF: "CH",
  CNY: "CN",
  RUB: "RU",
  AED: "AE",
  SAR: "SA",
  SGD: "SG",
  ZAR: "ZA",
  NZD: "NZ",
  SEK: "SE",
  NOK: "NO",
  DKK: "DK",
  HKD: "HK",
  KRW: "KR",
  THB: "TH",
  MXN: "MX",
  BRL: "BR",
  IDR: "ID",
  PKR: "PK",
  BDT: "BD",
  MYR: "MY",
  VND: "VN",
  PHP: "PH",
  TRY: "TR",
  PLN: "PL",
  EGP: "EG",
  NGN: "NG"
};

const currencyNames = {
  USD: "US Dollar",
  INR: "Indian Rupee",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  RUB: "Russian Ruble",
  AED: "Emirati Dirham",
  SAR: "Saudi Riyal",
  SGD: "Singapore Dollar",
  ZAR: "South African Rand",
  NZD: "New Zealand Dollar",
  SEK: "Swedish Krona",
  NOK: "Norwegian Krone",
  DKK: "Danish Krone",
  HKD: "Hong Kong Dollar",
  KRW: "South Korean Won",
  THB: "Thai Baht",
  MXN: "Mexican Peso",
  BRL: "Brazilian Real",
  IDR: "Indonesian Rupiah",
  PKR: "Pakistani Rupee",
  BDT: "Bangladeshi Taka",
  MYR: "Malaysian Ringgit",
  VND: "Vietnamese Dong",
  PHP: "Philippine Peso",
  TRY: "Turkish Lira",
  PLN: "Polish Zloty",
  EGP: "Egyptian Pound",
  NGN: "Nigerian Naira"
};

const countryNames = {
  US: "United States",
  IN: "India",
  EU: "European Union",
  GB: "United Kingdom",
  JP: "Japan",
  AU: "Australia",
  CA: "Canada",
  CH: "Switzerland",
  CN: "China",
  RU: "Russia",
  AE: "United Arab Emirates",
  SA: "Saudi Arabia",
  SG: "Singapore",
  ZA: "South Africa",
  NZ: "New Zealand",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  HK: "Hong Kong",
  KR: "South Korea",
  TH: "Thailand",
  MX: "Mexico",
  BR: "Brazil",
  ID: "Indonesia",
  PK: "Pakistan",
  BD: "Bangladesh",
  MY: "Malaysia",
  VN: "Vietnam",
  PH: "Philippines",
  TR: "Turkey",
  PL: "Poland",
  EG: "Egypt",
  NG: "Nigeria"
};

let apiKey = "e759f92560e41c99ee6213a2";

const dropList = document.querySelectorAll("form select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select"),
  getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected =
      i == 0
        ? currency_code == "USD"
          ? "selected"
          : ""
        : currency_code == "INR"
        ? "selected"
        : "";
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (let code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
    }
  }
}

window.addEventListener("load", () => {
  getExchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector("form input");
  const exchangeRateTxt = document.querySelector("form .exchange-rate");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  exchangeRateTxt.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExRate = (amountVal * exchangeRate).toFixed(2);

      let fromCurr = fromCurrency.value;
      let toCurr = toCurrency.value;
      let fromCountryCode = country_list[fromCurr];
      let toCountryCode = country_list[toCurr];

      let fromCurrName = currencyNames[fromCurr] || fromCurr;
      let toCurrName = currencyNames[toCurr] || toCurr;
      let fromCountry = countryNames[fromCountryCode] || fromCountryCode;
      let toCountry = countryNames[toCountryCode] || toCountryCode;

      exchangeRateTxt.innerText = `${amountVal} ${fromCurrName} (${fromCurr}, ${fromCountry}) = ${totalExRate} ${toCurrName} (${toCurr}, ${toCountry})`;
    })
    .catch(() => {
      exchangeRateTxt.innerText = "Something went wrong";
    });
}
