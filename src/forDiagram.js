function createHistogram(numbers) {
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
    let data = [];
    for (let num in frequency) {
        let count = frequency[num];
        data.push({ x: num, value: count });
    }

    // Создание гистограммы с использованием AnyChart
    anychart.onDocumentReady(function() {
        // Создание гистограммы
        let chart = anychart.column();

        // Загрузка данных в гистограмму
        chart.data(data);

        // Настройка осей и заголовков
        chart.title("Gisto");
        chart.xAxis().title("Number");
        chart.yAxis().title("Freqency");

        // Отображение гистограммы на странице
        chart.container("container");
        chart.draw();
    });
}

// Пример использования
let numbers = [1, 2, 2, 3,3,3, 4,4, 5];
createHistogram(numbers);

