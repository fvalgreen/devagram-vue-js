import { HttpApiServices } from "./HttpApiServices";

export class FeedServices extends HttpApiServices{
  async getFeedPrincipal(){
    return await this.get('/feed');
  }
  async getFeedPorId(id: String){
    return await this.get('/feed?id=' + id);
  }

  async toggleCurtir(id: string){
    return this.put('/like?id=' + id)
  }
}