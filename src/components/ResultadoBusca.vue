<script lang="ts">
import router from "@/router";
import Avatar from "./Avatar.vue";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    nome: String,
    email: String,
    avatar: String,
    id: String,
  },
  methods: {
    irParaUsuario(){
      router.push('/usuario/' + this.id)
    }
  },
  components: {Avatar}
});
</script>
<template>
  <div class="container-resultado" @click="irParaUsuario">
    <Avatar :imagem="avatar" />
    <div class="info">
      <strong>{{ nome }}</strong>
      <span>{{ email }}</span>
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/styles/resultadoBusca.scss" />
