<script >
    import swal from 'sweetalert';
    import EnderecoFormEditar from '../components/EnderecoFormEditar.vue'

    export default{

        name:"EnderecosComponent",
        data(){
            return{
                enderecos : [],
                endereco_id:null,
                msg: "",
                filtro : "",
                data: {
                  cep:""
                }
            }
        },
        methods:{
          async buscarEnderecos(){
            const req = await fetch("http://127.0.0.1:8000/api/enderecos")
            
            const data = await req.json();

            this.enderecos = data;
          },

          async deletarEndereco(id){
                swal("Deseja deletar o cep selecionado?")
                    .then((value) => {
                        if (value) {
                            const req = fetch(`http://127.0.0.1:8000/api/endereco/${id}`, {
                            method: "DELETE"
                        });
                        req.then(() => {
                            // Recarrega a página após a exclusão
                            window.location.reload()
                        });
                    }
                });
            },
            async editar(id){
              
              const req = await fetch(`http://127.0.0.1:8000/api/endereco/${id}`)
              this.data = await req.json();
              this.$refs.editar.editarData(this.data);
            },

            async buscarEndereco(){   

              this.enderecos = [];

              const req = await fetch(`http://127.0.0.1:8000/api/endereco/filtro?filtro=${this.filtro}`,{
                  method: "GET"
              })

              const res = await req.json()

              this.enderecos = res

              console.log(this.enderecos)
      
              if(res.length <0 && !isNaN(this.filtro)){
                
                  const req = await fetch(`https://viacep.com.br/ws/${this.filtro}/json/`)
                  const data = await req.json();   
                  console.log("buscar" + data.body)
                  this.cadastrarEndereco(data)    
              }

            },
            async cadastrarEndereco(dados){
              
              const data =
              {
                cep: dados.cep.replace("-",""),
                logradouro : dados.logradouro,
                bairro : dados.bairro,
                cidade : dados.localidade,
                uf : dados.uf
              }

              const dataJson = JSON.stringify(data)

              try 
              {
                const req = await fetch("http://127.0.0.1:8000/api/endereco", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: dataJson
                  });
                  const responseData = await req.json();
                  if (req.status === 201) {
                    // mostrar mensagem de sucesso
                    this.msg = "Cadastro realizado com sucesso";
                    swal("Sucesso", this.msg, "success");
                  } else {
                    // mostrar mensagem de erro
                    this.msg = responseData.message;
                    swal("Erro", this.msg, "error");
                  }
              } catch (error) {
                  console.error("Erro na solicitação:", error);
              }

              // Recarrega a página após a busca
              window.location.reload()

            }
        },
        components:{
            EnderecoFormEditar
        },
        mounted(){
            this.buscarEnderecos();
        },
    }
</script>

<template>
    <div class="container">
      <div class="mb-3 d-flex align-items-center justify-content-between">
          <input type="text" class="form-control mb-3" id="filtro" placeholder="Digite o cep ou logradouro" v-model="filtro">
          <button type="button" class="btn btn-outline-success mb-3 ml-2" @click="buscarEndereco()">Buscar</button>
      </div>
      <div class="row" id="cards">
        <div class="col-md-4" v-for="endereco in enderecos" :key="endereco.id">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">Cep: {{ endereco.cep }}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Logradouro: {{ endereco.logradouro }}</li>
              <li class="list-group-item">Bairro: {{ endereco.bairro }}</li>
              <li class="list-group-item">Cidade: {{ endereco.cidade }}</li>
              <li class="list-group-item">Uf: {{ endereco.uf }}</li>
            </ul>
            <div class="card-body">
                <button type="button" class="btn btn-outline-danger mb-3 ml-2" @click="deletarEndereco(endereco.id)">Deletar</button>
                <button id="editar-button" class="btn btn-outline-secondary mb-3 ml-2" data-bs-toggle="modal" data-bs-target="#editarModal" @click="editar(endereco.id)">Editar</button>
            </div>
          </div>
        </div>
        <endereco-form-editar :data="data" ref="editar"></endereco-form-editar>
      </div>
      
    </div>
  </template>
  
  
  
  
  
  

  