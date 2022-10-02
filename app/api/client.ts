import { QueryClient } from "@tanstack/react-query";
import ky from "ky-universal";

export const apiClient = ky.create({
  prefixUrl: "http://localhost:8080/api/v1",
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("X-Requested-With", "ky");
      },
    ],
  },
});

export const globalClient = new QueryClient();

export const picsumClient = ky.create({
  prefixUrl: "https://picsum.photos/v2/list",
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("X-Requested-With", "ky");
      },
    ],
  },
});
