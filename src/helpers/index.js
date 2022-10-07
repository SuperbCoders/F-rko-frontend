export const getFormatFile = (fileName) => {
  const words = fileName.split(".");
  return words[words.length - 1].toUpperCase();
};

export const getSizeMb = (totalBytes) => {
  if (totalBytes < 1000000) {
    return Math.floor(totalBytes / 1000) + "Кб";
  }
  return Math.floor(totalBytes / 1000000) + "Мб";
};
