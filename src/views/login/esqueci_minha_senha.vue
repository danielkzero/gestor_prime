<template>
  <div class="hero min-h-screen" style="
      background-image: url(https://besthqwallpapers.com/Uploads/21-5-2018/53309/rio-de-janeiro-city-panorama-bay-coast-ocean.jpg);
    ">
    <div class="hero-overlay bg-opacity-70"></div>
    <div class="hero-content">
      <div class="card lg:card-side">
        <form class="card-body">
          <div class="card-title">
              <div class="m-auto">
                <logoGestor G="rgb(255,255,255)" ESTOR="rgb(255,255,255)" />
              </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">Enviar nova senha</button>
            
          </div>
          <label class="label">
              <router-link to="login" class="label-text-alt link link-hover text-white">
                Voltar
              </router-link>
            </label>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import logoGestor from '../../components/logo/index.vue';
export default {
    components: {
      logoGestor
    },
  }
</script>