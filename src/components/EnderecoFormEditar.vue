<script >
import swal from 'sweetalert'
export default {
  name: 'EnderecoFormEditar',
  props: ['data'],
  data() {
    return {
      cep: null,
      logradouro: null,
      bairro: null,
      cidade: null,
      uf: null,
      msg: '',
      endereco_id: null,
      isValid:null
    }
  },
  methods: {
    async buscarCepViaCep() {

      this.validarCep(this.cep)

      if(this.isValid){
        const req = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`)
        const data = await req.json()

        this.logradouro = data.logradouro
        this.bairro = data.bairro
        this.cidade = data.localidade
        this.uf = data.uf
      }else{
        swal('Erro', "Cep incorreto", 'error')
      }
    },

    buscarEndereco(data) {
      this.logradouro = data.logradouro
      this.bairro = data.bairro
      this.cidade = data.cidade
      this.uf = data.uf
      this.endereco_id = data.id
      this.cep = data.cep
      this.endereco_id = data.id
    },

    async editarEndereco() {
      const data = {
        cep: this.cep,
        logradouro: this.logradouro,
        numero: this.numero,
        complemento: this.complemento,
        bairro: this.bairro,
        cidade: this.cidade,
        uf: this.uf
      }

      const dataJson = JSON.stringify(data)
      try {
        const req = await fetch(`http://127.0.0.1:8000/api/endereco/${this.endereco_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: dataJson
        })

        const responseData = await req.json()

        if (req.status === 200) {
          // mostrar mensagem de sucesso
          this.msg = 'Atualização realizada com sucesso'
          swal('Sucesso', this.msg, 'success')
        } else {
          // mostrar mensagem de erro
          this.msg = responseData.message
          swal('Erro', this.msg, 'error')
        }
        
      } catch (error) {
        console.error('Erro na solicitação:', error)
      }
    },
    editarData(data) {
      this.buscarEndereco(data)
    },
    validarCep(cep){
      // Verificar se a string tem 8 dígitos e se possui apenas números
      this.isValid = /^\d{8}$/.test(cep) && !isNaN(cep)
    }
  }
}
</script>

<template>
  <div>
    <div
      class="modal fade"
      id="editarModal"
      tabindex="-1"
      aria-labelledby="editarModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editarModalLabel">Editar Endereço</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <form id="end-form">
                <div class="mb-3">
                  <label for="cep" class="form-label">Cep</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cep"
                    placeholder="Digite o cep"
                    v-model="cep"
                    @blur="buscarCepViaCep()"
                  />
                </div>
                <div class="mb-3">
                  <label for="logradouro" class="form-label">Logradouro</label>
                  <input
                    type="text"
                    class="form-control"
                    id="logradouro"
                    placeholder="Digite o logradouro"
                    v-model="logradouro"
                  />
                </div>
                <div class="mb-3">
                  <label for="bairro" class="form-label">Bairro</label>
                  <input
                    type="text"
                    class="form-control"
                    id="bairro"
                    placeholder="Digite o bairro"
                    v-model="bairro"
                  />
                </div>
                <div class="mb-3">
                  <label for="cidade" class="form-label">Cidade</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cidade"
                    placeholder="Digite o cidade"
                    v-model="cidade"
                  />
                </div>
                <div class="mb-3">
                  <label for="uf" class="form-label">UF</label>
                  <input
                    type="text"
                    class="form-control"
                    id="uf"
                    placeholder="Digite o uf"
                    v-model="uf"
                  />
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="button" class="btn btn-success" @click="editarEndereco()">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>