<script lang="ts">
  import router from '@/router';
  import { defineComponent } from 'vue';
  import { LoginServices } from '@/services/LoginServices';

  const loginServices = new LoginServices();
  export default defineComponent({
    props:{
      titulo: String,
      textoDireita: String,
      showEsquerda: Boolean,
      temIconeEsquerda: Boolean,
      showDireita: Boolean,
      temIconeDireita: Boolean,
    },
    methods:{
      goBack(){
        router.back();
      },
      logout(){
        loginServices.logout();
        router.push({name: 'login'})
      }
    }
})
</script>
<template>
  <div class="container-acoes">
    <img src="../assets/imagens/setaEsquerda.svg" alt="voltar" v-if="showEsquerda && temIconeEsquerda" @click="goBack"/>
    <span v-else-if="showEsquerda && !temIconeEsquerda">Cancelar</span>
    <strong>{{ titulo }}</strong>
    <img src="../assets/imagens/logout.svg" alt="logout" v-if="showDireita && temIconeDireita" @click="logout">
    <span class="principal" v-else-if="showDireita && !temIconeDireita">{{ textoDireita }}</span>
  </div>
</template>
<style lang="scss" src="@/assets/styles/headerAcoes.scss" />