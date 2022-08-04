/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/gameboard */ \"./src/modules/gameboard.js\");\n\n\nlet myBoard = (0,_modules_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard)();\nconst shipName = \"destroyer\";\nmyBoard.placeShip(\"vertical\", shipName, \"B\", 0);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7QUFBZ0Q7O0FBRWhELGNBQWMsNkRBQVM7QUFDdkI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tIFwiLi9tb2R1bGVzL2dhbWVib2FyZFwiO1xuXG5sZXQgbXlCb2FyZCA9IGdhbWVib2FyZCgpO1xuY29uc3Qgc2hpcE5hbWUgPSBcImRlc3Ryb3llclwiO1xubXlCb2FyZC5wbGFjZVNoaXAoXCJ2ZXJ0aWNhbFwiLCBzaGlwTmFtZSwgXCJCXCIsIDApO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameboard\": () => (/* binding */ gameboard),\n/* harmony export */   \"resetGameboard\": () => (/* binding */ resetGameboard)\n/* harmony export */ });\n/* harmony import */ var _modules_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/ship */ \"./src/modules/ship.js\");\n\n\nconst resetGameboard = (thisBoard) => {\n  thisBoard = \"\";\n  thisBoard = newBoard();\n};\n\nconst gameboard = () => {\n  let board = newBoard();\n  let ships = [];\n  const getBoard = () => {\n    return board;\n  };\n\n  const placeShip = (orientation, shipName, column, row) => {\n    let coordinates = [column, row];\n    let freeSpace = true;\n    let newShip = (0,_modules_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(shipName, coordinates);\n    const shipLength = newShip.getLength();\n\n    if (orientation === \"vertical\") {\n      let index = row;\n      freeSpace = spaceInBoard(index, shipLength);\n      freeSpace = spaceInCell(index, column, shipLength, board, freeSpace);\n\n      if (freeSpace) {\n        shipToBoardVertical(column, index, shipLength, board, shipName);\n      }\n    }\n\n    console.log(board);\n  };\n\n  const updateShipsArray = (shipName, column, row) => {};\n\n  const receiveAttack = (column, row) => {\n    board[column][row][\"hit\"] = true;\n    if (board[column][row][\"ship\"]) {\n      console.log(\"there is a ship\");\n    } else {\n      console.log(\"no ship\");\n    }\n  };\n\n  return {\n    receiveAttack,\n    getBoard,\n    placeShip,\n  };\n};\n\nfunction spaceInCell(row, column, length, board, freeSpace) {\n  for (let i = 0; i < length; i++) {\n    if (\n      board[column][row][\"ship\"] !== false ||\n      board[column][row][\"buffer\"] !== false\n    ) {\n      freeSpace = false;\n    }\n    row += 1;\n  }\n  return freeSpace;\n}\n\nfunction spaceInBoard(index, shipLength) {\n  if (index + shipLength > 10) {\n    return false;\n  } else {\n    return true;\n  }\n}\n\nfunction shipToBoardVertical(column, row, length, board, shipName) {\n  let index = alphabet.findIndex((i) => i === column);\n\n  //add horizontal buffers\n  for (let j = -1; j < 2; j++) {\n    if (board[alphabet[index + j]][row - 1]) {\n      board[alphabet[index + j]][row - 1][\"buffer\"] = true;\n    }\n    if (board[alphabet[index + j]][row + length]) {\n      board[alphabet[index + j]][row + length][\"buffer\"] = true;\n    }\n  }\n\n  //add vertical buffers and ship\n  for (let i = 0; i < length; i++) {\n    board[column][row][\"ship\"] = shipName;\n    if (board[alphabet[index - 1]]) {\n      board[alphabet[index - 1]][row][\"buffer\"] = true;\n    }\n    if (board[alphabet[index + 1]]) {\n      board[alphabet[index + 1]][row][\"buffer\"] = true;\n    }\n    row += 1;\n  }\n}\n\nfunction placeHorizontal(board, column, row, shipName, shipLength) {\n  let index = alphabet.findIndex((i) => i === column);\n  //check if there is space to place ship\n  let freeSpace = isEndOfBoard(index, shipLength);\n  if (freeSpace) {\n    let j = index;\n    for (let i = 0; i < shipLength; i++) {\n      if (\n        board[alphabet[j]][row][\"ship\"] !== false ||\n        board[alphabet[j]][row][\"ship\"] !== false\n      ) {\n        freeSpace = false;\n      }\n      j += 1;\n    }\n  }\n\n  if (freeSpace) {\n    let coordinates = [alphabet[index], row];\n    addShipToBoard(coordinates, shipName, shipLength);\n  }\n}\n\nconst alphabet = makeAlphabet();\n\nfunction newBoard() {\n  let cell = {\n    hit: false,\n    ship: false,\n    buffer: false,\n  };\n\n  const emptyColumn = Array.from(Array(10)).map((e, i) => i);\n  let column = {};\n  emptyColumn.forEach((element, index) => {\n    column[element] = Object.assign({}, cell);\n  });\n  const board = {};\n  alphabet.forEach((element, index) => {\n    board[element] = JSON.parse(JSON.stringify(column));\n  });\n  return board;\n}\nfunction makeAlphabet() {\n  const alpha = Array.from(Array(10)).map((e, i) => i + 65);\n  const alphabet = alpha.map((x) => String.fromCharCode(x));\n  return alphabet;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXVDOztBQUVoQztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG1EQUFJO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzPzYxZGQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2hpcCB9IGZyb20gXCIuLi9tb2R1bGVzL3NoaXBcIjtcblxuZXhwb3J0IGNvbnN0IHJlc2V0R2FtZWJvYXJkID0gKHRoaXNCb2FyZCkgPT4ge1xuICB0aGlzQm9hcmQgPSBcIlwiO1xuICB0aGlzQm9hcmQgPSBuZXdCb2FyZCgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcbiAgbGV0IGJvYXJkID0gbmV3Qm9hcmQoKTtcbiAgbGV0IHNoaXBzID0gW107XG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4ge1xuICAgIHJldHVybiBib2FyZDtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAob3JpZW50YXRpb24sIHNoaXBOYW1lLCBjb2x1bW4sIHJvdykgPT4ge1xuICAgIGxldCBjb29yZGluYXRlcyA9IFtjb2x1bW4sIHJvd107XG4gICAgbGV0IGZyZWVTcGFjZSA9IHRydWU7XG4gICAgbGV0IG5ld1NoaXAgPSBzaGlwKHNoaXBOYW1lLCBjb29yZGluYXRlcyk7XG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IG5ld1NoaXAuZ2V0TGVuZ3RoKCk7XG5cbiAgICBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgbGV0IGluZGV4ID0gcm93O1xuICAgICAgZnJlZVNwYWNlID0gc3BhY2VJbkJvYXJkKGluZGV4LCBzaGlwTGVuZ3RoKTtcbiAgICAgIGZyZWVTcGFjZSA9IHNwYWNlSW5DZWxsKGluZGV4LCBjb2x1bW4sIHNoaXBMZW5ndGgsIGJvYXJkLCBmcmVlU3BhY2UpO1xuXG4gICAgICBpZiAoZnJlZVNwYWNlKSB7XG4gICAgICAgIHNoaXBUb0JvYXJkVmVydGljYWwoY29sdW1uLCBpbmRleCwgc2hpcExlbmd0aCwgYm9hcmQsIHNoaXBOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhib2FyZCk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlU2hpcHNBcnJheSA9IChzaGlwTmFtZSwgY29sdW1uLCByb3cpID0+IHt9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29sdW1uLCByb3cpID0+IHtcbiAgICBib2FyZFtjb2x1bW5dW3Jvd11bXCJoaXRcIl0gPSB0cnVlO1xuICAgIGlmIChib2FyZFtjb2x1bW5dW3Jvd11bXCJzaGlwXCJdKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInRoZXJlIGlzIGEgc2hpcFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJubyBzaGlwXCIpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0Qm9hcmQsXG4gICAgcGxhY2VTaGlwLFxuICB9O1xufTtcblxuZnVuY3Rpb24gc3BhY2VJbkNlbGwocm93LCBjb2x1bW4sIGxlbmd0aCwgYm9hcmQsIGZyZWVTcGFjZSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKFxuICAgICAgYm9hcmRbY29sdW1uXVtyb3ddW1wic2hpcFwiXSAhPT0gZmFsc2UgfHxcbiAgICAgIGJvYXJkW2NvbHVtbl1bcm93XVtcImJ1ZmZlclwiXSAhPT0gZmFsc2VcbiAgICApIHtcbiAgICAgIGZyZWVTcGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICByb3cgKz0gMTtcbiAgfVxuICByZXR1cm4gZnJlZVNwYWNlO1xufVxuXG5mdW5jdGlvbiBzcGFjZUluQm9hcmQoaW5kZXgsIHNoaXBMZW5ndGgpIHtcbiAgaWYgKGluZGV4ICsgc2hpcExlbmd0aCA+IDEwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNoaXBUb0JvYXJkVmVydGljYWwoY29sdW1uLCByb3csIGxlbmd0aCwgYm9hcmQsIHNoaXBOYW1lKSB7XG4gIGxldCBpbmRleCA9IGFscGhhYmV0LmZpbmRJbmRleCgoaSkgPT4gaSA9PT0gY29sdW1uKTtcblxuICAvL2FkZCBob3Jpem9udGFsIGJ1ZmZlcnNcbiAgZm9yIChsZXQgaiA9IC0xOyBqIDwgMjsgaisrKSB7XG4gICAgaWYgKGJvYXJkW2FscGhhYmV0W2luZGV4ICsgal1dW3JvdyAtIDFdKSB7XG4gICAgICBib2FyZFthbHBoYWJldFtpbmRleCArIGpdXVtyb3cgLSAxXVtcImJ1ZmZlclwiXSA9IHRydWU7XG4gICAgfVxuICAgIGlmIChib2FyZFthbHBoYWJldFtpbmRleCArIGpdXVtyb3cgKyBsZW5ndGhdKSB7XG4gICAgICBib2FyZFthbHBoYWJldFtpbmRleCArIGpdXVtyb3cgKyBsZW5ndGhdW1wiYnVmZmVyXCJdID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvL2FkZCB2ZXJ0aWNhbCBidWZmZXJzIGFuZCBzaGlwXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBib2FyZFtjb2x1bW5dW3Jvd11bXCJzaGlwXCJdID0gc2hpcE5hbWU7XG4gICAgaWYgKGJvYXJkW2FscGhhYmV0W2luZGV4IC0gMV1dKSB7XG4gICAgICBib2FyZFthbHBoYWJldFtpbmRleCAtIDFdXVtyb3ddW1wiYnVmZmVyXCJdID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGJvYXJkW2FscGhhYmV0W2luZGV4ICsgMV1dKSB7XG4gICAgICBib2FyZFthbHBoYWJldFtpbmRleCArIDFdXVtyb3ddW1wiYnVmZmVyXCJdID0gdHJ1ZTtcbiAgICB9XG4gICAgcm93ICs9IDE7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGxhY2VIb3Jpem9udGFsKGJvYXJkLCBjb2x1bW4sIHJvdywgc2hpcE5hbWUsIHNoaXBMZW5ndGgpIHtcbiAgbGV0IGluZGV4ID0gYWxwaGFiZXQuZmluZEluZGV4KChpKSA9PiBpID09PSBjb2x1bW4pO1xuICAvL2NoZWNrIGlmIHRoZXJlIGlzIHNwYWNlIHRvIHBsYWNlIHNoaXBcbiAgbGV0IGZyZWVTcGFjZSA9IGlzRW5kT2ZCb2FyZChpbmRleCwgc2hpcExlbmd0aCk7XG4gIGlmIChmcmVlU3BhY2UpIHtcbiAgICBsZXQgaiA9IGluZGV4O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGJvYXJkW2FscGhhYmV0W2pdXVtyb3ddW1wic2hpcFwiXSAhPT0gZmFsc2UgfHxcbiAgICAgICAgYm9hcmRbYWxwaGFiZXRbal1dW3Jvd11bXCJzaGlwXCJdICE9PSBmYWxzZVxuICAgICAgKSB7XG4gICAgICAgIGZyZWVTcGFjZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaiArPSAxO1xuICAgIH1cbiAgfVxuXG4gIGlmIChmcmVlU3BhY2UpIHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBbYWxwaGFiZXRbaW5kZXhdLCByb3ddO1xuICAgIGFkZFNoaXBUb0JvYXJkKGNvb3JkaW5hdGVzLCBzaGlwTmFtZSwgc2hpcExlbmd0aCk7XG4gIH1cbn1cblxuY29uc3QgYWxwaGFiZXQgPSBtYWtlQWxwaGFiZXQoKTtcblxuZnVuY3Rpb24gbmV3Qm9hcmQoKSB7XG4gIGxldCBjZWxsID0ge1xuICAgIGhpdDogZmFsc2UsXG4gICAgc2hpcDogZmFsc2UsXG4gICAgYnVmZmVyOiBmYWxzZSxcbiAgfTtcblxuICBjb25zdCBlbXB0eUNvbHVtbiA9IEFycmF5LmZyb20oQXJyYXkoMTApKS5tYXAoKGUsIGkpID0+IGkpO1xuICBsZXQgY29sdW1uID0ge307XG4gIGVtcHR5Q29sdW1uLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgY29sdW1uW2VsZW1lbnRdID0gT2JqZWN0LmFzc2lnbih7fSwgY2VsbCk7XG4gIH0pO1xuICBjb25zdCBib2FyZCA9IHt9O1xuICBhbHBoYWJldC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGJvYXJkW2VsZW1lbnRdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb2x1bW4pKTtcbiAgfSk7XG4gIHJldHVybiBib2FyZDtcbn1cbmZ1bmN0aW9uIG1ha2VBbHBoYWJldCgpIHtcbiAgY29uc3QgYWxwaGEgPSBBcnJheS5mcm9tKEFycmF5KDEwKSkubWFwKChlLCBpKSA9PiBpICsgNjUpO1xuICBjb25zdCBhbHBoYWJldCA9IGFscGhhLm1hcCgoeCkgPT4gU3RyaW5nLmZyb21DaGFyQ29kZSh4KSk7XG4gIHJldHVybiBhbHBoYWJldDtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/modules/gameboard.js\n");

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ship\": () => (/* binding */ ship)\n/* harmony export */ });\nconst ship = (name, coordinates) => {\n  let sunk = false;\n  const getCoordinates = (coordinates) => {\n    return coordinates;\n  };\n  const length = lengthByName(name);\n  const getLength = () => {\n    return length;\n  };\n  let whereHit = new Array(length).fill(false);\n  const hit = (n) => {\n    whereHit.fill(true, n, n + 1);\n  };\n  const isSunk = () => {\n    return whereHit.every(wasHit);\n  };\n\n  return {\n    getCoordinates,\n    getLength,\n    isSunk,\n    hit,\n  };\n};\n\nfunction wasHit(position) {\n  return position === true;\n}\n\nfunction lengthByName(name) {\n  switch (name) {\n    case \"carrier\":\n      return 5;\n    case \"battleship\":\n      return 4;\n    case \"destroyer\":\n      return 3;\n    case \"submarine\":\n      return 3;\n    case \"patrol boat\":\n      return 2;\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kdWxlcy9zaGlwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzPzFiZmYiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHNoaXAgPSAobmFtZSwgY29vcmRpbmF0ZXMpID0+IHtcbiAgbGV0IHN1bmsgPSBmYWxzZTtcbiAgY29uc3QgZ2V0Q29vcmRpbmF0ZXMgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH07XG4gIGNvbnN0IGxlbmd0aCA9IGxlbmd0aEJ5TmFtZShuYW1lKTtcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4ge1xuICAgIHJldHVybiBsZW5ndGg7XG4gIH07XG4gIGxldCB3aGVyZUhpdCA9IG5ldyBBcnJheShsZW5ndGgpLmZpbGwoZmFsc2UpO1xuICBjb25zdCBoaXQgPSAobikgPT4ge1xuICAgIHdoZXJlSGl0LmZpbGwodHJ1ZSwgbiwgbiArIDEpO1xuICB9O1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHdoZXJlSGl0LmV2ZXJ5KHdhc0hpdCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRDb29yZGluYXRlcyxcbiAgICBnZXRMZW5ndGgsXG4gICAgaXNTdW5rLFxuICAgIGhpdCxcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIHdhc0hpdChwb3NpdGlvbikge1xuICByZXR1cm4gcG9zaXRpb24gPT09IHRydWU7XG59XG5cbmZ1bmN0aW9uIGxlbmd0aEJ5TmFtZShuYW1lKSB7XG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgXCJjYXJyaWVyXCI6XG4gICAgICByZXR1cm4gNTtcbiAgICBjYXNlIFwiYmF0dGxlc2hpcFwiOlxuICAgICAgcmV0dXJuIDQ7XG4gICAgY2FzZSBcImRlc3Ryb3llclwiOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSBcInN1Ym1hcmluZVwiOlxuICAgICAgcmV0dXJuIDM7XG4gICAgY2FzZSBcInBhdHJvbCBib2F0XCI6XG4gICAgICByZXR1cm4gMjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/modules/ship.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;