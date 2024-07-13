const form = document.querySelector("#form");
const formParse = document.querySelector("#parse");
const resultDiv = document.querySelector("#result");
const msg = document.querySelector("#msg");
const timeInput = document.querySelector("#time-input");
const infosTextArea = document.querySelector("#infos");

const infosBank = [];
let data;
let resultText = "";
infosTextArea.focus();

// {st}Di., 31.10., 19:00{/st}
// {b}Frauenabend{/b} am Kamp
const transorm = function (infosArr) {
  return `
  
  {st}${infosArr[0]}{/st}
  {b}${infosArr[1]}{/b} ${infosArr[2]}`;
};

const parse = function (infos) {
  let result = "";

  infos.forEach((rs) => {
    s = rs.replace(/\bUhr:?/g, "");

    const regexTime = s.match(/.*?\b\d{1,2}:\d{2}\b/);
    const regexDate = s.match(/^(.*?):/);

    let firstPart = "";

    if (regexTime) {
      firstPart = `${regexTime[0].trim()} Uhr:`;
    } else if (regexDate) {
      firstPart = regexDate[0].trim();
    }
    s = s.slice(firstPart.replace(/\bUhr:?/g, "").length);

    const secondRegex = s.match(/^:?(.*?)(?:\(| am | im |$)/);
    const secondPart = secondRegex ? secondRegex[1].trim() : "";
    s = s.trim().slice(secondPart.length).trim();

    result += `
   
       {st}${firstPart}{/st}
       {b}${secondPart}{/b} ${s}`;
  });

  return result;
};

const copyToClipboard = function (text) {
  navigator.clipboard.writeText(text);
};

const hideMsg = function () {
  msg.style.display = "none";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  new FormData(form);
  infosBank.length = 0;
});

formParse.addEventListener("submit", (e) => {
  e.preventDefault();
  new FormData(formParse);
});

form.addEventListener("formdata", (e) => {
  data = e.formData;

  for (const value of data.values()) {
    infosBank.push(value);
  }
  form.reset();

  resultText = resultDiv.value + transorm(infosBank);
  resultDiv.value = resultText;
  copyToClipboard(resultText);
  msg.style.display = "block";
  setTimeout(hideMsg, 1000);
  timeInput.focus();
});

formParse.addEventListener("formdata", (e) => {
  data = e.formData;

  infos = data.get("infos");
  infosArr = infos.split(/\r?\n/);

  resultText = resultDiv.value + parse(infosArr);
  resultDiv.value = resultText;

  copyToClipboard(resultText);
  msg.style.display = "block";
  setTimeout(hideMsg, 1000);
});
