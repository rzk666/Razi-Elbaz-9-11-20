export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
export const getCelcious = (value) => Math.round((value - 32) / 1.8);
export const getIconId = (iconId) => {
  if (!(iconId / 10 >= 1)) {
    return `0${iconId}`;
  }
  return iconId;
};
