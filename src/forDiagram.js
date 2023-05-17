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
    let boxPlotChart = anychart.box();
    boxPlotChart.data(numbers);
    boxPlotChart.title("Box plot");
    boxPlotChart.container("container3");
    boxPlotChart.draw();

    // Создание диаграммы Парето
    let paretoChart = anychart.column();
    paretoChart.data(histogramData);
    paretoChart.title("Paretto diagram");
    paretoChart.xAxis().title("Number");
    paretoChart.yAxis().title("Frequency");
    paretoChart.container("container4");
    paretoChart.draw();
    paretoChart.yScale().stackMode("percent");
    paretoChart.yAxis().labels().format("{%Value}{numDecimals:0}%");
    paretoChart.yAxis().title(" Frequency");

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

// Пример использования
let numbers = [1, 2, 3, 2, 1, 3, 3, 4, 5, 4];
createCharts(numbers);
