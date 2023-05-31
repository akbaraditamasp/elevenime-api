interface EmbeddedVideo {
    server: string;
    url: string;
}
export default function getVideo(id: string): Promise<EmbeddedVideo[]>;
export {};
