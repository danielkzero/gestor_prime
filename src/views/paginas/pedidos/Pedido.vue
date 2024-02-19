<template>
    <div class="grid grid-cols-8  gap-4 mb-3">
        <div class="card shadow bg-base-100  col-span-8 md:col-span-6">
            <div class="">
                <div class="p-4 pb-3 border-b border-base-300">
                    <span class="text-success">#{{ id }}</span> emitido por 
                    <span class="text-success" style="text-transform: capitalize;">{{ autor_lancamento }}</span>
                        em {{ formatData(data_emissao) }}
                    
                    <div style="float: right;">
                        <div class="badge text-red-100 bg-red-500 ms-2">
                            {{ clienteNivel.nome_nivel ?? '' }}
                        </div>
                    </div>
                    <div style="float: right;">
                        <div class="badge " :class="show_status(status)?.cssVar ?? ''" >
                            {{ show_status(status)?.texto ?? '' }}
                        </div>
                    </div>
                </div>

                <div class="p-4 border-b border-base-300">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <Cabecalho 
                                Label="Empresa" 
                                v-model="id_empresa" 
                                :Dados="itemsEmpresa"
                                :minSearch="0" />
                        </div>

                        <div>
                            <Cabecalho 
                                Label="Cliente" 
                                v-model="codigo_cliente" 
                                :Dados="itemsCliente"
                                :minSearch="3" />
                        </div>
                    </div>
                </div>


                <div class="p-4 border-b border-base-300">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <Cabecalho 
                                Label="Representante" 
                                v-model="codigo_vendedor" 
                                :Dados="itemsRepresentante"
                                :minSearch="3" />
                        </div>
                        <div>
                            <Cabecalho 
                                Label="Prazo" 
                                v-model="prazo" 
                                :Dados="itemsPrazo"
                                :minSearch="0" />
                        </div>
                    </div>
                </div>

                <div class="p-4 border-b border-base-300">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <Cabecalho 
                                Label="Representante adicional" 
                                v-model="codigo_televenda" 
                                :Dados="itemsRepresentante"
                                :minSearch="3"
                                :limparAtivo="1" />
                        </div>
                        <div>
                            <Cabecalho 
                                Label="Forma de pagamento" 
                                v-model="codigo_forma_pagamento" 
                                :Dados="itemsFormaPagamento"
                                :minSearch="0" />
                        </div>
                    </div>
                </div>
                <div class="border-b border-base-300 p-4 bg-default-200">
                    <div class="text-primary text-xl pb-1"><i class='bx bx-basket'></i> Novo Produto</div>
                    <input-drop-down 
                        v-if="ShowProdutoSelecionado" 
                        :items="itemsPesquisa" 
                        v-model="ProdutoSelecionado" 
                        class="w-full" 
                        :minLetraPesquisar="3"
                        ref="inputDropDown" />
                </div>
                <div class="mt-3">
                    <div style="overflow-x: auto">
                        <DataTable class="table table-sm" :value="itemsPedido ?? []">
                            <Column field="image" style="max-width:1rem" sortable header="" v-if="false">
                                <template #body="{ data }">
                                    <div class="avatar placeholder transition duration-500 cursor-pointer hover:scale-150">
                                        <div class="bg-neutral text-neutral-content rounded w-10">
                                            <img :src="'/comandos/imagem/produto/'+data.codigo+'.jpg'" >
                                        </div>
                                    </div>
                                </template>
                            </Column>
                            <Column field="codigo" style="max-width:3.4rem" sortable header="Cód."></Column>
                            <Column field="descricao" sortable header="Descrição"></Column>
                            <Column field="qtd" style="min-width:4rem" sortable header="Qtd."></Column>
                            <Column field="bruto" style="min-width:5rem" sortable header="Preço">
                                <template #body="{ data }">
                                    <div class="text-right">{{ formatMoeda((data).bruto) }}</div>
                                </template>
                            </Column>
                            
                            <Column field="percentual" class="text-nowrap" style="min-width:5rem" sortable header="Desc.%">
                                <template #body="{ data }">
                                    <div class="text-center">{{  data.percentual == '' ? '0' : data.percentual }}%<i :class="showSignUpOrDown(data.percentual)"></i></div>
                                </template>
                            </Column>

                            <Column field="liquido" style="min-width:5rem" sortable header="Líq.">
                                <template #body="{ data }">
                                    <div class="text-right">{{ formatMoeda((data).liquido) }}</div>
                                </template>
                            </Column>
                            <Column field="total_imposto" style="min-width:5rem" sortable header="ST">
                                <template #body="{ data }">
                                    <div class="text-center">{{ formatNumero((data).total_imposto ?? 0, 2) }}</div>
                                </template>
                            </Column>
                            <Column field="total_liquido" style="min-width:5rem" sortable header="Subtotal">
                                <template #body="{ data }">
                                    <div class="text-right font-bold">{{ formatMoeda((data).total_liquido) }}</div>
                                </template>
                            </Column>

                            <Column :exportable="false" style="min-width:5rem">
                                <template #body>
                                    <button class="me-2 text-primary"><i class="bx bx-edit"></i></button>
                                    <button class="text-secondary"><i class="bx bx-trash"></i></button>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                    <div class="border-b border-base-300"></div>

                    <div class="m-3">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="col-span-1">
                                <label for="ObservacaoPedido" class="pb-3 text-secondary block">Observação do pedido</label>
                                <textarea @input="resize('obs_pedido')" ref="obs_pedido" style="min-height:5rem" v-model="obs_pedido" id="ObservacaoPedido" class="textarea textarea-bordered w-full" placeholder="Observação..."></textarea>

                                <label for="ObservacaoNota" class="py-3 text-secondary block">Observação da nota</label>
                                <textarea @input="resize('obs_nota')" ref="obs_nota" style="min-height:5rem" v-model="obs_nota" id="ObservacaoNota" class="textarea textarea-bordered w-full" placeholder="Observação..."></textarea>
                            </div>
                            <div class="col-span-1">
                                <div class="text-right">
                                    <div class="mb-2">
                                        <div class="absolute right-0 pr-4">{{ formatMoeda(fnc_somatorio("total_liquido")) }}</div>
                                        <div class="text-left border-b border-base-300 pb-3">Sub-total</div>
                                    </div>
                                    <div class="mb-2">
                                        <div class="absolute right-0 pr-4">R$ 0,00</div>
                                        <div class="text-left border-b border-base-300 pb-3">Desconto</div>
                                    </div>
                                    <div class="mb-2">
                                        <div class="absolute right-0 pr-4">{{ formatMoeda(fnc_somatorio("total_imposto")) }}</div>
                                        <div class="text-left border-b border-base-300 pb-3">Imposto</div>
                                    </div>
                                    <div class="mb-2 font-bold text-primary">
                                        <div class="absolute right-0 pr-4">
                                            {{ 
                                                formatMoeda(
                                                    (
                                                        parseFloat(fnc_somatorio("total_liquido")) + parseFloat(fnc_somatorio("total_imposto"))
                                                    ).toString()
                                                ) 
                                            }}
                                        </div>
                                        <div class="text-left">Total</div>
                                    </div>

                                    <div class="mb-2">
                                        <div class="grid grid-cols-3 gap-4 mb-3 pe-3 border-t border-base-300 mt-3 pt-3">
                                            <div class="col-span-1">
                                                <div class="text-">Cubagem</div>
                                                <div>{{ formatNumero(String(fnc_somatorio("cubagem")),2) }} m³</div>
                                            </div>
                                            <div class="col-span-1">
                                                <div class="text-">Peso</div>
                                                <div>{{ formatNumero(String(fnc_somatorio("peso")),1) }} kg</div>
                                            </div>
                                            <div class="col-span-1">
                                                <div class="text-">Volume</div>
                                                <div>{{ formatNumero(String(fnc_somatorio("volume")),0) }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-base-100 shadow col-span-8 md:col-span-2 text-sm">
            <div class="p-4">
                <div class="pb-3 text-sm">Ações</div>
                <button class="btn btn-primary w-full btn-sm mb-2" @click="show()">Salvar</button>
                <button class="btn btn-ghost w-full btn-sm mb-2">Imprimir</button>
                <button class="btn btn-ghost hover:bg-red-500 hover:text-red-100 w-full btn-sm mb-2">Cancelar</button>

                <div class="py-1 border-b border-base-300"></div>

                <label for="Emissao" class="py-3 text-sm text-primary block">Emissão</label>
                <input id="Emissao" v-model="data_emissao" type="date" class="input input-bordered w-full input-sm" />

                <label for="Entrega" class="py-3 text-sm text-primary block">Entrega</label>
                <input id="Entrega" v-model="data_entrega" type="date" class="input input-bordered w-full input-sm" />

                <label for="Especial" class="py-3 text-sm text-primary block">Especial</label>
                <input id="Especial" v-model="percentual_especial" type="number" class="input input-bordered w-full input-sm" placeholder="100" />

                <label for="TipoPedido" class="py-3 text-sm text-primary block">Tipo de pedido</label>
                <select id="TipoPedido" v-model="tipo_pedido" class="select select-bordered w-full select-sm">
                    <option value="A">ATACADO</option>
                    <option value="V">VAREJO</option>
                </select>

                <div class="py-2 border-b border-base-300"></div>

                <div class="py-3 text-sm text-primary">Cálculo para suframa</div>
                <label for="IcmsPadrao" class="text-secondary block">7% de ICMS padrão / 3% + 0,65% de COFINS ICMS %</label>
                <input id="IcmsPadrao" v-model="desconto_suframa" type="number" class="input input-bordered w-full input-sm my-3" placeholder="7%" />

                <label for="Icms" class="text-secondary block">ICMS %</label>
                <input id="Icms" v-model="desconto_suframa_icms" type="number" class="input input-bordered w-full input-sm mt-3" placeholder="3,65%" />

                <div class="py-2 border-b border-base-300"></div>
                <div class="py-3 text-sm text-primary">Descontos no valor total</div>
                <small class="text-secondary">Desconto de amostras, brindes e etc...</small>
                <label for="DescontoAdicional" class="pb-3 text-secondary block">Desconto adicional R$</label>
                <input id="DescontoAdicional" v-model="desconto_adicional" type="number" class="input input-bordered w-full input-sm block" />
            </div>
        </div>
        
    </div>
    <transition name="fade">        
        <dialog class="modal" @close="modalIsOpen = false" :open="modalIsOpen">
            <div @click="onModalToggle" class="absolute bg-black opacity-70 inset-0 z-0"></div>
            <div class="modal-box w-11/12 max-w-5xl">
                <h3 class="font-bold text-lg">Adicionar Item ao Pedido</h3>
                <div class="py-2 border-b border-base-300"></div>
                <div class="flex items-center gap-3 mt-4">
                    <div class="avatar placeholder">
                        <div class="bg-neutral text-neutral-content rounded w-28">
                            <img onerror="this.onerror=null; this.src='/comandos/imagem/produto/default.jpg'" :src="'/comandos/imagem/produto/'+(TempArrayItem.cod_produto == '' ? 'default' : TempArrayItem.cod_produto)+'.jpg'">
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">{{ TempArrayItem.nome_produto }}</div>
                        <div class="text-sm">
                            <div class="badge badge-primary">{{ TempArrayItem.cod_produto }}</div>
                        </div>
                    </div>
                </div>
                <div class="py-2 border-b border-base-300"></div>
                <div class="flex justify-start">
                    <div>
                        <label for="quantidade" class="text-primary block mt-4">Quantidade</label>
                        <input id="quantidade" min='1' @input="CalcularPrecosPelaQuantidade()" v-model="TempArrayItem.quantidade" type="number" class="input input-bordered w-82 input-sm mt-2 text-right" />
                    </div>
                    <div class="ms-4">
                        <label for="quantidade" class="text-primary block mt-4" v-if="RegrasHabilitadas.length">Regra habilitada</label>
                        <div>
                            <div v-for="(item, index) in RegrasHabilitadas" :key="index" class="me-1">
                                <div>
                                    <span class="text-secondary">{{ item.aplicar }}%</span>
                                    <small class="block text-xs text-red-500"> * {{ ( item.sugerir == 0 ? 'não sugerir' : 'sugerir' ) }}</small>
                                </div>                                
                            </div> 
                        </div> 
                    </div>                    
                </div>
                
                <div class="text-xs mt-2">
                    <span class="opacity-60">peso:</span> <span>{{ formatNumero(String(TempArrayItem.pesoTotal),2) }} kg</span> 
                    <span class="opacity-60">, </span> 
                    <span class="opacity-60">cubagem:</span> <span>{{ formatNumero(String(TempArrayItem.cubagemTotal),3) }} m³</span>
                    <span class="opacity-60"> e </span> 
                    <span class="opacity-60">volume:</span> <span>{{ formatNumero(String(TempArrayItem.volumeTotal),0) }}</span>
                    <div class="tooltip" :data-tip="'preço médio por Kg: ' + formatMoeda(String(TempArrayItem.PrecoMedioQuilo))">
                        <i class="ms-2 cursor-pointer text-sm bx bx-info-circle"></i>
                    </div>
                </div>

                <div class="w-full bg-base-200 p-4 mt-3 rounded-lg">
                    <div class="flex justify-start">
                        <div>
                            <label for="desconto1" class="text-error text-xs block">Desconto #1</label>
                            <input id="desconto1" step="0.01" min="0" @input="CalcularPrecos()" v-model="TempArrayItem.desconto1" type="number" class="input input-bordered w-82 input-sm mt-2 text-right" />
                        </div>
                        <div class="ms-3">
                            <label for="desconto2" class="text-error text-xs block">Desconto #2</label>
                            <input id="desconto2" step="0.01" min="0" @input="CalcularPrecos()" v-model="TempArrayItem.desconto2" type="number" class="input input-bordered w-82 input-sm mt-2 text-right" />
                        </div>
                        <div class="ms-3">
                            <label for="desconto3" class="text-error text-xs block">Desconto #3</label>
                            <input id="desconto3" step="0.01" min="0" @input="CalcularPrecos()" v-model="TempArrayItem.desconto3" type="number" class="input input-bordered w-82 input-sm mt-2 text-right" />
                        </div>
                    </div>                    
                </div>
                <div class="py-2 border-b border-base-300"></div>
                <div class="flex justify-start">
                    <div class="me-4 opacity-80">
                        <label for="precoproduto" class="text-xs block mt-4">Preço bruto</label>
                        <div class="flex justify-center pt-3">
                            {{ formatMoeda(String(TempArrayItem.precoproduto)) }}
                        </div>
                    </div>
                    <div class="mx-4">
                        <label for="precoliquido" class="text-primary text-xs block mt-4">Preço Líquido</label>
                        <input id="precoliquido" step="0.01" min="0" @input="CalcularPrecosPeloLiquido()" v-model="TempArrayItem.precoliquido" type="number" class="input input-bordered w-82 input-sm mt-2 text-right" />
                    </div>
                    <div class="mx-4 opacity-80" v-if="TempArrayItem.icms_destino">
                        <label for="icms_destino" class="text-xs block mt-4">ICMS-ST</label>
                        <div class="flex justify-center pt-3">
                            {{ formatNumero(String(TempArrayItem.icms_destino * 100),2) }}%
                        </div>
                    </div>
                    <div class="mx-4 text-primary">
                        <label for="subtotal" class="text-xs block mt-4">Subtotal</label>
                        <div class="flex justify-center pt-3">
                            <i class='bx bxs-dollar-circle me-1 text-2xl'></i> {{ formatMoeda(String(TempArrayItem.subtotal)) }}
                        </div>
                    </div>
                </div>
                <div class="py-2 border-b border-base-300"></div>
                <div class="mt-4 justify-end">
                    <button class="btn btn-primary btn-sm me-2">Adicionar</button>
                    <button class="btn btn-ghost btn-sm hover:bg-red-500 hover:text-red-100" @click="onModalToggle">Cancelar</button>
                </div>
            </div>
        </dialog>
    </transition>
</template>
<script lang="ts">

import { inject } from "vue";
import moment from 'moment';
import Cabecalho from '../../../components/pedido/Cabecalho.vue';
import InputDropDown from '../../../components/input/InputDropDown.vue';
import axios from 'axios';
import { providerStatusPedido } from '../../../provider/status_pedido.ts';
import { Status } from '../../../provider/interface.ts';
import { PedidoGestor, ItensPedidoGestor } from '../../../provider/interface_pedido.ts';
import { Nivel } from '../../../provider/interface_nivel.ts';
import { TempItem } from '../../../provider/interface_temp_item.ts';
import { RegraPedido, RegraPedidoItem } from '../../../provider/interface_regra_pedido.ts';

export interface AplicacaoRegra {
    acumulativo: number,
    aplicar:  string,
    produtos:  string,
    prioridade: number,
    sugerir: number,
    tipo_aplicacao: string
}

export default {
    components: {
        Cabecalho,
        InputDropDown, 
    },
    data() {
        return {
            //Api Gestor
            apiGestor: inject < string > ("apiGestor"),
            //Id recebido via URL
            id: this.$route.params.id as string,

            codigo_cliente: '',
            codigo_forma_pagamento: '',
            codigo_prazo: '',
            codigo_televenda: '',
            codigo_vendedor: '',
            data_emissao: '',
            data_entrega: '',
            desconto_adicional: 0,
            desconto_maximo: 0,
            desconto_suframa: 0,
            desconto_suframa_icms: 0,
            forma_pagamento: '',
            id_empresa: '',
            nivel: '',
            nome_cliente: '',
            numero_pedido: 0,
            obs_pedido: '',
            obs_nota: '',
            prazo: '',
            televenda: '',
            tipo_pedido: '',
            tipo_pedido_nome: '',
            vendedor: '',
            percentual_especial: 0,
            autor_lancamento: '',
            status: '',
            //Banco de dados de Status
            statusPedido: providerStatusPedido,
            //Variáveis de interação
            timeoutId: null as NodeJS.Timeout | null,
            modalIsOpen: false,
            ShowProdutoSelecionado: true,
            setSearchTerm: '',
            //Lista para complementar pedido
            clienteNivel: {} as Nivel,
            clienteIBGE: {
                IBGE: '',
                UF: ''
            },
            produtoSelect: [],
            itemsPesquisa: [],
            itemsEmpresa: [],
            itemsCliente: [],
            itemsRepresentante: [],
            itemsPrazo: [],
            itemsFormaPagamento: [],

            pedido: [] as PedidoGestor[],
            itemsPedido: [] as ItensPedidoGestor[],
            TempArrayItem: {} as TempItem,
            TempRegraPedido: {} as RegraPedido,
            RegrasHabilitadas: [] as AplicacaoRegra[],
        }
    },
    computed: {
        ModalIsVisible() {
            //return this.modalIsOpen();
        },
        ProdutoSelecionado: {
            get() {
                if (!this.produtoSelect) {
                    return null;
                }                    
                return this.produtoSelect;
            },
            set(value: []) {
                this.produtoSelect = value;
                this.onModalToggle();
                this.limparSearchTermFilho();
                this.getPrecoProduto();
            }
        }
    },    
    watch: {
        ProdutoSelecionado() {}
    },
    methods: {
        limparSearchTermFilho() {
            let inputDropDown = this.$refs.inputDropDown as any;
            if (inputDropDown && typeof inputDropDown.setSearchTerm === 'function') {
                inputDropDown.setSearchTerm();
            }
        },
        onModalToggle() {
            this.modalIsOpen = !this.modalIsOpen;
        },
        resize(refName: string) {
            let element = this.$refs[refName] as HTMLElement;

            element.style.height = "5rem";
            element.style.height = (element.scrollHeight + 3) + "px";
        },
        show_status(Tstatus: string): Status | undefined {
            for (const item of this.statusPedido) {
                if (item.status === Tstatus) {
                    return item as Status;
                }
            }
            return undefined;
        },
        formatData(Data: String) {
            return moment(Data.toString(), 'YYYY-MM-DD').format('DD/MM/YYYY');
        },
        formatMoeda(valor: string) {
            return parseFloat(valor).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
            });
        },
        formatNumero(numero: string, qtd_decimais: number) {
            return parseFloat(numero).toLocaleString("pt-br", {
                style: 'decimal',
                maximumFractionDigits: qtd_decimais,
                minimumFractionDigits: qtd_decimais,
            });
        },
        showSignUpOrDown(valor: string) {
            let valorRemold = parseFloat(valor.replace(',','.') ?? 0);
            if (isNaN(valorRemold) || valorRemold == 0) {
                return '';
            }
            return (valorRemold < 0 ? "bx bx-up-arrow-alt text-green-500" : "bx bx-down-arrow-alt text-red-500")
        },
        show() {
            console.log("-");
        },
        async popularArray(url: string) {
            let response = await axios.get(`http://191.168.0.12/comandos/classes/com/comandos/com_regra/`+url+`.php`);        
            const data = response.data.data;
            const remodeledData = data.map((item: any) => {
                return {
                    id: String(item.codigo),
                    descricao: String(item.nome),
                };
            });
            return remodeledData;
        },
        async popularArrayCombinado(url: string) {
            let response = await axios.get(`http://191.168.0.12/comandos/classes/com/comandos/com_regra/`+url+`.php`);        
            const data = response.data.data;
            const remodeledData = data.map((item: any) => {
                return {
                    id: String(item.codigo),
                    descricao: String(item.codigo + ' - ' + item.nome),
                };
            });
            return remodeledData;
        },
        fnc_somatorio(key: string): string {
            let total = 0;
            if (this.itemsPedido.length > 0) {
                for(var i = 0; i < this.itemsPedido.length; i++) {
                    total += parseFloat((this.itemsPedido[i] as any)[key] as string);
                }
            }
            return String(total);
        },
        async getPrecoProduto() {
            this.TempArrayItem = {
                cod_produto: '',
                nome_produto: '',
                quantidade: 0,
                desconto1: 0,
                desconto2: 0,
                desconto3: 0,
                precoproduto: 0,
                precoliquido: 0,
                icms_destino: 0,
                subtotal: 0,
                peso: 0,
                cubagem: 0,
                volume: 0,
                pesoTotal: 0,
                cubagemTotal: 0,
                volumeTotal: 0,
                PrecoMedioQuilo: 0
            };
            const codigo_produto: any = this.ProdutoSelecionado;
            let response = await axios.get(`http://191.168.0.12/comandos/classes/pedido/comandos/pedido/preco_produto.php`, 
                { params: 
                    { 
                        cod_produto: codigo_produto?.id,
                        cod_nivel: this.clienteNivel.id_nivel,
                        cod_uf: this.clienteIBGE.UF
                    }
                });
            const data = response.data.data;
            if (data.length > 0) {
                this.TempArrayItem = data[0];
                this.TempArrayItem = {
                    cod_produto: this.TempArrayItem.cod_produto,
                    nome_produto: this.TempArrayItem.nome_produto,
                    quantidade: 1,
                    desconto1: 0,
                    desconto2: 0,
                    desconto3: 0,
                    precoproduto: this.TempArrayItem.precoproduto,
                    precoliquido: this.TempArrayItem.precoproduto,
                    icms_destino: this.TempArrayItem.icms_destino,
                    subtotal: this.TempArrayItem.precoproduto * (1 + this.TempArrayItem.icms_destino),
                    peso: this.TempArrayItem.peso,
                    cubagem: this.TempArrayItem.cubagem,
                    volume: this.TempArrayItem.volume,
                    pesoTotal: this.TempArrayItem.peso,
                    cubagemTotal: this.TempArrayItem.cubagem,
                    volumeTotal: this.TempArrayItem.volume,
                    PrecoMedioQuilo: (this.TempArrayItem.precoproduto * (1 + this.TempArrayItem.icms_destino)) / this.TempArrayItem.peso
                }
            }

            this.AnaliseRegraPedido();
        },
        async getNivel(IdCliente: string, IdEmpresa: string) {
            let response = await axios.get(`http://191.168.0.12/comandos/classes/sql/comandos/pessoa/json_ibge_cliente.php`, 
                { params: { codigo: IdCliente }});
            const data = response.data.data;
            if (data.length > 0) {
                let resp = await axios.get(`http://191.168.0.12/comandos/classes/pedido/comandos/pedido/nivel_pedido.php`, 
                { params: { IBGE: data[0].IBGE, IDEMPRESA: IdEmpresa }});
                const dados = resp.data.data;
                this.clienteIBGE = data[0];
                this.clienteNivel = dados[0] as Nivel;
            }
        },
        async getPedidoCompleto(id_pedido: string) {
            let response = await axios.get(`http://191.168.0.12/comandos/classes/pedido/comandos/pedido/json_pedido_completo.php`, { params: {id: id_pedido} });
            const data = response.data.data;
            this.pedido = data;


            this.codigo_cliente = this.pedido[0].codigo_cliente;
            this.codigo_forma_pagamento = this.pedido[0].codigo_forma_pagamento;
            this.codigo_prazo =  this.pedido[0].codigo_prazo;
            this.codigo_televenda = this.pedido[0].codigo_televenda;
            this.codigo_vendedor = this.pedido[0].codigo_vendedor;
            this.data_emissao = this.pedido[0].data_emissao ?? new Date();
            this.data_entrega = this.pedido[0].data_entrega ?? moment(new Date(), 'YYYY-MM-DD').add(7,'days').format('DD/MM/YYYY');
            this.desconto_adicional = this.pedido[0].desconto_adicional;
            this.desconto_maximo = this.pedido[0].desconto_maximo;

            this.desconto_suframa = this.pedido[0].desconto_suframa;
            this.desconto_suframa_icms = 0;
            
            this.forma_pagamento = this.pedido[0].forma_pagamento;
            this.id_empresa = String(this.pedido[0].id_empresa);
            this.nivel = this.pedido[0].nivel;
            this.nome_cliente = this.pedido[0].nome_cliente;
            this.numero_pedido = this.pedido[0].numero_pedido;
            this.obs_pedido = this.pedido[0].obs_pedido;
            this.obs_nota = this.pedido[0].obs_nota;
            this.percentual_especial = this.pedido[0].percentual_especial;
            this.prazo = this.pedido[0].prazo;
            this.televenda = this.pedido[0].televenda;
            this.tipo_pedido = this.pedido[0].tipo_pedido;
            this.tipo_pedido_nome = this.pedido[0].tipo_pedido_nome;
            this.vendedor = this.pedido[0].vendedor;
            this.autor_lancamento = this.pedido[0].autor_lancamento;
            this.status = this.pedido[0].status;

            // parseFloat((this.itemsPedido[i] as any)[key] as string);

            this.itemsPedido = this.pedido[0].item[0] as any;

            this.getNivel(this.codigo_cliente, this.id_empresa);
        },
        resizeTextarea() {
            this.resize('obs_pedido');
            this.resize('obs_nota');
            if (this.timeoutId !== null) {
                clearTimeout(this.timeoutId);
            }
        },
        async CalcularPrecos() {
            this.TempArrayItem.pesoTotal = this.TempArrayItem.peso  * this.TempArrayItem.quantidade;
            this.TempArrayItem.cubagemTotal = this.TempArrayItem.cubagem  * this.TempArrayItem.quantidade;
            this.TempArrayItem.volumeTotal = this.TempArrayItem.volume  * this.TempArrayItem.quantidade;

            let precoliquido = this.TempArrayItem.precoproduto;
            
            precoliquido = precoliquido * (1 - (this.TempArrayItem.desconto1 / 100));
            precoliquido = precoliquido * (1 - (this.TempArrayItem.desconto2 / 100));
            precoliquido = precoliquido * (1 - (this.TempArrayItem.desconto3 / 100));

            this.TempArrayItem.precoliquido = parseFloat(precoliquido.toFixed(2));

            let subtotal = this.TempArrayItem.precoliquido;

            subtotal = subtotal * (1 + this.TempArrayItem.icms_destino);
            subtotal = subtotal * this.TempArrayItem.quantidade;

            this.TempArrayItem.PrecoMedioQuilo = ((subtotal / this.TempArrayItem.quantidade) * (1 + this.TempArrayItem.icms_destino)) / this.TempArrayItem.peso;            

            this.TempArrayItem.subtotal = subtotal;
        },
        async CalcularPrecosPeloLiquido() {
            this.TempArrayItem.pesoTotal = this.TempArrayItem.peso  * this.TempArrayItem.quantidade;
            this.TempArrayItem.cubagemTotal = this.TempArrayItem.cubagem  * this.TempArrayItem.quantidade;
            this.TempArrayItem.volumeTotal = this.TempArrayItem.volume  * this.TempArrayItem.quantidade;
            
            this.TempArrayItem.desconto1 = 0;
            this.TempArrayItem.desconto2 = 0;
            this.TempArrayItem.desconto3 = 0;
            
            let subtotal = this.TempArrayItem.precoliquido;
            subtotal = subtotal * (1 + this.TempArrayItem.icms_destino);
            subtotal = subtotal * this.TempArrayItem.quantidade;

            this.TempArrayItem.PrecoMedioQuilo = ((subtotal / this.TempArrayItem.quantidade) * (1 + this.TempArrayItem.icms_destino)) / this.TempArrayItem.peso;            

            this.TempArrayItem.subtotal = subtotal;
        },

        async CalcularPrecosPelaQuantidade() {
            this.TempArrayItem.pesoTotal = this.TempArrayItem.peso  * this.TempArrayItem.quantidade;
            this.TempArrayItem.cubagemTotal = this.TempArrayItem.cubagem  * this.TempArrayItem.quantidade;
            this.TempArrayItem.volumeTotal = this.TempArrayItem.volume  * this.TempArrayItem.quantidade;
                        
            let subtotal = this.TempArrayItem.precoliquido;
            subtotal = subtotal * (1 + this.TempArrayItem.icms_destino);
            subtotal = subtotal * this.TempArrayItem.quantidade;

            this.TempArrayItem.PrecoMedioQuilo = ((subtotal / this.TempArrayItem.quantidade) * (1 + this.TempArrayItem.icms_destino)) / this.TempArrayItem.peso;            

            this.TempArrayItem.subtotal = subtotal;
        },
        async AnaliseRegraPedido() {
            let TempItem = [] as RegraPedidoItem[];
            for (var i = 0; i < this.itemsPedido.length; i++) {
                let Item: RegraPedidoItem = {
                    pedido_empresa: parseInt(this.id_empresa),
                    produtos: this.itemsPedido[i].codigo,
                    produto_dias_sem_efetuar_compra: 1,
                    quantidade: this.itemsPedido[i].qtd,
                    unitario_bruto: parseFloat((this.itemsPedido[i].bruto / this.itemsPedido[i].emb).toFixed(2)),
                    bruto: this.itemsPedido[i].bruto,
                    total_bruto: this.itemsPedido[i].bruto * parseFloat(this.itemsPedido[i].qtd),
                    unitario_liquido: parseFloat((this.itemsPedido[i].liquido / this.itemsPedido[i].emb).toFixed(2)),
                    liquido: this.itemsPedido[i].liquido,
                    total_liquido: parseFloat((this.itemsPedido[i].liquido * parseFloat(this.itemsPedido[i].qtd)).toFixed(2)),
                    peso_unitario: this.itemsPedido[i].peso,
                    cubagem_unitaria: this.itemsPedido[i].cubagem,
                    aliquota_repasse: this.itemsPedido[i].comissao,
                    volume: this.itemsPedido[i].volume,
                    grupos: '1',
                    grupo_dias_sem_efetuar_compra: 1,
                    familias: '1',
                    familia_dias_sem_efetuar_compra: 1
                };
                TempItem.push(Item);                
            }

            let Item: RegraPedidoItem = {
                pedido_empresa: parseInt(this.id_empresa),
                produtos: this.TempArrayItem.cod_produto,
                produto_dias_sem_efetuar_compra: 1,
                quantidade: String(this.TempArrayItem.quantidade),
                unitario_bruto: parseFloat((this.TempArrayItem.precoproduto).toFixed(2)),
                bruto: this.TempArrayItem.precoproduto,
                total_bruto: this.TempArrayItem.precoproduto * this.TempArrayItem.quantidade,
                unitario_liquido: parseFloat((this.TempArrayItem.precoliquido).toFixed(2)),
                liquido: (this.TempArrayItem.precoliquido),
                total_liquido: parseFloat((this.TempArrayItem.precoliquido).toFixed(2)),
                peso_unitario: (this.TempArrayItem.peso),
                cubagem_unitaria: (this.TempArrayItem.cubagem),
                aliquota_repasse: 5,
                volume: (this.TempArrayItem.volume),
                grupos: '1',
                grupo_dias_sem_efetuar_compra: 1,
                familias: '1',
                familia_dias_sem_efetuar_compra: 1
            };
            TempItem.push(Item);
            
            this.TempRegraPedido = {
                id: typeof this.id === 'string' && this.id === 'novo' ? parseInt('0') : parseInt(this.id) || parseInt('0'),

                pedido_cliente: this.codigo_cliente,
                pedido_dias_sem_efetuar_compra: '0',
                pedido_emissao: this.data_emissao,
                pedido_status: this.status,
                pedido_percentual_pedido: this.percentual_especial,
                pedido_representante: this.codigo_vendedor,
                pedido_segmento_representante: 1,
                pedido_supervisor: '1',
                pedido_segmento_supervisor:  [],
                pedido_nivel: String(this.clienteNivel.id_nivel),
                pedido_cidade: this.clienteIBGE.IBGE,
                pedido_estado: this.clienteIBGE.IBGE.substring(0,2),
                pedido_prazo_do_pedido: this.codigo_prazo,
                item: [TempItem]
            };

            const response = await axios.post(
                '/comandos/classes/regra/busca_regra.php', {
                    id_pedido: null,
                    id_regra: '4',
                    array_pedido: {data: [this.TempRegraPedido] }
                }
            );
            const data = response.data;
            this.RegrasHabilitadas = data;
            let dados = [];
            for (var i = 0; i < data.data.itens[0].length; i++) {
                if (this.TempArrayItem.cod_produto != '' && this.TempArrayItem.cod_produto == data.data.itens[0][i].produtos) {
                    dados.push({
                        acumulativo: data.data.acumulativo,
                        aplicar:  data.data.aplicar,
                        produtos:  data.data.itens[0][i].produtos,
                        prioridade: data.data.prioridade,
                        sugerir: data.data.sugerir,
                        tipo_aplicacao: data.data.tipo_aplicacao
                    });
                }
            }
            this.RegrasHabilitadas = dados as any;
        }
    },
    async mounted() {
        this.itemsPesquisa = await this.popularArrayCombinado('lista_produto');
        this.itemsEmpresa = await this.popularArrayCombinado('lista_empresa');
        this.itemsCliente = await this.popularArrayCombinado('lista_cliente');
        this.itemsRepresentante = await this.popularArray('lista_representante');
        this.itemsPrazo = await this.popularArray('lista_prazo');
        this.itemsFormaPagamento = await this.popularArray('lista_forma_pagamento');

        this.getPedidoCompleto(this.id.toString());

        this.timeoutId = setTimeout(this.resizeTextarea, 1000);
    }
}
</script>
