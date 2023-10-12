import { encoded, translations } from './data.js';

console.log("Let's rock");
console.log(encoded, translations);

function decodeFields(encoded, translations) {
  const decodedList = [];
  const uniqueIds = new Set();
  let duplicateVariable;
  for (const entry of encoded) {
    const decodedEntry = {};
    for (const key in entry) {
      if (key.endsWith('Id')) {
        if (translations.hasOwnProperty(Number(entry[key]))) {
          decodedEntry[key] = translations[Number(entry[key])];
        } else {
          decodedEntry[key] = entry[key];
          if (uniqueIds.has(Number(entry[key]))) {
            duplicateVariable = Number(entry[key]);
            uniqueIds.delete(duplicateVariable);
          } else {
            uniqueIds.add(Number(entry[key]));
          }
        }
      } else {
        decodedEntry[key] = entry[key];
      }
    }
    decodedList.push(decodedEntry);
  }
  return { decodedList, uniqueIds };
}
const decoded = decodeFields(encoded, translations);
console.log(decoded);
