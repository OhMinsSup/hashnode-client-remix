# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

You will be running two processes during development:

- The Miniflare server (miniflare is a local environment for Cloudflare Workers)
- The Remix development server

Both are started with one command:

```sh
npm run dev
```

Open up [http://127.0.0.1:8787](http://127.0.0.1:8787) and you should be ready to go!

If you want to check the production build, you can stop the dev server and run following commands:

```sh
npm run build
npm start
```

Then refresh the same URL in your browser (no live reload for production builds).

## Deployment

If you don't already have an account, then [create a cloudflare account here](https://dash.cloudflare.com/sign-up) and after verifying your email address with Cloudflare, go to your dashboard and set up your free custom Cloudflare Workers subdomain.

Once that's done, you should be able to deploy your app:

```sh
npm run deploy
```

# Issues Notes

# Cloudflare Issue??

[ ] - Your worker called response.clone(), but did not read the body of both clones. This is wasteful, as it forces the system to buffer the entire response body in memory, rather than streaming it through. This may cause your worker to be unexpectedly terminated for going over the memory limit. If you only meant to copy the response headers and metadata (e.g. in order to be able to modify them), use `new Response(response.body, response)` instead.

https://stackoverflow.com/questions/55920957/cloudflare-worker-typeerror-one-time-use-body

https://github.com/cloudflare/workers-sdk/issues/3259

https://github.com/cloudflare/workers-sdk/blob/main/packages/pages-shared/asset-server/handler.ts#L340

[ ] - cloudflare workerd에서는 credentials를 지원하지 않음, 하지만 cloudflare workerd에는 구현체 정보가 있음? credentials: "include",

# Update

- [ ] 유저 로그인 페이지 및 로그인이 되어있을 경우 진입 막는 코드 수정

- [ ] actions의 에러 및 고도화

- [ ] 번들사이즈 축소

# Remix.run Cloudflare

[cloudflare env](https://developers.cloudflare.com/workers/platform/environment-variables/) 환경변수 설정
