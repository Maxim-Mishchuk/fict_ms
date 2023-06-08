(() => {
    let numbers = [
        8.08, 11.11, 9.22, 8.05, 8.42, 9.93, 9.19, 10.3, 9.81, 8.78, 9.55, 9.07, 10.37, 8.37, 9.56, 13.39, 11.46, 11.51,
        10.53, 8.33, 10.84, 7.53, 8.08, 11.66, 7.96, 10.24, 11.24, 7.48, 10.6, 8.37, 12.06, 9.53, 10.3, 9.19, 9.63, 11.22,
        10.61, 12.43, 8.66, 14.44, 9.46, 7.43, 10.33, 8.73, 13.06, 15.81, 11.62, 7.3, 9.62, 9.33, 7.95, 11.37, 10.97, 7.88,
        9.61, 9.6, 10.34, 9.78, 9.06, 12.64, 10.58, 8.46, 10.63, 10.76, 8.14, 8.49, 9.87, 11.15, 10.63, 9.63, 9.77, 10.67,
        9.73, 12.73, 9.89, 9.79, 8.29, 8.18, 10.02, 11.81, 6.09, 8.21, 12.74, 9.39, 5.29, 10.62, 11.36, 9.85, 8.06, 8.52,
        6.56, 13.35, 9.58, 9.11, 10.58, 10.29, 13.02, 10.55, 9.01, 8.53, 10.49, 9.6, 9.76, 10.98, 9.12, 9.96, 9.95, 10.19,
        6.9, 6.89, 9.14, 9.8, 8.61, 7.35, 10.48, 9.95, 7.78, 10.58, 8.45, 8.59, 13.59, 9.07, 9.19, 9.52, 9.8, 8.5, 8.98,
        11, 8.4, 12.12, 10.16, 10.34, 9.05, 7.67, 11.02, 10.17, 10.98, 7.21, 10.88, 8.41, 12.92, 11.93
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
        sum += Math.pow(num - mean, 2);
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