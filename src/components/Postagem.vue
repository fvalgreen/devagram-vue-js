<script lang="ts">
import { defineComponent } from "vue";
import Avatar from "./Avatar.vue";
import curtirIcone from "../assets/imagens/curtir.svg";
import curtidoIcone from "../assets/imagens/curtido.svg";
import comentarioAtivoIcone from "../assets/imagens/comentarioAtivo.svg";
import comentarioInativoIcone from "../assets/imagens/comentarioCinza.svg";
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
  },
  components: { Avatar },
  computed: {
    obterIconeCurtir() {
      return this.post?.likes &&
        this.post?.likes.findIndex((e: String) => {
          e === this.loggedUserId;
        }) != -1
        ? curtidoIcone
        : curtirIcone;
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
        <img :src="obterIconeCurtir" alt="Curtir/descurtir" />
        <img :src="comentarioAtivoIcone" alt="Comentar" />
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
<!-- <style lang="scss" src="@/assets/styles/feed.scss" /> -->
