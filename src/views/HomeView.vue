<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderVue from '@/components/Header.vue';
  import FooterVue from '@/components/Footer.vue';
  import {FeedServices} from '@/services/FeedServices';
  import Feed from '@/components/Feed.vue';
  import Loading from 'vue3-loading-overlay';

  const feedServices = new FeedServices();

  export default defineComponent({   
    data(){
      return{
        posts: [],
        loading: false
      }
    },
    components: { HeaderVue, FooterVue, Feed, Loading },
    async mounted(){
      try {
        this.loading = true;
        const resultado = await feedServices.getFeedPrincipal()
        if(resultado && resultado.data){
          this.posts = resultado.data
        }
      } catch (e) {
        console.log(e)
        
      }
      this.loading = false
    }
  })
</script>
<template>
  <Loading :active="loading" :can-cancel="false" color="#5e49ff" :is-full-page="true"/>
  <HeaderVue />
  <Feed :posts="posts" v-if="posts && posts.length > 0"/>
  <FooterVue />
</template>