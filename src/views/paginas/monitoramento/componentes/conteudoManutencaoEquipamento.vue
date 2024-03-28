<template>
    <div v-if="DadosConteudo">
        <div class="p-3 py-md-3 py-3 bg-base-100 shadow rounded-tr-box">
            <div class="flex justify-content-between align-items-center">
                <div class="flex align-items-center overflow-hidden">
                    <i @click="funcaoAbrirConteudo('lista')"
                        class="bx bx-chevron-left bx-sm cursor-pointer me-2 back_lista"></i>
                    <h6 class="mb-0 me-2">
                        {{ DadosConteudo.id_equipamento + ' - ' + DadosConteudo.nome_equipamento }}
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
                    <span>{{ DataHoraFormatada(DadosConteudo.cadastrado_em) }}</span>
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
                <a :href="'http://191.168.0.12/assets/img/avatars/st/' + item.url_anexo" target="_blank">
                    <div class="badge badge-primary my-3 me-1">
                        <i class="bx bx-paperclip me-2"></i>{{ item.url_anexo }}
                    </div>
                </a>
            </template>
            <!-- Pareceres das situações -->
            <h4 class="text-xl" v-if="ListaParecer?.length > 0">Parecer:</h4>
            <template v-for="item in (ListaParecer as parecer[])">
                <div class="conversation">
                    <template v-if="item.autor == Usuario">
                        <div class="chat chat-end">
                            <div class="chat-image avatar">
                                <div class="w-10 rounded-full">
                                    <img :alt="'foto de ' + item.autor"
                                        :src="'http://191.168.0.12/assets/img/avatars/' + item.url_avatar" />
                                </div>
                            </div>
                            <div class="chat-header">
                                <span class="capitalize">{{ item.autor }}</span>
                                <time class="text-xs opacity-50 ms-2">
                                    {{ DataHoraFormatadaAmigavel(item.cadastrado_em.toString()) }}
                                </time>
                            </div>
                            <div class="chat-bubble chat-bubble-info">{{ item.parecer }}</div>
                            <div class="chat-footer opacity-50">
                                {{ HoraFormatada(item.cadastrado_em.toString()) }}
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="chat chat-start">
                            <div class="chat-image avatar">
                                <div class="w-10 rounded-full">
                                    <img :alt="'foto de ' + item.autor"
                                        :src="'http://191.168.0.12/assets/img/avatars/' + item.url_avatar" />
                                </div>
                            </div>
                            <div class="chat-header">
                                <span class="capitalize">{{ item.autor }}</span>
                                <time class="text-xs opacity-50 ms-2">
                                    {{ DataHoraFormatadaAmigavel(item.cadastrado_em.toString()) }}
                                </time>
                            </div>
                            <div class="chat-bubble">{{ item.parecer }}</div>
                            <div class="chat-footer opacity-50">
                                {{ HoraFormatada(item.cadastrado_em.toString()) }}
                            </div>
                        </div>
                    </template>
                </div>
            </template>
            <div class="join flex mt-6">
                <input v-model="MeuParecer" class="input input-bordered w-full join-item" @keyup.enter="enviarParecer()"
                    placeholder="Mensagem..." />
                <button class="btn btn-info join-item rounded-5" @click="enviarParecer()"><i
                        class="bx bxs-send"></i>Enviar</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { DataFormatada, DataHoraFormatada, DataHoraFormatadaAmigavel, HoraFormatada } from "../../../../funcoes/conversoes.ts";
import { manutencao, parecer } from '../../../../provider/interface_manutecao';

export default {
    props: {
        DadosConteudo: {
            type: Object as () => manutencao,
            default: undefined,
        },
        ListaParecer: {
            type: Array as () => parecer[],
            default: () => []
        },
        Usuario: {
            type: String,
            default: '',
        },
        AbrirConteudo: {
            type: String,
            default: 'lista',
        }
    },
    data() {
        return {
            localAbrirConteudo: 'lista',
            MeuParecer: '' as string,
        };
    },
    watch: {
        AbrirConteudo(novaAcao: string) {
            this.localAbrirConteudo = novaAcao;
        }
    },
    setup() {
        return { DataFormatada, DataHoraFormatada, DataHoraFormatadaAmigavel, HoraFormatada };
    },
    methods: {
        funcaoAbrirConteudo(acao: string) {
            this.localAbrirConteudo = acao;
            this.$emit('changeAbrirConteudo', this.localAbrirConteudo);
        },
        enviarParecer() {
            this.$emit('enviarParecer', this.Usuario, this.MeuParecer, this.DadosConteudo?.id);
            this.MeuParecer = '';
        }
    }
}
</script>