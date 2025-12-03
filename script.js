// 🔹 Auto-update displayed rate
function updateRate() {
  const rate = document.getElementById("rate").value;
  document.getElementById("rate_val").innerText = rate + "%";
}

// 🔹 Set bank interest rate
function setBankRate() {
  const bankRate = document.getElementById("bank").value;
  const slider = document.getElementById("rate");

  slider.value = bankRate;
  updateRate();
}

// 🔹 Update bank logo
function updateBankLogo() {
  const bank = document.getElementById("bank");
  const logo = bank.options[bank.selectedIndex].getAttribute("data-logo");
  document.getElementById("bankLogo").src = logo;
}

// 🔹 Format currency while typing
function formatCurrency(input) {
  let value = input.value.replace(/,/g, "");
  if (!isNaN(value) && value !== "") {
    input.value = Number(value).toLocaleString();
  }
}

// 🔹 Change label when switching currency
function changeCurrency() {
  const currency = document.getElementById("currency").value;
  document.querySelector(
    "label[for='principal']"
  ).innerText = `Deposit Amount (${currency})`;
}

// 🔹 Calculate interest
function compute() {
  let principalStr = document
    .getElementById("principal")
    .value.replace(/,/g, "");
  const principal = parseFloat(principalStr);
  const rate = parseFloat(document.getElementById("rate").value) / 100;
  const years = parseInt(document.getElementById("years").value);
  const currency = document.getElementById("currency").value;

  const resultBox = document.getElementById("result");

  if (!principal || principal <= 0) return alert("Enter valid amount.");
  if (!years || years <= 0) return alert("Enter valid years.");

  const interest = principal * rate * years;
  const total = principal + interest;
  const maturityYear = new Date().getFullYear() + years;

  resultBox.innerHTML = `
    Deposit: <b>${principal.toLocaleString()} ${currency}</b><br>
    Interest Rate: <b>${(rate * 100).toFixed(2)}%</b><br>
    Total at Maturity: <b>${total.toLocaleString()} ${currency}</b><br>
    Year: <b>${maturityYear}</b>
  `;
}

// 🔹 Dark / Light Mode Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  const btn = document.getElementById("themeToggle");
  btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// 🔹 Download PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF();
  const text = document.getElementById("result").innerText;

  pdf.text("Interest Rate Calculator Result", 10, 10);
  pdf.text(text, 10, 30);
  pdf.save("interest_result.pdf");
}
