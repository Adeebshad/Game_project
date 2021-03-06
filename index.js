/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, playing=true;

init();

document.querySelector(".btn-roll").addEventListener('click',function () {
    if(playing) {
        // Genbenerate Random value
        var dice = Math.floor(Math.random() * 6) + 1;
        // Select the appropriate block for value
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + ".png";
        // update the round score
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

// Turn to the next player

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(playing) {
        // add current score to the global
        scores[activePlayer] += roundScore;
        // Show in the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        // Check if player won the game
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner";
            document.querySelector(".dice").style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            playing = false;
        } else {
            nextPlayer();
        }
    }
});

function  nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector(".dice").style.display = 'none';
}

document.querySelector(".btn-new").addEventListener('click', function () {
    init();
    playing = true;
})

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector(".dice").style.display = 'none';
    document.getElementById("score-0").textContent='0';
    document.getElementById("score-1").textContent='0';
    document.getElementById("current-0").textContent='0';
    document.getElementById("current-1").textContent='0';
    document.getElementById("name-0").textContent='Player-1';
    document.getElementById("name-1").textContent='Player-2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

