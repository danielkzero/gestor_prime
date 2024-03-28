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
            <select class="select select-bordered w-full select-primary mb-2">
                <option>Molde</option>
                <option>Máquina</option>
            </select>
        </label>
        <label>
            <div class="w-52 text-sm mb-2">Equipamento</div>
            <div class="join w-full mb-2">
                <input type="text" placeholder="Código" class="join-item input input-bordered w-40  input-primary" />
                <input type="text" class="join-item input input-bordered w-full input-primary" readonly />
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

export default {
    emits: ['changeAbrirConteudo'],
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
        }
    },
    data() {
        return {
            situacoes: [] as String[],
            NovaSituacao: '',
        }
    }
}
</script>