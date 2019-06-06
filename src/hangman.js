export class Hangman {
  constructor() {
    this.totalWrong = 0;
    this.answer = "";
    this.correctGuesses = new Array();
    this.wrongGuesses = new Array();
    this.timeLeft = 10;
    this.game = true;
  }

  resetAll(){
    this.totalWrong = 0;
    this.answer = "";
    this.correctGuesses = new Array();
    this.wrongGuesses = new Array();
    this.timeLeft = 10;
    this.game = true;
  }

  setAnswer(answerInput) {
    this.answer = answerInput;
    for(let i = 0; i < this.answer.length; i++) {
      this.correctGuesses.push("_ ");
    }
  }

  guess(char) {
    this.resetTime();
    let numberCorrect = 0;
    for(let i=0; i < this.answer.length; i++) {
      if(this.answer.charAt(i) == char) {
        numberCorrect++;
        this.correctGuesses[i] = char;
      }
    }
    if(numberCorrect == 0){
      this.wrongGuesses.push(char);
      this.totalWrong++;
      return false;
    } else {
      return true;
    }
  }

  gameOverCheck() {
    console.log(this.correctGuesses.join(""));
    console.log(this.answer);
    if(this.totalWrong == 7) {
      this.game = false;
      return "Game Over";
    } else if(this.correctGuesses.join("") == this.answer) {
      this.game = false;
      return "You Win!";
    }
  }

  setTime() {
    setInterval(() => {
      this.timeLeft--;
    }, 1000); // sped up to test
  }

  resetTime() {
    this.timeLeft = 10;
  }
}
