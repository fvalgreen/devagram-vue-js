import { HttpApiServices } from "./HttpApiServices";

export class FeedServices extends HttpApiServices{
  async getFeedPrincipal(){
    return await this.get('/feed');
  }
  async getFeedPorId(id: String){
    console.log(id)
    return await this.get(`/feed?id=${id}`);
  }

  async toggleCurtir(id: string){
    return this.put('/like?id=' + id)
  }

  async enviarComentario(id:String, comentario: String){
    return this.put('/comentario?id=' + id, {comentario})
  }
}