
function createCharts(numbers) {
    let frequency = {};

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
    -0.16, -1.57, -1.06, -4.12, 0.45, -0.49, 2.34, 0.19, 1.06, 2.13, -0.21, 1.19, -0.29, -1.09, 0.03, -0.86, 1.28, 1.58,
    -0.2, 0.55, -0.73, 0.93, -2.39, 1.76, 0.26, -1.12, 1.48, -3.28, -0.33, 1.63, -1.56, -3.03, 2.47, -3.1, -0.67, 0.61,
    1.22, -2.05, -1.42, 3.12, -1.06, -2.63, 1.5, 0.47, 0.72, -0.02, -0.93, -0.33, 0.71, 1.08, -1.35, -0.37, 3.07, -0.28,
    0.77, 1.61, -0.05, -0.71, 1.73, -0.48, -0.38, -1.61, 1.5, -0.33, 0.7, 0.28, -3.27, -3.12, -0.34, -0.86, -1.2, 2.17,
    0, 0.51, 0.31, -0.28, -0.89, -0.86, 3.81, -0.77, -1.11, -2.83, -0.81, 1.27, 0.96, -2.04, 1.21, 2.93, -0.9, 1.43,
    1.88, -0.39, 0.01, -0.51, 0.25, -0.45, 2.43, -1.98, -0.81, -1.36, -0.94, 1.41, -0.59, -0.17, 1.02, 0.2, -2.03,
    -1.78, 1.08, 0.78, -1.4, -1.12, -0.36, -0.08, 1.26, -0.71, -3.22, 0.36, 0.89, 2.12, -0.33, 0.14, -0.32, 0.41, 1.69,
    1.03, 1.25, 2.11, -0.29, 0.73, -0.3, 1.3, 1.84, 2.36, 2.84, 1.35, -0.02, -1.1, -1.82, 3.7, 0.49, -0.57
];
createCharts(numbers);
