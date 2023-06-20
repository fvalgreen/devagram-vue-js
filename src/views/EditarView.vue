<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
import HeaderPerfilVue from "@/components/HeaderPerfil.vue";
import FeedVue from "@/components/Feed.vue";
import { FeedServices } from "@/services/FeedServices";
import { UsuarioServices } from "@/services/UsuarioServices";
import HeaderAcoesVue from "@/components/HeaderAcoes.vue";

const usuarioServices = new UsuarioServices();

export default defineComponent({
  components: { HeaderVue, FooterVue, HeaderAcoesVue },
  data() {
    return {
    };
  }
});
</script>
<template>
  <HeaderVue :hide="true" /> 
  <HeaderAcoesVue 
    :titulo="'Editar perfil'"
    :showEsquerda="true"
    :showDireita="true"
    :temIconeEsquerda="false"
    :temIconeDireita="false"
    :textoDireita="'Concluir'"

  />
  <FooterVue />
</template>
