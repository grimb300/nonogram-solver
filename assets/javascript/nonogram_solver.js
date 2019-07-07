// Handles to necessary DOM elements
const xDimension = document.getElementById('xDimension');
const yDimension = document.getElementById('yDimension');
const dimensionError = document.getElementById('dimensionError');


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
  } else {
    console.log(`Input is not a number`);
    dimensionError.innerText = "Invalid input! Only numbers allowed.";
    e.target.value = userInputs[e.target.id];
  }
}
xDimension.onkeyup = handleDimensionInput;

yDimension.onkeyup = handleDimensionInput