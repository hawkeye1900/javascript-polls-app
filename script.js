const newLanguageInput = document.querySelector(".newLanguageInput");
const options = document.querySelector(".options");
const addLanguageBtn = document.querySelector(".addLanguage");
const inputLabel = document.querySelector(".inputLabel");
const inputError = "You did not enter a new language. Try again";

options.addEventListener("click", updatePolls);
addLanguageBtn.addEventListener("click", (e) => {
  if (newLanguageInput.value.length > 0) {
    addNewLanguage(e);
  } else {
    e.preventDefault();
    inputLabel.setAttribute("style", "color:red");
    inputLabel.innerHTML = inputError;

    setTimeout(() => {
      inputLabel.setAttribute("style", "color:black");
      inputLabel.innerHTML = "Add new language here";
    }, 2000);
  }
});

const languageChoices = [];

function addNewLanguage(e) {
  e.preventDefault();
  const successMessage = `You added ${newLanguageInput.value}`;

  const language = {
    id: newLanguageInput.value,
    language: newLanguageInput.value,
    votes: 0,
  };

  languageChoices.push(language);
  options.innerHTML = "";

  languageChoices.map((lang) => {
    const label = document.createElement("div");

    const languageBtn = document.createElement("button");
    languageBtn.setAttribute("class", "option");
    languageBtn.innerHTML = lang.id;

    const count = document.createElement("span");
    count.setAttribute("id", `${lang.id}count`);
    count.setAttribute("class", "count");
    count.innerHTML = lang.votes;

    label.prepend(languageBtn);
    label.appendChild(count);

    options.appendChild(label);
    inputLabel.setAttribute("style", "color:green");
    inputLabel.innerHTML = successMessage;
    console.log(successMessage);

    setTimeout(() => {
      inputLabel.setAttribute("style", "color:black");
      inputLabel.innerHTML = "Add new language here";
    }, 2000);
    newLanguageInput.value = "";
  });
}

function updatePolls(e) {
  const targetLang = languageChoices.find(
    (lang) => lang.id === e.target.innerHTML
  );

  const votesDisplay = document.querySelector(
    `#${CSS.escape(targetLang.id)}count`
  );

  targetLang.votes++;
  votesDisplay.innerHTML = targetLang.votes;

  displayResult();
}

function displayResult() {
  const result = document.getElementById("result");
  result.innerHTML = "";

  languageChoices.forEach((option) => {
    const percentage = ((option.votes / getTotalVotes()) * 100).toFixed(2) || 0;
    const barWidth = percentage > 0 ? percentage + "%" : "0%";

    const optionResult = document.createElement("div");
    optionResult.className = "option-result";
    optionResult.innerHTML = `
            <span class="option-text">${option.id}</span>
            <div class="bar-container">
                <div class="bar" style="width: ${barWidth};"></div>
            </div>
            <span class="percentage">${percentage}%</span>
        `;

    result.appendChild(optionResult);
  });
}

function getTotalVotes() {
  return languageChoices.reduce((total, option) => total + option.votes, 0);
}
