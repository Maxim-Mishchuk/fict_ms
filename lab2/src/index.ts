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

    console.log("μ = ", getMean(numbers));
    console.log("σ = ", getStandardDeviation(numbers), "\n");

    const results1 = formula1(numbers);
    console.log(`${results1[0]} <= μ <= ${results1[1]}`);

    const results2 = formula2(numbers);
    console.log(`${results2[0]} <= σ <= ${results2[1]}`)
})();

function getMean(arr: number[]): number {
    let sum = 0;
    for (const num of arr) {
        sum += num;
    }
    return sum/arr.length;
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

function formula1(arr: number[]) {
    const arr_mean = getMean(arr);
    const arr_sd = getStandardDeviation(arr);
    const arr_n = arr.length;
    const t = 1.97999;

    return [arr_mean - t * arr_sd / Math.sqrt(arr_n), arr_mean + t * arr_sd / Math.sqrt(arr_n)];
}

function formula2(arr: number[]) {
    const arr_sv = getSampleVariance(arr);
    const arr_n = arr.length;
    const x_1 = 176;
    const x_2 = 111;

    return [Math.sqrt((arr_n - 1) * arr_sv / x_1), Math.sqrt((arr_n - 1) * arr_sv / x_2)];
}

function randomElementsFromArray(arr: number[], count: number) {
    const arr_selection: number[] = [];
    const set_indexes: Set<number> = new Set<number>();
    while (count > 0) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        if (set_indexes.has(randomIndex)) {
            continue;
        }
        set_indexes.add(randomIndex);
        arr_selection.push(arr[randomIndex]);
        count--;
    }
}
