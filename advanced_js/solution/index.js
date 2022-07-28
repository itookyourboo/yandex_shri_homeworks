class MySet {
    #name = '^_^'
    #arr = []

    constructor(arr) {
        this.#arr = arr.filter((item, pos) => arr.indexOf(item) === pos);
    }

    clear() {
        this.#arr = [];
    }

    add(item) {
        if (!this.#arr.includes(item))
            this.#arr.push(item);

        return this;
    }

    delete(item) {
        this.#arr = this.#arr.filter(elem => elem !== item);
    }

    has(item) {
        return this.#arr.includes(item);
    }

    get size() {
        return this.#arr.length;
    }

    *values() {
        for (let item of this.#arr) {
            yield item;
        }
    }

    *keys() {
        yield* this.values();
    }

    *entries() {
        for (let item of this.#arr) {
            yield [item, item];
        }
    }

    *[Symbol.iterator]() {
        yield* this.values();
    }

    forEach(callback, data) {
        for (let elem of this.#arr) {
            callback.bind(data)(elem);
        }
    }

    get [Symbol.toStringTag]() {
        return this.#name;
    }
}

// export default MySet;
module.exports = MySet