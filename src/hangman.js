export class Hangman {
  constructor() {
    this.turns = 0;
    this.answer = "";
    this.correctGuesses = new Array();
    this.wrongGuesses = new Array();
    }


    setAnswer(answerInput) {
      this.answer = answerInput.split('');
      for(let i = 0; i < this.answer.length; i++) {
        this.correctGuesses.push("_ ");
      }
    }

    guess(char) {
      let numberCorrect = 0;
      for (let i=0; i < this.answer; i++) {
        if(this.answer[i] == char) {
          numberCorrect++;
          this.correctLetters[i] = char;
        }
      }
        if(numberCorrect == 0){
          this.wrongGuesses.push(char);
          return false;
        } else {
          return true;
        }
      }
    }
