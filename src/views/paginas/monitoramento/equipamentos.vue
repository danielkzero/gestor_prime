<template>
    <div class="rounded-xl w-full shadow" :class="AbrirConteudo != 'lista' ? 'bg-base-200' : 'bg-base-100'">
        <div class="drawer lg:drawer-open">
            <input id="menu_manutencao" type="checkbox" class="drawer-toggle" />

            <div class="drawer-content">
                <div v-if="AbrirConteudo == 'lista'" class="flex justify-content-center w-100 border-b border-base-300">
                    <label for="menu_manutencao" class="py-2 lg:hidden drawer-button ms-4 mt-2 mb-0">
                        <i class="bx bx-menu text-2xl"></i>
                    </label>
                    <label class="input input-sm flex items-center w-full gap-2 m-3">
                        <input type="text" class="glow w-full" placeholder="Procurar..." />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="w-4 h-4 opacity-70">
                            <path fill-rule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clip-rule="evenodd" />
                        </svg>
                    </label>
                </div>


                <template v-if="AbrirConteudo == 'lista'">
                    <DataTable class="table table-zebra" :value="dados" :paginator="true" :rows="10"
                        :rowsPerPageOptions="[5, 10, 20]" @row-click="MostrarConteudo($event)" :pt="{
                            table: { style: 'cursor: pointer' }
                        }">

                        <template #empty> Nada encontrado. </template>
                        <template #loading> Carregamento em processo... </template>
                        <Column field="id_prioridade" style="width: 30px; min-width: 30px" header="-">
                            <template #body="{ data }">
                                <div>
                                    <template v-if="(data as manutencao).id_prioridade == 2">
                                        <i class="bx bxs-tag-alt text-warning"></i>
                                    </template>
                                    <template v-if="(data as manutencao).id_prioridade == 3">
                                        <i class="bx bxs-tag-alt text-secondary"></i>
                                    </template>
                                </div>
                            </template>
                        </Column>
                        <Column field="id_equipamento" style="width: 30px; min-width: 30px" header="#"></Column>
                        <Column field="nome_equipamento" sortable header="DESCRIÇÃO"></Column>
                        <Column field="cadastrado_em" style="width: 120px; min-width: 100px" sortable header="DATA">
                            <template #body="{ data }">
                                <div>
                                    <div class="font-bold">
                                        {{ DataFormatada(String((data as manutencao).cadastrado_em)) }}
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </template>

                <template v-else-if="AbrirConteudo == 'interno'">
                    <conteudoManutencaoEquipamento
                        :AbrirConteudo="AbrirConteudo"
                        :DadosConteudo="DadosConteudo"
                        :ListaParecer="ListaParecer"
                        :Usuario="Usuario"
                        @enviarParecer="enviarParecer" 
                        @changeAbrirConteudo="changeAbrirConteudo"
                    ></conteudoManutencaoEquipamento>
                </template>

                <template v-else>
                    <cadastroManutencaoEquipamento                        
                        @changeAbrirConteudo="changeAbrirConteudo"
                    ></cadastroManutencaoEquipamento>
                </template>
            </div>

            <div class="drawer-side z-30">
                <label for="menu_manutencao" aria-label="close sidebar" class="drawer-overlay"></label>
                <ul class="menu bg-base-100 rounded-tl-box rounded-bl-box min-h-full w-56 " id="menu">
                    <li>
                        <button class="btn btn-sm btn-secondary mb-2" @click="AbrirConteudo = 'cadastro'">
                            Nova manutenção
                        </button>
                    </li>
                    <li @click="AtualizarDados(0)">
                        <span>
                            <i class="bx bxs-inbox"></i> Em manutenção
                            <div class="badge badge-secondary" v-if="totalAberto">
                                {{ totalAberto }}
                            </div>
                        </span>
                    </li>
                    <li @click="AtualizarDados(1)">
                        <span>
                            <i class="bx bxs-flag-checkered"></i> Finalizados
                            <div class="badge badge-warning" v-if="totalFinalizado">
                                {{ totalFinalizado }}
                            </div>
                        </span>
                    </li>
                    <li></li>
                    <li @click="FiltrarPrioridade(3)">
                        <span> <i class="bx bxs-tag-alt text-secondary"></i> Urgente </span>
                    </li>
                    <li @click="FiltrarPrioridade(2)">
                        <span>
                            <i class="bx bxs-tag-alt text-warning"></i> Importante
                        </span>
                    </li>
                    <li @click="FiltrarPrioridade(1)">
                        <span class="ps-10"> Normal </span>
                    </li>
                    <li @click="LimparFiltroPrioridade()">
                        <span> <i class="bx bx-x text-base"></i> Limpar filtro </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>
<script lang="ts">
import axios from "axios";
import { manutencao, parecer } from "../../../provider/interface_manutecao.ts";
import { DataFormatada, DataHoraFormatada, DataHoraFormatadaAmigavel, HoraFormatada } from "../../../funcoes/conversoes.ts";
import cadastroManutencaoEquipamento from './componentes/cadastroManutencaoEquipamento.vue';
import conteudoManutencaoEquipamento from './componentes/conteudoManutencaoEquipamento.vue';
export default {
    components: {
        cadastroManutencaoEquipamento,
        conteudoManutencaoEquipamento
    },
    setup() {
        return { DataFormatada, DataHoraFormatada, DataHoraFormatadaAmigavel, HoraFormatada };
    },
    data() {
        return {
            dados: [] as manutencao[],
            BackupDados: [] as manutencao[],
            totalFinalizado: 0,
            totalAberto: 0,
            AbrirConteudo: 'interno',
            DadosConteudo: {} as manutencao,
            Usuario: '' as string,
            MeuParecer: '' as string,
            ListaParecer: [] as parecer[],
            AbrirCadastroManutencao: false,
        };
    },
    computed: {
        rowClass() {
            return 'cursor-pointer';
        }
    },
    methods: {
        onModalToggle() {
            this.AbrirCadastroManutencao = !this.AbrirCadastroManutencao;
        },
        async enviarParecer(Usuario: string, MeuParecer: string, id: number) {
            const response = await axios.post(
                "/comandos/classes/pcp/comandos/pcp_equipamento_manutencao/inserir_parecer.php",
                {
                    id_equipamento_manutencao: id,
                    parecer: MeuParecer,
                    autor: Usuario
                }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status == 200) {
                this.MeuParecer = '';
                this.buscaDados(0).then(status => {
                    if (status === 200) {
                        this.DadosConteudo = this.dados[this.findIndexById(id)];
                        this.ListaParecer = this.dados[this.findIndexById(id)].parecer as parecer[];
                    }
                });

            }
        },
        findIndexById(id: number) {
            let index = -1;
            for (let i = 0; i < this.dados.length; i++) {
                if (this.dados[i].id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        async buscaDados(TipoFinalizado: number) {
            const response = await axios.get(
                "/comandos/classes/pcp/comandos/pcp_equipamento_manutencao/listar.php?finalizado=" +
                TipoFinalizado
            );
            let status = response.status;
            if (status == 200) {
                this.dados = response.data.data;
                this.BackupDados = response.data.data;
            }
            return status;
        },
        async AtualizarDados(TipoFinalizado: number) {
            this.AbrirConteudo = 'lista';
            this.buscaDados(TipoFinalizado);
            this.AtualizarFinalizados();
            this.AtualizarAbertos();
        },
        async AtualizarFinalizados() {
            const response = await axios.post(
                "/comandos/classes/pcp/comandos/pcp_equipamento_manutencao/listar_em_manutencao_total_linhas.php",
                {
                    finalizado: 1,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status == 200) {
                this.totalFinalizado = response.data.data[0].TOTAL;
            }
        },
        async AtualizarAbertos() {
            const response = await axios.post(
                "/comandos/classes/pcp/comandos/pcp_equipamento_manutencao/listar_em_manutencao_total_linhas.php",
                {
                    finalizado: 0,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status == 200) {
                this.totalAberto = response.data.data[0].TOTAL;
            }
        },
        async FiltrarPrioridade(TipoPrioridade: number) {
            try {
                this.AbrirConteudo = 'lista';
                const dadosFiltrados = this.BackupDados.filter(
                    (manutencao) => manutencao.id_prioridade.toString() === TipoPrioridade.toString()
                );
                this.dados = dadosFiltrados;
            } catch (error) {
                console.error("Erro ao filtrar por prioridade:", error);
            }
        },
        async LimparFiltroPrioridade() {
            this.AbrirConteudo = 'lista';
            this.dados = this.BackupDados;
        },
        MostrarConteudo(e: any) {
            this.AbrirConteudo = 'interno';
            this.DadosConteudo = e.data;
            this.ListaParecer = this.DadosConteudo.parecer as parecer[];
        },
        changeAbrirConteudo(acao: string) {
            this.AbrirConteudo = acao;
        }
    },
    mounted() {
        this.AtualizarDados(0);
        this.Usuario = localStorage.getItem('usuario') || '';
    },
};
</script>
