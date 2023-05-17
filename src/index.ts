(() => {
    let numbers = [
        -0.16, -1.57, -1.06, -4.12, 0.45, -0.49, 2.34, 0.19, 1.06, 2.13, -0.21, 1.19, -0.29, -1.09, 0.03, -0.86, 1.28, 1.58,
        -0.2, 0.55, -0.73, 0.93, -2.39, 1.76, 0.26, -1.12, 1.48, -3.28, -0.33, 1.63, -1.56, -3.03, 2.47, -3.1, -0.67, 0.61,
        1.22, -2.05, -1.42, 3.12, -1.06, -2.63, 1.5, 0.47, 0.72, -0.02, -0.93, -0.33, 0.71, 1.08, -1.35, -0.37, 3.07, -0.28,
        0.77, 1.61, -0.05, -0.71, 1.73, -0.48, -0.38, -1.61, 1.5, -0.33, 0.7, 0.28, -3.27, -3.12, -0.34, -0.86, -1.2, 2.17,
        0, 0.51, 0.31, -0.28, -0.89, -0.86, 3.81, -0.77, -1.11, -2.83, -0.81, 1.27, 0.96, -2.04, 1.21, 2.93, -0.9, 1.43,
        1.88, -0.39, 0.01, -0.51, 0.25, -0.45, 2.43, -1.98, -0.81, -1.36, -0.94, 1.41, -0.59, -0.17, 1.02, 0.2, -2.03,
        -1.78, 1.08, 0.78, -1.4, -1.12, -0.36, -0.08, 1.26, -0.71, -3.22, 0.36, 0.89, 2.12, -0.33, 0.14, -0.32, 0.41, 1.69,
        1.03, 1.25, 2.11, -0.29, 0.73, -0.3, 1.3, 1.84, 2.36, 2.84, 1.35, -0.02, -1.1, -1.82, 3.7, 0.49, -0.57
    ];

    console.log("mean = ", getMean(numbers));
    console.log("median = ", getMedian(numbers));
    console.log("mode = ", getMode(numbers));
    console.log("sampleVariance = ", getSampleVariance(numbers));
    console.log("standardDeviation = ", getStandardDeviation(numbers), "\n");
})();

function getMean(arr: number[]): number {
    let sum = 0;
    for (const num of arr) {
        sum += num;
    }
    return sum/arr.length;
}

function getMedian(arr: number[]): number[] {
    let median: number[] = [];
    arr = arr.sort((a, b) => a - b);
    if(arr.length % 2 === 1) {
        let index = Math.floor(arr.length/2 - 1);
        median.push(arr[index]);
    } else if (arr.length % 2 === 0) {
        let indexes = [arr.length/2 - 1, arr.length/2]
        for (const index of indexes) {
            median.push(arr[index]);
        }
    }
    return median;
}

function getMode(arr: number[]): Map<number, number> {
    let numAndCount = new Map<number, number>();
    arr = arr.sort((a, b) => a - b);
    let num_current: number,
        num_previous: number = arr[0],
        counter: number = 1,
        max_count: number = 0;

    for (let i = 1; i < arr.length; i++) {
        num_current = arr[i];
        if (num_current === num_previous) {
            counter += 1;
        } else {
            if (max_count < counter) {
                max_count = counter;
                numAndCount.clear()
                numAndCount.set(num_previous, counter);
            } else if (max_count === counter) {
                numAndCount.set(num_previous, counter);
            }
            counter = 1;
        }
        num_previous = num_current;
    }

    return numAndCount;
}

function getSampleVariance(arr: number[]): number {
    const n = arr.length;
    const mean = getMean(arr);
    let sum = 0;
    for (const num of arr) {
        sum += Math.pow(num, 2) - n * Math.pow(mean, 2);
    }
    return sum/(n - 1);
}

function getStandardDeviation(arr: number[]): number {
    const sPow2 = getSampleVariance(arr);
    return Math.sqrt(sPow2);
}

function findQuartiles(arr: number[]): number[] {
    arr = arr.sort(function (a, b) { return a - b; });
    const middle = Math.floor(arr.length/2);
    const arrFirstPart = arr.slice(0, middle);
    const arrSecondPart = arr.slice(middle + 1, arr.length - 1);

    return [arr[0], getMedian(arrFirstPart)[0], getMedian(arr)[0], getMedian(arrSecondPart)[0], arr[arr.length - 1]];
}