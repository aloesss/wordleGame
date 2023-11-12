//SECOND VERSION, BUTTON, INDEX AND ARRAY VERSION WAS BAD
const apiURL = "https://words.dev-apis.com/word-of-the-day?random=1";
const postURL = "https://words.dev-apis.com/validate-word"
const apiWord = await getWord();
const apiArr = slicer(upperCase(apiWord));
let userWord = '';
const letterElement = document.querySelector(".play-area").children; //array of elements which we gonna increment, decrement (0-29)
const MAX_LENGTH = 5;
const ROUNDS = 6;

let rowIdx = 0; // 0 1 2 3 4 5

//Testing: 
console.log(letterElement);
console.log(apiWord);
const post = await checkWord(apiWord);
console.log(post);


//Functions:
function isLetter(letter) {
      return /^[a-zA-Z]$/.test(letter);
}

function upperCase(str) {
      return str.toUpperCase();
}

function slicer(str) {
      const arr = [];
      for (let i = 0; i < str.length; i++) {
            arr.push(str.slice(i, i + 1));
      }
      return arr;
}

async function checkWord(word) {
      const promise = await fetch(postURL, {
            method: "POST",
            body: JSON.stringify({ "word": `${word}` })
      });
      const response = await promise.json();
      return response.validWord;
}


async function getWord() {
      const promise = await fetch(apiURL);
      const response = await promise.json();
      return response.word;
}

function addLetter(value) {
      //keydown promise as that there would me one value in one letter
      if (userWord.length < MAX_LENGTH) {
            userWord += value;
      }
      else {
            userWord = userWord.slice(0, userWord.length - 1) + value;
      }

      letterElement[rowIdx * MAX_LENGTH + userWord.length - 1].textContent = value;
}

function backspace() {
      userWord = userWord.slice(0, userWord.length - 1);
      letterElement[rowIdx * MAX_LENGTH + userWord.length].textContent = '';
}

async function goToNextLine() {
      if (userWord.length === MAX_LENGTH) {
            const postCheck = await checkWord(userWord);

            if (postCheck) {
                  checking();
                  rowIdx++;
                  if (rowIdx === ROUNDS) {
                        alert(`You lost the word was : ${upperCase(apiWord)}`);
                        window.location.reload();
                  }
                  console.log(rowIdx);
                  userWord = '';
            }
            else {
                  for (let i = 0; i < MAX_LENGTH; i++) {
                        letterElement[rowIdx * MAX_LENGTH + i].classList.add("not-word");
                  }
                  setTimeout(() => {
                        for (let i = 0; i < MAX_LENGTH; i++) {
                              letterElement[rowIdx * MAX_LENGTH + i].classList.remove("not-word");
                        }
                  }, 1000);
            }
      }
      else {
            return;
      }

}

function checking() {

      if (userWord === upperCase(apiWord)) {
            alert("Great job, you won!");
            window.location.reload();
      }
      else {
            for (let i = 0; i < MAX_LENGTH; i++) {
                  if (apiArr[i] === userWord[i]) {
                        letterElement[rowIdx * MAX_LENGTH + i].classList.add("good");
                  }
                  else if (apiArr.includes(userWord[i])) {
                        letterElement[rowIdx * MAX_LENGTH + i].classList.add("not-in-place");
                  }
                  else if (apiArr[i] !== userWord[i]) {
                        letterElement[rowIdx * MAX_LENGTH + i].classList.add("bad");
                  }
                  console.log(apiArr);
                  console.log(userWord[i]);
            }
      }
}

//Core:
document.addEventListener("keydown", async (e) => {

      const value = e.key;
      if (isLetter(value)) {
            addLetter(upperCase(value));
      }
      else if (value === "Backspace") {
            backspace();
      }
      else if (value === "Enter") {
            await goToNextLine();
      }
});

// TODO 2 same letters in word:)
