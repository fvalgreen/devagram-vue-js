<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
import { FeedServices } from "@/services/FeedServices";
import { UsuarioServices } from "@/services/UsuarioServices";
import Feed from "@/components/Feed.vue";
import router from "@/router";

const feedServices = new FeedServices();
const usuarioServices = new UsuarioServices();

export default defineComponent({
  components: { HeaderVue, FooterVue, Feed },
  data() {
    return {
      posts: [],
      usuario: {} as any,
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
});
</script>
<template>
  <HeaderVue :hide="true" />
  <Feed :posts="posts" :temCabecalho="true"/>
  <FooterVue />
</template>
