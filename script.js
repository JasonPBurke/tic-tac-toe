const playerFactory = (playerNumber, playerIcon = null, lastMove = false) => {
  const number = playerNumber;
  const icon = playerIcon;
  let madeLastMove = lastMove;
  return { number, icon, madeLastMove };
};

const gameBoard = (() => {
  const gameBoardSquares = document.querySelectorAll('.piece');
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  characterArray = [
    'Bender',
    'Fry',
    'Leela',
    'Farnsworth',
    'Zoidberg',
    'Hermes',
    'Amy',
    'Scruffy',
    'Nibbler',
  ];

  // const player1 = playerFactory(1);
  // const player2 = playerFactory(2, './images/Zoidberg.ico', true);
  let players = [];

  chooseCharacterPara = document.querySelector('.choose-characters');
  newGameBtn = document.querySelector('.new-game');
  newGameBtn.addEventListener('click', () => {
    newGameBtn.classList.add('hidden');
    chooseCharacterPara.classList.remove('hidden');
    pickCharacter();
  });

  function pickCharacter() {
    gameBoardSquares.forEach((square) => {
      square.addEventListener('click', (event) => {
        // event.currentTarget.style.pointerEvents = 'none';
        setPlayer(event);
      });
    });
  }

  function setPlayer(event) {
    if (players.length > 1) {
      return;
    }

    const playerImg = event.currentTarget.childNodes[1].getAttribute('src');
    event.currentTarget.classList.toggle('no-click');
    event.currentTarget.childNodes[1].style.opacity = '0.35';
    const madeLastMove = players.length === 0 ? false : true;
    players.push(playerFactory(players.length + 1, playerImg, madeLastMove));
    if (players.length > 1) {
      gameBoardSquares.forEach((square) => {
        square.style.pointerEvents = 'auto';
      });
      clearBoard();
    }
  }

  function clearBoard() {
    gameBoardSquares.forEach((square, i) => {
      square.childNodes[1].setAttribute('src', '');
    });
    newGame = true;
  }

  function resetBoard() {
    board.fill(0);
    gameBoardSquares.forEach((square, i) => {
      square.style.pointerEvents = 'auto';
      square.childNodes[1].setAttribute(
        'src',
        `./images/${characterArray[i]}.ico`
      );
    });
    newGame = true;
  }

  const winArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];

  function checkForWinner() {
    winArray.forEach((winCheck) => {
      let bSquares = board.filter((el, i) => winCheck.some((j) => i === j));
      console.log('winCheck: ', winCheck);
      console.log('bSquares', bSquares);
      if (bSquares.every((val, i, arr) => val !== 0 && val === arr[0])) {
        alertWinner(winCheck);
      }
    });
  }

  function alertWinner(winArray) {
    gameBoardSquares.forEach((square) => {
      square.style.pointerEvents = 'none';
      squareIndex = parseInt(square.getAttribute('index'));
      console.log(typeof squareIndex);
      if (winArray.includes(squareIndex)) {
        console.log(square.getAttribute('index'));
        square.style.scale = 1.1;
        square.style.backgroundColor = 'rgba(248,248,255, .5)';
      }
    });
  }

  gameBoardSquares.forEach((square) => {
    square.addEventListener('click', (event) => {
      playerMove(event, players);
    });
  });

  function playerMove(event, players) {
    if (players.length < 2) {
      return;
    }

    square = event.currentTarget;
    if (board[square.getAttribute('index')] === 0) {
      players.forEach((player) => {
        if (player.madeLastMove) {
          player.madeLastMove = false;
        } else {
          board[square.getAttribute('index')] = player.number;
          square.childNodes[1].setAttribute('src', player.icon);
          square.childNodes[1].style.opacity = '1';

          square.classList.toggle('no-click');
          player.madeLastMove = true;
          checkForWinner();
        }
      });
    }
  }

  return { resetBoard, gameBoardSquares, clearBoard, board };
})();

// gameBoard.pickCharacter();

// const gameController = ((gameBoardSquares) => {
//   console.log(gameBoardSquares);
//   function checkForWinner() {
//     // board.slice(0, 3).every((val, i, arr) => val === arr[0]) // {0,1,2}
//     //   ? alert('winner')
//     //   : board.slice(3, 6).every((val, i, arr) => val === arr[0]) // {3,4,5}
//     //   ? alert('winner')
//     //   : board.slice(6, 9).every((val, i, arr) => val === arr[0]) // {6,7,8}
//     //   ? alert('winner')
//     //   : console.log('no winner');
//     // board.slice(0, 3).every((val, arr) => val === arr[0]) ? alert('winner') : {0,3,6}
//     // board.slice(0, 3).every((val, arr) => val === arr[0]) ? alert('winner') : {1,4,7}
//     // board.slice(0, 3).every((val, arr) => val === arr[0]) ? alert('winner') : {2,5,8}
//     // board.slice(0, 3).every((val, arr) => val === arr[0]) ? alert('winner') : {2,4,6}
//     // board.slice(0, 3).every((val, arr) => val === arr[0]) ? alert('winner') : {0,4,8}
//   }

//   gameBoardSquares.forEach((square) => {
//     square.addEventListener('click', (event) => {
//       playerMove(event, players);
//     });
//   });

//   function playerMove(event, players) {
//     square = event.currentTarget;
//     console.log(players);
//     if (board[square.getAttribute('index')] === 0) {
//       players.forEach((player) => {
//         if (player.madeLastMove) {
//           player.madeLastMove = false;
//         } else {
//           board[square.getAttribute('index')] = player.number;
//           square.childNodes[1].setAttribute('src', player.icon);
//           player.madeLastMove = true;
//         }
//       });
//     }
//   }
// })();

// const playGame = ((player1, player2) => {
//   let winner = false;
//   // while (!winner) {
//   function play(player1, player2) {
//     gameBoard.addMove(player1);
//     console.log('here');
//     gameBoard.addMove(player2);
//   }
//   // }
//   return { player1, player2, play };
// })();

// const player1 = playerFactory(1, './images/Nibbler.ico');
// // gameBoard.addMove(player1);
// const player2 = playerFactory(2, './images/Zoidberg.ico');
// gameBoard.addMove(player1);
// gameBoard.addMove(player2);
// playGame.play(player1, player2);
// gameBoard.playerMove(player1);
// gameBoard.playerMove(player2);

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
