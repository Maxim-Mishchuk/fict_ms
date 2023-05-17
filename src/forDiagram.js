function createHistogramAndPolygon(numbers) {
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

    // Создание гистограммы и полигона с использованием AnyChart
    anychart.onDocumentReady(function() {
        // Создание гистограммы
        let histogramChart = anychart.column();
        histogramChart.data(histogramData);
        histogramChart.title("Gisto");
        histogramChart.xAxis().title("Number");
        histogramChart.yAxis().title("Frequency");
        histogramChart.container("container");
        histogramChart.draw();

        // Создание полигона
        let polygonChart = anychart.line();
        polygonChart.data(polygonData);
        polygonChart.title("Polygon");
        polygonChart.xAxis().title("Number");
        polygonChart.yAxis().title("Frequency");
        polygonChart.container("container");
        polygonChart.draw();
    });
}

// Пример использования
let numbers = [1, 2, 3, 2, 1, 3, 3, 4, 5, 4];
createHistogramAndPolygon(numbers);
