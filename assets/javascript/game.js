var hangmanGame = {
    dictionary: ['test'],
    currentWord: '',
    userGuesses: [],
    displayWord: [],
    wins: 0,
    totalGuesses: 0,
    startNewGame: function(){
        this.currentWord = this.dictionary[Math.floor(Math.random() * (this.dictionary.length - 1))];
        this.userGuesses = [];
        this.displayWord = [];
        this.totalGuesses = this.currentWord.length + 5;
        document.getElementById('remainGuesses').innerText = this.totalGuesses;
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
        document.getElementById('word').innerText = this.displayWord.toString();
        return matches;
    },
    letterGuess: function(guess){
        // Function vars
        var remainingGuesses = this.totalGuesses - this.userGuesses.length;

        // Save the guess in all guesses
        this.userGuesses.push(guess);
        // Build word display on each keypress
        var matches = this.buildDisplayWord();

        // Update the view
        document.getElementById('remainGuesses').innerText = remainingGuesses;
        document.getElementById('userGuesses').innerText = this.userGuesses.toString();

        // Check win or lose and update that part of the view
        if(matches === this.currentWord.length){
            this.wins++;
            document.getElementById('numberOfWins').innerText = this.wins;
            alert('You Win! Starting new game.');
            this.startNewGame()
        }

        if(remainingGuesses <= 0){
            alert('You Lost! Starting new game.');
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


