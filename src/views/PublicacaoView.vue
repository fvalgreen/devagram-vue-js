<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
import HeaderAcoesVue from "@/components/HeaderAcoes.vue";
import { PublicacaoServices } from "../services/PublicacaoServices";
import router from "@/router";

const publicacaoServices = new PublicacaoServices();

export default defineComponent({
  components: { HeaderVue, FooterVue, HeaderAcoesVue },
  data() {
    return {
      descricao: "",
      imagem: {} as any,
      mobile: window.innerWidth <= 992,
      avancar: false,
    };
  },
  computed: {
    getTitulo() {
      return this.mobile ? "Nova publicação" : "Criar nova publicação";
    },
    getDireita() {
      return this.avancar ? "Compartilhar" : "Avançar";
    },
    getButtonTexto() {
      return this.mobile ? "Selecionar foto" : "Selecionar do computador";
    },
  },
  methods: {
    abrirSeletor() {
      const input = this.$refs.referenciaInput as HTMLElement;

      input.click();
    },
    selecionarImagem(event: any) {
      if (event?.target?.files && event?.target?.files.length > 0) {
        const arquivo = event?.target?.files[0];
        this.obterImagemPreview(arquivo);
      }
    },
    dropImagem(event: any) {
      if (event?.dataTransfer?.files && event?.dataTransfer?.files.length > 0) {
        const arquivo = event?.dataTransfer?.files[0];
        this.obterImagemPreview(arquivo);
      }
    },
    obterImagemPreview(arquivo: any) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(arquivo);
      fileReader.onloadend = () => {
        const imagemFinal = {
          preview: fileReader.result,
          arquivo,
        };
        this.imagem = imagemFinal;
      };
    },
    doAvancar() {
      this.avancar = true;
    },
    async compartilhar() {
      try {  
        if(!this.descricao && !this.imagem.arquivo){
          return;
        }

        const requisicaoBody = new FormData();

        if(this.descricao){
          requisicaoBody.append('descricao', this.descricao);

        }

        if(this.imagem.arquivo){
          requisicaoBody.append('file', this.imagem.arquivo)
        }
        
        await publicacaoServices.publicar(requisicaoBody)        

        return router.push({name: 'home'});


      } catch (e: any) {
        console.log(e)
        if(e?.response?.data?.erro){
          console.log(e?.response?.data?.erro);
        }else{
          console.log('Não foi possível efetuar a publicação, tente novamente', e);
        }
      }},
  },
});
</script>
<template>
  <HeaderVue :hide="true" />

  <div class="container-publicacao" :class="{ 'not-preview': imagem?.preview }">
    <HeaderAcoesVue
      :titulo="getTitulo"
      :showEsquerda="mobile"
      :showDireita="imagem?.preview ? true : false"
      :temIconeEsquerda="false"
      :temIconeDireita="false"
      :textoDireita="getDireita"
      @acoesCallback="avancar ? compartilhar() : doAvancar()"
    />
    <div
      class="form"
      v-if="!imagem?.preview"
      @dragover.prevent
      @drop.prevent="dropImagem"
    >
      <img src="../assets/imagens/paisagem.svg" alt="Selecionar imagem" />
      <span>Arraste sua foto aqui!</span>
      <button @click="abrirSeletor">{{ getButtonTexto }}</button>
      <input
        type="file"
        class="oculto"
        accept="image/*"
        ref="referenciaInput"
        @input="selecionarImagem"
      />
    </div>

    <img :src="imagem.preview" v-if="imagem.preview && !avancar" />

    <div class="concluir" v-if="avancar">
      <img :src="imagem.preview" />
      <textarea placeholder="Escreva uma legenda" v-model="descricao" />
    </div>
  </div>
  <FooterVue />
</template>
<style lang="scss" src="@/assets/styles/publicacao.scss" />
