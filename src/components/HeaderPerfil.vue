<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderAcoes from './HeaderAcoes.vue';
  import AvatarVue from './Avatar.vue';
  export default defineComponent({
    props:{
      usuario: {} as any,
      titulo: String,
      showEsquerda: Boolean,
      temIconeEsquerda: Boolean,
      showDireita: Boolean,
      temIconeDireita: Boolean,
    },
    components: { HeaderAcoes, AvatarVue }
})
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
      <AvatarVue :imagem="usuario?.avatar"/>
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
        <button>Seguir</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/styles/headerPerfil.scss" />