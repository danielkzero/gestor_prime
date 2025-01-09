<template>
    <div class="hero min-h-screen" style="background-image: url(https://barramansa.rj.gov.br/wp-content/uploads/2019/08/download-1024x678.jpg)">


        <div class="hero-overlay bg-opacity-70"></div>
        <div class="hero-content">
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                        <div class="m-auto">
                            <logoGestor G="rgb(255,255,255)" ESTOR="rgb(255,255,255)" />
                        </div>
                        
                    </div>
                    <div class="pt-5 text-center text-white">
                        Seja bem-vindo ao novo sistema de gestão empresarial!
                    </div>
                    <div class="card-actions py-5 m-auto">
                        <router-link class="btn btn-primary" to="/login">
                            Entrar no sistema
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import logoGestor from '../../components/logo/index.vue';
    export default {
        name: 'apresentacao',
        components: {
            logoGestor
        }
    }
</script>