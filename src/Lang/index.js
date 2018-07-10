import util from 'util';
import en from './en';

const { hasOwnProperty } = Object.prototype;
const { inspect } = util;

const lang = 'en';

const langs = {
  en,
};

const getLang = (...keys) => {
  const leftKeys = [...keys];
  let pointer = langs[lang];
  while (leftKeys.length > 0) {
    const currentKey = leftKeys.shift();
    if (hasOwnProperty.call(pointer, currentKey)) {
      pointer = pointer[currentKey];
      if (typeof pointer === 'function') {
        pointer = pointer(...leftKeys);
        break;
      }
    } else {
      return `unknown lang, lang: ${lang}, keys: ${inspect(keys)}`;
    }
  }

  if (typeof pointer !== 'string') {
    return `unknown lang, pointer is not a string, lang: ${lang}, keys: ${inspect(keys)}`;
  }

  return pointer;
};

export default getLang;
