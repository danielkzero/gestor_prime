<template>
    <div class="dropdown" @keydown.down.prevent="moveDown" @keydown.up.prevent="moveUp"
        @keydown.enter="selectActiveItem">
        <input class="input input-bordered w-full input-sm" v-model="searchTerm" @input="filterItems" ref="inputRef" />
        <template v-if="dropdownVisible">
            <div ref="dropdownContent" class="shadow-md menu dropdown-content z-[1] bg-base-100 rounded-box w-full"
                style="max-height: 20rem; overflow-y: auto">
                <ul v-if="filteredItems.length > 0" class="w-full">
                    <li v-for="(item, index) in filteredItems" :key="index">
                        <button :class="{ active: index === activeIndex }" @click="selectItem(item)">{{ item.descricao }}</button>
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>
<script lang="ts">
import { Item } from '../../provider/interface_item_descricao.ts';
export default {
    props: {
        items: {
            type: Array as () => Item[],
            default: () => [],
        },
        minLetraPesquisar: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            searchTerm: "",
            itemEscolhido: [],
            dropdownVisible: false,
            activeIndex: -1,
        };
    },
    computed: {
        filteredItems() {
            if (this.searchTerm.length >= this.minLetraPesquisar) {
                const searchWords = this.searchTerm.trim().toLowerCase().split(" ");
                return this.items.filter((item: any) =>
                    searchWords.every((word) =>
                        item.descricao.toLowerCase().includes(word) || item.id.toString().toLowerCase().includes(word)
                    )
                );
            }
            return [];
        },
    },
    methods: {
        setSearchTerm() {
            this.searchTerm = '';
        },
        filterItems() {
            this.dropdownVisible = this.filteredItems.length > 0;
            if (this.dropdownVisible && !this.isActiveItemInView()) {
                this.$nextTick(() => {
                    this.scrollActiveItemIntoView();
                });
            }
        },
        isActiveItemInView() {
            const dropdownContent = this.$refs.dropdownContent as HTMLElement;
            if (!dropdownContent) {
                return false;
            }
            const activeItem = dropdownContent.querySelector('.active') as HTMLElement;
            if (!activeItem) {
                return false;
            }
            const dropdownRect = dropdownContent.getBoundingClientRect();
            const activeItemRect = activeItem.getBoundingClientRect();
            return activeItemRect.top >= dropdownRect.top && activeItemRect.bottom <= dropdownRect.bottom;
        },
        scrollActiveItemIntoView() {
            const dropdownContent = this.$refs.dropdownContent as HTMLElement;

            const activeItem = dropdownContent.querySelector('.active') as HTMLElement;
            if (activeItem) {
                activeItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        },
        selectItem(item: any) {
            this.itemEscolhido = item;
            this.dropdownVisible = false;
            this.searchTerm = item.descricao;
            this.$emit("update:modelValue", item);
        },
        moveDown() {
            if (this.activeIndex != -1) {
                if (this.activeIndex < this.filteredItems.length - 1) {
                    this.activeIndex = this.activeIndex + 1;
                    this.scrollActiveItemIntoView();
                }
            } else {
                this.activateFirstItem();
            }
        },
        moveUp() {
            if (this.activeIndex > 0) {
                this.activeIndex--;
                this.scrollActiveItemIntoView();
            }
        },
        activateFirstItem() {
            if (this.filteredItems.length > 0 && this.activeIndex == -1) {
                this.activeIndex = 0;
            }
        },
        selectActiveItem() {
            if (this.activeIndex >= 0 && this.activeIndex < this.filteredItems.length) {
                this.selectItem(this.filteredItems[this.activeIndex]);
            }
        },
    },
    watch: {
        SearchTerm() {
            this.activeIndex = -1;
        },
    },
    mounted() {
        (this.$refs.inputRef as any).focus();
    },
};
</script>

<style scoped>
    .active {
        background-color: #f0f0f0;
    }
</style>
