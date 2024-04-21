import {encoded, translations} from './data.js'
function decodeFields(encoded, translations) {
    const decoded = [];
    const uniqueIds = new Set();

    for (const item of encoded) {
        const decodedItem = {};
        for (const key in item) {
            if (key.endsWith('Id') && key !== 'groupId' && key !== 'service' && key !== 'formatSize' && key !== 'ca') {
                uniqueIds.add(item[key]);
                decodedItem[key] = translations[item[key]] || item[key];
            } else {
                decodedItem[key] = item[key];
            }
        }
        decoded.push(decodedItem);
    }

    const uniqueIdsList = Array.from(uniqueIds);
    return { decoded, uniqueIds: uniqueIdsList };
}

const result = decodeFields(encoded, translations);
console.log(result);

console.log("Let's rock")
// console.log(encoded, translations)



// console.log(decoded)
