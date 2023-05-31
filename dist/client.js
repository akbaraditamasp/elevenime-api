"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const axios_1 = require("axios");
exports.client = axios_1.default.create({
    baseURL: "https://samehadaku.day",
    maxRedirects: 1,
});
