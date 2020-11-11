export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
export const getCelcious = (value) => Math.round((value - 32) / 1.8);
