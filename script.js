// script.js
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const currencySelect = document.getElementById("currency");
  const principalLabel = document.getElementById("principalLabel");
  const currencyBadge = document.getElementById("currencyBadge");
  const principalInput = document.getElementById("principal");
  const bankSelect = document.getElementById("bank");
  const bankLogo = document.getElementById("bankLogo");
  const bankInitial = document.getElementById("bankInitial");
  const bankName = document.getElementById("bankName");
  const bankRateBadge = document.getElementById("bankRateBadge");
  const rateSlider = document.getElementById("rateSlider");
  const rateInput = document.getElementById("rate");
  const rateVal = document.getElementById("rate_val");
  const yearsInput = document.getElementById("years");
  const formError = document.getElementById("formError");
  const passbookEmpty = document.getElementById("passbookEmpty");
  const resultEl = document.getElementById("result");
  const computeBtn = document.getElementById("computeBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  const THEME_KEY = "interestCalc.theme";

  // ---------- Theme --------------------------------------------------------
  function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    themeToggle.querySelector(".toggle-icon").innerHTML = isDark ? "&#9788;" : "&#9789;";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  const storedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(storedTheme ? storedTheme === "dark" : prefersDark);

  themeToggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark");
    applyTheme(isDark);
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  });

  // ---------- Currency -------------------------------------------------------
  currencySelect.addEventListener("change", () => {
    const currency = currencySelect.value;
    principalLabel.textContent = `Deposit amount (${currency})`;
    currencyBadge.textContent = currency;
  });

  // ---------- Bank selection --------------------------------------------------
  function updateBankPreview() {
    const option = bankSelect.options[bankSelect.selectedIndex];
    const logoPath = option.getAttribute("data-logo");
    const name = option.getAttribute("data-name") || option.textContent.trim();

    bankLogo.src = logoPath;
    bankLogo.alt = `${name} logo`;
    bankName.textContent = name;
    bankRateBadge.textContent = `${option.value}%`;
  }

  bankLogo.addEventListener("error", () => {
    bankLogo.hidden = true;
    bankInitial.hidden = false;
    bankInitial.textContent = (bankName.textContent || "?").trim().charAt(0);
  });
  bankLogo.addEventListener("load", () => {
    bankLogo.hidden = false;
    bankInitial.hidden = true;
  });

  function setRate(value, { fromSlider = false, fromNumber = false } = {}) {
    const clamped = Math.min(25, Math.max(0.04, Number(value) || 0.04));
    if (!fromNumber) rateInput.value = clamped;
    if (!fromSlider) rateSlider.value = clamped;
    rateVal.textContent = `${clamped.toFixed(2)}%`;
    const fillPct = ((clamped - 0.04) / (25 - 0.04)) * 100;
    rateSlider.style.setProperty("--fill", `${fillPct}%`);
  }

  bankSelect.addEventListener("change", () => {
    updateBankPreview();
    setRate(bankSelect.value);
  });

  // ---------- Rate controls ----------------------------------------------------
  rateSlider.addEventListener("input", () => setRate(rateSlider.value, { fromSlider: true }));
  rateInput.addEventListener("input", () => setRate(rateInput.value, { fromNumber: true }));

  // ---------- Amount formatting --------------------------------------------------
  principalInput.addEventListener("input", () => {
    const digits = principalInput.value.replace(/,/g, "").replace(/[^\d.]/g, "");
    if (digits === "") {
      principalInput.value = "";
      return;
    }
    const [whole, decimal] = digits.split(".");
    const formattedWhole = Number(whole || 0).toLocaleString();
    principalInput.value = decimal !== undefined ? `${formattedWhole}.${decimal}` : formattedWhole;
  });

  // ---------- Validation --------------------------------------------------------
  function showError(message) {
    formError.textContent = message;
    formError.hidden = false;
  }
  function clearError() {
    formError.hidden = true;
    formError.textContent = "";
  }

  // ---------- Compute -------------------------------------------------------------
  function compute() {
    clearError();
    const principal = parseFloat(principalInput.value.replace(/,/g, ""));
    const rate = parseFloat(rateInput.value) / 100;
    const years = parseInt(yearsInput.value, 10);
    const currency = currencySelect.value;

    if (!principal || principal <= 0) {
      showError("Enter a deposit amount greater than zero.");
      return;
    }
    if (!years || years <= 0) {
      showError("Enter a number of years greater than zero.");
      return;
    }

    const interest = principal * rate * years;
    const total = principal + interest;
    const maturityYear = new Date().getFullYear() + years;

    resultEl.innerHTML = `
      <div class="passbook-row"><span class="label">Deposit</span><span class="value">${principal.toLocaleString()} ${currency}</span></div>
      <div class="passbook-row"><span class="label">Interest rate</span><span class="value">${(rate * 100).toFixed(2)}%</span></div>
      <div class="passbook-row"><span class="label">Term</span><span class="value">${years} year${years === 1 ? "" : "s"}</span></div>
      <div class="passbook-row"><span class="label">Matures in</span><span class="value">${maturityYear}</span></div>
      <div class="passbook-row total"><span class="label">Total at maturity</span><span class="value">${total.toLocaleString()} ${currency}</span></div>
    `;
    resultEl.hidden = false;
    passbookEmpty.hidden = true;
    downloadBtn.disabled = false;
    downloadBtn.dataset.summary = `Deposit: ${principal.toLocaleString()} ${currency}\nInterest Rate: ${(rate * 100).toFixed(2)}%\nTerm: ${years} year(s)\nMatures: ${maturityYear}\nTotal at Maturity: ${total.toLocaleString()} ${currency}`;
  }

  computeBtn.addEventListener("click", compute);
  [principalInput, rateInput, yearsInput].forEach((el) => {
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") compute();
    });
  });

  // ---------- PDF download ---------------------------------------------------------
  downloadBtn.addEventListener("click", () => {
    if (!window.jspdf || downloadBtn.disabled) return;
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const lines = (downloadBtn.dataset.summary || "").split("\n");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Interest Rate Calculator — Result", 14, 18);
    pdf.setDrawColor(11, 79, 69);
    pdf.line(14, 22, 196, 22);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    lines.forEach((line, i) => {
      pdf.text(line, 14, 34 + i * 8);
    });

    pdf.setFontSize(9);
    pdf.setTextColor(120, 120, 120);
    pdf.text("Rates shown are indicative — confirm with your bank.", 14, 34 + lines.length * 8 + 10);

    pdf.save("interest_result.pdf");
  });

  // ---------- Init --------------------------------------------------------------------
  updateBankPreview();
  setRate(rateInput.value);
});
