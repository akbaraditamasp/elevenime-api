import { CheerioAPI, load } from "cheerio";
import { client } from "./client";
import * as FormData from "form-data";

interface EmbeddedVideo {
  server: string;
  url: string;
}

const getEmbedded = async (id: string, nume: string) => {
  const form = new FormData();
  form.append("action", "player_ajax");
  form.append("post", id);
  form.append("nume", nume);
  form.append("type", "schtml");

  const response = await client.post("/wp-admin/admin-ajax.php", form);

  const content = load(response.data);

  return content("iframe").attr("src");
};

export default async function getVideo(id: string): Promise<EmbeddedVideo[]> {
  let content: CheerioAPI;

  try {
    const response = await client.get(id);
    content = load(response.data);
  } catch (e) {
    throw new Error(e);
  }

  const embeds: EmbeddedVideo[] = [];

  for (const el of content("#server li")) {
    const embeddedId = content(el).find("div").first().attr("data-post");
    const nume = content(el).find("div").first().attr("data-nume");

    embeds.push({
      server: content(el).find("div").first().text().trim(),
      url: await getEmbedded(embeddedId, nume),
    } as EmbeddedVideo);
  }

  return embeds;
}
