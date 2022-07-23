import ky from "ky-universal";

export const apiClient = ky.extend({
  prefixUrl: "http://localhost:8000/api/v1",
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("X-Requested-With", "ky");
      },
    ],
  },
});
