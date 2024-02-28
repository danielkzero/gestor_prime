<template>
    <a v-for="item in NovaListaContato" class="badge text-indigo-800 bg-indigo-100" :href="'tel:' + item.Contato">
        <i class="bx bx-phone-call me-1"></i>
        {{ formatarTelefone(item.Contato) }}
    </a>
</template>
<script lang="ts">
export interface contato {
    Contato: string
}
export default {
    props: {
        Dados: {
            type: Array as () => any[] | undefined,
            default: () => undefined,
        }
    },
    data() {
        return {
            NovaListaContato: [] as contato[]
        }
    },
    watch: {
        Dados: function() {
            this.NovaListaContato = [];
            if (this.Dados != undefined) {  
                
                for(var i = 0; i < this.Dados.length; i++) {
                    this.converterContatos(this.Dados[i].Contato);
                }
            }            
        }
    },
    methods: {
        converterContatos(link: string) {
            if (link.length > 0) {
                let listPhone = link.split('     ');
                for(var i = 0; i < listPhone.length; i++) {
                    let phone = listPhone[i].replace(/\D/g, '');
                    if (phone.length >= 8 && phone[0] !== '0') {
                        if (phone.length == 9 || phone.length == 8) {
                            phone = '024'+phone;
                        }else{
                            phone = '0'+phone;
                        }
                    }
                    const JaExiste = this.NovaListaContato.some((item: any) => item.Contato === phone);
                    if (!JaExiste) {
                        this.NovaListaContato.push({ Contato: phone});
                    }
                }
            }            
        },
        formatarTelefone(numero: string) {
            const numeros = numero.replace(/\D/g, '');
            
            const regex = numeros.length === 12 ? /^(\d{3})(\d{5})(\d{4})$/ : /^(\d{3})(\d{4})(\d{4})$/;
            const telefoneFormatado = numeros.replace(regex, '($1) $2-$3');

            return telefoneFormatado;
        },
    }
}
</script>
