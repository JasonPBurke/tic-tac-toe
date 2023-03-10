const playerFactory = (playerNumber, playerIcon = null, lastMove = false) => {
  const number = playerNumber;
  const icon = playerIcon;
  let madeLastMove = lastMove;
  return { number, icon, madeLastMove };
};

const gameBoard = (() => {
  const gameBoardSquares = document.querySelectorAll('.piece');
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let players = [];
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

  const characterArray = [
    { name: 'Bender', sound: './sounds/bender.mp3' },
    { name: 'Fry', sound: './sounds/fry.mp3' },
    { name: 'Leela', sound: './sounds/leela.mp3' },
    { name: 'Farnsworth', sound: './sounds/farnsworth.mp3' },
    { name: 'Zoidberg', sound: './sounds/zoidberg.mp3' },
    { name: 'Hermes', sound: './sounds/hermes.m4a' },
    { name: 'Amy', sound: './sounds/amy.mp3' },
    { name: 'Scruffy', sound: './sounds/scruffy.m4a' },
    { name: 'Nibbler', sound: './sounds/nibbler.m4a' },
  ];

  let chooseCharacterPara = document.querySelector('.choose-characters');
  let newGameBtn = document.querySelector('.new-game');
  newGameBtn.addEventListener('click', () => {
    newGameBtn.classList.add('hidden');
    chooseCharacterPara.classList.remove('hidden');
    pickCharacter();
  });

  let playAgainBtn = document.querySelector('.play-again');
  playAgainBtn.addEventListener('click', () => {
    playAgainBtn.classList.add('hidden');
    document.querySelector('.winner').classList.add('hidden');
    document.querySelector('.tie').classList.add('hidden');
    document.querySelector('.choose-characters').classList.remove('hidden');
    resetBoard();
  });

  function pickCharacter() {
    gameBoardSquares.forEach((square) => {
      square.classList.remove('no-click');

      square.addEventListener('click', setPlayer);
    });
  }

  function setPlayer(event) {
    if (players.length > 1) {
      return;
    }

    const playerImg = event.currentTarget.childNodes[1].getAttribute('src');
    event.currentTarget.classList.add('no-click');
    event.currentTarget.childNodes[1].style.opacity = '0.35';
    const madeLastMove = players.length === 0 ? false : true;
    players.push(playerFactory(players.length + 1, playerImg, madeLastMove));
    if (players.length > 1) {
      gameBoardSquares.forEach((square) => {
        square.classList.remove('no-click');
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
      square.classList.remove('no-click');
      square.style.opacity = '1';
      square.childNodes[1].setAttribute(
        'src',
        `./images/${characterArray[i].name}.ico`
      );
    });
    pickCharacter();
  }

  function checkForWinner(player) {
    winArray.forEach((winCheck) => {
      let bSquares = board.filter((el, i) => winCheck.some((j) => i === j));
      if (bSquares.every((val, i, arr) => val !== 0 && val === arr[0])) {
        const re = /(?<=s\/).*(?=[\.])/;
        const characterName = re.exec(player.icon)[0];
        let audio;
        characterArray.forEach((character) => {
          if (characterName === character.name) {
            audio = new Audio(character.sound);
          }
        });
        audio.play();
        alertWinner(winCheck, player);
      }
    });
    if (!board.includes(0)) {
      alertTie();
    }
  }

  function alertTie() {
    gameBoardSquares.forEach((square) => {
      square.classList.add('no-click');
      setTimeout(() => {
        document.querySelector('.tie').classList.remove('hidden');
        document.querySelector('.play-again').classList.remove('hidden');
      }, 100);
    });
  }

  function alertWinner(winArray, p) {
    board[1] = 0;
    players.forEach((player) => {
      if (player.madeLastMove) {
        const re = /(?<=s\/).*(?=[\.])/;
        let name = re.exec(p.icon)[0];
        document.querySelector('.winner').innerHTML = `${name} Wins`;
      }
    });
    gameBoardSquares.forEach((square) => {
      square.classList.add('no-click');
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
          square.classList.add('no-click');
          player.madeLastMove = true;
          checkForWinner(player);
        }
      });
    }
  }
  return { gameBoardSquares };
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
