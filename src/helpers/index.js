export const getFormatFile = (fileName="") => {
  const words = fileName.split(".");
  return words[words.length - 1].toUpperCase();
};

export const getSizeMb = (totalBytes=0) => {
  if (totalBytes < 1000000) {
    return Math.floor(totalBytes / 1000) + "Кб";
  }
  return Math.floor(totalBytes / 1000000) + "Мб";
};

export const ROUTES = {
  STEP1: "/step1/",
  STEP2: "/step2/",
  STEP3: "/step3/",
}

export function isObject(val) {
  if (val === null) { return false }
  if (typeof val === 'function') { return false }
  return typeof val === 'object'
}
