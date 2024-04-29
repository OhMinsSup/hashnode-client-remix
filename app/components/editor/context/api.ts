export class API {
  public static uploadImage = async () => {
    await new Promise((r) => setTimeout(r, 500));
    return "/images/placeholder-image.jpg";
  };
}

export default API;
