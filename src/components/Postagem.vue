<script lang="ts">
import { defineComponent } from "vue";
import Avatar from "./Avatar.vue";
import curtirIcone from "../assets/imagens/curtir.svg";
import curtidoIcone from "../assets/imagens/curtido.svg";
import comentarioAtivoIcone from "../assets/imagens/comentarioAtivo.svg";
import comentarioInativoIcone from "../assets/imagens/comentarioCinza.svg";
import { FeedServices } from "@/services/FeedServices";


const feedServices = new FeedServices();
export default defineComponent({
  setup() {
    return {
      comentarioAtivoIcone,
      loggedUserId: localStorage.getItem("_id"),
    };
  },
  props: {
    post: null,
  },
  methods: {
    navegarParaPerfil() {},
    async toggleCurtir(){
      try {
        await feedServices.toggleCurtir(this.post?._id);
        const index = this.post?.likes?.findIndex((like: string) => like === this.loggedUserId);
        if(index != -1){
          this.post?.likes?.splice(index, 1);
        }else{
          this.post?.likes?.push(this.loggedUserId)
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  components: { Avatar },
  computed: {
    obterIconeCurtir() {
      if(this.post?.likes && this.post?.likes.findIndex((e : String) => e === this.loggedUserId) != -1){
          return curtidoIcone
        } else {
          return curtirIcone
        }      
    },
  },
});
</script>
<template>
  <div class="container-postagem">
    <div @click="navegarParaPerfil">
      <section class="cabecalho">
        <Avatar :imagem="post?.usuario?.avatar" />
        <strong>{{ post?.usuario?.nome }}</strong>
      </section>
    </div>
    <div class="foto">
      <img :src="post?.foto" alt="Imagem da postagem" />
    </div>
    <div class="rodape">
      <div class="acoes">
        <img :src="obterIconeCurtir" alt="Curtir/descurtir" class="feed-icone" @click="toggleCurtir"/>
        <img :src="comentarioAtivoIcone" alt="Comentar" class="feed-icone"/>
        <span class="curtidas">
          Curtido por <strong>{{ post?.likes?.length }}</strong> pessoa{{ post?.likes?.length > 1 ? 's' : '' }}
        </span>
      </div>
      <div class="descricao">
        <strong>{{ post?.usuario?.nome }}</strong>
        <p>
          {{ post?.descricao }}
        </p>
      </div>
      <div class="comentarios">
        <div v-for="(comentario, index) in post?.comentarios" :key="index">
          <strong>{{ comentario.nome }}</strong>
          <p>{{ comentario.comentario }}</p>

        </div>
      </div>
    </div>
    <div class="container-comentario">
      <!-- implementar comentário -->
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/styles/postagem.scss" />
