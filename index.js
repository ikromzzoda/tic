
window.addEventListener('DOMContentLoaded', ()=>{
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');



    let board = ['','','','','','','','',''];//tile history
    let currentPlayer = 'X';
    let isGameActive = true;
    
    const Player_X_WON ='Player_X_WON';
    const Player_O_WON ='Player_O_WON';
    const TIE = 'TIE'




const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8]
];

const handleresultValdition = () => {
    let m_roundWon = false;
    
    for(let i = 0; i <= 7; i++){
    const winCondition = winningConditions[i]
       

    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];

    if(a === '' || b === '' || c === ''){
        continue;
    }
    if(a === b && b === c){
        m_roundWon = true;
        break;
    }
    }

    if(m_roundWon){
        announce(currentPlayer === 'X'? Player_X_WON : Player_O_WON);
        isGameActive = false;

        return;
    }

    if(!board.includes('')){
        announce(TIE)
    }
}

    const announce = (type) => {
        switch(type){
            case Player_O_WON:
///            announcer.innerText = 'Player <span class="playerO">O</span> Won this game!'
            announcer.innerHTML= 'Player <span class="playerO">O</span> Won this game!'
            break;
            case Player_X_WON:
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won this game!'
            break;
            case TIE:
            announcer.innerText = 'Tie!'
        }

        announcer.classList.remove('hide')
    }





const updateBoard = (index)=>{
    board[index] = currentPlayer
}

const isValidAction = (tile) =>{
    if(tile.innerText === 'X' || tile.innerText === 'O'){
        return false;
    }
    return true
}


const changePlayer = () =>{
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

const userAction = (tile, index)=>{
    if(isValidAction(tile) && isGameActive){
        tile.innerText = currentPlayer
        tile.classList.add(`player${currentPlayer}`)
        updateBoard(index)
        handleresultValdition()
        changePlayer()
    }
}


const resetBoard = () => {
    board = ['','','','','','','','',''];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O'){
        changePlayer()
    };
    tiles.forEach(tile =>{
        tile.innerText = '';
        tile.classList.remove(`playerX`)
        tile.classList.remove(`playerO`)
    });
    }


tiles.forEach((tile,index)=>{
    tile.addEventListener('click', ()=> userAction(tile, index))
})

resetButton.addEventListener('click', resetBoard)

});