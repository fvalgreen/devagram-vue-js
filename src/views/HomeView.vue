<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderVue from '@/components/Header.vue';
  import FooterVue from '@/components/Footer.vue';
  import {FeedServices} from '@/services/FeedServices';
  import Feed from '@/components/Feed.vue';

  const feedServices = new FeedServices();

  export default defineComponent({   
    data(){
      return{
        posts: []
      }
    },
    components: { HeaderVue, FooterVue, Feed },
    async mounted(){
      try {
        const resultado = await feedServices.getFeedPrincipal()
        if(resultado && resultado.data){
          this.posts = resultado.data
        }
      } catch (e) {
        console.log(e)
      }
    }
  })
</script>
<template>
  <HeaderVue />
  <Feed :posts="posts"/>
  <FooterVue />
</template>