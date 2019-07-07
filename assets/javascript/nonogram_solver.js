// Handles to necessary DOM elements
const xDimension = document.getElementById('xDimension');
const yDimension = document.getElementById('yDimension');
const dimensionError = document.getElementById('dimensionError');
const picture = document.getElementById('picture');


// User inputs
const userInputs = {
  xDimension: 1,
  yDimension: 1,
  colHints: [ 1 ],
  rowHints: [ 1 ]
}
console.log(`Initial userInputs:`);
console.log(userInputs);

// Catch when the user types a value into one of the dimension inputs
const handleDimensionInput = e => {
  console.log(`Saw input change to ${e.target.id}: ${e.target.value}`);
  if(Number(e.target.value)) {
    dimensionError.innerText = "";
    userInputs[e.target.id] = e.target.value;
    console.log(`Change userInputs to:`);
    console.log(userInputs);
    updatePicture();
  } else {
    console.log(`Input is not a number`);
    dimensionError.innerText = "Invalid input! Only numbers allowed.";
    e.target.value = userInputs[e.target.id];
  }
}
xDimension.onkeyup = handleDimensionInput;
yDimension.onkeyup = handleDimensionInput;

// Function to redraw the picture grid
function updatePicture() {
  // First clear out the current picture
  picture.innerHTML = "";

  // Then iterate over rows and columns, creating elements along the way
  for (rowY = 0; rowY < userInputs.yDimension; rowY++) {
    let currRow = picture.appendChild(document.createElement('div'));
    currRow.id = `pictureRow${rowY}`;
    currRow.classList.add('picture-row');
    for (colX = 0; colX < userInputs.xDimension; colX++) {
      currCol = currRow.appendChild(document.createElement('div'));
      currCol.id = `pictureCol${colX}`;
      currCol.classList.add('element');
    } 
  }
}