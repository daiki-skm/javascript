// function elapsedTime(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
//
// async function* clock(interval, max=Infinity) {
//     for(let count = 1; count <= max; count++) {
//         await elapsedTime(interval);
//         yield count;
//     }
// }

function clock(interval, max=Infinity) {
    function until(time) {
        return new Promise(resolve => setTimeout(resolve, time - Date.now()));
    }

    let startTime = Date.now();

    let count = 0;

    return {
        async next() {
            if (++count >= max) {
                return {done: true};
            }

            await until(startTime + count * interval);

            return {value: count};
        },
        [Symbol.asyncIterator]() {
            return this;
        }
    }
}

async function test() {
    for await (let tick of clock(1000, 100)) {
        console.log(tick);
    }
}

test();
