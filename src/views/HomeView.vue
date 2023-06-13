<script lang="ts">
  import router from '@/router';
  import { LoginServices } from '@/services/LoginServices';
  import { defineComponent } from 'vue';

  const loginServices = new LoginServices;
  export default defineComponent({   
    setup(){
      return {
        loginServices
      }
    },
    methods: {
      sair(){
        loginServices.logout();
        router.push({name: "login"})  
        
      }
    }
  })
</script>
<template>
  <div>
    <button @click.prevent="sair">Sair</button>
  </div>
</template>