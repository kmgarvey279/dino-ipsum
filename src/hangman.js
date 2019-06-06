export class Hangman {
  constructor() {
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
    if(this.totalWrong == 7) {
      setTimeout(function(){
        this.game = false;
      }, 2000);
      return "Game Over";
    }
  }

  setTime() {
    setInterval(() => {
      this.timeLeft--;
    }, 1000);
  }

  resetTime() {
    this.timeLeft = 10;
  }
}
