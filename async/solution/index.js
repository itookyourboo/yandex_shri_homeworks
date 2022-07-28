module.exports = function(Homework) {
    return (array, fn, initialValue, cb) => {
        new Promise(resolve => {
            array.length(len => resolve(len));
        }).then(len => {
            return new Promise(resultResolve => {
                let endLoop = false;
                (function loop(index) {
                    if (endLoop)
                        return;

                    new Promise(resolve => {
                        Homework.less(index, len, (cond) => resolve(cond))
                    }).then(ifLess => {
                        if (!ifLess) {
                            endLoop = true;
                            resultResolve(initialValue);
                        }
                        return new Promise(resolve => {
                            array.get(index, (elem) => resolve(elem));
                        });
                    }).then(elem => {
                        return new Promise(resolve => {
                            fn(initialValue, elem, index, array, (res) => resolve(res));
                        })
                    }).then(res => {
                        initialValue = res;
                        return new Promise(resolve => {
                            Homework.add(index, 1, (nextIndex) => resolve(nextIndex));
                        });
                    }).then(nextIndex => {
                        loop(nextIndex);
                    });
                })(0);
            });
        }).then(result => cb(result));
    }
}