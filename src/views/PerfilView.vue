<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
import { FeedServices } from "@/services/FeedServices";
import Feed from "@/components/Feed.vue";
import HeaderPerfil from "@/components/HeaderPerfil.vue";
import router from "@/router";
import { UsuarioServices } from "@/services/UsuarioServices";

const feedServices = new FeedServices();
const usuarioServices = new UsuarioServices();

export default defineComponent({
  components: { HeaderVue, FooterVue, Feed, HeaderPerfil },
  data() {
    return {
      posts: [],
      usuario: {} as any,
    };
  },
  async mounted() {
    try {
      const loggedId = localStorage.getItem("_id");
      const id = loggedId as String;

      const resultadoUsuario = await usuarioServices.buscarDadosPorId();

      if (!resultadoUsuario || !resultadoUsuario.data) {
        return;
      }
      this.usuario = resultadoUsuario.data;
      const resultado = await feedServices.getFeedPorId(id);
      if (resultado && resultado.data) {
        this.posts = resultado.data;
      }
    } catch (e) {
      console.log(e);
    }
  },
});
</script>
<template>
  <HeaderVue :hide="true" />
  <HeaderPerfil
    :usuario="usuario"
    :titulo="usuario.nome"
    :showEsquerda="false"
    :showDireita="true"
    :temIconeDireita="true"
    v-if="usuario?._id"
  />
  <Feed :posts="posts" :temCabecalho="true" />
  <FooterVue />
</template>
