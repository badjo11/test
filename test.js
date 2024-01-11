function serialize(arr) {
    const serializedStr = arr.join(',');

    // Компрессия повторяющихся символов
    let compressedStr = '';
    let count = 1;

    for (let i = 1; i < serializedStr.length; i++) {
        if (serializedStr[i] === serializedStr[i - 1]) {
            count++;
        } else {
            compressedStr += serializedStr[i - 1];
            if (count > 1) {
                compressedStr += count;
            }
            count = 1;
        }
    }

    // Обработка последнего символа и его повторений
    compressedStr += serializedStr.charAt(serializedStr.length - 1);
    if (count > 1) {
        compressedStr += count;
    }

    return compressedStr;
}

function deserialize(s) {
    const arr = [];
    let i = 0;

    while (i < s.length) {
        let num = '';

        // Извлечение количества повторений
        while (i < s.length && /\d/.test(s[i])) {
            num += s[i];
            i++;
        }

        // Добавление числа в массив, учитывая повторения
        if (num) {
            arr.push(...Array.from({ length: parseInt(num, 10) }, () => parseInt(s[i - 1], 10)));
        } else {
            arr.push(parseInt(s[i], 10));
        }

        i++;
    }

    return arr;
}

// Тесты
const tests = [
    [1, 2, 3, 4, 5],
    [10, 20, 30, 40, 50],
    Array.from({ length: 100 }, (_, i) => i + 1),
    Array.from({ length: 500 }, (_, i) => i + 1),
    Array.from({ length: 1000 }, (_, i) => i + 1),
    Array(100).fill(1),
    [11, 22, 33, 44, 55],
    [111, 222, 333],
    Array.from({ length: 900 }, (_, i) => i % 3 + 1),
];

tests.forEach(test => {
    const serialized = serialize(test);
    const deserialized = deserialize(serialized);
    const compressionRatio = serialized.length / test.toString().length;

    console.log("Original:", test);
    console.log("Serialized:", serialized);
    console.log("Deserialized:", deserialized);
    console.log("Compression Ratio:", compressionRatio);
    console.log();
});

const additionalTests = [
    [42, 42, 42, 42, 42],
    [1, 2, 1, 2, 1, 2, 1, 2],
    Array.from({ length: 50 }, (_, i) => i % 2 === 0 ? 1 : 2),
    Array.from({ length: 200 }, (_, i) => i % 4 + 1),
    Array.from({ length: 700 }, (_, i) => Math.floor(i / 100) + 1),
    Array.from({ length: 300 }, (_, i) => i % 3 + 1),
    Array.from({ length: 150 }, (_, i) => Math.floor(i / 10) + 1),
    Array.from({ length: 1000 }, (_, i) => i % 5 + 1),
];

console.log("Дополнительные тесты:");

additionalTests.forEach(test => {
    const serialized = serialize(test);
    const deserialized = deserialize(serialized);
    const compressionRatio = serialized.length / test.toString().length;

    console.log("Original:", test);
    console.log("Serialized:", serialized);
    console.log("Deserialized:", deserialized);
    console.log("Compression Ratio:", compressionRatio);
    console.log();
});