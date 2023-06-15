<script lang="ts">
  import { defineComponent } from 'vue';
  import avatarImagem from '../assets/imagens/avatar.svg';
  export default defineComponent({
    props:{
      imagem: String
    },
    computed:{
      escolherAvatar(): string{
        return this.imagem ? this.imagem : avatarImagem
      }
    }
})
</script>
<template>
  <img :src="escolherAvatar" alt="Foto usuário" class="avatar">
</template>
<style lang="scss" src="@/assets/styles/footer.scss" />