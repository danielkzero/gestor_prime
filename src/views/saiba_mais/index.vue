<template>
    <div class="hero min-h-screen" style="
      background-image: url(https://besthqwallpapers.com/Uploads/21-5-2018/53309/rio-de-janeiro-city-panorama-bay-coast-ocean.jpg);
    ">
        <div class="hero-overlay bg-opacity-70"></div>
        <div class="hero-content text-center text-neutral-content ">
            <div class="max-w-md">
                <logo class="m-auto" />
                <h1 class="mb-5 text-5xl font-bold">Em construção!</h1>
                <router-link to="/"  class="btn btn-primary">
                   voltar ao início?
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import logo from '../../components/logo/index.vue';
export default {
    components: { logo }
}
</script>