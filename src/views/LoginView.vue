<script lang="ts">
import InputPublico from "@/components/InputPublico.vue";
import { defineComponent } from "vue";
import iconeLogin from "../assets/imagens/envelope.svg";
import iconeSenha from "../assets/imagens/chave.svg";
import { LoginServices } from "@/services/LoginServices";
import router from '../router/index'

const loginServices = new LoginServices();
export default defineComponent({
  setup() {
    return {
      iconeLogin,
      iconeSenha,
      loginServices
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
    async efetuarLogin() {
      try {
        if (!this.login && !this.login.trim() && !this.senha && !this.senha.trim()) {
          this.erro = "Favor preencher o formulário";
          return;
        }
        this.loading = true;


        await loginServices.login({login: this.login, senha: this.senha}); 
        router.push({name: "home"})       
        
      } catch (e: any) {
        console.log(e)
        if(e?.response?.data?.erro){
          this.erro = e?.response?.data?.erro;
        }else{
          this.erro = 'Não foi possível efetuar o login, tente novamente'
        }
      }
      this.loading = false;
    },
    setLogin(v: any){
      this.login = v;
    },
    setSenha(v: any){
      this.senha = v;
    }
    

  },
  computed: {
    buttonText(){
      return this.loading ? '... Carregando' : 'Login'
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
      <button @click.enter.prevent="efetuarLogin" :disabled="loading">{{ buttonText }}</button>
      <div class="link">
        <p>Não possui uma conta?</p>
        <a href="#">Faça seu cadastro agora!</a>
      </div>
    </form>
  </div>
</template>
<style lang="scss" src="@/assets/styles/paginaPublica.scss" />
