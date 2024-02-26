<template>
    <a v-for="item in Dados" class="badge text-indigo-800 bg-indigo-100" :href="'tel:' + convertLink(item.Contato)">
        <i class="bx bx-phone-call me-1"></i>
        {{ item.Contato }}
    </a>
</template>
<script lang="ts">
export default {
    props: {
        Dados: {
            type: Array as () => any[] | undefined,
            default: () => undefined,
        }
    },
    methods: {
        convertLink(link) {
            console.log(link);
            return link.replace(" ","").replace("(","").replace(")","").replace("-","");
        }
    }
}
</script>