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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Environment\": () => (/* binding */ Environment)\n/* harmony export */ });\n/* harmony import */ var _Obstacle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Obstacle */ \"./src/Obstacle.ts\");\n\nclass Environment {\n    constructor(ctx, canvasHeight, canvasWidth, image, sound) {\n        this.obstacles = [];\n        this.maxObstacles = 20;\n        this.width = 25;\n        this.speed = 1;\n        this.ctx = ctx;\n        this.canvasHeight = canvasHeight;\n        this.canvasWidth = canvasWidth;\n        this.image = image;\n        this.sound = sound;\n        this.lastX = this.canvasWidth / 2;\n        this.spaceBetween = this.width * 10;\n    }\n    draw(index) {\n        this.ctx.drawImage(this.image.pipe, this.obstacles[index].x, this.obstacles[index].y, this.obstacles[index].width, this.obstacles[index].height);\n    }\n    update(player) {\n        const { x } = player.getInfo();\n        if (this.obstacles.length < this.maxObstacles * 2) {\n            this.createObstacle();\n        }\n        for (let i = 0; i < this.obstacles.length; i++) {\n            this.obstacles[i].x -= this.speed;\n            if (this.obstacles[i].x <= x && !this.obstacles[i].counted) {\n                player.incrementScore();\n                this.obstacles[i].counted = true;\n            }\n            if (this.obstacles[i].x < -this.width) {\n                this.destroyOldObstacleByIndex(i);\n            }\n            this.draw(i);\n        }\n    }\n    checkCollision(player) {\n        const { x, y, width, height } = player.getInfo();\n        for (let i = 0; i < this.obstacles.length; i++) {\n            const obstacle = this.obstacles[i];\n            if ((x + width >= obstacle.x && x + width <= obstacle.x + obstacle.width)\n                && (y + height >= obstacle.y && y + height <= obstacle.y + obstacle.height)\n                || (y + height >= this.canvasHeight)\n                || (y - height <= 0)) {\n                this.sound.hit.play();\n                this.ctx.drawImage(this.image.bang, x, y, 100, 100);\n                return true;\n            }\n        }\n        return false;\n    }\n    createObstacle() {\n        for (let i = 0; i < this.maxObstacles; i++) {\n            const randomHeight = Math.floor(Math.random() * this.canvasHeight / 2);\n            this.obstacles.push(new _Obstacle__WEBPACK_IMPORTED_MODULE_0__.Obstacle(randomHeight, this.width, this.lastX, 0));\n            this.obstacles.push(new _Obstacle__WEBPACK_IMPORTED_MODULE_0__.Obstacle(this.canvasHeight - randomHeight, this.width, this.lastX, randomHeight + this.spaceBetween));\n            this.lastX = this.lastX + this.spaceBetween;\n        }\n    }\n    destroyOldObstacleByIndex(index) {\n        this.obstacles.splice(index, 1);\n    }\n}\n\n\n//# sourceURL=webpack://flappy-bird/./src/Environment.ts?");

/***/ }),

/***/ "./src/ImageController.ts":
/*!********************************!*\
  !*** ./src/ImageController.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ImageController\": () => (/* binding */ ImageController)\n/* harmony export */ });\nclass ImageController {\n    constructor() {\n        this.bang = new Image();\n        this.bang.src = 'sprites/bang.png';\n        this.player = new Image();\n        this.player.src = 'sprites/bird.png';\n        this.background = new Image();\n        this.background.src = 'sprites/background.jpg';\n        this.pipe = new Image();\n        this.pipe.src = 'sprites/pipe.png';\n    }\n}\n\n\n//# sourceURL=webpack://flappy-bird/./src/ImageController.ts?");

/***/ }),

/***/ "./src/Obstacle.ts":
/*!*************************!*\
  !*** ./src/Obstacle.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Obstacle\": () => (/* binding */ Obstacle)\n/* harmony export */ });\nclass Obstacle {\n    constructor(height, width, x = 0, y = 0, color = 'green', counter = false) {\n        this.counted = false;\n        this.color = color;\n        this.height = height;\n        this.width = width;\n        this.x = x;\n        this.y = y;\n    }\n}\n\n\n//# sourceURL=webpack://flappy-bird/./src/Obstacle.ts?");

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\nclass Player {\n    constructor(ctx, image, sound) {\n        this.x = 100;\n        this.y = 200;\n        this.velocity = 0;\n        this.weight = 0.5;\n        this.height = 25;\n        this.width = 25;\n        this.color = 'green';\n        this.score = 0;\n        this.highestScore = 0;\n        this.ctx = ctx;\n        this.image = image;\n        this.sound = sound;\n        this.highestScore = this.getHighestScore();\n    }\n    getInfo() {\n        return {\n            x: this.x,\n            y: this.y,\n            width: this.width,\n            height: this.height\n        };\n    }\n    draw() {\n        this.drawScore();\n        this.ctx.fillStyle = this.color;\n        this.ctx.drawImage(this.image.player, this.x, this.y, this.width * 2, this.height * 2);\n    }\n    update(maxHeight, spacePressed) {\n        if (this.y > maxHeight - this.height) {\n            this.y = maxHeight - this.height;\n            this.velocity = 0;\n        }\n        else {\n            this.velocity += this.weight;\n            this.velocity *= 0.9;\n            this.y += this.velocity;\n        }\n        if (this.y < this.height) {\n            this.y = this.height;\n            this.velocity = 0;\n        }\n        if (spacePressed) {\n            this.velocity -= 2;\n            this.sound.fly.play();\n        }\n    }\n    incrementScore() {\n        this.sound.score.play();\n        this.score += 0.5;\n        if (this.score > this.highestScore) {\n            this.highestScore = this.score;\n        }\n    }\n    getScore() {\n        return this.score;\n    }\n    saveHighestScore() {\n        if (this.score > this.highestScore) {\n            window.localStorage.setItem('HIGHEST', this.score.toString());\n        }\n    }\n    getHighestScore() {\n        const value = window.localStorage.getItem('HIGHEST');\n        return value ? Number(value) : 0;\n    }\n    drawScore() {\n        this.ctx.font = \"25px Georgia\";\n        this.ctx.fillStyle = 'white';\n        this.ctx.fillText(`Score: ${this.score}`, 50, 50);\n        this.ctx.fillText(`Highest score: ${this.highestScore}`, 50, 80);\n    }\n}\n\n\n//# sourceURL=webpack://flappy-bird/./src/Player.ts?");

/***/ }),

/***/ "./src/SoundController.ts":
/*!********************************!*\
  !*** ./src/SoundController.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SoundController\": () => (/* binding */ SoundController)\n/* harmony export */ });\nclass SoundController {\n    constructor() {\n        this.fly = this.createSound('sounds/sfx_swooshing.wav');\n        this.fly.playbackRate = 5;\n        this.hit = this.createSound('sounds/sfx_hit.wav');\n        this.score = this.createSound('sounds/sfx_point.wav');\n    }\n    createSound(src) {\n        return new Audio(src);\n    }\n}\n\n\n//# sourceURL=webpack://flappy-bird/./src/SoundController.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n/* harmony import */ var _Environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Environment */ \"./src/Environment.ts\");\n/* harmony import */ var _ImageController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ImageController */ \"./src/ImageController.ts\");\n/* harmony import */ var _SoundController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SoundController */ \"./src/SoundController.ts\");\n\n\n\n\nclass Game {\n    constructor() {\n        this.spacePressed = false;\n        this.canvas = Game.createCanvas();\n        this.ctx = this.canvas.getContext('2d');\n        this.image = new _ImageController__WEBPACK_IMPORTED_MODULE_2__.ImageController();\n        this.sound = new _SoundController__WEBPACK_IMPORTED_MODULE_3__.SoundController();\n        this.environment = new _Environment__WEBPACK_IMPORTED_MODULE_1__.Environment(this.ctx, this.canvas.height, this.canvas.width, this.image, this.sound);\n        this.player = new _Player__WEBPACK_IMPORTED_MODULE_0__.Player(this.ctx, this.image, this.sound);\n        this.inputHandlers();\n        this.render();\n    }\n    inputHandlers() {\n        window.addEventListener('keydown', ({ keyCode }) => {\n            if (keyCode === 32) {\n                this.spacePressed = true;\n            }\n        });\n        window.addEventListener('keyup', ({ keyCode }) => {\n            if (keyCode === 32) {\n                this.spacePressed = false;\n            }\n        });\n    }\n    static createCanvas() {\n        const canvas = document.createElement('canvas');\n        canvas.width = 1280;\n        canvas.height = 720;\n        canvas.id = 'gameCanvas';\n        document.body.appendChild(canvas);\n        return canvas;\n    }\n    createBackground() {\n        this.ctx.drawImage(this.image.background, 0, 0, this.canvas.width, this.canvas.height);\n    }\n    render() {\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        this.createBackground();\n        this.environment.update(this.player);\n        this.player.draw();\n        this.player.update(this.canvas.height, this.spacePressed);\n        if (this.environment.checkCollision(this.player)) {\n            ;\n            this.endGame();\n            return;\n        }\n        window.requestAnimationFrame(this.render.bind(this));\n    }\n    endGame() {\n        this.ctx.font = \"25px Georgia\";\n        this.ctx.fillStyle = 'white';\n        this.ctx.fillText(`GAME OVER, YOUR SCORE: ${this.player.getScore()}`, this.canvas.width / 2, this.canvas.height / 2);\n        this.player.saveHighestScore();\n    }\n}\nconst game = new Game();\n\n\n//# sourceURL=webpack://flappy-bird/./src/game.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/game.ts");
/******/ 	
/******/ })()
;