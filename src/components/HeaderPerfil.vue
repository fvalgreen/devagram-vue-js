<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderAcoes from './HeaderAcoes.vue';
  export default defineComponent({
    props:{
      usuario: {} as any,
      titulo: String,
      showEsquerda: Boolean,
      temIconeEsquerda: Boolean,
      showDireita: Boolean,
      temIconeDireita: Boolean,
    },
    components: {HeaderAcoes}
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
  </div>
</template>
<style lang="scss" src="@/assets/styles/headerPerfil.scss" />