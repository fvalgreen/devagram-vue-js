import { useAccessTokenStore } from "@/stores/accessToken";
import { HttpApiServices } from "./HttpApiServices";

export class LoginServices extends HttpApiServices {
  async login(body: any) {
    const store = useAccessTokenStore();
    const { data } = await this.post("/login", body);

    localStorage.setItem("token", data.token);
    store.setToken(data.token)
    localStorage.setItem("email", data.email);

    const userResponse = await this.get("/usuario");
    if (userResponse && userResponse.data) {
      const usuario = userResponse.data;
      localStorage.setItem("_id", usuario._id);
      localStorage.setItem("nome", usuario.nome);

      if (usuario.avatar) {
        localStorage.setItem("avatar", usuario.avatar);
      }
    }
  }

  logout() {
    const store = useAccessTokenStore();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("nome");
    localStorage.removeItem("_id");
    localStorage.removeItem("avatar");
    store.setToken('')
  }
}
