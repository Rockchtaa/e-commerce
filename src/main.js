import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import {createPinia} from 'pinia';

import mitt from 'mitt';
const emitter = mitt();

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination";
// Vuetify imports
import 'vuetify/styles'; // Import global styles
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.provide("emitter", emitter);
app.use(createPinia());
app.mount('#app');
