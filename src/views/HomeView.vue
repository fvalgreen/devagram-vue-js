<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderVue from '@/components/Header.vue';
  import FooterVue from '@/components/Footer.vue';

  export default defineComponent({   
    components: { HeaderVue, FooterVue }
  })
</script>
<template>
  <HeaderVue />
  <FooterVue />
</template>