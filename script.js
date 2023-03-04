const gameBoard = (() => {
  const gameBoardSquares = document.querySelectorAll('.piece');
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  function checkForWinner() {
    // board.slice(0, 3).every((val, i, arr) => val === arr[0]) // {0,1,2}
    //   ? alert('winner')
    //   : board.slice(3, 6).every((val, i, arr) => val === arr[0]) // {3,4,5}
    //   ? alert('winner')
    //   : board.slice(6, 9).every((val, i, arr) => val === arr[0]) // {6,7,8}
    //   ? alert('winner')
    //   : console.log('no winner');
    // board.slice(0, 3).every((val, arr) => val === arr[0]) ? alert('winner') : {0,3,6}
    // board.slice(0, 3).every((val, arr) => val === arr[0]) ? alert('winner') : {1,4,7}
    // board.slice(0, 3).every((val, arr) => val === arr[0]) ? alert('winner') : {2,5,8}
    // board.slice(0, 3).every((val, arr) => val === arr[0]) ? alert('winner') : {2,4,6}
    // board.slice(0, 3).every((val, arr) => val === arr[0]) ? alert('winner') : {0,4,8}
  }

  function resetBoard() {
    board.fill(0);

    gameBoardSquares.forEach((square) => {
      square.childNodes[1].setAttribute('src', '');
    });
  }

  function addMove(player) {
    console.log(`adding move for player: ${player.number}`);
    gameBoardSquares.forEach((square) => {
      square.addEventListener('click', function () {
        if (board[square.getAttribute('index')] === 0) {
          console.log(board);
          console.log(player);
          // if no play on this square, place player
          board[square.getAttribute('index')] = player.number;
          // console.log(square.childNodes[1]);
          square.childNodes[1].setAttribute('src', player.icon);
          console.log(board);
        }
      });
    });
  }

  return { addMove, checkForWinner, resetBoard, gameBoardSquares };
})();

const playGame = ((player1, player2) => {
  let winner = false;
  // while (!winner) {
  function play(player1, player2) {
    gameBoard.addMove(player1);
    console.log('here');
    gameBoard.addMove(player2);
  }
  // }
  return { player1, player2, play };
})();

const playerFactory = (playerNumber, playerIcon) => {
  const number = playerNumber;
  const icon = playerIcon;
  let madeLastMove = false;
  return { number, icon, madeLastMove };
};

const player1 = playerFactory(1, './images/Nibbler.ico');
// gameBoard.addMove(player1);
const player2 = playerFactory(2, './images/Zoidberg.ico');
gameBoard.addMove(player1);
gameBoard.addMove(player2);
// playGame.play(player1, player2);

// mouse tracking code
gameBoard.gameBoardSquares.forEach((square) => {
  document.addEventListener('mousemove', (e) => {
    rotateElement(e, square);
  });
});

function rotateElement(event, element) {
  // getting mouse position
  const x = event.clientX;
  const y = event.clientY;

  // find page center
  const middleX = window.innerWidth / 2;
  const middleY = window.innerHeight / 2;

  // get mouse offset from middle
  const offsetX = ((x - middleX) / middleX) * 25;
  const offsetY = ((y - middleY) / middleY) * 25;

  element.style.setProperty('--rotateX', -1 * offsetY + 'deg');
  element.style.setProperty('--rotateY', offsetX + 'deg');
}
