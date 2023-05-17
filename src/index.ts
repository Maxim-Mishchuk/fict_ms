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

function sampleVariance(arr: number[]): number {
    const n = arr.length;
    const mean = getMean(arr);
    let sum = 0;
    for (const num of arr) {
        sum += Math.pow(num, 2) - n * Math.pow(mean, 2);
    }
    return sum/(n - 1);
}

function standardDeviation(arr: number[]): number {
    const sPow2 = sampleVariance(arr);
    return Math.sqrt(sPow2);
}