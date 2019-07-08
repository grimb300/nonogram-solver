// Handles to necessary DOM elements
const xSize = document.getElementById('xSize');
const ySize = document.getElementById('ySize');
const sizeError = document.getElementById('sizeError');
const colHints = document.getElementById('column-hints');
const rowHints = document.getElementById('row-hints');
const picture = document.getElementById('picture');
const hintCol0 = document.getElementById('hint-col-0');
const hintCol1 = document.getElementById('hint-col-1');
const hintCol2 = document.getElementById('hint-col-2');
const hintCol3 = document.getElementById('hint-col-3');
const hintCol4 = document.getElementById('hint-col-4');
const hintRow0 = document.getElementById('hint-row-0');
const hintRow1 = document.getElementById('hint-row-1');
const hintRow2 = document.getElementById('hint-row-2');
const hintRow3 = document.getElementById('hint-row-3');
const hintRow4 = document.getElementById('hint-row-4');


// User inputs
// NOTE: Initial values are mostly for testing.
//       5x5 grid is ok for production, but I think the hints should be empty to start
const userInputs = {
  xSize: 5,
  ySize: 5,
  // colHints: [  ],
  // rowHints: [  ]
  colHints: [ [3], [2, 2], [1, 1], [2, 2], [3] ],
  rowHints: [ [3], [2, 2], [1, 1], [2, 2], [3] ]
}
console.log(`Initial userInputs:`);
console.log(userInputs);

// Initial puzzle draw
drawPuzzle();

// For now, lets just solve it
solvePuzzle();

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

// Catch when the user types a value into one of the size inputs
const handleHintInput = e => {
  console.log(`Saw input change to ${e.target.id}: ${e.target.value}`);

  // Split the string on whitespace
  let hints = e.target.value.split(' ').map(x => Number(x));
  console.log(`Mapped hints`);
  console.log(hints);

  // Put the hints in the right array
  let [dummy, direction, index] = e.target.id.split('-');
  console.log(`Addding new values to ${direction} ${index}`);
  if (direction == 'row') {
    userInputs.rowHints[index] = hints;
    drawRowHints();
  } else {
    userInputs.colHints[index] = hints;
    drawColHints();
  }

  // If all row and column hints are populated, solve!
  if ((userInputs.rowHints.length == userInputs.xSize) &&
      (userInputs.colHints.length == userInputs.ySize)) {
    console.log('Solve!');
    solvePuzzle();
  }
}
hintCol0.onchange = handleHintInput;
hintCol1.onchange = handleHintInput;
hintCol2.onchange = handleHintInput;
hintCol3.onchange = handleHintInput;
hintCol4.onchange = handleHintInput;
hintRow0.onchange = handleHintInput;
hintRow1.onchange = handleHintInput;
hintRow2.onchange = handleHintInput;
hintRow3.onchange = handleHintInput;
hintRow4.onchange = handleHintInput;

// Brute force solver
function solvePuzzle() {
  // Iterate across the hints trying all possible solutions
  // Going to generate possible rows first since the data structures seem easier
  for (row = 0; row < userInputs.ySize; row++) {
    // Data structure holding the possible solutions
    let possibleSolutions = [];

    // Grab the hints for this row
    let hints = userInputs.rowHints[row];

    // Do the dumb thing first, packing the filled squares to the left, creating the base solution
    let baseSolution = hints.map(x => '1'.repeat(x)).join('0');
    // let baseSolution = hints.map(x => '1'.repeat(x)).join('0').padEnd(userInputs.xSize, '0');
    // console.log(`baseSolution for row ${row}`);
    // console.log(baseSolution);
    
    // If the base solution is the full width of the row, we're done
    if (baseSolution.length == userInputs.xSize) {
      // console.log(`Only one solution possible for this row`);
      possibleSolutions.push(baseSolution);
    } else {
      // Need to figure out how to sprinkle the extra 0's in efficiently
      let extraZeros = userInputs.xSize - baseSolution.length;
      possibleSolutions.push(placeZeros(extraZeros, hints).map(x => x.padEnd(userInputs.xSize, '0')));
    }
    console.log(`possibleSolutions for row ${row}`);
    console.log(possibleSolutions);
  }
}

function placeZeros(zerosLeft, onesLeft) {
  // console.log(`placeZeros called with ${zerosLeft}`);
  // console.log(onesLeft);
  let zerosPlaced;
  let retStrings = [];
  for (zerosPlaced = 0; zerosPlaced <= zerosLeft; zerosPlaced++) {
    // console.log(`Placing ${zerosPlaced} zeros`);
    let thisString = '0'.repeat(zerosPlaced).concat('', '1'.repeat(onesLeft[0]));
    // console.log(`thisString is ${thisString}`);
    if (onesLeft.length == 1) {
      // End of the recursion, time to go back up
      // console.log(`End of the recursion, pushing ${thisString}`);
      retStrings.push(thisString);
    } else {
      // Keep on going down the rabbit hole
      // console.log(`Going down the next level`);
      let nextStrings = placeZeros((zerosLeft - zerosPlaced), onesLeft.slice(1));
      let theseStrings = nextStrings.map(x => thisString.concat('0', x));
      // console.log(`Pushing theseStrings`);
      // console.log(theseStrings);
      retStrings.push(theseStrings);
    }
  }
  // console.log(`Returning`);
  // console.log(retStrings.flat());
  return retStrings.flat();
}

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
  // console.log('Clearing out column hints');
  colHints.innerHTML = "";

  // Iterate over the hints, creating elements along the way
  // console.log('Starting column loop');
  // console.log(userInputs.colHints)
  for (col = 0; col < userInputs.xSize; col++) {
    let currCol = colHints.appendChild(document.createElement('div'));
    currCol.id = `hintsCol${col}`;
    currCol.classList.add('hint-group');
    // console.log('Starting element loop');
    // console.log(userInputs.colHints[col]);
    // console.log(userInputs.colHints[col].length);

    // Special case if the column hints is an empty array
    if (!userInputs.colHints[col] || userInputs.colHints[col].length == 0) {
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
  // console.log('Clearing out row hints');
  rowHints.innerHTML = "";

  // Iterate over the hints, creating elements along the way
  // console.log('Starting row loop');
  // console.log(userInputs.rowHints)
  for (row = 0; row < userInputs.ySize; row++) {
    let currRow = rowHints.appendChild(document.createElement('div'));
    currRow.id = `hintsRow${row}`;
    currRow.classList.add('hint-group');
    // console.log('Starting element loop');
    // console.log(userInputs.rowHints[row]);
    // console.log(userInputs.rowHints[row].length);

    // Special case if the row hints is an empty array
    if (!userInputs.rowHints[row] || userInputs.rowHints[row].length == 0) {
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