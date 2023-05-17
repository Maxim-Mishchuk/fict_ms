var input = [];
function getMean(arr) {
    var sum = 0;
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var num = arr_1[_i];
        sum += num;
    }
    return sum / arr.length;
}
function getMedian(arr) {
    var median = [];
    arr = arr.sort(function (a, b) { return a - b; });
    if (arr.length % 2 === 1) {
        var index = Math.floor(arr.length / 2 - 1);
        median.push(arr[index]);
    }
    else if (arr.length % 2 === 0) {
        var indexes = [arr.length / 2 - 1, arr.length / 2];
        for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
            var index = indexes_1[_i];
            median.push(arr[index]);
        }
    }
    return median;
}
function getMode(arr) {
    var numAndCount = new Map();
    arr = arr.sort(function (a, b) { return a - b; });
    var num_current, num_previous = arr[0], counter = 1, max_count = 0;
    for (var i = 1; i < arr.length; i++) {
        num_current = arr[i];
        if (num_current === num_previous) {
            counter += 1;
        }
        else {
            if (max_count < counter) {
                numAndCount.clear();
                numAndCount.set(num_previous, counter);
            }
            else if (max_count === counter) {
                numAndCount.set(num_previous, counter);
            }
            counter = 1;
        }
        num_previous = num_current;
    }
    return numAndCount;
}
function sampleVariance(arr) {
    var n = arr.length;
    var mean = getMean(arr);
    var sum = 0;
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var num = arr_2[_i];
        sum += Math.pow(num, 2) - n * Math.pow(mean, 2);
    }
    return sum / (n - 1);
}
function standardDeviation(arr) {
    var sPow2 = sampleVariance(arr);
    return Math.sqrt(sPow2);
}
