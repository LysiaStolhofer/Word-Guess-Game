
var wordGuessGame = {

    hide: document.getElementById("show-game"),
    dudesHead: document.getElementById("dudes-head"),
    dudesHeadDead: document.getElementById("dudes-head-dead"),
    dudesBody: document.getElementById("dudes-body"),
    dudesLeftArm: document.getElementById("dudes-left-arm"),
    dudesArms: document.getElementById("dudes-arms"),
    dudesLeftLeg: document.getElementById("dudes-left-leg"),
    dudesRightLeg: document.getElementById("dudes-right-leg"),
    keyboard: document.getElementById("keyboard-inner"),
    playAgain: document.getElementById("play-again"),

    hideTheseThingsOnPageLoad: function () {

        wordGuessGame.hide.style.display = "none";
        wordGuessGame.dudesHead.style.display = "none";
        wordGuessGame.dudesHeadDead.style.display = "none";
        wordGuessGame.dudesBody.style.display = "none";
        wordGuessGame.dudesLeftArm.style.display = "none";
        wordGuessGame.dudesArms.style.display = "none";
        wordGuessGame.dudesLeftLeg.style.display = "none";
        wordGuessGame.dudesRightLeg.style.display = "none";
        wordGuessGame.keyboard.style.display = "none";
        wordGuessGame.playAgain.style.display = "none";

    },


    hardWords: ["processor", "jawbreaker", "bandwidth", "javascript", "ethernet"],
    mediumWords: ["memory", "hacker", "digital", "developer", "analog"],
    easyWords: ["code", "debug", "index", "json", "node"],
    selectedGameType: "",
    currentWord: "",
    wl: 0,
    gameLosses: 0,
    gameWins: 0,
    usersWord: "",
    playAgainResponse: "",

    displayInstructions: function () {

        if (wordGuessGame.wl > 0) {

            document.getElementById("wordTime").innerHTML = "Time to play Hangman!";
            var guessesRemaining = 7;
            document.getElementById("guessesLeft").innerHTML = "You have " + wordGuessGame.guessesRemaining + " guesses remaining before you lose.";

            var keyboard = document.getElementById("keyboard-inner");
            keyboard.style.display = "block";

            wordGoesHere = document.getElementById("Display-Blanks");
            createP = document.createElement("ul");


            for (var i = 0; i < wordGuessGame.currentWord.length; i++) {

                drawBlanks = document.createElement("li");
                drawBlanks.setAttribute("id", "Blanks" + i);
                drawBlanks.innerHTML = " __ ";
                createP.appendChild(drawBlanks);

            }

            wordGoesHere.appendChild(createP);

        }

    },
    letterGuessed: function (letterClicked) {


        var letterID = event.target.id;
        console.log(letterID);

        if (wordGuessGame.guessesRemaining > 1) {

            var firstGuess = letterID;

            var g1 = wordGuessGame.currentWord.indexOf(firstGuess);

            for (var i = 0; i < wordGuessGame.currentWord.length; i++) {
                if (wordGuessGame.currentWord[i] === firstGuess) {

                    blankPosition = document.getElementById("Blanks" + i);
                    blankPosition.innerHTML = "  " + firstGuess + "  ";
                    wordGuessGame.usersWord[i] = firstGuess;

                }
            }

            if (g1 < 0) {

                document.getElementById(letterID).style.backgroundColor = "red";

                wordGuessGame.guessesRemaining--;
                wordGuessGame.drawTheDude();
            }


            else {

                document.getElementById(firstGuess).style.backgroundColor = "green";

            }

            document.getElementById("wordLength").innerHTML = "The first word you have to guess is " + wordGuessGame.wl + " letters long.";
            document.getElementById("guessesLeft").innerHTML = "You have " + wordGuessGame.guessesRemaining + " guesses remaining before you lose.";

            wordGuessGame.winTheGame(wordGuessGame.usersWord, wordGuessGame.currentWord);

        }
        else {

            document.getElementById("wordLength").innerHTML = "You lose!"
            document.getElementById("guessesLeft").innerHTML = '"Why dont you make it like a tree, and get out of here?"<br> - Back to the Future (1985)';

            var dudesHead = document.getElementById("dudes-head");
            dudesHead.style.display = "none";
            var dudesHeadDead = document.getElementById("dudes-head-dead");
            dudesHeadDead.style.display = "block";

            wordGuessGame.gameLosses++;

            document.getElementById("wordTime").innerHTML = " Score: <br>You: " + wordGuessGame.gameWins + " Lysia: " + wordGuessGame.gameLosses;

            wordGuessGame.playGameAgain();


            for (var i = 0; i < wordGuessGame.currentWord.length; i++) {

                blankPosition = document.getElementById("Blanks" + i);
                blankPosition.innerHTML = "  " + wordGuessGame.currentWord[i] + "  ";
            }
        }

    },
    winTheGame: function (uWord, cWord) {
        var indexMatches = 0;

        for (var i = 0; i < cWord.length; i++) {

            if (cWord[i] === uWord[i]) {
                indexMatches++;
            }
        }
        if (cWord.length === indexMatches) {

            document.getElementById("wordLength").innerHTML = "You win!!"
            document.getElementById("guessesLeft").innerHTML = "Great job!";
            wordGuessGame.gameWins++;

            document.getElementById("wordTime").innerHTML = "Score: <br>You: " + wordGuessGame.gameWins + " Lysia: " + wordGuessGame.gameLosses;

            wordGuessGame.playGameAgain();
        }
    },

    playGameAgain: function () {

        wordGuessGame.playAgainResponse = event.target.id;
        console.log(wordGuessGame.playAgainResponse)


        var keyboardInner = document.getElementById("keyboard-inner");
        keyboardInner.style.display = "none";


        var playAgain = document.getElementById("play-again");
        playAgain.style.display = "block";

        wordGuessGame.gameResponse();
    },

    gameResponse: function () {

        if (wordGuessGame.playAgainResponse === "yes") {
            console.log("TESTING");

            var showDisplayInGameResponse = document.getElementById("show-game");

            showDisplayInGameResponse.style.display = "none";
            var hideDisplayingame = document.getElementById("hide-menu");
            hideDisplayingame.style.display = "block";

            hangmanGame.startTheGame();

        }

    },

    drawTheDude: function () {

        if (wordGuessGame.guessesRemaining === 6) {

            var dudesHead = document.getElementById("dudes-head");
            dudesHead.style.display = "block";
        }

        if (wordGuessGame.guessesRemaining === 5) {

            var dudesBody = document.getElementById("dudes-body");
            dudesBody.style.display = "block";
        }

        if (wordGuessGame.guessesRemaining === 4) {

            var dudesBody = document.getElementById("dudes-body");
            dudesBody.style.display = "none";

            var dudesLeftArm = document.getElementById("dudes-left-arm");
            dudesLeftArm.style.display = "block";
        }

        if (wordGuessGame.guessesRemaining === 3) {
            var dudesLeftArm = document.getElementById("dudes-left-arm");
            dudesLeftArm.style.display = "none";

            var dudesArms = document.getElementById("dudes-arms");
            dudesArms.style.display = "block";
        }
        if (wordGuessGame.guessesRemaining === 2) {
            var dudesLeftLeg = document.getElementById("dudes-left-leg");
            dudesLeftLeg.style.display = "block";
        }

        if (wordGuessGame.guessesRemaining === 1) {

            var dudesRightLeg = document.getElementById("dudes-right-leg");
            dudesRightLeg.style.display = "block";
        }

    },

    startTheGame: function () {

        document.addEventListener("click", function (e) {

            var hideDisplay = document.getElementById("hide-menu");
            hideDisplay.style.display = "none";

            var showDisplay = document.getElementById("show-game");
            showDisplay.style.display = "block";

            if ((e.target.id === "easy") || (e.target.id === "medium") || (e.target.id === "hard")) {

                selectedGameType = e.target.id;


                if (selectedGameType === "easy") {

                    var pickEasyWord = wordGuessGame.easyWords[Math.floor(Math.random() * wordGuessGame.easyWords.length)];
                    wordGuessGame.currentWord = pickEasyWord.split("");

                } else if (selectedGameType === "medium") {
                    var pickMediumWord = wordGuessGame.mediumWords[Math.floor(Math.random() * wordGuessGame.mediumWords.length)];
                    wordGuessGame.currentWord = pickMediumWord.split("");

                } else if (selectedGameType === "hard") {
                    var pickHardWord = wordGuessGame.hardWords[Math.floor(Math.random() * wordGuessGame.hardWords.length)];

                    wordGuessGame.currentWord = pickHardWord.split("");
                }
                wordGuessGame.wl = wordGuessGame.currentWord.length;

                wordGuessGame.usersWord = new Array(wordGuessGame.wl);

                wordGuessGame.displayInstructions();
                wordGuessGame.letterGuessed(e.target.id);


            };


        });

    },

    guessesRemaining: 8,
    drawBlanks: ""

} 