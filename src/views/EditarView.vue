<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
import HeaderPerfilVue from "@/components/HeaderPerfil.vue";
import FeedVue from "@/components/Feed.vue";
import { FeedServices } from "@/services/FeedServices";
import { UsuarioServices } from "@/services/UsuarioServices";
import HeaderAcoesVue from "@/components/HeaderAcoes.vue";
import InputImagem from "@/components/InputImagem.vue";
import AvatarVue from "@/components/Avatar.vue";

const usuarioServices = new UsuarioServices();

export default defineComponent({
  components: { HeaderVue, FooterVue, HeaderAcoesVue, InputImagem, AvatarVue },
  data() {
    return {
      nome: localStorage.getItem('nome') as String,
      avatar: localStorage.getItem('avatar') as String,
      imagem: {} as any
    }
  },
  computed: {
    getImagem(){
      return this.imagem?.preview ? this.imagem?.preview : this.avatar;
    }
  }
});
</script>
<template>
  <HeaderVue :hide="true" /> 

  <div class="container-editar">
    <HeaderAcoesVue 
      :titulo="'Editar perfil'"
      :showEsquerda="true"
      :showDireita="true"
      :temIconeEsquerda="false"
      :temIconeDireita="false"
      :textoDireita="'Concluir'"
    />
    <AvatarVue :imagem="getImagem"/>
    <button>Alterar foto de perfil</button>
    <input type="file" class="oculto" accept="image/*" ref="referenciaInput" />

    <div class="input">
      <span>Nome</span>
      <input type="text" v-model="nome" placeholder="Informe seu nome" />
      <img src="../assets/imagens/limpar.svg" alt="limpar">
    </div>
  </div>
  <FooterVue />
</template>
<style lang="scss" src="@/assets/styles/editar.scss" />
