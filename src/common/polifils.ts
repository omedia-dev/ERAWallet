// source https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
if (!String.prototype.codePointAt) {
    (function () {
        "use strict"; // необходимо для поддержки методов `apply`/`call` с `undefined`/`null`
        const codePointAt = function (position: number): number | undefined {
            if (this == null) {
                throw TypeError();
            }
            const string = String(this);
            const size = string.length;
            // `ToInteger`
            let index = position ? Number(position) : 0;
            if (index != index) { // лучше, чем `isNaN`
                index = 0;
            }
            // Проверяем выход индекса за границы строки
            if (index < 0 || index >= size) {
                return undefined;
            }
            // Получаем первое кодовое значение
            const first = string.charCodeAt(index);
            let second;
            if ( // проверяем, не начинает ли оно суррогатную пару
            first >= 0xD800 && first <= 0xDBFF && // старшая часть суррогатной пары
            size > index + 1 // следующее кодовое значение
            ) {
                second = string.charCodeAt(index + 1);
                if (second >= 0xDC00 && second <= 0xDFFF) { // младшая часть суррогатной пары
                    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                    return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                }
            }
            return first;
        };
        if (Object.defineProperty) {
            Object.defineProperty(String.prototype, "codePointAt", {
                "value": codePointAt,
                "configurable": true,
                "writable": true
            });
        } else {
            String.prototype.codePointAt = codePointAt;
        }
    }());
}

// source https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
/*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
if (!String.fromCodePoint) {
    (function () {
        let stringFromCharCode = String.fromCharCode;
        let floor = Math.floor;
        let fromCodePoint = function () {
            let MAX_SIZE = 0x4000;
            let codeUnits = [];
            let highSurrogate;
            let lowSurrogate;
            let index = -1;
            let length = arguments.length;
            if (!length) {
                return "";
            }
            let result = "";
            while (++index < length) {
                let codePoint = Number(arguments[index]);
                if (
                    !isFinite(codePoint) ||       // `NaN`, `+Infinity` или `-Infinity`
                    codePoint < 0 ||              // неверная кодовая точка Юникода
                    codePoint > 0x10FFFF ||       // неверная кодовая точка Юникода
                    floor(codePoint) != codePoint // не целое число
                ) {
                    throw RangeError("Invalid code point: " + codePoint);
                }
                if (codePoint <= 0xFFFF) { // кодовая точка Базовой многоязыковой плоскости (БМП)
                    codeUnits.push(codePoint);
                } else { // Астральная кодовая точка; делим её на суррогатную пару
                    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                    codePoint -= 0x10000;
                    highSurrogate = (codePoint >> 10) + 0xD800;
                    lowSurrogate = (codePoint % 0x400) + 0xDC00;
                    codeUnits.push(highSurrogate, lowSurrogate);
                }
                if (index + 1 == length || codeUnits.length > MAX_SIZE) {
                    result += stringFromCharCode.apply(null, codeUnits);
                    codeUnits.length = 0;
                }
            }
            return result;
        };
        Object.defineProperty(String, "fromCodePoint", {
            "value": fromCodePoint,
            "configurable": true,
            "writable": true
        });
    }());
}

// source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice
if (!Int8Array.prototype.slice) {
    Object.defineProperty(Int8Array.prototype, "slice", {
        value: Array.prototype.slice
    });
}
if (!Uint8Array.prototype.slice) {
    Object.defineProperty(Uint8Array.prototype, "slice", {
        value: Array.prototype.slice
    });
}
