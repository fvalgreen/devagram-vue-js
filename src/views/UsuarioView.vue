<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
import HeaderPerfilVue from "@/components/HeaderPerfil.vue";
import FeedVue from "@/components/Feed.vue";
import { FeedServices } from "@/services/FeedServices";
import { UsuarioServices } from "@/services/UsuarioServices";
import router from "@/router";

const feedServices = new FeedServices();
const usuarioServices = new UsuarioServices();

export default defineComponent({
  components: { HeaderVue, FooterVue, FeedVue, HeaderPerfilVue },
  data() {
    return {
      posts: [],
      usuario: {} as any,
      mobile: window.innerWidth <= 992,
    };
  },
  async mounted() {
    try {
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
  },
  computed: {
    getShowLeft(){
      return this.mobile ? true : false;
    }
  }
});
</script>
<template>
  <HeaderVue :hide="true" />
  <HeaderPerfilVue 
    :usuario="usuario"
    :titulo="usuario.nome"
    :showEsquerda="getShowLeft"
    :temIconeEsquerda="true"
    :showDireita="false"
    v-if="usuario?._id"
  />
  <FeedVue :posts="posts" :temCabecalho="true"/>
  <FooterVue />
</template>
