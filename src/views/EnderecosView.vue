<script>
import EnderecosComponent from '../components/EnderecosComponent.vue';
import EnderecoForm from '../components/EnderecoForm.vue'

export default {

  name :'EnderecosView',
  data() {
    return {
    }
  },
  components: {
    EnderecosComponent,
    EnderecoForm
  },
}
</script>

<template>
  <div class="row">
    <div class="col">
      <div class="container" id="btnCadastrar">
        
        <button type="button" class="btn btn-outline-secondary mb-3 ml-2 mt-3" data-bs-toggle="modal" data-bs-target="#formModal">
            Cadastrar Endereço
        </button>
        <endereco-form ref="childref"></endereco-form>
      </div>
      <EnderecosComponent/>
    </div>
  </div>
</template>