<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
import { FeedServices } from "@/services/FeedServices";
import Feed from "@/components/Feed.vue";
import HeaderPerfil from "@/components/HeaderPerfil.vue";
import router from "@/router";
import { UsuarioServices } from "@/services/UsuarioServices";
import Loading from 'vue3-loading-overlay';

const feedServices = new FeedServices();
const usuarioServices = new UsuarioServices();

export default defineComponent({
  components: { HeaderVue, FooterVue, Feed, HeaderPerfil, Loading },
  data() {
    return {
      posts: [],
      usuario: {} as any,
      loading: false
    };
  },
  async mounted() {
    try {
      this.loading = true;
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
    this.loading = false;
  },
});
</script>
<template>
  <Loading :active="loading" :can-cancel="false" color="#5e49ff" :is-full-page="true"/>
  <HeaderVue :hide="true" />
  <HeaderPerfil
    :usuario="usuario"
    :titulo="usuario.nome"
    :showEsquerda="false"
    :showDireita="true"
    :temIconeDireita="true"
    v-if="usuario?._id"
  />
  <Feed :posts="posts" :temCabecalho="true" v-if="posts && posts.length > 0"/>
  <FooterVue />
</template>
