const form = document.querySelector('#form');
const resultDiv = document.querySelector('#result');
const msg = document.querySelector('#msg');
const timeInput = document.querySelector('#time-input');

const infosBank = [];
let data;
let resultText = '';
timeInput.focus();

// {st}Di., 31.10., 19:00{/st}
// {b}Frauenabend{/b} am Kamp
const transorm = function (infosArr) {
  return `
  {st}${infosArr[0]}{/st}
  {b}${infosArr[1]}{/b} ${infosArr[2]}
  `;
};

const copyToClipboard = function (text) {
  navigator.clipboard.writeText(text);
};

const hideMsg = function () {
  msg.style.display = 'none';
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  new FormData(form);
  infosBank.length = 0;
});

form.addEventListener('formdata', (e) => {
  data = e.formData;

  for (const value of data.values()) {
    infosBank.push(value);
  }
  form.reset();

  infosBank[0] !== ''
    ? (resultText = resultDiv.value + transorm(infosBank))
    : (resultText = resultDiv.value);
  resultDiv.value = resultText;
  copyToClipboard(resultText);
  msg.style.display = 'block';
  msg.innerHTML = 'Copied to clipboard...';
  setTimeout(hideMsg, 1000);
  timeInput.focus();
});
