<template>
    <div v-html="html_print"></div>
</template>
<script lang="ts">
import moment from 'moment';
import 'moment/locale/pt-br';
export default {
    data() {
        return {
            html_impressao: [] as any[],
            html_print: ''
        }
    },
    props: {
        dados: {
            type: Array,
            default: []
        }
    },
    watch: {
        dados: function () {
            this.html_impressao = this.dados;
            this.imprimir();
        }
    },
    methods: {
        imprimir() {
            const listaDiaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
            this.html_print = '';
            this.html_print+=`<table width:100%>`;
            for (var i = 0; i < this.html_impressao.length; i++) {
                const dia = moment(this.html_impressao[i].dia).format('DD/MM/YYYY');
                const diaSemana = listaDiaSemana[moment(this.html_impressao[i].dia).weekday()];
               
                
                this.html_print += `                    
                        <tr style="border: 1px solid; margin: 10px;">
                            <td width="1%" style="writing-mode: vertical-rl;" align="center" valign="center">
                                ${dia}<br />
                                ${diaSemana}
                            </td>
                            <td>
                                <table>
                                    <tr style="border-left: 1px solid; text-align: center; vertical-align: middle;">
                                        <td width="1%" style="writing-mode: vertical-rl" align="center" valign="center">Manhã</td>
                                        <td>
                                            <table width="100%">
                                                <tr>
                                                    <th width="20%">TERCEIRIZADO</th>
                                                    <th width="30%">DESCRIÇÃO</th>
                                                    <th width="10%">QTD</th>
                                                    <th width="40%">OBS.</th>
                                                </tr>
                `;

                for (var j = 0; j < this.html_impressao[i].turno.manha.length; j++) {
                    this.html_print += `
                                                <tr style="border-top: 1px solid;">
                                                    <td>
                                                        ${this.html_impressao[i].turno.manha[j].tarefa}
                                                    </td>
                                                    <td>
                                                        ${this.html_impressao[i].turno.manha[j].descricao}
                                                    </td>
                                                    <td>
                                                        ${this.html_impressao[i].turno.manha[j].quantidade}
                                                    </td>
                                                    <td>
                                                        ${this.html_impressao[i].turno.manha[j].observacao}
                                                    </td>
                                                </tr>`;
                }

                this.html_print +=`         </table>
                                         </td>
                                    </tr>
                                    <tr style="border-left: 1px solid; border-top: 1px solid; text-align: center;">
                                        <td width="1%" style="writing-mode: vertical-rl" align="center" valign="center">Tarde</td>
                                        <td>
                                            <table width="100%">
                                                <tr>
                                                    <th width="20%">TERCEIRIZADO</th>
                                                    <th width="30%">DESCRIÇÃO</th>
                                                    <th width="10%">QTD</th>
                                                    <th width="40%">OBS.</th>
                                                </tr>
                `;

                for (var j = 0; j < this.html_impressao[i].turno.tarde.length; j++) {
                    this.html_print += `
                                                <tr style="border-top: 1px solid;">
                                                    <td>
                                                        ${this.html_impressao[i].turno.tarde[j].tarefa}
                                                    </td>
                                                    <td>
                                                        ${this.html_impressao[i].turno.tarde[j].descricao}
                                                    </td>
                                                    <td>
                                                        ${this.html_impressao[i].turno.tarde[j].quantidade}
                                                    </td>
                                                    <td>
                                                        ${this.html_impressao[i].turno.tarde[j].observacao}
                                                    </td>
                                                </tr>`;
                }

                this.html_print +=`         </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    `;
            }
            this.html_print+=`</table>`;
        }
    }
}
</script>