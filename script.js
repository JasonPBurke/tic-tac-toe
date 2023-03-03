const gamePiece = document.querySelectorAll('.piece');
const singleGamePiece = document.querySelector('.test-piece');
console.log(singleGamePiece);
console.log(gamePiece);

gamePiece.forEach((piece) => {
  document.addEventListener('mousemove', (e) => {
    rotateElement(e, piece);
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
  const offsetX = ((x - middleX) / middleX) * 20;
  const offsetY = ((y - middleY) / middleY) * 20;
  console.log(offsetX, offsetY);

  element.style.setProperty('--rotateX', -1 * offsetY + 'deg');
  element.style.setProperty('--rotateY', offsetX + 'deg');
}
