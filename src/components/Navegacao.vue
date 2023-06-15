<script lang="ts">
  import { defineComponent } from 'vue';
  import homeAtivoIcone from '../assets/imagens/homeAtivo.svg';
  import homeInativoIcone from '../assets/imagens/homeCinza.svg';
  import postAtivoIcone from '../assets/imagens/publicacaoAtivo.svg';
  import postInativoIcone from '../assets/imagens/publicacaoCinza.svg';
  import userAtivoIcone from '../assets/imagens/usuarioAtivo.svg';
  import userInativoIcone from '../assets/imagens/usuarioCinza.svg';
  import router from '../router/index'

  export default defineComponent({  
    methods: {
      efetuarNavegacao(name: string){
        router.push({name});
      },
      getIcone(name: string){
        switch(name){
          case 'home':
            if(router.currentRoute.value.name === 'home'){
              return homeAtivoIcone;
            }
            return homeInativoIcone;
          case 'publicacao':
            if(router.currentRoute.value.name === 'publicacao'){
              return postAtivoIcone;
            }
            return postInativoIcone;
          case 'perfil':
            if(router.currentRoute.value.name === 'perfil'){
              return userAtivoIcone;
            }
            return userInativoIcone;
          default:
            return '';
        }
      }
    }
  })
</script>
<template>
  <nav class="container-navegacao">
    <ul>
      <li @click="efetuarNavegacao('home')">
        <img :src="getIcone('home')" alt="Icone home" class="icone-nav">
      </li>
      <li @click="efetuarNavegacao('publicacao')">
        <img :src="getIcone('publicacao')" alt="Icone publicação" class="icone-nav">
      </li>
      <li @click="efetuarNavegacao('perfil')">
        <img :src="getIcone('perfil')" alt="Icone perfil" class="icone-nav">
      </li>
    </ul>
  </nav>
</template>