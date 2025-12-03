function updateRate() {
  const rate = document.getElementById("rate").value;
  document.getElementById("rate_val").innerText = rate + "%";
}

function setBankRate() {
  const bankRate = document.getElementById("bank").value;
  const slider = document.getElementById("rate");

  slider.value = bankRate;
  updateRate();
}

function compute() {
  const principal = parseFloat(document.getElementById("principal").value);
  const rate = parseFloat(document.getElementById("rate").value) / 100;
  const years = parseInt(document.getElementById("years").value);

  const resultBox = document.getElementById("result");

  if (!principal || principal <= 0) {
    alert("Please enter a valid positive amount.");
    return;
  }
  if (!years || years <= 0) {
    alert("Please enter a valid number of years.");
    return;
  }

  const interest = principal * rate * years;
  const total = principal + interest;
  const maturityYear = new Date().getFullYear() + years;

  resultBox.innerHTML = `
    If you deposit <b>${principal.toLocaleString()}</b><br>
    at an interest rate of <b>${(rate * 100).toFixed(2)}%</b>,<br>
    You will receive a total amount of <b>${total.toLocaleString()}</b><br>
    in the year <b>${maturityYear}</b>.
  `;
}
