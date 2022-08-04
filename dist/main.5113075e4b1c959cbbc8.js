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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/gameboard */ \"./src/modules/gameboard.js\");\n\n\nlet myBoard = (0,_modules_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboard)();\nconst shipName = \"battleship\";\nmyBoard.placeShip(\"horizontal\", shipName, \"F\", 7);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7QUFBZ0Q7O0FBRWhELGNBQWMsNkRBQVM7QUFDdkI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tIFwiLi9tb2R1bGVzL2dhbWVib2FyZFwiO1xuXG5sZXQgbXlCb2FyZCA9IGdhbWVib2FyZCgpO1xuY29uc3Qgc2hpcE5hbWUgPSBcImJhdHRsZXNoaXBcIjtcbm15Qm9hcmQucGxhY2VTaGlwKFwiaG9yaXpvbnRhbFwiLCBzaGlwTmFtZSwgXCJGXCIsIDcpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameboard\": () => (/* binding */ gameboard),\n/* harmony export */   \"resetGameboard\": () => (/* binding */ resetGameboard)\n/* harmony export */ });\n/* harmony import */ var _modules_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/ship */ \"./src/modules/ship.js\");\n\n\nconst resetGameboard = (thisBoard) => {\n  thisBoard = \"\";\n  thisBoard = newBoard();\n};\n\nconst gameboard = () => {\n  let board = newBoard();\n  let ships = [];\n  const getBoard = () => {\n    return board;\n  };\n\n  const placeShip = (orientation, shipName, column, row) => {\n    let coordinates = [column, row];\n    let freeSpace = true;\n    let newShip = (0,_modules_ship__WEBPACK_IMPORTED_MODULE_0__.ship)(shipName, coordinates);\n    const shipLength = newShip.getLength();\n\n    if (orientation === \"vertical\") {\n      let index = row;\n      freeSpace = spaceInBoard(index, shipLength);\n      freeSpace = spaceInCellVertical(\n        column,\n        index,\n        shipLength,\n        board,\n        freeSpace\n      );\n\n      if (freeSpace) {\n        shipToBoardVertical(column, index, shipLength, board, shipName);\n      }\n    } else if (orientation === \"horizontal\") {\n      let index = alphabet.findIndex((i) => i === column);\n      freeSpace = spaceInBoard(index, shipLength);\n      freeSpace = spaceInCellHorizontal(\n        index,\n        row,\n        shipLength,\n        board,\n        freeSpace\n      );\n      if (freeSpace) {\n        shipToBoardHorizontal(index, row, shipLength, board, shipName);\n      }\n    }\n\n    console.log(board);\n  };\n\n  const updateShipsArray = (shipName, column, row) => {};\n\n  const receiveAttack = (column, row) => {\n    board[column][row][\"hit\"] = true;\n    if (board[column][row][\"ship\"]) {\n      console.log(\"there is a ship\");\n    } else {\n      console.log(\"no ship\");\n    }\n  };\n\n  return {\n    receiveAttack,\n    getBoard,\n    placeShip,\n  };\n};\n\nfunction spaceInCellVertical(column, row, length, board, freeSpace) {\n  for (let i = 0; i < length; i++) {\n    if (\n      board[column][row][\"ship\"] !== false ||\n      board[column][row][\"buffer\"] !== false\n    ) {\n      freeSpace = false;\n    }\n    row += 1;\n  }\n  return freeSpace;\n}\n\nfunction spaceInCellHorizontal(column, row, length, board, freeSpace) {\n  for (let i = 0; i < length; i++) {\n    if (\n      board[alphabet[column]][row][\"ship\"] !== false ||\n      board[alphabet[column]][row][\"buffer\"] !== false\n    ) {\n      freeSpace = false;\n    }\n    column += 1;\n  }\n  return freeSpace;\n}\n\nfunction spaceInBoard(index, shipLength) {\n  if (index + shipLength > 10) {\n    return false;\n  } else {\n    return true;\n  }\n}\n\nfunction shipToBoardVertical(column, row, length, board, shipName) {\n  let index = alphabet.findIndex((i) => i === column);\n\n  //add horizontal buffers\n  for (let j = -1; j < 2; j++) {\n    if (index + j >= 0 && index + j < 9) {\n      if (board[alphabet[index + j]][row - 1]) {\n        board[alphabet[index + j]][row - 1][\"buffer\"] = true;\n      }\n\n      if (board[alphabet[index + j]][row + length]) {\n        board[alphabet[index + j]][row + length][\"buffer\"] = true;\n      }\n    }\n  }\n\n  //add vertical buffers and ship\n  for (let i = 0; i < length; i++) {\n    board[column][row][\"ship\"] = shipName;\n    if (board[alphabet[index - 1]]) {\n      board[alphabet[index - 1]][row][\"buffer\"] = true;\n    }\n    if (board[alphabet[index + 1]]) {\n      board[alphabet[index + 1]][row][\"buffer\"] = true;\n    }\n    row += 1;\n  }\n}\n\nfunction shipToBoardHorizontal(column, row, length, board, shipName) {\n  //add vertical buffers\n  for (let j = -1; j < 2; j++) {\n    if (column + j >= 0 && column + j < 9) {\n      if (board[alphabet[column - 1]][row + j]) {\n        board[alphabet[column - 1]][row + j][\"buffer\"] = true;\n      }\n\n      if (board[alphabet[column + length]][row + j]) {\n        board[alphabet[column + length]][row + j][\"buffer\"] = true;\n      }\n    }\n  }\n\n  //add horizontal buffers and ship\n  for (let i = 0; i < length; i++) {\n    board[alphabet[column]][row][\"ship\"] = shipName;\n    if (board[alphabet[column]][row - 1]) {\n      board[alphabet[column]][row - 1][\"buffer\"] = true;\n    }\n    if (board[alphabet[column]][row + 1]) {\n      board[alphabet[column]][row + 1][\"buffer\"] = true;\n    }\n    column += 1;\n  }\n}\n\nfunction placeHorizontal(board, column, row, shipName, shipLength) {\n  let index = alphabet.findIndex((i) => i === column);\n  //check if there is space to place ship\n  let freeSpace = isEndOfBoard(index, shipLength);\n  if (freeSpace) {\n    let j = index;\n    for (let i = 0; i < shipLength; i++) {\n      if (\n        board[alphabet[j]][row][\"ship\"] !== false ||\n        board[alphabet[j]][row][\"ship\"] !== false\n      ) {\n        freeSpace = false;\n      }\n      j += 1;\n    }\n  }\n\n  if (freeSpace) {\n    let coordinates = [alphabet[index], row];\n    addShipToBoard(coordinates, shipName, shipLength);\n  }\n}\n\nconst alphabet = makeAlphabet();\n\nfunction newBoard() {\n  let cell = {\n    hit: false,\n    ship: false,\n    buffer: false,\n  };\n\n  const emptyColumn = Array.from(Array(10)).map((e, i) => i);\n  let column = {};\n  emptyColumn.forEach((element, index) => {\n    column[element] = Object.assign({}, cell);\n  });\n  const board = {};\n  alphabet.forEach((element, index) => {\n    board[element] = JSON.parse(JSON.stringify(column));\n  });\n  return board;\n}\nfunction makeAlphabet() {\n  const alpha = Array.from(Array(10)).map((e, i) => i + 65);\n  const alphabet = alpha.map((x) => String.fromCharCode(x));\n  return alphabet;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXVDOztBQUVoQztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG1EQUFJO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcz82MWRkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNoaXAgfSBmcm9tIFwiLi4vbW9kdWxlcy9zaGlwXCI7XG5cbmV4cG9ydCBjb25zdCByZXNldEdhbWVib2FyZCA9ICh0aGlzQm9hcmQpID0+IHtcbiAgdGhpc0JvYXJkID0gXCJcIjtcbiAgdGhpc0JvYXJkID0gbmV3Qm9hcmQoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGxldCBib2FyZCA9IG5ld0JvYXJkKCk7XG4gIGxldCBzaGlwcyA9IFtdO1xuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IHtcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKG9yaWVudGF0aW9uLCBzaGlwTmFtZSwgY29sdW1uLCByb3cpID0+IHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBbY29sdW1uLCByb3ddO1xuICAgIGxldCBmcmVlU3BhY2UgPSB0cnVlO1xuICAgIGxldCBuZXdTaGlwID0gc2hpcChzaGlwTmFtZSwgY29vcmRpbmF0ZXMpO1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBuZXdTaGlwLmdldExlbmd0aCgpO1xuXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIGxldCBpbmRleCA9IHJvdztcbiAgICAgIGZyZWVTcGFjZSA9IHNwYWNlSW5Cb2FyZChpbmRleCwgc2hpcExlbmd0aCk7XG4gICAgICBmcmVlU3BhY2UgPSBzcGFjZUluQ2VsbFZlcnRpY2FsKFxuICAgICAgICBjb2x1bW4sXG4gICAgICAgIGluZGV4LFxuICAgICAgICBzaGlwTGVuZ3RoLFxuICAgICAgICBib2FyZCxcbiAgICAgICAgZnJlZVNwYWNlXG4gICAgICApO1xuXG4gICAgICBpZiAoZnJlZVNwYWNlKSB7XG4gICAgICAgIHNoaXBUb0JvYXJkVmVydGljYWwoY29sdW1uLCBpbmRleCwgc2hpcExlbmd0aCwgYm9hcmQsIHNoaXBOYW1lKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgbGV0IGluZGV4ID0gYWxwaGFiZXQuZmluZEluZGV4KChpKSA9PiBpID09PSBjb2x1bW4pO1xuICAgICAgZnJlZVNwYWNlID0gc3BhY2VJbkJvYXJkKGluZGV4LCBzaGlwTGVuZ3RoKTtcbiAgICAgIGZyZWVTcGFjZSA9IHNwYWNlSW5DZWxsSG9yaXpvbnRhbChcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIHJvdyxcbiAgICAgICAgc2hpcExlbmd0aCxcbiAgICAgICAgYm9hcmQsXG4gICAgICAgIGZyZWVTcGFjZVxuICAgICAgKTtcbiAgICAgIGlmIChmcmVlU3BhY2UpIHtcbiAgICAgICAgc2hpcFRvQm9hcmRIb3Jpem9udGFsKGluZGV4LCByb3csIHNoaXBMZW5ndGgsIGJvYXJkLCBzaGlwTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coYm9hcmQpO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVNoaXBzQXJyYXkgPSAoc2hpcE5hbWUsIGNvbHVtbiwgcm93KSA9PiB7fTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvbHVtbiwgcm93KSA9PiB7XG4gICAgYm9hcmRbY29sdW1uXVtyb3ddW1wiaGl0XCJdID0gdHJ1ZTtcbiAgICBpZiAoYm9hcmRbY29sdW1uXVtyb3ddW1wic2hpcFwiXSkge1xuICAgICAgY29uc29sZS5sb2coXCJ0aGVyZSBpcyBhIHNoaXBcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gc2hpcFwiKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldEJvYXJkLFxuICAgIHBsYWNlU2hpcCxcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIHNwYWNlSW5DZWxsVmVydGljYWwoY29sdW1uLCByb3csIGxlbmd0aCwgYm9hcmQsIGZyZWVTcGFjZSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKFxuICAgICAgYm9hcmRbY29sdW1uXVtyb3ddW1wic2hpcFwiXSAhPT0gZmFsc2UgfHxcbiAgICAgIGJvYXJkW2NvbHVtbl1bcm93XVtcImJ1ZmZlclwiXSAhPT0gZmFsc2VcbiAgICApIHtcbiAgICAgIGZyZWVTcGFjZSA9IGZhbHNlO1xuICAgIH1cbiAgICByb3cgKz0gMTtcbiAgfVxuICByZXR1cm4gZnJlZVNwYWNlO1xufVxuXG5mdW5jdGlvbiBzcGFjZUluQ2VsbEhvcml6b250YWwoY29sdW1uLCByb3csIGxlbmd0aCwgYm9hcmQsIGZyZWVTcGFjZSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKFxuICAgICAgYm9hcmRbYWxwaGFiZXRbY29sdW1uXV1bcm93XVtcInNoaXBcIl0gIT09IGZhbHNlIHx8XG4gICAgICBib2FyZFthbHBoYWJldFtjb2x1bW5dXVtyb3ddW1wiYnVmZmVyXCJdICE9PSBmYWxzZVxuICAgICkge1xuICAgICAgZnJlZVNwYWNlID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbHVtbiArPSAxO1xuICB9XG4gIHJldHVybiBmcmVlU3BhY2U7XG59XG5cbmZ1bmN0aW9uIHNwYWNlSW5Cb2FyZChpbmRleCwgc2hpcExlbmd0aCkge1xuICBpZiAoaW5kZXggKyBzaGlwTGVuZ3RoID4gMTApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hpcFRvQm9hcmRWZXJ0aWNhbChjb2x1bW4sIHJvdywgbGVuZ3RoLCBib2FyZCwgc2hpcE5hbWUpIHtcbiAgbGV0IGluZGV4ID0gYWxwaGFiZXQuZmluZEluZGV4KChpKSA9PiBpID09PSBjb2x1bW4pO1xuXG4gIC8vYWRkIGhvcml6b250YWwgYnVmZmVyc1xuICBmb3IgKGxldCBqID0gLTE7IGogPCAyOyBqKyspIHtcbiAgICBpZiAoaW5kZXggKyBqID49IDAgJiYgaW5kZXggKyBqIDwgOSkge1xuICAgICAgaWYgKGJvYXJkW2FscGhhYmV0W2luZGV4ICsgal1dW3JvdyAtIDFdKSB7XG4gICAgICAgIGJvYXJkW2FscGhhYmV0W2luZGV4ICsgal1dW3JvdyAtIDFdW1wiYnVmZmVyXCJdID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJvYXJkW2FscGhhYmV0W2luZGV4ICsgal1dW3JvdyArIGxlbmd0aF0pIHtcbiAgICAgICAgYm9hcmRbYWxwaGFiZXRbaW5kZXggKyBqXV1bcm93ICsgbGVuZ3RoXVtcImJ1ZmZlclwiXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9hZGQgdmVydGljYWwgYnVmZmVycyBhbmQgc2hpcFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgYm9hcmRbY29sdW1uXVtyb3ddW1wic2hpcFwiXSA9IHNoaXBOYW1lO1xuICAgIGlmIChib2FyZFthbHBoYWJldFtpbmRleCAtIDFdXSkge1xuICAgICAgYm9hcmRbYWxwaGFiZXRbaW5kZXggLSAxXV1bcm93XVtcImJ1ZmZlclwiXSA9IHRydWU7XG4gICAgfVxuICAgIGlmIChib2FyZFthbHBoYWJldFtpbmRleCArIDFdXSkge1xuICAgICAgYm9hcmRbYWxwaGFiZXRbaW5kZXggKyAxXV1bcm93XVtcImJ1ZmZlclwiXSA9IHRydWU7XG4gICAgfVxuICAgIHJvdyArPSAxO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNoaXBUb0JvYXJkSG9yaXpvbnRhbChjb2x1bW4sIHJvdywgbGVuZ3RoLCBib2FyZCwgc2hpcE5hbWUpIHtcbiAgLy9hZGQgdmVydGljYWwgYnVmZmVyc1xuICBmb3IgKGxldCBqID0gLTE7IGogPCAyOyBqKyspIHtcbiAgICBpZiAoY29sdW1uICsgaiA+PSAwICYmIGNvbHVtbiArIGogPCA5KSB7XG4gICAgICBpZiAoYm9hcmRbYWxwaGFiZXRbY29sdW1uIC0gMV1dW3JvdyArIGpdKSB7XG4gICAgICAgIGJvYXJkW2FscGhhYmV0W2NvbHVtbiAtIDFdXVtyb3cgKyBqXVtcImJ1ZmZlclwiXSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChib2FyZFthbHBoYWJldFtjb2x1bW4gKyBsZW5ndGhdXVtyb3cgKyBqXSkge1xuICAgICAgICBib2FyZFthbHBoYWJldFtjb2x1bW4gKyBsZW5ndGhdXVtyb3cgKyBqXVtcImJ1ZmZlclwiXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9hZGQgaG9yaXpvbnRhbCBidWZmZXJzIGFuZCBzaGlwXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBib2FyZFthbHBoYWJldFtjb2x1bW5dXVtyb3ddW1wic2hpcFwiXSA9IHNoaXBOYW1lO1xuICAgIGlmIChib2FyZFthbHBoYWJldFtjb2x1bW5dXVtyb3cgLSAxXSkge1xuICAgICAgYm9hcmRbYWxwaGFiZXRbY29sdW1uXV1bcm93IC0gMV1bXCJidWZmZXJcIl0gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoYm9hcmRbYWxwaGFiZXRbY29sdW1uXV1bcm93ICsgMV0pIHtcbiAgICAgIGJvYXJkW2FscGhhYmV0W2NvbHVtbl1dW3JvdyArIDFdW1wiYnVmZmVyXCJdID0gdHJ1ZTtcbiAgICB9XG4gICAgY29sdW1uICs9IDE7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGxhY2VIb3Jpem9udGFsKGJvYXJkLCBjb2x1bW4sIHJvdywgc2hpcE5hbWUsIHNoaXBMZW5ndGgpIHtcbiAgbGV0IGluZGV4ID0gYWxwaGFiZXQuZmluZEluZGV4KChpKSA9PiBpID09PSBjb2x1bW4pO1xuICAvL2NoZWNrIGlmIHRoZXJlIGlzIHNwYWNlIHRvIHBsYWNlIHNoaXBcbiAgbGV0IGZyZWVTcGFjZSA9IGlzRW5kT2ZCb2FyZChpbmRleCwgc2hpcExlbmd0aCk7XG4gIGlmIChmcmVlU3BhY2UpIHtcbiAgICBsZXQgaiA9IGluZGV4O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGJvYXJkW2FscGhhYmV0W2pdXVtyb3ddW1wic2hpcFwiXSAhPT0gZmFsc2UgfHxcbiAgICAgICAgYm9hcmRbYWxwaGFiZXRbal1dW3Jvd11bXCJzaGlwXCJdICE9PSBmYWxzZVxuICAgICAgKSB7XG4gICAgICAgIGZyZWVTcGFjZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaiArPSAxO1xuICAgIH1cbiAgfVxuXG4gIGlmIChmcmVlU3BhY2UpIHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBbYWxwaGFiZXRbaW5kZXhdLCByb3ddO1xuICAgIGFkZFNoaXBUb0JvYXJkKGNvb3JkaW5hdGVzLCBzaGlwTmFtZSwgc2hpcExlbmd0aCk7XG4gIH1cbn1cblxuY29uc3QgYWxwaGFiZXQgPSBtYWtlQWxwaGFiZXQoKTtcblxuZnVuY3Rpb24gbmV3Qm9hcmQoKSB7XG4gIGxldCBjZWxsID0ge1xuICAgIGhpdDogZmFsc2UsXG4gICAgc2hpcDogZmFsc2UsXG4gICAgYnVmZmVyOiBmYWxzZSxcbiAgfTtcblxuICBjb25zdCBlbXB0eUNvbHVtbiA9IEFycmF5LmZyb20oQXJyYXkoMTApKS5tYXAoKGUsIGkpID0+IGkpO1xuICBsZXQgY29sdW1uID0ge307XG4gIGVtcHR5Q29sdW1uLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgY29sdW1uW2VsZW1lbnRdID0gT2JqZWN0LmFzc2lnbih7fSwgY2VsbCk7XG4gIH0pO1xuICBjb25zdCBib2FyZCA9IHt9O1xuICBhbHBoYWJldC5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGJvYXJkW2VsZW1lbnRdID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb2x1bW4pKTtcbiAgfSk7XG4gIHJldHVybiBib2FyZDtcbn1cbmZ1bmN0aW9uIG1ha2VBbHBoYWJldCgpIHtcbiAgY29uc3QgYWxwaGEgPSBBcnJheS5mcm9tKEFycmF5KDEwKSkubWFwKChlLCBpKSA9PiBpICsgNjUpO1xuICBjb25zdCBhbHBoYWJldCA9IGFscGhhLm1hcCgoeCkgPT4gU3RyaW5nLmZyb21DaGFyQ29kZSh4KSk7XG4gIHJldHVybiBhbHBoYWJldDtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/modules/gameboard.js\n");

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