<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
import { UsuarioServices } from "@/services/UsuarioServices";
import HeaderAcoesVue from "@/components/HeaderAcoes.vue";
import AvatarVue from "@/components/Avatar.vue";
import router from "@/router";

const usuarioServices = new UsuarioServices();

export default defineComponent({
  components: { HeaderVue, FooterVue, HeaderAcoesVue, AvatarVue },
  data() {
    return {
      nome: localStorage.getItem('nome') as String,
      avatar: localStorage.getItem('avatar') as String,
      imagem: {} as any
    }
  },
  computed: {
    getImagem(){
      return this.imagem?.preview ? this.imagem?.preview : this.avatar;
    }
  },
  methods:{
    limpar(){
      this.nome = ""
    },
    abrirSeletor(){
      const input = this.$refs.referenciaInput as HTMLElement;

      input.click()
    },
    selecionarImagem(event: any){
      if(event?.target?.files && event?.target?.files.length > 0){
        const arquivo = event?.target?.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(arquivo);
        fileReader.onloadend = () => {
          const imagemFinal = {
            preview: fileReader.result,
            arquivo
          };
          this.imagem = imagemFinal;
        }
      }
    },
    async concluirEdicao(){
      try {  
        if(!this.nome && !this.imagem.arquivo){
          return;
        }

        const requisicaoBody = new FormData();

        if(this.nome){
          requisicaoBody.append('nome', this.nome.toString());

        }

        if(this.imagem.arquivo){
          requisicaoBody.append('file', this.imagem.arquivo)
        }
        
        await usuarioServices.atualizar(requisicaoBody)

        if(this.nome){
          localStorage.setItem('nome', this.nome.toString());

        }

        if(this.imagem.arquivo){
          localStorage.setItem('avatar', this.imagem.preview)
        }

        return router.back();


      } catch (e: any) {
        console.log(e)
        if(e?.response?.data?.erro){
          console.log(e?.response?.data?.erro);
        }else{
          console.log('Não foi possível efetuar a ediçao do perfil, tente novamente', e);
        }
      }
    }
  }
});
</script>
<template>
  <HeaderVue :hide="true" /> 

  <div class="container-editar">
    <HeaderAcoesVue 
      titulo='Editar perfil'
      :showEsquerda="true"
      :showDireita="true"
      :temIconeEsquerda="false"
      :temIconeDireita="false"
      textoDireita="Concluir"
      @acoesCallback="concluirEdicao"
    />
    <AvatarVue :imagem="getImagem" @click="abrirSeletor"/>
    <button @click="abrirSeletor">Alterar foto de perfil</button>
    <input type="file" class="oculto" accept="image/*" ref="referenciaInput" @input="selecionarImagem"/>

    <div class="input">
      <span>Nome</span>
      <input type="text" v-model="nome" placeholder="Informe seu nome" />
      <img src="../assets/imagens/limpar.svg" alt="limpar" @click="limpar" v-if="nome">
    </div>
  </div>
  <FooterVue />
</template>
<style lang="scss" src="@/assets/styles/editar.scss" />
