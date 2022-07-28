/**
 * Константа, содержащая ID счётчика и список метрик
 * @type {{metrics: string[], counterId: string}}
 */

const config = {
    counterId: 'f635c068-38b1-11ec-8d3d-0242ac130003',
    metrics: [
        'connect',  // Time to connect
        'ttfb',     // Time to first byte
        'fcp',      // First contentful paint
        'lcp',      // Largest contentful paint
        'fid'       // First input delay
    ],
}

/**
 * Возвращает q-й процентиль
 * @param arr Массив чисел
 * @param q Процентиль
 * @returns {string|number}
 */

function quantile(arr, q) {
    const sorted = arr.sort((a, b) => a - b);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;

    let number;
    if (sorted[base + 1] !== undefined) {
        number = Math.floor(sorted[base] + rest * (sorted[base + 1] - sorted[base]));
    } else {
        number = Math.floor(sorted[base]);
    }

    return Number.isNaN(number) ? '-' : number;
}

/**
 * Возвращает данные с сервера, преобразованные в список с измененной датой
 * @param result Данные с сервера
 * @returns {*}
 */

function prepareData(result) {
    return result.data.map(item => {
        item.date = item.timestamp.split('T')[0];
        return item;
    });
}

/**
 * Генерирует HTML-таблицу со статистикой
 * @param title Заголовок таблицы
 * @param table Объект, содержащий данные таблицы
 */

function generateHtmlTable(title, table) {
    let headers = Object.keys(prepareResult([]));
    headers.unshift("Metric");

    let container = document.getElementById('container');
    let html = `<h2>${title}</h2>`
    html += '<table class="stats-table"><tr>' +
        headers.map((c) => `<th>${c}</th>`).join('') + '</tr>'

    for (let metric in table) {
        let row = [metric, ...Object.values(table[metric])];
        html += '<tr>' +
            row.map((c) => `<td>${c}</td>`).join('') + '</tr>';
    }

    html += '</table>';

    container.innerHTML += html;
}

/**
 * @typedef {Object} Result
 * @property {number} hits Количество данных
 * @property {number} p25 25-й процентиль
 * @property {number} p50 50-й процентиль
 * @property {number} p75 75-й процентиль
 * @property {number} p95 95-й процентиль
 */

/**
 * Готовит строку с квантилями
 * @param data Список чисел
 * @returns {Result}
 */
function prepareResult(data) {
    let result = {};

    result.hits = data.length;
    result.p25 = quantile(data, 0.25);
    result.p50 = quantile(data, 0.5);
    result.p75 = quantile(data, 0.75);
    result.p95 = quantile(data, 0.95);

    return result;
}

// получение статистики по метрике

/**
 * Получение статистики по заданным параметрам
 * @param data Данные
 * @param page Страница
 * @param name Название метрики
 * @param date1 [Начальная] Дата
 * @param {string|undefined} date2 [Конечная дата]
 * @returns {Result}
 */

function getMetricByDate(data, page, name, date1, date2) {
    if (typeof date2 === "undefined")
        date2 = date1;

    let sampleData = data
        .filter(item => item.page === page && item.name === name && item.date >= date1 && item.date <= date2)
        .map(item => item.value);

    return prepareResult(sampleData)
}

// формирует таблицу с метриками

/**
 * Формирует таблицу с метриками
 * @param data Данные
 * @param page Страница
 * @param date1 [Начальная] Дата
 * @param {string|undefined} date2 [Конечная дата]
 * @returns {{}}
 */

function getMetricsTable(data, page, date1, date2) {
    let table = {};

    config.metrics.forEach(metric => {
        table[metric] = getMetricByDate(data, page, metric, date1, date2)
    });

    return table;
}

/**
 * Рассчитывает все метрики за день
 * @param data Данные
 * @param page Страница
 * @param date Дата
 */

function calcMetricsByDate(data, page, date) {
    console.log(`All metrics for ${date}:`);

    let table = getMetricsTable(data, page, date);
    generateHtmlTable(`All metrics for ${date}`, table);
    console.table(table);
}

/**
 * Рассчитывает все метрики за период
 * @param data Данные
 * @param page Страница
 * @param start Начальная дата
 * @param end Конечная дата
 */

function calcMetricsByPeriod(data, page, start, end) {
    console.log(`All metrics from ${start} to ${end}:`);

    let table = getMetricsTable(data, page, start, end);
    generateHtmlTable(`All metrics from ${start} to ${end}:`, table);
    console.table(table);
}

/**
 * Сравнение выбранных метрик по двум датам
 * @param data Данные
 * @param page Страница
 * @param {Array<string>} metricsToCompare Массив метрик
 * @param date1 Первая дата
 * @param date2 Вторая дата
 */

function compareMetricsByDates(data, page, metricsToCompare, date1, date2) {
    metricsToCompare = metricsToCompare
        .filter((metric) => config.metrics.indexOf(metric) !== -1);
    console.log(`Comparing ${metricsToCompare.join(", ")} metrics: ${date1} with ${date2}`);

    let table = {}

    metricsToCompare.forEach((metric) => {
        table[`[${date1}] ${metric}`] = getMetricByDate(data, page, metric, date1);
        table[`[${date2}] ${metric}`] = getMetricByDate(data, page, metric, date2);
    });

    generateHtmlTable(`Comparing ${metricsToCompare.join(", ")} metrics: ${date1} with ${date2}`, table);
    console.table(table);
}

/**
 * Сравнение выбранных метрик по двум периодам
 * @param data Данные
 * @param page Страница
 * @param {Array<string>} metricsToCompare Массив метрик
 * @param dateStart1 Начало первого периода
 * @param dateEnd1 Конец первого периода
 * @param dateStart2 Начало второго периода
 * @param dateEnd2 Конец второго периода
 */

function compareMetricsByPeriods(data, page, metricsToCompare, dateStart1, dateEnd1, dateStart2, dateEnd2) {
    metricsToCompare = metricsToCompare
        .filter((metric) => config.metrics.indexOf(metric) !== -1);
    console.log(`Comparing ${metricsToCompare.join(", ")} metrics: [${dateStart1}; ${dateEnd1}] with [${dateStart2}; ${dateEnd2}]`);

    let table = {}

    metricsToCompare.forEach((metric) => {
        table[`[${dateStart1}] ${metric} [${dateEnd1}]`] = getMetricByDate(data, page, metric, dateStart1, dateEnd1);
        table[`[${dateStart2}] ${metric} [${dateEnd2}]`] = getMetricByDate(data, page, metric, dateStart2, dateEnd2);
    });

    generateHtmlTable(`Comparing ${metricsToCompare.join(", ")} metrics: [${dateStart1}; ${dateEnd1}] with [${dateStart2}; ${dateEnd2}]`, table);
    console.table(table);
}

fetch(`https://shri.yandex/hw/stat/data?counterId=${config.counterId}`)
    .then(res => res.json())
    .then(result => {
        let data = prepareData(result);

        calcMetricsByDate(data, 'send.html', '2021-10-29');
        calcMetricsByPeriod(data, 'send.html', '2021-10-29', '2021-10-30');
        compareMetricsByDates(data, 'send.html', ['fcp', 'lcp'],
            '2021-10-29', '2021-10-30')
        compareMetricsByPeriods(data, 'send.html', ['connect', 'ttfb'],
            '2021-10-28', '2021-10-29', '2021-10-30', '2021-10-31')
    });
