<template>
    <div class="rounded-box p-2 w-full mb-3 bg-base-100">
        <div class="grid grid-cols-6 gap-4">
            <div class="col-span-12 md:col-span-12">
                <a href="#" class="join-item btn btn-primary" @click="ShowModal()">
                    Lançar evento
                </a>
                <div class="join ms-2">
                    <a @click="MeTanterior" class="join-item btn btn-primary">
                        <i class="bx bx-chevron-left"></i> Anterior
                    </a>
                    <input type="date" class="input input-bordered join-item max-w-full input-primary"
                        @change="atualizarDataReferencia" :value="dataReferencia" />
                    <a @click="MeTproxima" class="join-item btn btn-primary">
                        Próxima <i class="bx bx-chevron-right"></i>
                    </a>
                </div>
                <a href="#" class="join-item btn btn-primary ms-2" @click="imprimir()">
                    Imprimir
                </a>
            </div>
        </div>
    </div>

    <div class="rounded-box w-full mb-3 bg-base-100" v-for="(dados, index) in data" :key="index">
        <div class="grid grid-cols-12 gap-0 p-3">
            <div class="col-1 flex border-e border-base-300">
                <span class="m-auto [writing-mode:vertical-lr] text-center" v-html="formatDate(dados.dia)">
                </span>
            </div>
            <div class="col-span-11">
                <div class="grid grid-cols-12 gap-y-4">
                    <div class="col-span-1 flex border-e border-base-300">
                        <span class="m-auto [writing-mode:vertical-lr]">
                            Manhã
                        </span>
                    </div>
                    <div class="col-span-11">
                        <div class="grid gap-4 grid-cols-8 flex">
                            <div class="col-span-2 text-center font-bold m-auto">TERCEIRIZADO</div>
                            <div class="col-span-2 text-center font-bold m-auto">DESCRIÇÃO</div>
                            <div class="col-span-1 text-center font-bold m-auto">QTD</div>
                            <div class="col-span-2 text-center font-bold m-auto">OBS</div>
                            <div class="col-span-1 text-center font-bold m-auto">-</div>
                        </div>
                        <div class="grid gap-4 grid-cols-8 border-t border-base-300" v-for="turn in dados.turno?.manha"
                            :class="turn.bandeira">
                            <div class="col-span-2 text-center m-auto" v-html="turn.tarefa"></div>
                            <div class="col-span-2 text-center m-auto" v-html="turn.descricao"></div>
                            <div class="col-span-1 text-center m-auto" v-html="turn.quantidade"></div>
                            <div class="col-span-2 text-center m-auto" v-html="turn.observacao"></div>
                            <div class="col-span-1 text-center m-auto">
                                <button class="btn btn-sm btn-primary p-0 px-1 mx-1" @click="openEditModal(turn)"><i
                                        class="bx bxs-edit"></i></button>
                                <button class="btn btn-sm btn-error p-0 px-1 mx-1" @click="confirmDelete(turn.id)"><i
                                        class="bx bxs-trash"></i></button>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-1 flex border-e border-base-300">
                        <span class="m-auto [writing-mode:vertical-lr]">
                            Tarde
                        </span>
                    </div>
                    <div class="col-span-11">
                        <div class="grid gap-4 grid-cols-8 flex">
                            <div class="col-span-2 text-center font-bold m-auto">TERCEIRIZADO</div>
                            <div class="col-span-2 text-center font-bold m-auto">DESCRIÇÃO</div>
                            <div class="col-span-1 text-center font-bold m-auto">QTD</div>
                            <div class="col-span-2 text-center font-bold m-auto">OBS</div>
                            <div class="col-span-1 text-center font-bold m-auto">-</div>
                        </div>
                        <div class="grid gap-4 grid-cols-8 border-t border-base-300" v-for="turn in dados.turno?.tarde"
                            :class="turn.bandeira">
                            <div class="col-span-2 text-center m-auto" v-html="turn.tarefa"></div>
                            <div class="col-span-2 text-center m-auto" v-html="turn.descricao"></div>
                            <div class="col-span-1 text-center m-auto" v-html="turn.quantidade"></div>
                            <div class="col-span-2 text-center m-auto" v-html="turn.observacao"></div>
                            <div class="col-span-1 text-center m-auto">
                                <button class="btn btn-sm btn-primary p-0 px-1 mx-1" @click="openEditModal(turn)"><i
                                        class="bx bxs-edit"></i></button>
                                <button class="btn btn-sm btn-error p-0 px-1 mx-1" @click="confirmDelete(turn.id)"><i
                                        class="bx bxs-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para Lançar Evento -->
    <div v-if="showAddModal" class="modal modal-open">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Lançar Evento</h3>
            <form @submit.prevent="createEvent">
                <!-- Campos do formulário -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Cor</span>
                    </label>
                    <div class="join">
                        <input type="radio" name="new-radio-1" value="bg-inherit" class="radio mx-1"
                            v-model="newEvent.bandeira" />
                        <input type="radio" name="new-radio-2" value="bg-secondary text-white"
                            class="radio radio-secondary mx-1" v-model="newEvent.bandeira" />
                        <input type="radio" name="new-radio-3" value="bg-success text-white"
                            class="radio radio-success mx-1" v-model="newEvent.bandeira" />
                    </div>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Terceirizado</span>
                    </label>
                    <input-drop-down :items="sugestoes" v-model="newEvent.tarefa" class="w-full" :minLetraPesquisar="2"
                        ref="inputDropDown" />
                    <!--<input type="text" v-model="newEvent.tarefa" class="input input-bordered input-sm" required>-->
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Descrição</span>
                    </label>
                    <input type="text" v-model="newEvent.descricao" class="input input-bordered input-sm" required>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Quantidade</span>
                    </label>
                    <input type="number" v-model="newEvent.quantidade" class="input input-bordered input-sm" required>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Data</span>
                    </label>
                    <input type="date" v-model="newEvent.dia" class="input input-bordered input-sm" required>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">turno</span>
                    </label>
                    <div class="join">
                        <label class="label cursor-pointer">
                            <input type="radio" name="radio-3" value="manha" class="radio mx-1"
                                v-model="newEvent.turno" /> Manhã
                        </label>
                        <label class="label cursor-pointer">
                            <input type="radio" name="radio-3" value="tarde" class="radio mx-1"
                                v-model="newEvent.turno" /> Tarde
                        </label>
                    </div>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Observação</span>
                    </label>
                    <textarea v-model="newEvent.observacao" class="textarea textarea-bordered"></textarea>
                </div>
                <div class="modal-action">
                    <button type="submit" class="btn btn-primary">Salvar</button>
                    <a href="#" class="btn" @click="showAddModal = false">Cancelar</a>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal para Editar Evento -->
    <div v-if="showEditModal" class="modal modal-open">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Editar Evento</h3>
            <form @submit.prevent="updateEvent">
                <!-- Campos do formulário -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Cor</span>
                    </label>
                    <div class="join">
                        <input type="radio" name="current-radio-1" value="bg-inherit" class="radio mx-1"
                            v-model="currentEvent.bandeira" />
                        <input type="radio" name="current-radio-2" value="bg-secondary text-white"
                            class="radio radio-secondary mx-1" v-model="currentEvent.bandeira" />
                        <input type="radio" name="current-radio-3" value="bg-success text-white"
                            class="radio radio-success mx-1" v-model="currentEvent.bandeira" />
                    </div>
                </div>
                <div class="form-control mt-2">
                    <Cabecalho Label="Terceirizado" v-model="currentEvent.id_tarefa" :Dados="sugestoes"
                        :minSearch="0" />
                    <!--<input type="text" v-model="currentEvent.tarefa" class="input input-bordered input-sm" required>-->
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Descrição</span>
                    </label>
                    <input type="text" v-model="currentEvent.descricao" class="input input-bordered input-sm" required>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Quantidade</span>
                    </label>
                    <input type="number" v-model="currentEvent.quantidade" class="input input-bordered input-sm"
                        required>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Data</span>
                    </label>
                    <input type="date" v-model="currentEvent.dia" class="input input-bordered input-sm" required>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">turno</span>
                    </label>
                    <div class="join">
                        <label class="label cursor-pointer">
                            <input type="radio" name="radio-3" value="manha" class="radio mx-1"
                                v-model="currentEvent.turno" /> Manhã
                        </label>
                        <label class="label cursor-pointer">
                            <input type="radio" name="radio-3" value="tarde" class="radio mx-1"
                                v-model="currentEvent.turno" /> Tarde
                        </label>
                    </div>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Observação</span>
                    </label>
                    <textarea v-model="currentEvent.observacao" class="textarea textarea-bordered"></textarea>
                </div>
                <div class="modal-action">
                    <button type="submit" class="btn btn-primary">Salvar</button>
                    <a href="#" class="btn" @click="showEditModal = false">Cancelar</a>
                </div>
            </form>
        </div>
    </div>

    <impressao_programacao_terceirizado ref="imprimir_relatorio" style="display: none;" :dados="data"></impressao_programacao_terceirizado>
</template>



<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'moment/locale/pt-br';
import InputDropDown from '../../../components/input/InputDropDown.vue';
import Cabecalho from '../../../components/pedido/Cabecalho.vue';
import impressao_programacao_terceirizado from './impressao_programacao_terceirizado.vue';

export default defineComponent({
    components: {
        InputDropDown, Cabecalho, impressao_programacao_terceirizado
    },
    name: 'DataGrid',
    data() {
        return {
            data: [] as any[],
            loadData: false,
            anterior: 0,
            proxima_ok: false,
            key_pesquisa: '',
            dataReferencia: moment().format('YYYY-MM-DD'),
            showAddModal: false,
            showEditModal: false,
            newEvent: {
                bandeira: 'bg-inherit',
                tarefa: '',
                descricao: '',
                quantidade: '',
                dia: null,
                turno: null,
                observacao: ''
            },
            currentEvent: null as any,
            suggestions: [] as any[],
            sugestoes: [] as any[],
        };
    },
    created() {
        this.fetchData(this.dataReferencia);
        this.fetchSugestoes();
    },
    methods: {
        imprimir() {
            const printableContent = (this.$refs.imprimir_relatorio as any).$el as HTMLElement;
            
            const printWindow = window.open('', '', 'height=1000,width=1000');            
            if (printWindow) {
                printWindow.document.body.style.display = 'none';
                printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Imprimir Pedido</title>
                        <style>
                            html, body {
                                margin: 0px; padding:0px;
                            }
                            @media print 
                            {
                                @page {
                                    size: A4; 
                                    margin: 0;
                                }
                                html, body {
                                    width: 210mm;
                                    height: 297mm;
                                    font-size: 11px;
                                    background: #FFF;
                                    overflow: visible;
                                }
                                body {
                                    padding: 5mm;
                                    margin: 10mm;
                                }
                            }
                        </style>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    </head>
                    <body>
                        ${printableContent.innerHTML}
                    </body>
                </html>
                `);
                let scriptElement = printWindow.document.createElement('script');
                scriptElement.type = "text/javascript";
                scriptElement.text = `
                setTimeout(function() {
                    window.print();
                    window.close();
                }, 500);
                `;
                printWindow.document.body.appendChild(scriptElement);
            }
        },
        async search(event: any) {
            try {
                const response = await axios.get(`/api/pcp/pessoa/sugestao_terceirizado/${event.query}`);
                this.sugestoes = response.data;
            } catch (error) {
                console.error('Erro ao buscar sugestões:', error);
            }
        },
        async fetchSugestoes() {
            try {
                const response = await axios.get(`/api/pcp/pessoa/sugestao_terceirizado`);
                this.sugestoes = response.data;
                this.suggestions = this.sugestoes.map(s => s.nome);
            } catch (error) {
                console.error('Erro ao buscar sugestões:', error);
            }
        },
        async fetchData(referenceDate: string) {
            this.loadData = true;
            try {
                const response = await axios.get(`/api/pcp/terceirizado/${referenceDate}`);
                this.data = response.data;
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                this.loadData = false;
            }
        },
        MeTanterior() {
            this.dataReferencia = moment(this.dataReferencia).subtract(7, 'days').format('YYYY-MM-DD');
            this.fetchData(this.dataReferencia);
        },
        MeTproxima() {
            this.dataReferencia = moment(this.dataReferencia).add(7, 'days').format('YYYY-MM-DD');
            this.fetchData(this.dataReferencia);
        },
        atualizarDataReferencia(event: Event) {
            const input = event.target as HTMLInputElement;
            this.dataReferencia = input.value;
            this.fetchData(this.dataReferencia);
        },
        formatDate(dateString: any) {
            const listaDiaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
            const dia = moment(dateString).format('DD/MM/YYYY');
            const diaSemana = listaDiaSemana[moment(dateString).weekday()];
            return `${diaSemana} <br/> ${dia}`;
        },
        openEditModal(event: any) {
            this.currentEvent = { ...event };
            this.showEditModal = true;
        },
        ShowModal() {
            this.showAddModal = true;
            this.newEvent = {
                bandeira: 'bg-inherit',
                tarefa: '',
                descricao: '',
                quantidade: '',
                dia: null,
                turno: null,
                observacao: ''
            };

        },
        async createEvent() {
            try {
                var id: string = String((this.newEvent.tarefa as any).id);
                this.newEvent.tarefa = id;
                const response = await axios.post('/api/pcp/terceirizado', this.newEvent);
                this.data.push(response.data);
                this.showAddModal = false;
                Swal.fire('Sucesso', 'Evento criado com sucesso', 'success');
            } catch (error) {
                console.error('Erro ao criar evento:', error);
                Swal.fire('Erro', 'Erro ao criar evento', 'error');
            }
            this.fetchData(this.dataReferencia);
        },
        async updateEvent() {
            try {
                await axios.put(`/api/pcp/terceirizado/${this.currentEvent.id}`, this.currentEvent);
                //const index = this.data.findIndex(event => event.id === this.currentEvent.id);
                //this.$set(this.data, index, response.data);
                this.showEditModal = false;
                Swal.fire('Sucesso', 'Evento atualizado com sucesso', 'success');
            } catch (error) {
                console.error('Erro ao atualizar evento:', error);
                Swal.fire('Erro', 'Erro ao atualizar evento', 'error');
            }
            this.fetchData(this.dataReferencia);
        },
        confirmDelete(eventId: any) {
            Swal.fire({
                title: 'Tem certeza?',
                text: "Você não poderá reverter isso!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete(`/api/pcp/terceirizado/${eventId}`);
                        this.data = this.data.filter(event => event.id !== eventId);
                        Swal.fire('Excluído!', 'Evento foi excluído.', 'success');
                    } catch (error) {
                        console.error('Erro ao excluir evento:', error);
                        Swal.fire('Erro', 'Erro ao excluir evento', 'error');
                    }
                    this.fetchData(this.dataReferencia);
                }
            });
        }
    }
});
</script>
