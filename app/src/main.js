// Vue component imports
import Vue from 'vue';

import Master from './components/Master.vue';
import ProjectList from './components/ProjectList.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

Vue.component('master', Master);
Vue.component('project-list', ProjectList);

import router from './router';

// Vue root component
new Vue({
  el: '.vue-app',
  router
});
