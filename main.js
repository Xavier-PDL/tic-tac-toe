let currentPlayer = 1;
let gameOver = false;

const boardData = [ [0,0,0],
                    [0,0,0],
                    [0,0,0] ];
const mainDiv = document.getElementById("gameArea");

function wonGame() {
    // check rows
    let res = 0;
    for(let i = 0; i < 3; i++){
        res = currentPlayer;
        res &= boardData[i][0];
        res &= boardData[i][1];
        res &= boardData[i][2];
        if(res === currentPlayer)
            return true;
    }

    // check cols
    res = currentPlayer;
    for(let i = 0; i < 3; i++){
        res = currentPlayer;
        res &= boardData[0][i];
        res &= boardData[1][i];
        res &= boardData[2][i];
        if(res === currentPlayer)
            return true;
    }
    
    // check diagonals
    res = currentPlayer;
    res &= boardData[0][0] & boardData[1][1] & boardData[2][2];
    if(res === currentPlayer) return true;
    res = currentPlayer;
    res &= boardData[0][2] & boardData[1][1] & boardData[2][0];
    if(res === currentPlayer) return true;
    return false;
}

function play(row, col) {
    if(gameOver === true) return;
    // make sure current square hasn't been played yet
    if(boardData[row][col] !== 0) {
        console.log("Invalid play");
        return;
    }
    // play square
    boardData[row][col] = currentPlayer;
    switch(currentPlayer) {
        case 1:
            document.getElementById(`r${row}c${col}`).classList.add('player1');
            break;
        case 2:
            document.getElementById(`r${row}c${col}`).classList.add('player2');
            break;
    }
    // check if current play won the game before switching players
    const playerLabel = document.getElementById("player-label");
    if(wonGame() === true) {
        gameOver = true;
        playerLabel.textContent = `Player ${currentPlayer} won the game!`;
        return;
    }
    // switch player;
    if(currentPlayer === 1){
        currentPlayer = 2;
    } else {
        currentPlayer = 1;
    }
    const elemPlayerLabel = document.getElementById("player-label-num");
    elemPlayerLabel.textContent = currentPlayer;
    playerLabel.className = `player-label-num${currentPlayer}`;
}

function makeBoard() {
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            mainDiv.innerHTML +=
                `<div id="r${i}c${j}" class="playSquare"`+
                `onclick="play(${i},${j});"></div>`;
        }
        mainDiv.innerHTML += '<br>';
    }
}

function restartGame() {
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            boardData[i][j] = 0;
            document.getElementById(`r${i}c${j}`).className = "playSquare";
        }
    }
    gameOver = false;
    currentPlayer = 1;
    document.getElementById("player-label").innerHTML = "Player <span id=\"player-label-num\">1</span>'s Turn";
    document.getElementById("player-label").className = "player-label-num1";
}
