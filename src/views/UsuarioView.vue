<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderVue from '@/components/Header.vue';
  import FooterVue from '@/components/Footer.vue';
  import {FeedServices} from '@/services/FeedServices';
  import Feed from '@/components/Feed.vue';
  import router from '@/router';

  const feedServices = new FeedServices();

  export default defineComponent({   
    components: { HeaderVue, FooterVue, Feed },
    data(){
      return{
        posts: []
      }
    },
    async mounted(){
      try {
        if(!this.$route.params?.id){
          return router.push({name: 'home'})
        }
        const id = this.$route.params?.id as String;
        const resultado = await feedServices.getFeedPorId(id);   
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