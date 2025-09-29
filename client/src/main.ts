import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import { useAuthStore } from './stores/auth';
import print from 'vue3-print-nb';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const authStore = useAuthStore();
authStore.initializeUser();

app.use(PerfectScrollbarPlugin);
app.use(VueTablerIcons);
app.use(print);
app.use(VueApexCharts);
app.use(router);
app.use(vuetify);

app.mount('#app');