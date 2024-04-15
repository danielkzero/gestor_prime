<template>
    <div class="p-3 py-md-3 py-3 bg-base-100 shadow rounded-tr-box">
        <div class="flex justify-content-between align-items-center">
            <div class="flex align-items-center overflow-hidden">
                <i @click="funcaoAbrirConteudo()" class="bx bx-chevron-left bx-sm cursor-pointer me-2 back_lista"></i>
                <h6 class="mb-0 me-2">
                    Voltar
                </h6>
            </div>
        </div>
    </div>
    <div class="m-10">
        <div class="mb-8">
            <h4 class="text-xl font-bold">Cadastro de equipamento manutenção</h4>
        </div>
        <label>
            <div class="w-52 text-sm mb-2">Prioridade</div>
            <select class="select select-bordered w-full select-primary mb-2">
                <option disabled selected>Normal</option>
                <option>Importante</option>
                <option>Urgente</option>
            </select>
        </label>
        <label>
            <div class="w-52 text-sm mb-2">Tipo de equipamento</div>
            <select 
                v-model="TipoEquipamento" 
                class="select select-bordered w-full select-primary mb-2">
                <option value="1">Molde</option>
                <option value="2">Máquina</option>
            </select>
        </label>
        <label>
            <div class="w-52 text-sm mb-2">Equipamento</div>
            <div class="join w-full mb-2">
                <input 
                    v-model="CodigoEquipamento"
                    list="SourceLista"
                    type="text" 
                    placeholder="Código" 
                    class="join-item input input-bordered w-40  input-primary" />
                <input 
                    v-model="NomeEquipamento"
                    type="text" 
                    class="join-item input input-bordered w-full input-primary" 
                    readonly />
                <template v-if="TipoEquipamento == 1">
                    <datalist id="SourceLista">
                        <option v-for="item in (Molde as any[])" :value="item?.codigo_molde">{{ item?.nome_molde }}</option>
                    </datalist>
                </template>
                <template v-else>
                    <datalist id="SourceLista">
                        <option v-for="item in (Maquina as any[])" :value="item?.codigo_maquina">{{ item?.nome_maquina }}</option>
                    </datalist>
                </template>
                
            </div>
        </label>
        <label>
            <div class="text-sm mb-2">Situação</div>
            <div class="input input-bordered w-full input-primary h-auto">
                <div class="my-2">
                    <div class="badge badge-primary me-1" v-for="item in situacoes">
                        {{ item }} 
                        <i class="ms-2 bx bx-x hover:text-secondary"></i>
                    </div>
                </div>                
                <input 
                    type="text" 
                    class="join-item py-3 w-full" 
                    @keydown.enter.prevent="AdicionarSituacao(NovaSituacao)" 
                    v-model="NovaSituacao" />
            </div>            
        </label>
        <label class="flex my-3">
            <div class="text-sm w-full">
                <p>Adicione as palavras e frases, após cada situação aperte [ENTER] e adicione mais situações. </p>
                ex.: PEÇA COM REBARBA [ENTER] DESNIVELAMENTO DE PEÇA [ENTER]
            </div>
        </label>

        <div class="border-b border-t border-primary my-3 pt-3">
            <label class="flex items-center gap-2 mb-3">
                <div class="w-full">
                    <div class="w-52 text-sm mb-2">Anexo</div>
                    <input type="file" class="file-input file-input-bordered file-input-primary w-full" />
                </div>
            </label>
            <label class="flex items-center gap-2 mb-3">
                <div class="w-full"><button class="btn btn-primary w-full">+ Arquivos</button></div>
            </label>
            <label class="flex items-center gap-2 mb-3">
                <div class="w-full">
                    <i class="bx bx-info-circle me-2"></i>
                    <span>Nem todos os arquivos podem ser subidos, sendo permitido somente: [IMAGEM, PDF e EXCEL]</span>
                </div>
            </label>
        </div>

        <label class="w-full">
            <div class="text-sm mb-2">Descrição</div>
            <textarea class="textarea textarea-primary textarea-bordered w-full h-32"></textarea>
        </label>

        <button class="btn btn-primary w-full">
            <i class="bx bx-save"></i> Salvar
        </button>
    </div>
</template>
<script lang="ts">
import axios from 'axios';

export default {
    emits: ['changeAbrirConteudo'],
    data() {
        return {
            situacoes: [] as String[],
            NovaSituacao: '',
            Maquina: [],
            Molde: [],
            TipoEquipamento: 1,
            CodigoEquipamento: '',
            NomeEquipamento: '',
        }
    },
    watch: {
        TipoEquipamento: function () {
            this.CodigoEquipamento = '';
            this.NomeEquipamento = '';
        },
        CodigoEquipamento: function () {
            if (this.TipoEquipamento == 1) {
                this.Molde.filter((item: any) => {
                    if (item?.codigo_molde == this.CodigoEquipamento) {
                        this.NomeEquipamento = item?.nome_molde;
                    }
                });
            }else{
                this.Maquina.filter((item: any) => {
                    if (item?.codigo_maquina == this.CodigoEquipamento) {
                        this.NomeEquipamento = item?.nome_maquina;
                    }
                });
            }
        }
    },
    methods: {
        funcaoAbrirConteudo() {
            this.$emit('changeAbrirConteudo', 'lista');
        },
        AdicionarSituacao(Situacao: string) {
            if (Situacao != '') {
                const existe = this.situacoes.filter((item) => {
                    if (item == Situacao) {
                        return true;
                    }
                });
                if (existe.length == 0) {
                    this.situacoes.push(Situacao);
                }
                this.NovaSituacao = '';
            }
        },
        async ListarMaquinas() {
            const response = await axios.get("/comandos/classes/pcp/comandos/pcp_maquina/listar.php");
            if (response.status == 200) {
                this.Maquina = response.data.data;
                console.log(this.Maquina);
            }            
        },
        async ListarMoldes() {
            const response = await axios.get("/comandos/classes/pcp/comandos/pcp_molde/listar.php");
            if (response.status == 200) {
                this.Molde = response.data.data;
                console.log(this.Molde);
            }            
        }
    },
    mounted() {
        this.ListarMaquinas();
        this.ListarMoldes();
    }
}
</script>