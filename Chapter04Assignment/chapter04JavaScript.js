// Initialize click count for each color
var clickCountRed = 0;
var clickCountBlue = 0;
var clickCountGreen = 0;
//handles counts of the amounts of hovers for each hovers
var hoverCountRed = 0;
var hoverCountBlue = 0;
var hoverCountGreen = 0;


function handleClickRed() {
    // Increment click count
    clickCountRed++;

    // Update the paragraph with the new click count
    document.getElementById('clickCountRed').textContent = 'RED count: ' + clickCountRed;
}
//updates blue clicks
function handleClickBlue() {
    // Increment click count
    clickCountBlue++;

    // Update the paragraph with the new click count
    document.getElementById('clickCountBlue').textContent = 'BLUE count: ' + clickCountBlue;
}
function handleClickGreen() {
    // Increment click count
    clickCountGreen++;

    // Update the paragraph with the new click count
    document.getElementById('clickCountGreen').textContent = 'GREEN count: ' + clickCountGreen;
}

//hover functions

function handleHoverCountRed() {
    // Increment The hover count
    hoverCountRed++;

    // Print new hover count for the color
    document.getElementById('hoverCountRed').textContent = 'Hover count: ' + hoverCountRed;
}

function handleHoverCountBlue() {
    // Increment The hover count
    hoverCountBlue++;

    // Print new hover count for the color
    document.getElementById('hoverCountBlue').textContent = 'Hover count: ' + hoverCountBlue;
}

function handleHoverCountGreen() {
    // Increment The hover count
    hoverCountGreen++;

    // Print new hover count for the color
    document.getElementById('hoverCountGreen').textContent = 'Hover count: ' + hoverCountGreen;
}