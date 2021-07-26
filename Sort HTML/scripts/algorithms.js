const POINTER_COLOUR = '#03a1fc';
const LIGHT_GREEN = '#8aff80';

// Quick sort
async function quickSort(arr, low, high, ms) {
    if (low < high) {
        let pivot_index = await partition(arr, low, high, ms);

        await Promise.all([
            // Sort everything before the index
            quickSort(arr, low, pivot_index - 1, ms),

            // Sort everything after the index
            quickSort(arr, pivot_index + 1, high, ms)
        ]);
    }
}

// Partition for quick sort
async function partition(arr, low, high, ms) {

    // pivot is right most elem
    let pivot = arr[high].offsetHeight;  

    // small index
    let i = (low - 1);  

    for(let i = low; i <= high; i++) {
        arr[i].style.backgroundColor = 'white';
    }

    arr[high].style.backgroundColor = POINTER_COLOUR;

    for (let j = low; j <= high-1; j++) {

        // If element is smaller than pivot, swap w/pivot
        if (arr[j].offsetHeight < pivot) {
            i++;  

            await swap(arr[i], arr[j], ms);
        }
    }

    await swap(arr[i + 1], arr[high], ms);

    for(let i = low; i <= high; i++) {
        arr[i].style.backgroundColor = LIGHT_GREEN;
    }

    return (i + 1);
}

// Bubble sort
async function bubbleSort(arr, ms) {
    for (let i = 1; i <= arr.length; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j].offsetHeight > arr[j + 1].offsetHeight) {
                await swap(arr[j], arr[j+1], ms);
            }

            arr[j + 1].style.backgroundColor = POINTER_COLOUR;
            arr[j].style.backgroundColor = 'white';
        }

        arr[barArray.length - i].style.backgroundColor = LIGHT_GREEN;
    }
}

// Merge sort
async function mergeSort(arr, l, r, ms, trueLen){

    // Break recursion when left pointer reacher right
    if(l >= r){
        return;
    }

    // Get midddle index
    var m = l + parseInt((r - l) / 2);
    
    await Promise.all([
        mergeSort(arr, l, m, ms, trueLen),
        mergeSort(arr, m+1, r, ms, trueLen)
    ]);

    await merge(arr, l, m, r, ms, trueLen);
}

async function merge(arr, l, m, r, ms, trueLen) {
    var n1 = m - l + 1;
    var n2 = r - m;

    var L = new Array(n1);
    var R = new Array(n2);
 
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++) {
        L[i] = arr[l + i].offsetHeight;
    }
        

    for (var j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j].offsetHeight;
    }
        
    var i = 0;
    var j = 0;
    var k = l;
 
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k].style.height = L[i] + 'px';
            i++;
        } else {
            arr[k].style.height = R[j] + 'px';
            j++;
        }

        if(l == 0 && r == trueLen) {
            await sleep(ms);
            arr[k].style.backgroundColor = LIGHT_GREEN;
        } else {
            await colorOnOff(arr[k], POINTER_COLOUR, ms);
        }

        k++;
    }

    while (i < n1) {  
        arr[k].style.height = L[i] + 'px';

        if(l == 0 && r == trueLen) {
            await sleep(ms);
            arr[k].style.backgroundColor = LIGHT_GREEN;
        } else {
            await colorOnOff(arr[k], POINTER_COLOUR, ms);
        }

        i++;
        k++;
    }

    while (j < n2) {
        arr[k].style.height = R[j] + 'px';
        
        if(l == 0 && r == trueLen) {
            await sleep(ms);
            arr[k].style.backgroundColor = LIGHT_GREEN;
        } else {
            await colorOnOff(arr[k], POINTER_COLOUR, ms);
        }

        j++;
        k++;
    }
}

async function insertionSort(arr, n, ms) { 
    let i; 
    let key;
    let j; 

    for (i = 1; i < n; i++) { 
        key = arr[i].offsetHeight; 
        j = i - 1; 

        while (j >= 0 && arr[j].offsetHeight > key) { 
            arr[j + 1].style.height = arr[j].offsetHeight + "px";
            j = j - 1; 
            
            await colorOnOff(arr[j + 2], POINTER_COLOUR, ms);
        } 

        await sleep(ms);
        arr[j + 1].style.height = key + "px"; 
    }

    for (const bar of arr){
        await sleep(ms);
        bar.style.backgroundColor = LIGHT_GREEN;
    }
}

async function selectionSort(arr, n, ms) {
    let i;
    let j; 
    let min_idx;
 
    for (i = 0; i < n-1; i++) {
        min_idx = i;

        for (j = i + 1; j < n; j++) {
            if (arr[j].offsetHeight < arr[min_idx].offsetHeight) {
                min_idx = j;
                arr[min_idx].style.backgroundColor = POINTER_COLOUR;
                await sleep(ms);
                arr[min_idx].style.backgroundColor = 'white';
            }
        }
 
        // Swap the found minimum element with the first element
        arr[i].style.backgroundColor = LIGHT_GREEN;
        await swap(arr[min_idx], arr[i], ms);
    }

    arr[n - 1].style.backgroundColor = LIGHT_GREEN;
}
 
async function heapSort(arr, ms) {
    var n = arr.length;

    // Build heap (rearrange array)
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i, ms);
    }
        

    // One by one extract an element from heap
    for (var i = n - 1; i > 0; i--) {
        // Move current root to end
        await swap(arr[i], arr[0], ms);

        arr[i].style.backgroundColor = LIGHT_GREEN;

        // call max heapify on the reduced heap
        await heapify(arr, i, 0, ms);
    }

    arr[0].style.backgroundColor = LIGHT_GREEN;
}

async function heapify(arr, n, i, ms) {
    // Initialize largest as root
    var largest = i; 
    var l = 2 * i + 1; 
    var r = 2 * i + 2; 

    // If left child is larger than root
    if (l < n && arr[l].offsetHeight > arr[largest].offsetHeight) {
        largest = l;

        await colorOnOff(arr[largest], POINTER_COLOUR, ms);
    }

    // If right child is larger than largest so far
    if (r < n && arr[r].offsetHeight > arr[largest].offsetHeight) {
        arr[largest].style.backgroundColor = 'white';

        largest = r;
        await colorOnOff(arr[largest], POINTER_COLOUR, ms);
    }
        

    // If largest is not root
    if (largest != i) {
        await swap(arr[i], arr[largest], ms);
        await colorOnOff(arr[i], POINTER_COLOUR, ms);

        // Recursively heapify the affected sub-tree
        await heapify(arr, n, largest, ms);
    }
}

async function bucketSort(arr, ms) {
    for(let i = 1; i < arr.length; i++) {
        let key = arr[i].offsetHeight;
 
        let j = i - 1;

        while (j >= 0 && key < arr[j].offsetHeight) {
            await colorOnOff(arr[j + 1], POINTER_COLOUR, ms);
            arr[j + 1].style.height = arr[j].offsetHeight + 'px';
            j = j - 1;
        }

        await colorOnOff(arr[j + 1], POINTER_COLOUR, ms);
        arr[j + 1].style.height = key + 'px';
        
    }

    for(let i = 0; i < arr.length; i++) {
        await sleep(ms);
        arr[i].style.backgroundColor = LIGHT_GREEN;
    }
}
 
async function radixSort(arr, ms) {
    let max1 = Math.max.apply(Math, arr.map(x => x.offsetHeight));

    let exp = 1;

    while (max1 / exp > 0) {
        let index = await countingSort(arr, exp, ms);
        if (index > 0 && index < 1) {
            for (let i = 0; i < arr.length; i++) {
                await sleep(ms);
                arr[i].style.backgroundColor = LIGHT_GREEN;
            }
            break;
        }
        exp *= 10;
    }
}

async function countingSort(arr, exp1, ms){
    let n = arr.length;
 
    let output = [];
    let count = []

    for (let i = 0; i < n; i++) {
        output.push(0);
    }

    for (let i = 0; i < 10; i++) {
        count.push(0);
    }
 
    for (let i = 0; i < n; i++) {
        let index = (arr[i].offsetHeight / exp1);
        count[Math.floor(index % 10)] += 1;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    let i = n - 1;

    while (i >= 0) {
        index = (arr[i].offsetHeight / exp1);
        output[count[Math.floor(index % 10)] - 1] = arr[i].offsetHeight;
        count[Math.floor(index % 10)] -= 1;
        i -= 1;
    }
        
    i = 0

    for (let i = 0; i < arr.length; i++) {
        await colorOnOff(arr[i], POINTER_COLOUR, ms);
        arr[i].style.height = output[i] + 'px';
    }   

    return index;

}

async function swap(bar1, bar2, ms) {
    await sleep(ms);
    let temp = bar1.offsetHeight;

    bar1.style.height = bar2.offsetHeight + 'px';
    bar2.style.height = temp + 'px';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function colorOnOff(bar, color, ms) {
    bar.style.backgroundColor = color;
    await sleep(ms);
    bar.style.backgroundColor = 'white';
}