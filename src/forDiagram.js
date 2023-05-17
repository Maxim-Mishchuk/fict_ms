function createCharts(numbers) {
    let frequency = {};

    // Подсчет частот
    for (let i = 0; i < numbers.length; i++) {
        let num = numbers[i];
        if (frequency[num]) {
            frequency[num] += 1;
        } else {
            frequency[num] = 1;
        }
    }

    // Подготовка данных для гистограммы
    let histogramData = [];
    for (let num in frequency) {
        let count = frequency[num];
        histogramData.push({ x: num, value: count });
    }

    // Подготовка данных для полигона
    let polygonData = [];
    for (let num in frequency) {
        let count = frequency[num];
        polygonData.push([num, count]);
    }

    // Создание гистограммы
    let histogramChart = anychart.column();
    histogramChart.data(histogramData);
    histogramChart.title("Gisto");
    histogramChart.xAxis().title("Number");
    histogramChart.yAxis().title("Frequency ");
    histogramChart.container("container1");
    histogramChart.draw();

    // Создание полигона
    let polygonChart = anychart.line();
    polygonChart.data(polygonData);
    polygonChart.title("Polygon");
    polygonChart.xAxis().title("Number");
    polygonChart.yAxis().title("Frequency");
    polygonChart.container("container2");
    polygonChart.draw();

    // Создание диаграммы размаха



    let dataForBox=[{low: findQuartiles(numbers)[0],
        q1:findQuartiles(numbers)[1],
        median:findQuartiles(numbers)[2],
        q3:findQuartiles(numbers)[3],
        high:findQuartiles(numbers)[4]}]



    chart = anychart.box();


    series = chart.box(dataForBox);


    chart.container("container3");


    chart.draw();
    // Создание диаграммы Парето

    var chart = anychart.pareto();

    chart.data(numbers);
    chart.title('Pareto');
    chart.yAxis(0).title('Number');
    chart.yAxis(1).title(' percentage');

    chart.container('container4');

    chart.draw();

    // Создание круговой диаграммы
    let pieChart = anychart.pie();
    pieChart.data(histogramData);
    pieChart.title("Pie diagram");
    pieChart.container("container4");
    pieChart.draw();
}

function findQuartiles(arr) {
    arr = arr.sort();
    const middle = Math.floor(arr.length/2);
    const arrFirstPart = arr.slice(0, middle);
    const arrSecondPart = arr.slice(middle + 1, arr.length - 1);

    return [arr[0], getMedian(arrFirstPart)[0], getMedian(arr)[0], getMedian(arrSecondPart)[0], arr[arr.length - 1]];
}
function getMedian(arr) {
    var median = [];
    arr = arr.sort(function(a, b) {
        return a - b;
    });
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
// Пример использования
let numbers = [1, 2, 3, 2, 1, 3, 3, 4, 5, 4,22,31,21,32,3,2,3];
createCharts(numbers);
