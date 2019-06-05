export class Hangman {
  constructor() {
    this.turns = 0;
    this.answer = "";
    this.correctGuesses = new Array();
    this.wrongGuesses = new Array();
    }


    setAnswer(answerInput) {
      this.answer = answerInput;
      for(let i = 0; i < this.answer.length; i++) {
        this.correctGuesses.push("_ ");
      }
    }

    guess(char) {
      console.log("1");
      let numberCorrect = 0;
      for(let i=0; i < this.answer.length; i++) {
      //  console.log("this.answer[i]: " + this.answer[i]);
      //  console.log("char: " + char);
        if(this.answer.charAt(i) == char) {
          numberCorrect++;
          this.correctGuesses[i] = char;
          console.log(this.correctGuesses);
          return true;
        }
      }
      //console.log("2");
      if(numberCorrect == 0){
          this.wrongGuesses.push(char);
          return false;
        } else {
          return true;
        }
      }
    }
