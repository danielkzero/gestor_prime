import './app.css';
import { createApp } from 'vue';
import App from './App.vue';

import { registerPlugins } from './plugins/index.ts';
import 'boxicons';
import 'boxicons/css/boxicons.min.css';
// @ts-ignore
import JsonExcel from "vue-json-excel3";

import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

/* PRIMEVUE */

import PrimeVue from "primevue/config";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import Steps from 'primevue/steps';
//import ColumnGroup from 'primevue/ColumnGroup';


/* PRIMEVUE */
const apiGestor = "/api";
const app = createApp(App);
/* PRIMEVUE */

app.component("downloadExcel", JsonExcel);

app.component('DataTable', DataTable);
//app.component('ColumnGroup', ColumnGroup);
app.component('Column', Column);
app.component('Row', Row);
app.component('Steps', Steps);
app.use(PrimeVue);

/* PRIMEVUE */
app.provide('apiGestor', apiGestor);
registerPlugins(app);

app.mount('#app');