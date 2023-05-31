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
function getGenre({ page = 1, id, }) {
    return __awaiter(this, void 0, void 0, function* () {
        let content;
        try {
            let url = `/genre/${id}`;
            if (page !== 1) {
                url = `/genre/${id}/page/${page}`;
            }
            const response = yield client_1.client.get(url);
            content = (0, cheerio_1.load)(response.data);
        }
        catch (e) {
            throw new Error(e);
        }
        const data = content(".animposx").map((i, el) => {
            const id = content(el)
                .find("a")
                .first()
                .attr("href")
                .match(/https:\/\/samehadaku\.day\/anime\/(.*)\//);
            return {
                id: id[1],
                title: content(el).find(".title").text().trim(),
                image: content(el).find(".anmsa").attr("src"),
                rating: Number(content(el).find(".score").text()),
            };
        });
        return data.toArray();
    });
}
exports.default = getGenre;
