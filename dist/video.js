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
const getEmbedded = (id, nume) => __awaiter(void 0, void 0, void 0, function* () {
    const form = new FormData();
    form.append("action", "player_ajax");
    form.append("post", id);
    form.append("nume", nume);
    form.append("type", "schtml");
    const response = yield client_1.client.post("/wp-admin/admin-ajax.php", form);
    const content = (0, cheerio_1.load)(response.data);
    return content("iframe").attr("src");
});
function getVideo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let content;
        try {
            const response = yield client_1.client.get(id);
            content = (0, cheerio_1.load)(response.data);
        }
        catch (e) {
            throw new Error(e);
        }
        const embeds = [];
        for (const el of content("#server li")) {
            const embeddedId = content(el).find("div").first().attr("data-post");
            const nume = content(el).find("div").first().attr("data-nume");
            embeds.push({
                server: content(el).find("div").first().text().trim(),
                url: yield getEmbedded(embeddedId, nume),
            });
        }
        return embeds;
    });
}
exports.default = getVideo;
