var hangmanGame = {
    dictionary: ['nike', 'addidas', 'reebok', 'jordan', 'tinker', 'sneaker', 'airmax', 'yeezy'],
    currentWord: '',
    userGuesses: [],
    displayWord: [],
    wins: 0,
    totalGuesses: 0,
    remainingGuesses: 5,
    startNewGame: function(){
        this.currentWord = this.dictionary[Math.floor(Math.random() * (this.dictionary.length - 1))];
        this.userGuesses = [];
        this.displayWord = [];
        this.remainingGuesses = 5;
        document.getElementById('remainGuesses').innerText = this.remainingGuesses;
        document.getElementById('userGuesses').innerText = this.userGuesses.toString();
        this.buildDisplayWord();
    },
    buildDisplayWord: function(){
        var matches = 0;
        for(var i = 0; i < this.currentWord.length; i++){
            if(this.userGuesses.includes(this.currentWord.charAt(i))){
                this.displayWord[i] = this.currentWord.charAt(i);
                matches++;
            }else{
                this.displayWord[i] = ' _ ';
            }
        }
        document.getElementById('word').innerText = '';
        this.displayWord.forEach((letter) => {
            document.getElementById('word').innerText += letter;
        });
        return matches;
    },
    letterGuess: function(guess){
        // Save the guess in all guesses
        this.userGuesses.push(guess);
        // Build word display on each keypress
        var matches = this.buildDisplayWord();
        if(matches === 0){
            this.remainingGuesses--;
        }
        // Update the view
        document.getElementById('remainGuesses').innerText = this.remainingGuesses;
        document.getElementById('userGuesses').innerText = this.userGuesses.toString();

        // Check win or lose and update that part of the view
        if(matches === this.currentWord.length){
            var audio = new Audio('assets/sounds/win.mp3');
            audio.play();
            this.wins++;
            document.getElementById('numberOfWins').innerText = this.wins;
            this.startNewGame()
        }

        if(this.remainingGuesses <= 0){
            var audio = new Audio('assets/sounds/womp-womp.mp3');
            audio.play();
            this.startNewGame();
        }
    }

};

document.onkeyup = function(event){
    hangmanGame.letterGuess(event.key.toLowerCase());
};

document.addEventListener('DOMContentLoaded', function(){ 
    hangmanGame.startNewGame();
}, false);


