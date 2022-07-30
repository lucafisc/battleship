
export const gameboard = () => {

  let columnA = new Array(10).fill("");


    let coordinates = 
  const receiveAttack = () => {};
  return {
    receiveAttack,
  };
};



const cell = {
  hit: false,
  ship: false,
}

let column = new Array(10);
let columnObject = {};

column.forEach((element, index) => {columnObject[element] = cell})
console.log(columnObject);

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

const gameboard = {};

alphabet.forEach((element, index) => { gameboard[element] = columnObject })

console.log(gameboard)