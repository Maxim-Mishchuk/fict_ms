
function createCharts(numbers) {
    let frequency = {};
    numbers = numbers.sort(function (a, b) { return a - b })

    // Підрахунок частот
    for (let i = 0; i < numbers.length; i++) {
        let num = numbers[i];
        if (frequency[num]) {
            frequency[num] += 1;
        } else {
            frequency[num] = 1;
        }
    }

    // Підготовка даних для гістограми
    let histogramData = [];
    for (let num in frequency) {
        let count = frequency[num];
        histogramData.push({ x: num, value: count });
    }

    // Підготовка даних для полігону
    let polygonData = [];
    for (let num in frequency) {
        let count = frequency[num];
        polygonData.push([num, count]);
    }

    // Створення гістограми
    let histogramChart = anychart.column();
    histogramChart.data(histogramData);
    histogramChart.title("Gisto");
    histogramChart.xAxis().title("Number");
    histogramChart.yAxis().title("Frequency ");
    histogramChart.container("container1");
    histogramChart.draw();

    // Створення полігону
    let polygonChart = anychart.line();
    polygonChart.data(polygonData);
    polygonChart.title("Polygon");
    polygonChart.xAxis().title("Number");
    polygonChart.yAxis().title("Frequency");
    polygonChart.container("container2");
    polygonChart.draw();

    //Створення діаграми розмаху
    let quartiles = findQuartiles(numbers);
    console.log(quartiles)
    let dataForBox=[{
        low: quartiles[0],
        q1: quartiles[1],
        median: quartiles[2],
        q3: quartiles[3],
        high: quartiles[4]
    }]

    chart = anychart.box();
    series = chart.box(dataForBox);
    chart.container("container3");
    chart.draw();

    // Створення діаграми Парето
    var chart = anychart.pareto();

    chart.data(numbers);
    chart.title('Pareto');
    chart.yAxis(0).title('Number');
    chart.yAxis(1).title(' percentage');
    chart.container('container4');
    chart.draw();

    // Створення колової даіграми
    let pieChart = anychart.pie();
    pieChart.data(histogramData);
    pieChart.title("Pie diagram");
    pieChart.container("container4");
    pieChart.draw();
}


// Приклад використання
let numbers = [
    8.08, 11.11, 9.22, 8.05, 8.42, 9.93, 9.19, 10.3, 9.81, 8.78, 9.55, 9.07, 10.37, 8.37, 9.56, 13.39, 11.46, 11.51,
    10.53, 8.33, 10.84, 7.53, 8.08, 11.66, 7.96, 10.24, 11.24, 7.48, 10.6, 8.37, 12.06, 9.53, 10.3, 9.19, 9.63, 11.22,
    10.61, 12.43, 8.66, 14.44, 9.46, 7.43, 10.33, 8.73, 13.06, 15.81, 11.62, 7.3, 9.62, 9.33, 7.95, 11.37, 10.97, 7.88,
    9.61, 9.6, 10.34, 9.78, 9.06, 12.64, 10.58, 8.46, 10.63, 10.76, 8.14, 8.49, 9.87, 11.15, 10.63, 9.63, 9.77, 10.67,
    9.73, 12.73, 9.89, 9.79, 8.29, 8.18, 10.02, 11.81, 6.09, 8.21, 12.74, 9.39, 5.29, 10.62, 11.36, 9.85, 8.06, 8.52,
    6.56, 13.35, 9.58, 9.11, 10.58, 10.29, 13.02, 10.55, 9.01, 8.53, 10.49, 9.6, 9.76, 10.98, 9.12, 9.96, 9.95, 10.19,
    6.9, 6.89, 9.14, 9.8, 8.61, 7.35, 10.48, 9.95, 7.78, 10.58, 8.45, 8.59, 13.59, 9.07, 9.19, 9.52, 9.8, 8.5, 8.98,
    11.01, 8.4, 12.12, 10.16, 10.34, 9.05, 7.67, 11.02, 10.17, 10.98, 7.21, 10.88, 8.41, 12.92, 11.93
];
createCharts(numbers);
