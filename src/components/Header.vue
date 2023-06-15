<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      resutlado: [],
      inputFocus: false,
    };
  },
  methods: {
    setFocusInput(v: boolean) {
      this.inputFocus = v;
    },
  },
});
</script>
<template>
  <header class="container-header">
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
          />
        </div>
        <!-- Navegação -->
      </div>
    </div>
    <div v-if="resutlado.length > 0" class="resultado">
      <!-- Resultado da busca -->
    </div>
  </header>
</template>
<style lang="scss" src="@/assets/styles/header.scss" />
