<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
import HeaderPerfilVue from "@/components/HeaderPerfil.vue";
import FeedVue from "@/components/Feed.vue";
import { FeedServices } from "@/services/FeedServices";
import { UsuarioServices } from "@/services/UsuarioServices";
import router from "@/router";
import Loading from 'vue3-loading-overlay';

const feedServices = new FeedServices();
const usuarioServices = new UsuarioServices();

export default defineComponent({
  components: { HeaderVue, FooterVue, FeedVue, HeaderPerfilVue, Loading },
  data() {
    return {
      posts: [],
      usuario: {} as any,
      mobile: window.innerWidth <= 992,
      loading: false
    };
  },
  async mounted() {
    try {
      this.loading = true
      if (!this.$route.params?.id) {
        return router.push({ name: "home" });
      }
      const id = this.$route.params?.id as String;
      const usuarioResult = await usuarioServices.buscarDadosPorId(id);

      if (!usuarioResult || !usuarioResult.data) {
        return;
      }

      this.usuario = usuarioResult.data;

      const resultado = await feedServices.getFeedPorId(id);
      if (resultado && resultado.data) {
        this.posts = resultado.data;
      }
    } catch (e) {
      console.log(e);
    }
    this.loading = false
  },
  computed: {
    getShowLeft(){
      return this.mobile ? true : false;
    }
  }
});
</script>
<template>
  <Loading :active="loading" :can-cancel="false" color="#5e49ff" :is-full-page="true"/>
  <HeaderVue :hide="true" />
  <HeaderPerfilVue 
    :usuario="usuario"
    :titulo="usuario.nome"
    :showEsquerda="getShowLeft"
    :temIconeEsquerda="true"
    :showDireita="false"
    v-if="usuario?._id"
  />
  <FeedVue :posts="posts" :temCabecalho="true" v-if="posts && posts.length > 0"/>
  <FooterVue />
</template>
