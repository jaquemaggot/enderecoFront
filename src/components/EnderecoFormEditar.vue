<script >
    import swal from 'sweetalert';
    export default{
        name: "EnderecoFormEditar",
        props :['data'],
        data() {
            return {
                cep: null,
                logradouro: null,
                bairro: null,
                cidade: null,
                uf: null,
                msg: "",
                endereco_id: null
            };
        },
        methods :{

            buscarEndereco(data){
                
                this.logradouro = data.logradouro;
                this.bairro = data.bairro;
                this.cidade = data.cidade;
                this.uf = data.uf;
                this.endereco_id = data.id;
                this.cep = data.cep;
            },

            async editarEndereco(){
                const data ={
                        cep: this.cep,
                        logradouro : this.logradouro,
                        numero : this.numero,
                        complemento :this.complemento,
                        bairro : this.bairro,
                        cidade : this.cidade,
                        uf : this.uf
                    }
                    
                    const dataJson = JSON.stringify(data);
                    const req = await fetch(`http://127.0.0.1:8000/api/endereco/1`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: dataJson
                        });

                        await req.json();

                        this.msg = `Atualização do cep ${this.cep} realizada com sucesso`
                        swal("Sucesso", this.msg, "success")
            },
            editarData(data){
                this.buscarEndereco(data)
            }
        }
    }
</script>

<template>
    <div>
        <div class="modal fade" id="editarModal" tabindex="-1" aria-labelledby="editarModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="editarModalLabel">Editar Endereço</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div>
            <form id="end-form">
                <div class="mb-3">
                    <label for="cep" class="form-label">Cep</label>
                    <input type="text" class="form-control" id="cep" placeholder="Digite o cep" v-model="cep" @blur="buscarCepViaCep()">
                </div>
                <div class="mb-3">
                    <label for="logradouro" class="form-label">Logradouro</label>
                    <input type="text" class="form-control" id="logradouro" placeholder="Digite o logradouro" v-model="logradouro">
                </div>
                <div class="mb-3">
                    <label for="bairro" class="form-label">Bairro</label>
                    <input type="text" class="form-control" id="bairro" placeholder="Digite o bairro" v-model="bairro">
                </div>
                <div class="mb-3">
                    <label for="cidade" class="form-label">Cidade</label>
                    <input type="text" class="form-control" id="cidade" placeholder="Digite o cidade" v-model="cidade">
                </div>
                <div class="mb-3">
                    <label for="uf" class="form-label">UF</label>
                    <input type="text" class="form-control" id="uf" placeholder="Digite o uf" v-model="uf">
                </div>
            </form>
        </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="editarEndereco()">Salvar</button>
      </div>
    </div>
  </div>
</div>
    </div>
</template>