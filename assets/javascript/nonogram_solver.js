// Handles to necessary DOM elements
const xSize = document.getElementById('xSize');
const ySize = document.getElementById('ySize');
const sizeError = document.getElementById('sizeError');
const colHints = document.getElementById('column-hints');
const rowHints = document.getElementById('row-hints');
const picture = document.getElementById('picture');


// User inputs
// NOTE: Initial values are mostly for testing.
//       5x5 grid is ok for production, but I think the hints should be empty to start
const userInputs = {
  xSize: 5,
  ySize: 5,
  colHints: [ [1, 2], [3, 4, 5], [6], [], [7, 8, 9, 10] ],
  rowHints: [ [1, 2], [3, 4, 5], [6], [], [7, 8, 9, 10] ]
}
console.log(`Initial userInputs:`);
console.log(userInputs);

// Initial puzzle draw
drawPuzzle();

// Catch when the user types a value into one of the size inputs
const handleSizeInput = e => {
  console.log(`Saw input change to ${e.target.id}: ${e.target.value}`);
  if(Number(e.target.value)) {
    sizeError.innerText = "";
    userInputs[e.target.id] = e.target.value;
    console.log(`Change userInputs to:`);
    console.log(userInputs);
    drawPuzzle();
  } else {
    console.log(`Input is not a number`);
    sizeError.innerText = "Invalid input! Only numbers allowed.";
    e.target.value = userInputs[e.target.id];
  }
}
xSize.onchange = handleSizeInput;
ySize.onchange = handleSizeInput;

// Function to draw entire puzzle
function drawPuzzle() {
  // clearPuzzle();
  drawColHints();
  drawRowHints();
  drawGrid();
}

// function clearPuzzle() {
// }

// Function to redraw the column hints
function drawColHints() {
  // First clear out the current hints
  console.log('Clearing out column hints');
  colHints.innerHTML = "";

  // Iterate over the hints, creating elements along the way
  console.log('Starting column loop');
  console.log(userInputs.colHints)
  for (col = 0; col < userInputs.xSize; col++) {
    let currCol = colHints.appendChild(document.createElement('div'));
    currCol.id = `hintsCol${col}`;
    currCol.classList.add('hint-group');
    console.log('Starting element loop');
    console.log(userInputs.colHints[col]);
    console.log(userInputs.colHints[col].length);

    // Special case if the column hints is an empty array
    if (userInputs.colHints[col].length == 0) {
      currHint = currCol.appendChild(document.createElement('div'));
      currHint.id = `hintCol${col}Blank`;
      currHint.classList.add('element', 'blank');
    }
    // Otherwise iterate over the elements in column hints
    else {
      for (elm = 0; elm < userInputs.colHints[col].length; elm++) {
        currHint = currCol.appendChild(document.createElement('div'));
        currHint.id = `hintCol${col}Elm${elm}`;
        currHint.classList.add('element');
        currHint.innerText = userInputs.colHints[col][elm];
      }
    }
  }
}

// Function to redraw the row hints
function drawRowHints() {
  // First clear out the current hints
  console.log('Clearing out row hints');
  rowHints.innerHTML = "";

  // Iterate over the hints, creating elements along the way
  console.log('Starting row loop');
  console.log(userInputs.rowHints)
  for (row = 0; row < userInputs.ySize; row++) {
    let currRow = rowHints.appendChild(document.createElement('div'));
    currRow.id = `hintsRow${row}`;
    currRow.classList.add('hint-group');
    console.log('Starting element loop');
    console.log(userInputs.rowHints[row]);
    console.log(userInputs.rowHints[row].length);

    // Special case if the row hints is an empty array
    if (userInputs.rowHints[row].length == 0) {
      currHint = currRow.appendChild(document.createElement('div'));
      currHint.id = `hintRow${row}Blank`;
      currHint.classList.add('element', 'blank');
    }
    // Otherwise iterate over the elements in row hints
    else {
      for (elm = 0; elm < userInputs.rowHints[row].length; elm++) {
        currHint = currRow.appendChild(document.createElement('div'));
        currHint.id = `hintRow${row}Elm${elm}`;
        currHint.classList.add('element');
        currHint.innerText = userInputs.rowHints[row][elm];
      }
    }
  }
}

// Function to redraw the picture grid
function drawGrid() {
  // First clear out the current picture
  picture.innerHTML = "";

  // Iterate over rows and columns, creating elements along the way
  for (rowY = 0; rowY < userInputs.ySize; rowY++) {
    let currRow = picture.appendChild(document.createElement('div'));
    currRow.id = `pictureRow${rowY}`;
    currRow.classList.add('picture-row');
    for (colX = 0; colX < userInputs.xSize; colX++) {
      currCol = currRow.appendChild(document.createElement('div'));
      currCol.id = `pictureCol${colX}`;
      currCol.classList.add('element');
    } 
  }
}