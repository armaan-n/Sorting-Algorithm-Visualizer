// Retrieve all input elements
const sizeSlider = document.getElementById('array-size');
const speedSlider = document.getElementById('sort-speed');
const algoSelect = document.getElementById('algo-select');
const randomizeBtn = document.getElementById('randomize');
const sortBtn = document.getElementById('sort');

const barContainer = document.getElementById('bar-container');

const size = sizeSlider.value;

// Number of bars from slider
let barAmt = size;

// Array containing values of bars
let barArray = [];

// Initialize bars
barGen(barAmt);

sortBtn.addEventListener ('click', () => {
    sortBtn.disabled = true;

    switch (algoSelect.options[algoSelect.selectedIndex].text) {
        case 'Quick Sort':
            quickSort(barArray, 0, barArray.length - 1, 100 - speedSlider.value);
            break;
        case 'Merge Sort':
            mergeSort(barArray, 0, barArray.length - 1, 2 * (100 - speedSlider.value), barArray.length - 1);
            break;
        case 'Bubble Sort':
            bubbleSort(barArray,  (100 - speedSlider.value) / 3);
            break;
        case 'Insertion Sort':
            insertionSort(barArray, barArray.length, 100 - speedSlider.value);
            break;
        case 'Selection Sort':
            selectionSort(barArray, barArray.length, 2 * (100 - speedSlider.value));
            break;
        case 'Heap Sort':
            heapSort(barArray, (100 - speedSlider.value) / 2);
            break;
        case 'Bucket Sort':
            bucketSort(barArray, (100 - speedSlider.value) / 2);
            break;
        case 'Radix Sort':
            radixSort(barArray, 100 - speedSlider.value);
            break;
    }
});

randomizeBtn.addEventListener ('click', () => {
    sortBtn.disabled = false;
    barGen(barAmt);
});

function resizeArray() {
    sortBtn.disabled = false;
    barAmt = sizeSlider.value;
    barGen(barAmt);
}

// Generate Bars
function barGen(barAmt) {
    clearBars();

    // Generate random bar values
    for (let i = 0; i < barAmt; i++) {
        const newBar = document.createElement('div');
        newBar.classList.add('bar');

        // Set height based on randomly generated number
        newBar.style.height = getRandomInt(10000) / 100 + '%';

        // Set width to fill container
        newBar.style.width = 100 / barAmt + '%';

        barArray.push(newBar);

        barContainer.appendChild(newBar);
    }
}

// Generate random number between 1 and max (exclusive)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Clear all bars from array and screen
function clearBars() {
    barArray = [];
    barContainer.innerHTML = '';
}