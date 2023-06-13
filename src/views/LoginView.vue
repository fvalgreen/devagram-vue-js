<script lang="ts">
import InputPublico from "@/components/inputPublico.vue";
import { defineComponent } from "vue";
import iconeLogin from "../assets/imagens/envelope.svg";
import iconeSenha from "../assets/imagens/chave.svg";
export default defineComponent({
  setup() {
    return {
      iconeLogin,
      iconeSenha,
    };
  },
  data() {
    return {
      login: "",
      senha: "",
      loading: false,
      erro: ""
    };
  },
  methods: {
    efetuarLogin() {
      if (!this.login && !this.senha) {
        this.erro = "Favor preencher o formulário";
        return;
      }
      alert("Login efetuado: " + this.login + " " + this.senha);
    },
    setLogin(v: any){
      this.login = v;
    },
    setSenha(v: any){
      this.senha = v;
    }
    

  },
  components: { InputPublico },
});
</script>
<template>
  <div class="container-publico">
    <img src="../assets/imagens/logo.svg" alt="Logo Devagram" class="logo" />
    <form>
      <p v-if="erro" class="erro">{{ erro }}</p>
      <InputPublico
        alt="Insira o Login"
        :icone="iconeLogin"
        tipo="text"
        placeHolder="Email"
        :modelValue="login"
        @setInput="setLogin"
      />
      <InputPublico
        alt="Insira a Senha"
        :icone="iconeSenha"
        tipo="password"
        placeHolder="Senha"
        :modelValue="senha"
        @setInput="setSenha"
      />
      <button @click.enter.prevent="efetuarLogin">Login</button>
      <div class="link">
        <p>Não possui uma conta?</p>
        <a href="#">Faça seu cadastro agora!</a>
      </div>
    </form>
  </div>
</template>
<style lang="scss" src="@/assets/styles/paginaPublica.scss" />
