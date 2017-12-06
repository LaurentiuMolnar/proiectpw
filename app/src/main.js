// Vue component imports
import Vue from 'vue';
import Master from './components/Master.vue';
import Projects from './pages/Projects.vue';
import Users from './pages/Users.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

// import routes from './routes';
const routes = [
  {path: '/projects', component: Projects},
  {path: '/users', component: Users}
];

Vue.component('master', Master);
const router = new VueRouter({
  routes,
  mode: 'history'
});
// Vue component registration

// Vue root component
new Vue({
  el: '.vue-app',
  router
});
