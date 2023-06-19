<script lang="ts">
import { defineComponent } from "vue";
import Navegacao from "./Navegacao.vue";
import { UsuarioServices } from "@/services/UsuarioServices";

import ResultadoBusca from "./ResultadoBusca.vue";
const usuarioServices = new UsuarioServices();

export default defineComponent({
    props:{
      hide: Boolean,
    },
    data() {
        return {
            resultado: [] as any,
            inputFocus: false,
            pesquisa: ''
        };
    },
    methods: {
        setFocusInput(v: boolean) {
            this.inputFocus = v;
        },
        async buscarUsuarios(e: any){
          try {
            if(!e?.target?.value){
              this.resultado = [];
              this.pesquisa = '';
              return;
            }

            this.pesquisa = e?.target?.value;
            if(!this.pesquisa || this.pesquisa.trim().length <= 2){
              return;
            }
            const resposta = await usuarioServices.pesquisar(this.pesquisa)

            if(resposta && resposta.data){
              this.resultado = resposta.data
            }
          } catch (e) {
            console.log(e)
          }
        }

    },
    components: { Navegacao, ResultadoBusca }
});
</script>
<template>
  <header class="container-header" :class="{hide: hide}">
    <div class="principal">
      <img src="../assets/imagens/logoHorizontal.svg" alt="Logo Devagram" />
      <div class="group">
        <div class="pesquisa" :class="{ focus: inputFocus }">
          <img
            src="../assets/imagens/lupa.svg"
            alt="lupa de pesquisa"
            class="icon"
          />
          <input
            type="text"
            placeholder="Pesquisar"
            @focus="setFocusInput(true)"
            @blur="setFocusInput(false)"
            :value="pesquisa"
            @input="buscarUsuarios"
          />
        </div>
        <Navegacao />
      </div>
    </div>
    <div v-if="resultado.length > 0" class="resultado">
      <ResultadoBusca v-for="usuario in resultado"
        :key="usuario._id"
        :id="usuario._id"
        :nome="usuario.nome"
        :email="usuario.email"
        :avatar="usuario.avatar"
      />
    </div>
  </header>
</template>
<style lang="scss" src="@/assets/styles/header.scss" />
