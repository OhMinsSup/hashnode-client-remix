import type { Env } from "../env";

export class ImagesService {
  constructor(private readonly env: Env) {}

  /**
   * @version 2023-08-17
   * @description 이미지 로드
   * @param request
   */
  imagesLoader(request: Request) {
    const url = new URL(request.url);
    const testUrl =
      "https://imagedelivery.net/2CFsSYhLFzsS6yQLBNWYwA/4c14ae83-71b3-4d56-7997-f741a26a7e00/public";

    let resultImg: Uint8Array | undefined;

    return new Response(resultImg, {
      status: 200,
      headers: {
        "Content-Type": "image/avif",
        "Cache-Control": `public, max-age=${60 * 60 * 24 * 365}`,
      },
    });
  }
}
