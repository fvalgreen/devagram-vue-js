<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
import HeaderAcoesVue from "@/components/HeaderAcoes.vue";


export default defineComponent({
  components: { HeaderVue, FooterVue, HeaderAcoesVue},
  data() {
    return {
      descricao: '',
      imagem: {} as any,
      mobile: window.innerWidth <= 992,
      avancar: false
    }
  },
  computed: {
    getTitulo(){
      return this.mobile? "Nova publicação" : "Criar nova publicação"
    },
    getDireita(){
      return this.avancar? "Concluir" : "Avançar"
    },
    getButtonTexto(){
      return this.mobile? "Selecionar foto" : "Selecionar do computador"
    }
  },
  methods:{
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
    
  }
});
</script>
<template>
  <HeaderVue :hide="true" /> 

  <div class="container-publicacao">
    <HeaderAcoesVue 
      :titulo="getTitulo"
      :showEsquerda="mobile"
      :showDireita="imagem?.preview"
      :temIconeEsquerda="false"
      :temIconeDireita="false"
      :textoDireita="getDireita"
    />
    <div class="form" v-if="!imagem?.preview">
      <img src="../assets/imagens/paisagem.svg" alt="Selecionar imagem">
      <span>Arraste sua foto aqui!</span>
      <button @click="abrirSeletor">{{ getButtonTexto }}</button>
      <input type="file" class="oculto" accept="image/*" ref="referenciaInput" @input="selecionarImagem"/>
    </div>
    
  </div>
  <FooterVue />
</template>
<style lang="scss" src="@/assets/styles/publicacao.scss" />
