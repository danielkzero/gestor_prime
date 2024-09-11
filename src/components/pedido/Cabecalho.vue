<template>
    <div>
        <label for="Empresa" class="pb-2 text-sm block">
            <span class="text-primary">{{ Label }}</span>
            <span class="hover:bg-primary hover:text-base-100 text-primary px-2 py-1 rounded link" @click="Editar = !Editar">
                <i class='bx bx-edit'></i>
            </span>
            <template v-if="limparAtivo">
                <span class="hover:bg-red-500 hover:text-base-100 text-red-500 px-2 py-1 rounded link" @click="Remove()">
                    <i class='bx bx-trash'></i>
                </span>
            </template>           
        </label>
        <template v-if="Editar">
            <input-drop-down :items="Dados" class="w-full" v-model="indexModel" :minLetraPesquisar="minSearch" />
        </template>
        <template v-else>
            {{ Display }}
        </template>
    </div>
</template>

<script lang="ts">
import InputDropDown from '../../components/input/InputDropDown.vue';
import { Item } from '../../provider/interface_item_descricao.ts';
export default {
    components: {
        InputDropDown
    },
    props: {
        Label: String,
        Dados: {
            type: Array as () => any[] | undefined,
            default: () => undefined,
        },
        modelValue: String,
        minSearch: {
            type: Number,
            default: 0
        },
        limparAtivo: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            Editar: false,
            Display: '' as String
        };
    },
    computed: {
        /*indexModel: {
            get() {
                if (!this.modelValue) {
                    return null;
                }                    
                this.Displayme(this.modelValue);
                return this.modelValue;
            },
            set(value: Item) {
                const novoValor: Item = this.Dados?.find((item: any) => item.id === value.id || null) as Item;
                this.$emit('update:modelValue', novoValor.id ?? null);
                this.Displayme(novoValor.id ?? null);
                this.Editar = false;
            }
        }*/
        indexModel: {
            get() {
                if (!this.modelValue) {
                    return null;
                }
                const selectedItem = this.Dados?.find((item: Item) => item.id === this.modelValue) as Item;
                this.Displayme(selectedItem);
                return selectedItem;
            },
            set(value: Item) {
                this.$emit('update:modelValue', value.id ?? null);
                this.Displayme(value);
                this.Editar = false;
            }
        }
    },
    methods: {
        /*
        Displayme(index: any) {
            const item: Item = this.Dados?.find((item: Item) => item.id === index) as Item;
            this.Display = item?.descricao ?? '';
        },
        Remove() {
            this.$emit('update:modelValue', null); 
            this.Displayme(null);
            this.Editar = false; 
        }*/
        Displayme(item: Item | null) {
            this.Display = item?.descricao ?? '';
        },
        Remove() {
            this.$emit('update:modelValue', null); 
            this.Displayme(null);
            this.Editar = false; 
        }
    },
    watch: {
        indexModel() {},
        modelValue() {
            const selectedItem = this.Dados?.find((item: Item) => item.id === this.modelValue) as Item;
            this.Displayme(selectedItem);
        }
    }
};
</script>