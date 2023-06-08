
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
    2.1, 5.1, 3.2, 4.4, 3, 6.1, 5.5, 0.1, 9.4, 7, 7.1, 5.7, 4.3, 4.5, 6.9, 7.5, 4.7, 6.7, 2.7, 4.3
];
createCharts(numbers);
