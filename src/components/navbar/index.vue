<template>
    <div class="rounded-xl navbar bg-base-100 shadow">
        <div class="navbar-start">
            <label for="my-drawer" class="p-2 py-2 lg:hidden drawer-button">
                <i class="bx bx-menu text-2xl"></i>
            </label>
            <!--<label class="text-xl px-2">
                <select class="select select-bordered w-full max-w-xs">
                    <option selected>VALEPLAST</option>
                    <option>GLOBALPLASTIC</option>
                    <option>SHOPEE VILLE RECICLE</option>
                    <option>SHOPEE PLÁSTICOS IND</option>
                </select>
            </label>-->
        </div>
        <div class="navbar-end">
            <label class="swap swap-rotate btn btn-ghost btn-circle">
                <input ref="themecontroller" @click="themeChange()" type="checkbox" class="theme-controller"
                    value="sunset" v-model="themeChecked" />                    
                    <i class='swap-on fill-current bx bx-moon text-xl'></i>
                    <i class='swap-off fill-current bx bx-sun text-xl'></i>
            </label>

            <button class="btn btn-ghost btn-circle">
                <div class="indicator">
                    <i class='bx bx-bell text-xl'></i>
                    <span class="badge badge-xs badge-primary indicator-item"></span>
                </div>
            </button>
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="avatar p-1">

                    <div class="w-10 rounded-full">
                        <img src="http://191.168.0.12/assets/img/avatars/-850af92f168512596557402018910397853.jpg" />
                    </div>
                </div>
                <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                    <li>
                        <a>
                            <i class="bx bx-user"></i> Perfil
                            <span class="badge badge-primary">Novo</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="bx bx-cog"></i>Configurações
                        </a>
                    </li>
                    <li>
                        <a>
                            <i class="bx bx-x"></i>Sair
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data() { 
        return { 
            fillG: 'rgb(255,157,0)', 
            fillESTOR: 'rgb(0,0,0)',
            themeChecked: true,
        }
    },
    computed: {
        watchThemeController() {            
            return (this.$refs.themecontroller as HTMLInputElement).value;
        },
    },
    methods: {
        async themeChange() {
            const isChecked = (this.$refs.themecontroller as HTMLInputElement).checked;
            localStorage.setItem('themecontroller', isChecked.toString());
            this.change(isChecked.toString());            
        },
        async change(isChecked: any) {
            this.fillG = 'rgb(255,157,0)';
            this.fillESTOR = 'rgb(0,0,0)';
            if (isChecked == 'true') {
                this.fillG = 'rgb(255,157,0)';
                this.fillESTOR = 'rgb(159, 185, 197)';
            }
            this.$emit('theme-updated', { fillG: this.fillG, fillESTOR: this.fillESTOR });
        }
    },
    mounted() {
        const themeCheckedFromLocalStorage = localStorage.getItem('themecontroller');
        this.themeChecked = themeCheckedFromLocalStorage == 'true' ? true : false;
        this.change(this.themeChecked);
    }
});
</script>