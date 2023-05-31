"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const client_1 = require("./client");
function animeInfo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let content;
        try {
            const response = yield client_1.client.get(`/anime/${id}`);
            content = (0, cheerio_1.load)(response.data);
        }
        catch (e) {
            throw new Error(e);
        }
        return {
            id,
            title: content("#infoarea .entry-title")
                .text()
                .replace("Nonton Anime ", ""),
            image: content("#infoarea .anmsa").attr("src"),
            rating: Number(content("#infoarea .rtg span[itemprop=ratingValue]").text()),
            synopsis: content("#infoarea .desc .entry-content").text().trim(),
            categories: content("#infoarea .genre-info a")
                .map((i, el) => {
                const id = content(el)
                    .attr("href")
                    .match(/https:\/\/samehadaku\.day\/genre\/(.*)/);
                return {
                    id: id[1],
                    name: content(el).text(),
                };
            })
                .toArray(),
            informations: content(".infox .spe span")
                .map((i, el) => {
                const type = content(el).find("b").text();
                content(el).find("b").remove();
                return {
                    type,
                    value: content(el).text().trim(),
                };
            })
                .toArray(),
            episodes: content(".listeps li")
                .map((i, el) => {
                const id = content(el)
                    .find("a")
                    .first()
                    .attr("href")
                    .match(/https:\/\/samehadaku\.day\/(.*)\//);
                return {
                    id: id[1],
                    value: content(el).find("a").first().text(),
                };
            })
                .toArray(),
        };
    });
}
exports.default = animeInfo;
