import { HttpApiServices } from "./HttpApiServices";

export class UsuarioServices extends HttpApiServices {
  async pesquisar(filtro: String) {
    return await this.get("/pesquisa?filtro=" + filtro);
  }

  async buscarDadosPorId(id: String) {
    if (id) {
      return await this.get("/pesquisa?id=" + id);
    }
    return await this.get("/usuario");
  }

  async toggleFollow(id: String){
    return await this.put('/seguir?id=' + id)
  }
}
