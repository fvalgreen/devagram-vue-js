<script lang="ts">
import { defineComponent } from "vue";
import Avatar from "./Avatar.vue";
import curtirIcone from "../assets/imagens/curtir.svg";
import curtidoIcone from "../assets/imagens/curtido.svg";
import comentarioAtivoIcone from "../assets/imagens/comentarioAtivo.svg";
import comentarioInativoIcone from "../assets/imagens/comentarioCinza.svg";
import { FeedServices } from "@/services/FeedServices";
import router from "@/router";

const feedServices = new FeedServices();
const MAX_DESCRICAO = 90;

export default defineComponent({
  setup() {
    return {
      comentarioAtivoIcone,
      loggedUserId: localStorage.getItem("_id"),
      loggedUserAvatar: localStorage.getItem("avatar") ?? "",
      loggedUserNome: localStorage.getItem("nome") ?? "",
      MAX_DESCRICAO,
    };
  },
  data() {
    return {
      showComentario: false,
      comentarioMsg: "",
      showDescricaoFull: false,
    };
  },
  props: {
    post: null,
  },
  methods: {
    navegarParaPerfil() {
      if(this.post?.idUsuario === this.loggedUserId){
        router.push({name: 'perfil'})
      }else{
        router.push("/usuario/" + this.post?.idUsuario);
      }
    },
    async toggleCurtir() {
      try {
        await feedServices.toggleCurtir(this.post?._id);
        const index = this.post?.likes?.findIndex(
          (like: string) => like === this.loggedUserId
        );
        if (index != -1) {
          this.post?.likes?.splice(index, 1);
        } else {
          this.post?.likes?.push(this.loggedUserId);
        }
      } catch (e) {
        console.log(e);
      }
    },
    toggleComentario() {
      this.showComentario = !this.showComentario;
    },
    async enviarComentario() {
      try {
        if (!this.comentarioMsg || !this.comentarioMsg.trim()) {
          return;
        }
        await feedServices.enviarComentario(this.post?._id, this.comentarioMsg);
        this.post?.comentarios?.push({
          usuarioId: this.loggedUserId,
          nome: this.loggedUserNome,
          comentario: this.comentarioMsg,
        });
        this.comentarioMsg = "";
        this.showComentario = false;
      } catch (e) {
        console.log(e);
      }
    },
    toggleDescricaoFull() {
      this.showDescricaoFull = !this.showDescricaoFull;
    },
  },
  components: { Avatar },
  computed: {
    obterIconeCurtir() {
      if (
        this.post?.likes &&
        this.post?.likes.findIndex((e: String) => e === this.loggedUserId) != -1
      ) {
        return curtidoIcone;
      } else {
        return curtirIcone;
      }
    },
    obterIconeComentario() {
      return this.showComentario
        ? comentarioAtivoIcone
        : comentarioInativoIcone;
    },
    exibirDescricao() {
      if (this.showDescricaoFull) {
        return this.post?.descricao;
      }
      return this.post?.descricao.length > MAX_DESCRICAO
        ? this.post?.descricao.substring(0, MAX_DESCRICAO) + "..."
        : this.post?.descricao;
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
        <img
          :src="obterIconeCurtir"
          alt="Curtir/descurtir"
          class="feed-icone"
          @click="toggleCurtir"
        />
        <img
          :src="obterIconeComentario"
          alt="Comentar"
          class="feed-icone"
          @click="toggleComentario"
        />
        <span class="curtidas">
          Curtido por <strong>{{ post?.likes?.length }}</strong> pessoa{{
            post?.likes?.length > 1 ? "s" : ""
          }}
        </span>
      </div>
      <div class="descricao">
        <strong @click="navegarParaPerfil">{{ post?.usuario?.nome }}</strong>
        <p>
          {{ exibirDescricao }}
          <span
            v-if="post?.descricao.length > MAX_DESCRICAO && !showDescricaoFull"
            @click="toggleDescricaoFull"
            class="mais"
            >mais</span
          >
        </p>
      </div>
      <div class="comentarios">
        <div v-for="(comentario, index) in post?.comentarios" :key="index">
          <strong>{{ comentario.nome }}</strong>
          <p>{{ comentario.comentario }}</p>
        </div>
      </div>
    </div>
    <div class="container-comentario" v-if="showComentario">
      <Avatar :imagem="loggedUserAvatar" />
      <input
        type="text"
        v-model="comentarioMsg"
        placeholder="Adicione um comentário ..."
        @keyup.enter="enviarComentario"
      />
      <button type="button" @click.prevent="enviarComentario">Comentar</button>
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/styles/postagem.scss" />
