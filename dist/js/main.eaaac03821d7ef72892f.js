/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Environment.ts":
/*!****************************!*\
  !*** ./src/Environment.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Environment\": () => (/* binding */ Environment)\n/* harmony export */ });\n/* harmony import */ var _Obstacle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Obstacle */ \"./src/Obstacle.ts\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ \"./src/model.ts\");\n\r\n\r\nclass Environment {\r\n    constructor(ctx, canvasHeight, canvasWidth, image, sound) {\r\n        this.obstacles = [];\r\n        this.maxObstacles = 20;\r\n        this.width = 25;\r\n        this.speed = 1;\r\n        this.ctx = ctx;\r\n        this.canvasHeight = canvasHeight;\r\n        this.canvasWidth = canvasWidth;\r\n        this.image = image;\r\n        this.sound = sound;\r\n        this.lastX = this.canvasWidth / 2;\r\n        this.spaceBetween = this.width * 10;\r\n    }\r\n    draw(index, pipeType) {\r\n        this.ctx.imageSmoothingEnabled = true;\r\n        this.ctx.drawImage(this.image[pipeType], this.obstacles[index].x, this.obstacles[index].y, this.obstacles[index].width, this.obstacles[index].height);\r\n    }\r\n    update(player) {\r\n        const { x } = player.getInfo();\r\n        if (this.obstacles.length < this.maxObstacles * 2) {\r\n            this.createObstacle();\r\n        }\r\n        for (let i = 0; i < this.obstacles.length; i++) {\r\n            this.obstacles[i].x -= this.speed;\r\n            if (this.obstacles[i].x <= x && !this.obstacles[i].counted) {\r\n                player.incrementScore();\r\n                this.obstacles[i].counted = true;\r\n            }\r\n            if (this.obstacles[i].x < -this.width) {\r\n                this.destroyOldObstacleByIndex(i);\r\n            }\r\n            this.draw(i, this.obstacles[i].type);\r\n        }\r\n    }\r\n    checkCollision(player) {\r\n        const { x, y, width, height, } = player.getInfo();\r\n        for (let i = 0; i < this.obstacles.length; i++) {\r\n            const obstacle = this.obstacles[i];\r\n            if ((x + width >= obstacle.x && x + width <= obstacle.x + obstacle.width)\r\n                && (y + height >= obstacle.y && y + height <= obstacle.y + obstacle.height)\r\n                || (y + height >= this.canvasHeight)\r\n                || (y - height <= 0)) {\r\n                this.sound.hit.play();\r\n                this.ctx.drawImage(this.image.bang, x - width, y - height, 150, 150);\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    }\r\n    createObstacle() {\r\n        for (let i = 0; i < this.maxObstacles; i++) {\r\n            let randomHeight = Math.floor(Math.random() * this.canvasHeight / 2);\r\n            if (randomHeight > 180) {\r\n                randomHeight = 180;\r\n            }\r\n            this.obstacles.push(new _Obstacle__WEBPACK_IMPORTED_MODULE_0__.Obstacle(randomHeight, this.width, this.lastX, 0, _model__WEBPACK_IMPORTED_MODULE_1__.PipeType.TOP));\r\n            this.obstacles.push(new _Obstacle__WEBPACK_IMPORTED_MODULE_0__.Obstacle(this.canvasHeight - randomHeight, this.width, this.lastX, randomHeight + this.spaceBetween, _model__WEBPACK_IMPORTED_MODULE_1__.PipeType.BOTTOM));\r\n            this.lastX += this.spaceBetween;\r\n        }\r\n    }\r\n    destroyOldObstacleByIndex(index) {\r\n        this.obstacles.splice(index, 1);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://flappy-bird/./src/Environment.ts?");

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n/* harmony import */ var _Environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Environment */ \"./src/Environment.ts\");\n/* harmony import */ var _ImageController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ImageController */ \"./src/ImageController.ts\");\n/* harmony import */ var _SoundController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SoundController */ \"./src/SoundController.ts\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./model */ \"./src/model.ts\");\n\r\n\r\n\r\n\r\n\r\nclass Game {\r\n    constructor() {\r\n        this.spacePressed = false;\r\n        this.canvas = Game.createCanvas();\r\n        this.ctx = this.canvas.getContext('2d');\r\n        this.image = new _ImageController__WEBPACK_IMPORTED_MODULE_2__.ImageController();\r\n        this.sound = new _SoundController__WEBPACK_IMPORTED_MODULE_3__.SoundController();\r\n        this.inputHandlers();\r\n        this.startGame();\r\n    }\r\n    inputHandlers() {\r\n        window.addEventListener('keydown', ({ keyCode }) => {\r\n            if (keyCode === 32) {\r\n                this.spacePressed = true;\r\n            }\r\n        });\r\n        window.addEventListener('keyup', ({ keyCode }) => {\r\n            if (keyCode === 32) {\r\n                this.spacePressed = false;\r\n            }\r\n        });\r\n        window.addEventListener('keydown', ({ keyCode }) => {\r\n            if (keyCode === 82 && this.state === _model__WEBPACK_IMPORTED_MODULE_4__.GameState.END) {\r\n                this.startGame();\r\n            }\r\n        });\r\n    }\r\n    static createCanvas() {\r\n        const canvas = document.createElement('canvas');\r\n        canvas.width = 1280;\r\n        canvas.height = 720;\r\n        canvas.id = 'gameCanvas';\r\n        document.body.appendChild(canvas);\r\n        return canvas;\r\n    }\r\n    createBackground() {\r\n        this.ctx.drawImage(this.image.background, 0, 0, this.canvas.width, this.canvas.height);\r\n    }\r\n    render() {\r\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\r\n        this.createBackground();\r\n        this.environment.update(this.player);\r\n        this.player.draw();\r\n        this.player.update(this.canvas.height, this.spacePressed);\r\n        if (this.environment.checkCollision(this.player)) {\r\n            this.endGame();\r\n            return;\r\n        }\r\n        window.requestAnimationFrame(this.render.bind(this));\r\n    }\r\n    startGame() {\r\n        this.state = _model__WEBPACK_IMPORTED_MODULE_4__.GameState.START;\r\n        this.environment = new _Environment__WEBPACK_IMPORTED_MODULE_1__.Environment(this.ctx, this.canvas.height, this.canvas.width, this.image, this.sound);\r\n        this.player = new _Player__WEBPACK_IMPORTED_MODULE_0__.Player(this.ctx, this.image, this.sound);\r\n        this.render();\r\n    }\r\n    endGame() {\r\n        this.state = _model__WEBPACK_IMPORTED_MODULE_4__.GameState.END;\r\n        this.ctx.font = '25px Georgia';\r\n        this.ctx.fillStyle = 'white';\r\n        this.ctx.fillText('PRESS R TO RESTART', this.canvas.width / 2, this.canvas.height / 2);\r\n        this.player.saveHighestScore();\r\n    }\r\n}\r\nconst game = new Game();\r\n\n\n//# sourceURL=webpack://flappy-bird/./src/Game.ts?");

/***/ }),

/***/ "./src/ImageController.ts":
/*!********************************!*\
  !*** ./src/ImageController.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ImageController\": () => (/* binding */ ImageController)\n/* harmony export */ });\nclass ImageController {\r\n    constructor() {\r\n        this.bang = new Image();\r\n        this.bang.src = 'assets/sprites/bang.png';\r\n        this.player = new Image();\r\n        this.player.src = 'assets/sprites/bird.png';\r\n        this.background = new Image();\r\n        this.background.src = 'assets/sprites/background.jpg';\r\n        this.pipeTop = new Image();\r\n        this.pipeTop.src = 'assets/sprites/pipeTop.png';\r\n        this.pipeBottom = new Image();\r\n        this.pipeBottom.src = 'assets/sprites/pipeBottom.png';\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://flappy-bird/./src/ImageController.ts?");

/***/ }),

/***/ "./src/Obstacle.ts":
/*!*************************!*\
  !*** ./src/Obstacle.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Obstacle\": () => (/* binding */ Obstacle)\n/* harmony export */ });\nclass Obstacle {\r\n    constructor(height, width, x = 0, y = 0, type, color = 'green', counter = false) {\r\n        this.counted = false;\r\n        this.color = color;\r\n        this.type = type;\r\n        this.height = height;\r\n        this.width = width;\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://flappy-bird/./src/Obstacle.ts?");

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\nclass Player {\r\n    constructor(ctx, image, sound) {\r\n        this.x = 100;\r\n        this.y = 200;\r\n        this.velocity = 0;\r\n        this.weight = 0.5;\r\n        this.height = 25;\r\n        this.width = 25;\r\n        this.color = 'green';\r\n        this.score = 0;\r\n        this.highestScore = 0;\r\n        this.ctx = ctx;\r\n        this.image = image;\r\n        this.sound = sound;\r\n        this.highestScore = this.getHighestScore();\r\n    }\r\n    getInfo() {\r\n        return {\r\n            x: this.x,\r\n            y: this.y,\r\n            width: this.width,\r\n            height: this.height,\r\n        };\r\n    }\r\n    draw() {\r\n        this.drawScore();\r\n        this.ctx.fillStyle = this.color;\r\n        this.ctx.drawImage(this.image.player, this.x, this.y, this.width * 2, this.height * 2);\r\n    }\r\n    update(maxHeight, spacePressed) {\r\n        if (this.y > maxHeight - this.height) {\r\n            this.y = maxHeight - this.height;\r\n            this.velocity = 0;\r\n        }\r\n        else {\r\n            this.velocity += this.weight;\r\n            this.velocity *= 0.9;\r\n            this.y += this.velocity;\r\n        }\r\n        if (this.y < this.height) {\r\n            this.y = this.height;\r\n            this.velocity = 0;\r\n        }\r\n        if (spacePressed) {\r\n            this.velocity -= 2;\r\n            this.sound.fly.play();\r\n        }\r\n    }\r\n    incrementScore() {\r\n        this.sound.score.play();\r\n        this.score += 0.5;\r\n        if (this.score > this.highestScore) {\r\n            this.highestScore = this.score;\r\n        }\r\n    }\r\n    saveHighestScore() {\r\n        if (this.score > this.highestScore) {\r\n            window.localStorage.setItem('HIGHEST', this.score.toString());\r\n        }\r\n    }\r\n    getHighestScore() {\r\n        const value = window.localStorage.getItem('HIGHEST');\r\n        return value ? Number(value) : 0;\r\n    }\r\n    drawScore() {\r\n        this.ctx.font = '25px Georgia';\r\n        this.ctx.fillStyle = 'white';\r\n        this.ctx.fillText(`Score: ${this.score}`, 50, 50);\r\n        this.ctx.fillText(`Highest score: ${this.highestScore}`, 50, 80);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://flappy-bird/./src/Player.ts?");

/***/ }),

/***/ "./src/SoundController.ts":
/*!********************************!*\
  !*** ./src/SoundController.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SoundController\": () => (/* binding */ SoundController)\n/* harmony export */ });\nclass SoundController {\r\n    constructor() {\r\n        this.fly = this.createSound('assets/sounds/sfx_swooshing.wav');\r\n        this.fly.playbackRate = 5;\r\n        this.hit = this.createSound('assets/sounds/sfx_hit.wav');\r\n        this.score = this.createSound('assets/sounds/sfx_point.wav');\r\n    }\r\n    createSound(src) {\r\n        return new Audio(src);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://flappy-bird/./src/SoundController.ts?");

/***/ }),

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameState\": () => (/* binding */ GameState),\n/* harmony export */   \"PipeType\": () => (/* binding */ PipeType)\n/* harmony export */ });\nvar GameState;\r\n(function (GameState) {\r\n    GameState[GameState[\"START\"] = 0] = \"START\";\r\n    GameState[GameState[\"END\"] = 1] = \"END\";\r\n})(GameState || (GameState = {}));\r\nvar PipeType;\r\n(function (PipeType) {\r\n    PipeType[\"TOP\"] = \"pipeTop\";\r\n    PipeType[\"BOTTOM\"] = \"pipeBottom\";\r\n})(PipeType || (PipeType = {}));\r\n\n\n//# sourceURL=webpack://flappy-bird/./src/model.ts?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Game.ts");
/******/ 	
/******/ })()
;