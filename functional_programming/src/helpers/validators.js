/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {
    all,
    allPass,
    anyPass, compose,
    equals,
    filter,
    gte,
    length,
    not, prop,
    values
} from "ramda";

const getStarColor = prop('star');
const getSquareColor = prop('square');
const getTriangleColor = prop('triangle');
const getCircleColor = prop('circle');

const isWhite = equals('white');
const isRed = equals('red');
const isOrange = equals('orange');
const isGreen = equals('green');
const isBlue = equals('blue');

const isRedStar = compose(isRed, getStarColor);
const isWhiteStar = compose(isWhite, getStarColor);
const isGreenSquare = compose(isGreen, getSquareColor);
const isWhiteSquare = compose(isWhite, getSquareColor);
const isWhiteTriangle = compose(isWhite, getTriangleColor);
const isWhiteCircle = compose(isWhite, getCircleColor);
const isBlueCircle = compose(isBlue, getCircleColor);
const isOrangeSquare = compose(isOrange, getSquareColor);
const isGreenTriangle = compose(isGreen, getTriangleColor);
const isNotRedStar = compose(not, isRedStar);
const isNotWhiteStar = compose(not, isWhiteStar);
const isNotWhiteSquare = compose(not, isWhiteSquare);

const countGreen = compose(length, filter(isGreen), values);
const countRed = compose(length, filter(isRed), values);
const countBlue = compose(length, filter(isBlue), values);
const countOrange = compose(length, filter(isOrange), values);

const isOne = number => equals(number, 1);
const isTwo = number => equals(number, 2);
const isGteTwo = number => gte(number, 2);
const isGteThree = number => gte(number, 3);
const countBlueEqualsCountRed = (obj) => equals(
    countBlue(obj),
    countRed(obj)
);

const allOrange = all(isOrange)
const allGreen = all(isGreen);

const greenGte3 = compose(isGteThree, countGreen);
const redGte3 = compose(isGteThree, countRed);
const blueGte3 = compose(isGteThree, countBlue);
const orangeGte3 = compose(isGteThree, countOrange);
const gte3SameColor = anyPass([
    greenGte3,
    redGte3,
    blueGte3,
    orangeGte3
]);

const atLeastTwoGreen = compose(isGteTwo, countGreen);
const onlyTwoGreen = compose(isTwo, countGreen);
const isOneRed = compose(isOne, countRed);

const squareAndTriangleSameColor = (obj) => equals(getSquareColor(obj), getTriangleColor(obj));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    isRedStar,
    isGreenSquare,
    isWhiteTriangle,
    isWhiteCircle
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = atLeastTwoGreen;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = countBlueEqualsCountRed;

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([
    isBlueCircle,
    isRedStar,
    isOrangeSquare
])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = gte3SameColor;

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([
    isGreenTriangle,
    onlyTwoGreen,
    isOneRed
])

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(allOrange, values);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = allPass([
    isNotWhiteStar,
    isNotRedStar
])

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(allGreen, values);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = allPass([
    isNotWhiteSquare,
    squareAndTriangleSameColor
]);