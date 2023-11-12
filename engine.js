//Variables:
const apiURL = "https://words.dev-apis.com/word-of-the-day";
const apiWord = await getWord();
const apiArr = slicer(upperCase(apiWord));
const userArr = [];
const letterElement = document.querySelector(".play-area").children;

//Testing:
console.log(letterButtons);
const testingAsync = document.querySelector(".testing");
testingAsync.textContent = apiWord;



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

async function getWord() {
      const promise = await fetch(apiURL);
      const response = await promise.json();
      return response.word;
}
/////////////////////////////////////////////////////////////////////

//Main code:

let curIndex = 0; //

document.addEventListener("keydown", (e) => {

      let value = e.key;

      if (!isLetter(value) && value != "Enter" && value != "Backspace") {
            e.preventDefault();
      }
      else if (value == "Enter") {
            if (userArr.length == 5) { //indexowanie żeby działało dla całego nie tylko dla pierwszego

                  for (let i = curIndex - 1; i > curIndex - 6; i--) {
                        if (apiArr[i] === userArr[i]) {
                              letterButtons[i].classList.add("good");
                        }
                        else if (apiArr.includes(userArr[i])) {
                              letterButtons[i].classList.add("no");
                        }
                        else if (apiArr[i] !== userArr[i]) {
                              letterButtons[i].classList.add("wrong");
                        }
                  }
                  for (let i = 0; i < apiArr.length; i++) {
                        userArr.pop();
                  }
            }
      }
      else if (value == "Backspace") { //backspace do poprawienia
            userArr.pop();
            letterButtons[curIndex].textContent = '';
            curIndex--;
            console.log(curIndex);
      } else {
            userArr.push(upperCase(value));
            console.log(userArr);
            letterButtons[curIndex].textContent = upperCase(value);
            curIndex++;
            console.log(curIndex);
      }

      if (curIndex >= 0 && curIndex < letterButtons.length) {
            letterButtons[curIndex].focus();
      }





});

console.log(userArr);
console.log(apiArr);

