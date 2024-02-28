<template>
    <div v-html="html_impressao"></div>
</template>

<script lang="ts">
import { ItensPedidoGestor, PedidoGestor } from "../../provider/interface_pedido.ts";
import { PessoaEndereco } from "../../provider/interface_pessoa_endereco.ts";
import { PessoaContato } from "../../provider/interface_pessoa_contato.ts";
import moment from 'moment';
import axios from 'axios';
export default {
    data() {
        return{
            info_cliente: {} as PessoaEndereco,
            info_contato: [] as PessoaContato[],
            pedido: {} as PedidoGestor,
            html_impressao: ''
        }
        
    },
    props: {
        Pedido: { 
            type: String, 
            default: ''
        }
    },
    watch: {
        Pedido: function() {
            console.log(this.Pedido);
            this.imprimir(this.Pedido, true);
        }
    },
    methods: {
        CMoeda: function (total: number) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);
        },
        CDecimal: function (total: string, fixed: number) {
            return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: fixed, maximumFractionDigits: fixed }).format(parseFloat(total));
        },
        async imprimir(numero_objeto: string, imposto: boolean) {
            let response = await axios.get('/comandos/classes/pedido/comandos/pedido/json_pedido_completo.php', {params: { id: numero_objeto }});
            this.pedido = response.data.data[0];
            this.html_impressao = await this.impressao_pedido(this.pedido, imposto);
        },
        async impressao_pedido (pedido: PedidoGestor, displayImposto: boolean) {
            let response_cliente = await axios.get('/comandos/inserts/json_pessoa_endereco.php', {params: { codigo: pedido.codigo_cliente }}); 
            this.info_cliente = response_cliente.data.data[0];

            let response_contato = await axios.get('/comandos/inserts/json_pessoa_contato.php', {params: { codigo: pedido.codigo_cliente }});
            this.info_contato = response_contato.data.data;

            let lista_contato = "";
            for(var i = 0; i < this.info_contato.length; i++) {            
                lista_contato += this.info_contato[i].Contato;
                if(i < this.info_contato.length -1) {
                    lista_contato += " â€¢ ";
                }
            }

            var numero_pedido = "# " + pedido.numero_pedido;
            var data_emissao = moment(pedido.data_emissao).format("DD/MM/YYYY");
            var tipo_pedido = (pedido.tipo_pedido == "A" ? "ATACADO" : "VAREJO");
            var data_impressao = "impresso em " + moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
            var cliente = pedido.codigo_cliente + " " + pedido.nome_cliente;
            var cnpj = "cnpj: " + this.info_cliente.CdCPF_CGC;
            var ie = (this.info_cliente.NrInscricaoEstadual != "" ? "ie.: " + this.info_cliente.NrInscricaoEstadual : "");
            var im = (this.info_cliente.NrInscricaoMunicipal != "" ? "im.: " + this.info_cliente.NrInscricaoMunicipal : "");
            var end = "end.: " + this.info_cliente.TpLogradouro + " " + this.info_cliente.NmLogradouro + ', ' + this.info_cliente.NrLogradouro + " - cep: " + this.info_cliente.CdCEP;
            var bairro = "bairro: " + this.info_cliente.NmBairro;
            var cidade = "cidade: " + this.info_cliente.NmCidade;
            var tel = "tel.: " + lista_contato;
            var nivel = pedido.nivel;
            var vendedor = "vendedor: " + pedido.vendedor;
            var televendas = (pedido.televenda != "" ? "televendas: " + pedido.televenda : "");
            
            var html_itens = "";
            

            var total_peso: string = '';
            var total_cubagem: string = '';
            var total_volume: string = '';
            let vltotal_liquido: number = 0;
            var vltotal_imposto = 0;
            var desconto_maximo = pedido.desconto_maximo + "%";

            var desconto_adicional = pedido.desconto_adicional;
            var desconto_suframa = pedido.desconto_suframa;

            let itens = [] as ItensPedidoGestor[];
            JSON.parse(JSON.stringify(pedido.item[0])).forEach((element: ItensPedidoGestor) => {
                itens.push(element);
            });
            

            for (var i = 0; i < itens.length; i++) {
                var desconto_aplicado = (1-((itens[i].liquido / itens[i].bruto) / (1-(pedido.desconto_maximo/100)))) * 100;
                desconto_aplicado = parseFloat(desconto_aplicado.toFixed(2));
                var display ="";
                if (desconto_aplicado == 0.00) {
                    display = "-";
                }else {
                    if (desconto_aplicado >= 0) {
                        display = "-" + desconto_aplicado + "%";
                    }
                    else if (desconto_aplicado < 0){
                        display = "+" + (desconto_aplicado * (-1)) + "%";
                    }
                }
                
                
                html_itens += `
                <tr  class="border-bottom">
                    <td class="text-center codigo p-1">`+itens[i].codigo+`</td>
                    <td class="text-center qtd p-1">`+itens[i].qtd+`</td>
                    <td class="text-start descricao p-1">`+itens[i].descricao+`</td>
                    <td class="text-center emb p-1">`+itens[i].emb+`</td>
                    <td class="text-center unidade p-1">`+itens[i].unidade+`</td>
                    <td class="text-end bruto p-1">`+this.CMoeda(itens[i].bruto)+`</td>
                    <td class="`+(display == "-" ? `text-center` : `text-end`)+` percentual p-1">`+display+`</td>
                    <td class="text-end liquido p-1">`+this.CMoeda(itens[i].liquido)+`</td>
                    <td class="text-end total_imposto p-1">`+(displayImposto == true ? this.CMoeda(itens[i].total_imposto) : this.CMoeda(0))+`</td>
                    <td class="text-end total_liquido p-1">`+this.CMoeda(itens[i].total_liquido)+`</td>
                </tr>
                `;
                total_peso += parseInt(itens[i].qtd) * itens[i].peso;
                total_cubagem += parseInt(itens[i].qtd) * itens[i].cubagem;
                total_volume += parseInt(itens[i].qtd) * itens[i].volume;
                vltotal_liquido += itens[i].total_liquido;
                vltotal_imposto += (displayImposto == true ? itens[i].total_imposto : 0);
            }
            var prazo = "prazo de " + pedido.prazo + " dias";
            var caracteristica = pedido.caracteristica;
            var forma_pagamento = "forma pag: " + pedido.forma_pagamento;
            var percentual_especial = "pn: " + pedido.percentual_especial + "%";

            var obs_pedido = pedido.obs_pedido;
            var obs_nota = pedido.obs_nota;

            var vl_pedido = this.CMoeda(vltotal_liquido);
            var vl_imposto = this.CMoeda(vltotal_imposto);
            

            var vldesconto_suframa = (desconto_suframa == 10.65 ? vltotal_liquido - (vltotal_liquido * (1-(7/100)) * (1-(3.65/100))) : 0 );
            var vldesconto_adicional = (desconto_adicional > 0 ? desconto_adicional : 0 );


            var vltotal = this.CMoeda(vltotal_liquido + vltotal_imposto - vldesconto_suframa - vldesconto_adicional);

            total_peso = this.CDecimal(total_peso, 1) + "kg";
            total_cubagem = this.CDecimal(total_cubagem, 2) + "m³";
            total_volume = this.CDecimal(total_volume, 0) + " volumes";

            var layout_pedido = `
            
            <div class="pagina_impressao" style="font-size:0.9em;">
                <div class="page-title">
                    <div class="row border-bottom">
                        <div class="col-auto">`+numero_pedido+`</div>
                        <div class="col-auto">`+data_emissao+`</div>
                        <div class="col-auto text-uppercase">`+tipo_pedido+`</div>
                        <div class="col text-end">`+data_impressao+`</div>
                    </div>
                    <div class="row">
                        <div class="col text-center text-uppercase">dados do cliente</div>
                    </div>
                    <div class="row text-uppercase">
                        <div class="col-auto text-nowrap">
                            `+cliente+`
                        </div>
                        <div class="col-auto">`+cnpj+`</div>
                        <div class="col-auto">`+ie+`</div>
                        <div class="col-auto">`+im+`</div>
                    </div>
                    <div class="row text-uppercase">
                        <div class="col text-nowrap">
                            `+end+`
                        </div>
                    </div>
                    <div class="row text-uppercase">
                        <div class="col-auto">
                            `+bairro+`
                        </div>
                        <div class="col-auto">
                            `+cidade+`
                        </div>
                        <div class="col-auto">
                            `+tel+`
                        </div>
                    </div>

                    <div class="row text-uppercase">
                        <div class="col-auto">
                            `+nivel+`
                        </div>
                        <div class="col-auto">
                            `+vendedor+`
                        </div>
                        <div class="col-auto">
                            `+televendas+`
                        </div>
                        <div class="float-end col-auto text-end">
                            desconto máximo: `+desconto_maximo+`
                        </div>
                    </div>
                </div>

                <div class="row text-uppercase">
                    <div class="col">
                        <table style="width:100%; font-size: 0.8em;">
                            <thead class="border-1">                    
                                <tr>
                                    <th class="text-center tcodigo p-1">#</th>
                                    <th class="text-center tqtd p-1">qtd.</th>
                                    <th class="text-start tdescricao p-1">descrição</th>
                                    <th class="text-center temb p-1">emb.</th>
                                    <th class="text-center tunidade p-1">un.</th>
                                    <th class="text-end tbruto p-1">bruto</th>
                                    <th class="text-end tpercentual p-1">%</th>
                                    <th class="text-end tliquido p-1">liquido</th>
                                    <th class="text-end ttotal_imposto p-1">imposto</th>
                                    <th class="text-end ttotal_liquido p-1">sub.total</th>
                                </tr>
                            </thead>
                            <tbody class="itens">
                                `+html_itens+`
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="border border-dark p-1 text-uppercase" style="font-size: 0.8em;">
                    <div class="row">
                        <div class="col-8">
                            <div class="row">
                                <div class="col-auto">
                                    `+prazo+`
                                </div>
                                <div class="col-auto">
                                    `+caracteristica+`
                                </div>
                                <div class="col-auto">
                                    `+forma_pagamento+`
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-auto">
                                    `+total_peso+`
                                </div>
                                <div class="col-auto">
                                    `+total_cubagem+`
                                </div>
                                <div class="col-auto">
                                    `+total_volume+`
                                </div>
                                <div class="col-auto">
                                    `+percentual_especial+`
                                </div>
                            </div>
                        </div>

                        <div class="col-4">
                            <div class="row">
                                <div class="col d-flex justify-content-between">
                                    <span class="w-px-100">Subtotal:</span>
                                    <span class="fw-semibold">`+vl_pedido+`</span>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col d-flex justify-content-between">
                                    <span class="w-px-100">Imposto:</span>
                                    <span class="fw-semibold">`+vl_imposto+`</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col d-flex justify-content-between">
                                    <span class="w-px-100">Suframa:</span>
                                    <span class="fw-semibold">`+this.CMoeda(vldesconto_suframa)+`</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col d-flex justify-content-between">
                                    <span class="w-px-100">Adicional:</span>
                                    <span class="fw-semibold">`+this.CMoeda(vldesconto_adicional)+`</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col d-flex justify-content-between fw-bold">
                                    <span class="w-px-100">Total:</span>
                                    <span class="fw-semibold">`+vltotal+`</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;

                (obs_pedido == "" ? "" : 
                layout_pedido += `
                <div class="border border-dark p-2 mt-1" style="border:dashed 1px !important;" style="font-size: 0.8em;">
                    <div class="row">
                        <div class="col">
                            <div class="row">
                                <div class="col"><div class="border-bottom border-dark">Observação do pedido</div></div>
                            </div>
                            <div class="row">
                                <div class="col">`+obs_pedido+`</div>
                            </div>
                        </div>
                    </div>
                </div>`);

                (obs_nota == "" ? "" : 
                layout_pedido += `
                <div class="border border-dark p-2 mt-1" style="border:dashed 1px !important;" style="font-size: 0.8em;">
                    <div class="row">
                        <div class="col">
                            <div class="row">
                                <div class="col"><div class="border-bottom border-dark">Observação do nota</div></div>
                            </div>
                            <div class="row">
                                <div class="col">`+obs_nota+`</div>
                            </div>
                        </div>
                    </div>
                </div>`);

                layout_pedido += `
                <div class="row m-0 p-0 mt-2" style="font-size: 0.8em;">
                    <div class="col-6">
                        <div class="row border me-1 p-1 border-dark">
                            <div class="col d-flex justify-content-between">
                                <span class="py-2">Transportadora:</span>
                            </div>
                        </div>
                        <div class="row border me-1 mt-1 p-1 border-dark">
                            <div class="col d-flex justify-content-between">
                                <span class="py-2">Redespacho:</span>
                            </div>
                        </div>
                        <div class="row border me-1 mt-1 p-1 border-dark">
                            <div class="col d-flex justify-content-between">
                                <span class="py-2">R$ Frete caminhoneiro:</span>
                            </div>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="row border ms-1 p-1 border-dark">
                            <div class="col d-flex justify-content-between">
                                <span class="py-2">R$ Frete:</span>
                            </div>
                        </div>
                        <div class="row border ms-1 mt-1 p-1 border-dark">
                            <div class="col d-flex justify-content-between">
                                <span class="py-2">R$ Frete:</span>
                            </div>
                        </div>
                        <div class="row border ms-1 mt-1 p-1 border-dark">
                            <div class="col d-flex justify-content-between">
                                <span class="py-2">R$ Frete Cam. c/ Redespacho:</span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            `;
            return layout_pedido;
        }
    },
    mounted() {
        this.imprimir(this.Pedido, false);
    }
};


    
</script>
