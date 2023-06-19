import { HttpApiServices } from "./HttpApiServices";

export class UsuarioServices extends HttpApiServices{
  async pesquisar(filtro: String){
    return await this.get('/pesquisa?filtro=' + filtro)
  }
}