<template>
    <button class="btn btn-primary mb-4" @click="openCreateModal">Novo Registro</button>
    <div role="tablist" class="tabs tabs-lifted">
        <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Ativos" checked />
        <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box">
            <DataTable :value="data" class="table table-compact" :paginator="true" :rows="20"
                :rowsPerPageOptions="[10, 20, 50, 100]">
                <Column field="id" header="ID" sortable></Column>
                <Column field="nome" header="Nome" sortable></Column>
                <Column field="sobrenome" header="Sobrenome" sortable></Column>
                <Column field="sexo" header="Sexo" sortable></Column>
                <Column field="endereco" header="Endereço" sortable></Column>
                <Column field="bairro" header="Bairro" sortable></Column>
                <Column field="data_nascimento" header="Data de Nascimento" sortable>
                    <template #body="{ data }">
                        <div>
                            <div class="font-bold">{{ (data.data_nascimento != null ? formatData(data.data_nascimento) :
        '') }}</div>
                        </div>
                    </template>
                </Column>
                <Column field="saida_em" header="Saída Em" sortable>
                    <template #body="{ data }">
                        <div>
                            <div class="font-bold">{{ (data.saida_em != null ? formatData(data.saida_em) : '') }}</div>
                        </div>
                    </template>
                </Column>
                <Column field="contato_1" header="Contato 1" sortable></Column>
                <Column field="contato_2" header="Contato 2" sortable></Column>
                <Column field="mei" header="MEI" sortable></Column>
                <Column header="Ações">
                    <template #body="{ data }">
                        <button class="btn btn-sm btn-primary p-0 px-1 mx-1" @click="openEditModal(data)"><i
                                class="bx bxs-edit"></i></button>
                        <button class="btn btn-sm btn-error p-0 px-1 mx-1" @click="confirmDelete(data.id)"><i
                                class="bx bxs-trash"></i></button>
                    </template>
                </Column>
            </DataTable>
        </div>

        <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Inativos" />
        <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box">
            <DataTable :value="datainativo" class="table table-compact text-red-500" :paginator="true" :rows="20"
                :rowsPerPageOptions="[10, 20, 50, 100]">
                <Column field="id" header="ID" sortable></Column>
                <Column field="nome" header="Nome" sortable></Column>
                <Column field="sobrenome" header="Sobrenome" sortable></Column>
                <Column field="sexo" header="Sexo" sortable></Column>
                <Column field="endereco" header="Endereço" sortable></Column>
                <Column field="bairro" header="Bairro" sortable></Column>
                <Column field="data_nascimento" header="Data de Nascimento" sortable>
                    <template #body="{ data }">
                        <div>
                            <div class="font-bold">{{ (data.data_nascimento != null ? formatData(data.data_nascimento) :
        '') }}</div>
                        </div>
                    </template>
                </Column>
                <Column field="saida_em" header="Saída Em" sortable>
                    <template #body="{ data }">
                        <div>
                            <div class="font-bold">{{ (data.saida_em != null ? formatData(data.saida_em) : '') }}</div>
                        </div>
                    </template>
                </Column>
                <Column field="contato_1" header="Contato 1" sortable></Column>
                <Column field="contato_2" header="Contato 2" sortable></Column>
                <Column field="mei" header="MEI" sortable></Column>
            </DataTable>
        </div>
    </div>
    <!-- Create/Edit Modal -->
    <div id="modal" class="modal" :class="{ 'modal-open': showModal }">
        <div class="modal-box">
            <h2 class="font-bold text-lg">{{ isEditing ? 'Editar Registro' : 'Novo Registro' }}</h2>
            <form @submit.prevent="isEditing ? updateData() : createData()">
                <div class="form-control">
                    <label class="label">Nome</label>
                    <input type="text" v-model="formData.nome" class="input input-bordered" required />
                </div>
                <div class="form-control">
                    <label class="label">Sobrenome</label>
                    <input type="text" v-model="formData.sobrenome" class="input input-bordered" />
                </div>
                <div class="form-control">
                    <label class="label">Sexo</label>
                    <select class="select select-bordered w-full max-w-xs" v-model="formData.sexo">
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>
                </div>
                <div class="form-control">
                    <label class="label">Endereço</label>
                    <input type="text" v-model="formData.endereco" class="input input-bordered" />
                </div>
                <div class="form-control">
                    <label class="label">Bairro</label>
                    <input type="text" v-model="formData.bairro" class="input input-bordered" />
                </div>
                <div class="form-control">
                    <label class="label">Data nascimento</label>
                    <input type="date" v-model="formData.data_nascimento" class="input input-bordered" />
                </div>
                <div class="form-control">
                    <label class="label">Data da saída</label>
                    <input type="date" v-model="formData.saida_em" class="input input-bordered" />
                </div>
                <div class="form-control">
                    <label class="label">Contato 1</label>
                    <input type="text" v-model="formData.contato_1" class="input input-bordered" />
                </div>
                <div class="form-control">
                    <label class="label">Contato 2</label>
                    <input type="text" v-model="formData.contato_2" class="input input-bordered" />
                </div>
                <div class="form-control">
                    <label class="label">Nº MEI</label>
                    <input type="text" v-model="formData.mei" class="input input-bordered" />
                </div>
                <div class="modal-action">
                    <button type="submit" class="btn btn-primary">{{ isEditing ? 'Atualizar' : 'Criar' }}</button>
                    <button type="button" class="btn" @click="closeModal">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            data: [] as any[],
            datainativo: [] as any[],
            loadData: false,
            showModal: false,
            isEditing: false,
            formData: {
                id: null,
                nome: null,
                sobrenome: null,
                sexo: null,
                endereco: null,
                bairro: null,
                data_nascimento: null,
                ativo: "1",
                cadastrado_em: null,
                saida_em: null,
                contato_1: null,
                contato_2: null,
                mei: null
            },
        };
    },
    created() {
        this.fetchData();
        this.fetchDataInativo();
    },
    methods: {
        async fetchData() {
            this.loadData = true;
            try {
                const response = await axios.get(`/api/pcp/pessoa/terceirizado`);
                this.data = response.data;
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                this.loadData = false;
            }
        },
        async fetchDataInativo() {
            this.loadData = true;
            try {
                const response = await axios.get(`/api/pcp/pessoa/terceirizadoinativo`);
                this.datainativo = response.data;
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                this.loadData = false;
            }
        },
        formatData(date: string) {
            return moment(date).format("DD/MM/YYYY");
        },
        openCreateModal() {
            this.isEditing = false;
            this.formData = {
                id: null,
                nome: null,
                sobrenome: null,
                sexo: null,
                endereco: null,
                bairro: null,
                data_nascimento: null,
                ativo: "1",
                cadastrado_em: null,
                saida_em: null,
                contato_1: null,
                contato_2: null,
                mei: null
            },
            this.showModal = true;
        },
        openEditModal(data: any) {
            this.isEditing = true;
            this.formData = { ...data };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async createData() {
            try {
                await axios.post(`/api/pcp/pessoa/terceirizado`, this.formData);
                this.fetchData();
                this.closeModal();
            } catch (error) {
                console.error('Erro ao criar registro:', error);
            }
        },
        async updateData() {
            try {
                await axios.put(`/api/pcp/pessoa/terceirizado/${this.formData.id}`, this.formData);
                this.fetchData();
                this.closeModal();
            } catch (error) {
                console.error('Erro ao atualizar registro:', error);
            }
        },
        confirmDelete(id: number) {
            Swal.fire({
                title: 'Tem certeza?',
                text: 'Você não poderá reverter isso!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.deleteData(id);
                    Swal.fire('Excluído!', 'O registro foi excluído.', 'success');
                }
            });
        },
        async deleteData(id: number) {
            try {
                await axios.delete(`/api/pcp/pessoa/terceirizado/${id}`);
                this.fetchData();
            } catch (error) {
                console.error('Erro ao excluir registro:', error);
            }
        },
    },
};
</script>

<style scoped>
.modal-open {
    display: block;
}
</style>