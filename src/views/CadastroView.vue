<script lang="ts">
import InputPublico from "@/components/InputPublico.vue";
import { defineComponent } from "vue";
import iconeAvatar from "../assets/imagens/avatar.svg";
import iconeCamera from "../assets/imagens/camera.svg";
import iconeUsuario from "../assets/imagens/usuarioAtivo.svg";
import iconeEmail from "../assets/imagens/envelope.svg";
import iconeSenha from "../assets/imagens/chave.svg";
import router from '../router'
import InputImagem from "@/components/InputImagem.vue";
import {CadastroServices} from '../services/CadastroServices'

const cadastroServices = new CadastroServices()

export default defineComponent({
  setup() {
    return {
      iconeEmail,
      iconeSenha,
      iconeAvatar,
      iconeCamera,
      iconeUsuario,
    };
  },
  data() {
    return {
      nome: "",
      email: "",
      senha: "",
      confimarSenha: "",
      loading: false,
      erro: "",
      imagem: {} as any
    };
  },
  methods: {
    async cadastrar() {
      try {
        this.erro = '';
        if(!this.nome || !this.nome.trim() 
        || !this.email || !this.email.trim()
        || !this.senha || !this.senha.trim()
        || !this.confimarSenha || !this.confimarSenha.trim()
        ){
          return this.erro = "Favor preencher todos os campos do formulário";
        };
        
        if(this.senha !== this.confimarSenha){
          return this.erro = "Senha e confirmação não são iguais"
        }
        this.loading = true;

        const forDataRequisicao = new FormData();

        forDataRequisicao.append('nome', this.nome);
        forDataRequisicao.append('email', this.email);
        forDataRequisicao.append('senha', this.senha);

        if(this.imagem.arquivo){
          forDataRequisicao.append('file', this.imagem.arquivo);
        }

        await cadastroServices.cadastrar(forDataRequisicao)
        router.push({name: 'login', query: { cadastroComSucesso: 'true'}})

        
      } catch (e: any) {
        console.log(e);
        if (e?.response?.data?.erro) {
          this.erro = e?.response?.data?.erro;
        } else {
          this.erro = "Não foi possível efetuar o cadastro, tente novamente";
        }
      }
      this.loading = false;
    },
    setEmail(v: any) {
      this.email = v;
    },
    setSenha(v: any) {
      this.senha = v;
    },
    setConfirmarSenha(v: any) {
      this.confimarSenha = v;
    },
    setNome(v: any) {
      this.nome = v;
    },
    setImagem(v: any) {
      this.imagem = v;
    },
  },
  computed: {
    buttonText() {
      return this.loading ? "... Carregando" : "Cadastrar";
    },
  },
  components: { InputPublico, InputImagem },
});
</script>
<template>
  <div :class='["container-publico", "cadastro"]'>
    <img src="../assets/imagens/logo.svg" alt="Logo Devagram" class="logo" />
    <form>
      <InputImagem alt="Imagem do usuário" :imagem="imagem" @setImagem="setImagem"/>
      
      <p v-if="erro" class="erro">{{ erro }}</p>
      <InputPublico
        alt="Insira o Nomel"
        :icone="iconeUsuario"
        tipo="text"
        placeHolder="Nome"
        :modelValue="nome"
        @setInput="setNome" 
      />
      <InputPublico
        alt="Insira o Email"
        :icone="iconeEmail"
        tipo="text"
        placeHolder="Email"
        :modelValue="email"
        @setInput="setEmail"
      />
      <InputPublico
        alt="Insira a Senha"
        :icone="iconeSenha"
        tipo="password"
        placeHolder="Senha"
        :modelValue="senha"
        @setInput="setSenha"
      />
      <InputPublico
        alt="Confirme a Senha"
        :icone="iconeSenha"
        tipo="password"
        placeHolder="Confirmar Senha"
        :modelValue="confimarSenha"
        @setInput="setConfirmarSenha"
      />
      <button @click.enter.prevent="cadastrar" :disabled="loading">
        {{ buttonText }}
      </button>
      <div class="link">
        <p>Já possui uma conta?</p>
        <RouterLink :to="{name: 'login'}">Faça seu Login agora!</RouterLink>
      </div>
    </form>
  </div>
</template>
<style lang="scss" src="@/assets/styles/paginaPublica.scss" />
