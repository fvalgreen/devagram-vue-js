<script lang="ts">
import { defineComponent } from "vue";
import HeaderAcoes from "./HeaderAcoes.vue";
import AvatarVue from "./Avatar.vue";
import router from "@/router";
import { UsuarioServices } from "../services/UsuarioServices";

const usuarioService = new UsuarioServices();
export default defineComponent({
  setup() {
    return {
      loggedId: localStorage.getItem("_id"),
    };
  },
  props: {
    usuario: {} as any,
    titulo: String,
    showEsquerda: Boolean,
    temIconeEsquerda: Boolean,
    showDireita: Boolean,
    temIconeDireita: Boolean,
  },
  components: { HeaderAcoes, AvatarVue },
  computed: {
    obterTextoBotaoPrincipal() {
      if (this.usuario?._id === this.loggedId) {
        return "Editar perfil";
      } else if (!this.usuario?.segueEsseUsuario) {
        return "Seguir";
      } else {
        return "Deixar de seguir";
      }
    },
    obterClasseBotaoPrincipal(){
      if (this.usuario?._id === this.loggedId) {
        return "";
      } else if (!this.usuario?.segueEsseUsuario) {
        return "principal";
      } else {
        return "";
      }
    }
  },
  methods: {
    async acaoBotao() {
      if (this.usuario?._id === this.loggedId) {
        router.push({ name: "editar" });
      }

      try {
        await usuarioService.toggleFollow(this.usuario?._id);
        this.usuario.segueEsseUsuario = !this.usuario.segueEsseUsuario;

        if(this.usuario.segueEsseUsuario){
          this.usuario.seguidores += 1;
        }else{
          this.usuario.seguidores -= 1;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
</script>
<template>
  <div class="container-header-perfil">
    <HeaderAcoes
      :titulo="titulo"
      :showEsquerda="showEsquerda"
      :temIconeEsquerda="temIconeEsquerda"
      :showDireita="showDireita"
      :temIconeDireita="temIconeDireita"
    />
    <div class="perfil">
      <AvatarVue :imagem="usuario?.avatar" />
      <div class="infos">
        <div class="dados">
          <div class="status">
            <strong>{{ usuario?.publicacoes }}</strong>
            <span>Publicações</span>
          </div>
          <div class="status">
            <strong>{{ usuario?.seguidores }}</strong>
            <span>Seguidores</span>
          </div>
          <div class="status">
            <strong>{{ usuario?.seguindo }}</strong>
            <span>Seguindo</span>
          </div>
        </div>
        <button :class="obterClasseBotaoPrincipal" @click="acaoBotao">
          {{ obterTextoBotaoPrincipal }}
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/styles/headerPerfil.scss" />
