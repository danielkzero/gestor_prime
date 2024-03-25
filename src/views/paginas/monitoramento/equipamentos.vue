<template>
    <div class="rounded-xl w-full shadow" :class="AbrirConteudo ? 'bg-base-200' : 'bg-base-100'">
        <div class="drawer lg:drawer-open">
            <input id="menu_manutencao" type="checkbox" class="drawer-toggle" />

            <div class="drawer-content">
                <div v-if="!AbrirConteudo" class="flex justify-content-center w-100 border-b border-base-300">
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


                <template v-if="AbrirConteudo">
                    <div class="p-3 py-md-3 py-3 bg-base-100 shadow rounded-tr-box">
                        <div class="flex justify-content-between align-items-center">
                            <div class="flex align-items-center overflow-hidden">
                                <i @click="AbrirConteudo = false"
                                    class="bx bx-chevron-left bx-sm cursor-pointer me-2 back_lista"></i>
                                <h6 class="mb-0 me-2">{{ DadosConteudo.id_equipamento + ' - ' + DadosConteudo.nome_equipamento }}
                                    <span class="badge badge-warning">autor: {{ DadosConteudo.autor }}</span>
                                </h6>
                            </div>

                            <div class="cursor-pointer bx-tada-hover manutencao_finalizada" data-finalizado="19">
                                <i class="bx bxs-flag-checkered"></i>
                            </div>
                        </div>
                    </div>
                    <div class="p-10 py-5">
                        <div class="stat p-0 m-0">
                            <div class="stat-figure text-base">
                                <span>{{ DataHoraFormatada(DadosConteudo.cadastrado_em.toString()) }}</span>
                            </div>
                            <div class="stat-title"></div>
                            <div class="">
                                <h4 class="text-xl font-bold" v-if="DadosConteudo.id_equipamento">
                                    {{ DadosConteudo.id_equipamento + ' - ' + DadosConteudo.nome_equipamento }}
                                </h4>
                            </div>
                            <div class="stat-desc capitalize">{{ DadosConteudo.autor }}</div>
                        </div>
                        <div class="card bg-base-100 shadow my-4 p-5">
                            <div class="flex text-primary rounded">
                                <i class="bx bxs-quote-left me-2"></i> {{ DadosConteudo.descritivo }}
                            </div>
                        </div>
                        <!-- Lista de situações -->
                        <h4 class="text-xl" v-if="DadosConteudo.situacao?.length > 0">Situação:</h4>
                        <template v-for="item in (DadosConteudo.situacao as any)">
                            <div class="badge badge-neutral me-1 my-3">{{ item.nome }}</div>
                        </template>
                        <!-- Lista de anexos -->
                        <h4 class="text-xl" v-if="DadosConteudo.anexo?.length > 0">Anexo:</h4>
                        <template v-for="item in (DadosConteudo.anexo as any)">
                            <a :href="'http://191.168.0.12/assets/img/avatars/st/'+item.url_anexo" target="_blank">
                                <div class="badge badge-primary my-3 me-1">
                                    <i class="bx bx-paperclip me-2"></i>{{ item.url_anexo }}
                                </div>
                            </a>
                        </template>
                        <!-- Pareceres das situações -->
                        <h4 class="text-xl" v-if="DadosConteudo.parecer?.length > 0">Parecer:</h4>
                        <template v-for="(item) in (DadosConteudo.parecer as any)">
                            <div class="conversation">
                                <template v-if="item.autor == Usuario">
                                    <div class="chat chat-end">
                                        <div class="chat-image avatar">
                                            <div class="w-10 rounded-full">
                                                <img alt="Tailwind CSS chat bubble component"
                                                :src="'http://191.168.0.12/assets/img/avatars/' + item.url_avatar" />
                                            </div>
                                        </div>
                                        <div class="chat-header">
                                            <span class="capitalize">{{ item.autor }}</span>
                                            <time class="text-xs opacity-50 ms-2">{{ DataHoraFormatadaAmigavel(item.data) }}</time>
                                        </div>
                                        <div class="chat-bubble chat-bubble-success">teste de comentário!</div>
                                        <div class="chat-footer opacity-50">
                                            {{ HoraFormatada(item.data) }}
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="chat chat-start">
                                        <div class="chat-image avatar">
                                            <div class="w-10 rounded-full">
                                                <img alt="Tailwind CSS chat bubble component"
                                                    :src="'http://191.168.0.12/assets/img/avatars/' + item.url_avatar" />
                                            </div>
                                        </div>
                                        <div class="chat-header">
                                            <span class="capitalize">{{ item.autor }}</span>
                                            <time class="text-xs opacity-50 ms-2">{{ DataHoraFormatadaAmigavel(item.data) }}</time>
                                        </div>
                                        <div class="chat-bubble">{{ item.parecer }}</div>
                                        <div class="chat-footer opacity-50">
                                            {{ HoraFormatada(item.data) }}
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </template>
                    </div>
                </template>


                <template v-else>
                    <DataTable class="table table-zebra" :value="dados" :paginator="true" :rows="10"
                        :rowsPerPageOptions="[5, 10, 20]" @row-click="MostrarConteudo($event)">
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
            </div>

            <div class="drawer-side z-30">
                <label for="menu_manutencao" aria-label="close sidebar" class="drawer-overlay"></label>
                <ul class="menu bg-base-100 rounded-tl-box rounded-bl-box min-h-full w-56" id="menu">
                    <li>
                        <button class="btn btn-sm btn-secondary mb-2">
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
import { manutencao } from "../../../provider/interface_manutecao.ts";
import { DataFormatada, DataHoraFormatada, DataHoraFormatadaAmigavel, HoraFormatada } from "../../../funcoes/conversoes.ts";
export default {
    setup() {
        return { DataFormatada, DataHoraFormatada, DataHoraFormatadaAmigavel, HoraFormatada };
    },
    data() {
        return {
            dados: [] as manutencao[],
            BackupDados: [] as manutencao[],
            totalFinalizado: 0,
            totalAberto: 0,
            AbrirConteudo: false,
            DadosConteudo: {} as manutencao,
            Usuario: '' as string,
        };
    },
    methods: {
        async AtualizarDados(TipoFinalizado: number) {
            this.AbrirConteudo = false;
            const response = await axios.get(
                "/comandos/classes/pcp/comandos/pcp_equipamento_manutencao/listar.php?finalizado=" +
                TipoFinalizado
            );
            if (response.status == 200) {
                this.dados = response.data.data;
                this.BackupDados = response.data.data;
            }
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
                this.AbrirConteudo = false;
                const dadosFiltrados = this.BackupDados.filter(
                    (manutencao) =>
                        manutencao.id_prioridade.toString() === TipoPrioridade.toString()
                );
                this.dados = dadosFiltrados;
            } catch (error) {
                console.error("Erro ao filtrar por prioridade:", error);
            }
        },
        async LimparFiltroPrioridade() {
            this.AbrirConteudo = false;
            this.dados = this.BackupDados;
        },
        MostrarConteudo(e: any) {
            this.AbrirConteudo = true;
            this.DadosConteudo = e.data;
            console.log(this.DadosConteudo);
        },
    },
    mounted() {
        this.AtualizarDados(0);        
        this.Usuario = localStorage.getItem('usuario') || '';
    },
};
</script>
