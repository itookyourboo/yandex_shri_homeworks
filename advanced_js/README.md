# ШРИ. Продвинутый JS

## Задание
Написать свой класс, который будет очень похож на ES6 множество:

```javascript
class MySet {
    // реализация
}

// тесты
const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

// хранит только уникальные значения
console.log([...set]); // [ 4, 8, 15, 16, 23, 42 ]

// есть свойство size
console.log(set.size); // 6

// работает в цикле for-of
for (const item of set) {
    console.log(item); // 4 8 15 16 23 42
}

// есть методы keys, values, entries
for (const item of set.entries()) {
    console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
}

// есть метод clear
set.clear();
console.log(set.size); // 0

const object = {
    getValue () { return this.value }
}

const data = {
    value: 42
}

// есть метод add
set.add(object);
set.add(data);

// который может работать в цепочке вызовов
set.add(object).add(object).add(object);

// есть метод delete
set.delete(data);

// есть метод has
console.log(set.has({})); // false
console.log(set.has(object)); // true
console.log(set.has(data)); // false

// и кое-что еще
console.log(set === set.valueOf()) // true
console.log(String(set)) // [object ^_^]
console.log(Object.prototype.toString.call(set)) // [object ^_^]

// есть forEach, который делает какие-то странные вещи...
set.forEach(function (item) {
    console.log(item.getValue.call(this)); // 42
}, data)
```

## Оформление

Решение должно работать на Node.js 16

Задачу решить в отдельном репозитории. Решение положить в папку solution  в файл index.js  и оформить по шаблону:

```javascript
module.exports = class {
// реализация
}
```

В файле с решением запрещено использовать импорты, встроенные классы Set и Map
Алгоритмическая реализация множества может быть любой, как через массив, так и через словарь (объект)

## Реализация

- Множество работает на Array
- При инициализации удаляются все дублирующиеся элементы
- При добавлении элемента проверяется его наличие в списке
- При удалении фильтруем список
- Set.has есть arr.includes
- Set.size есть arr.length
- keys, values, entries вовзращают генератор
