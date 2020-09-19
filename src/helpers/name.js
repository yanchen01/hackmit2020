import { names1, names2 } from "./NAMES";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function generateName() {
  const name =
    names1[getRandomInt(0, names1.length)] +
    " " +
    names2[getRandomInt(0, names2.length)];

  return name.replace(/\b[a-zA-Z]/g, (match) => match.toUpperCase());
}
