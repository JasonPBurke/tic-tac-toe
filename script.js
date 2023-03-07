const playerFactory = (playerNumber, playerIcon = null, lastMove = false) => {
  const number = playerNumber;
  const icon = playerIcon;
  let madeLastMove = lastMove;
  console.log({ number, icon, madeLastMove });
  return { number, icon, madeLastMove };
};

const gameBoard = (() => {
  const gameBoardSquares = document.querySelectorAll('.piece');
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let players = [];

  const characterArray = [
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

  chooseCharacterPara = document.querySelector('.choose-characters');
  newGameBtn = document.querySelector('.new-game');
  newGameBtn.addEventListener('click', () => {
    newGameBtn.classList.add('hidden');
    chooseCharacterPara.classList.remove('hidden');
    pickCharacter();
  });

  playAgainBtn = document.querySelector('.play-again');
  playAgainBtn.addEventListener('click', () => {
    playAgainBtn.classList.add('hidden');
    document.querySelector('.winner').classList.add('hidden');
    document.querySelector('.tie').classList.add('hidden');
    document.querySelector('.choose-characters').classList.remove('hidden');
    resetBoard();
  });

  function pickCharacter() {
    gameBoardSquares.forEach((square) => {
      square.addEventListener('click', setPlayer);
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
      document.querySelector('.choose-characters').classList.add('hidden');
      setTimeout(clearBoard, 250);
    }
  }

  function clearBoard() {
    gameBoardSquares.forEach((square, i) => {
      square.childNodes[1].style.opacity = '1';

      square.childNodes[1].setAttribute('src', '');
    });
  }

  function resetBoard() {
    board.fill(0);
    players = [];
    gameBoardSquares.forEach((square, i) => {
      square.removeEventListener('click', setPlayer);
      square.style.scale = 1;
      square.style.backgroundColor = 'rgba(75, 41, 123, 0.575)';
      square.style.pointerEvents = 'auto';
      square.style.opacity = '1';
      square.childNodes[1].setAttribute(
        'src',
        `./images/${characterArray[i]}.ico`
      );
    });
    pickCharacter();
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
      if (bSquares.every((val, i, arr) => val !== 0 && val === arr[0])) {
        console.log('here');
        alertWinner(winCheck);
      }
    });
    if (!board.includes(0)) {
      console.log('also here');
      alertTie();
    }
  }

  function alertTie() {
    gameBoardSquares.forEach((square) => {
      square.style.pointerEvents = 'none';
      setTimeout(() => {
        document.querySelector('.tie').classList.remove('hidden');
        document.querySelector('.play-again').classList.remove('hidden');
      }, 100);
    });
  }

  function alertWinner(winArray) {
    board[1] = 0;
    gameBoardSquares.forEach((square) => {
      square.style.pointerEvents = 'none';
      squareIndex = parseInt(square.getAttribute('index'));
      if (winArray.includes(squareIndex)) {
        square.style.scale = 1.1;
        square.style.backgroundColor = 'rgba(248,248,255, .5)';
        setTimeout(() => {
          document.querySelector('.winner').classList.remove('hidden');
          document.querySelector('.play-again').classList.remove('hidden');
        }, 100);
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
  return { gameBoardSquares, board };
})();

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
