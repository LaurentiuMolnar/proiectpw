import ProjectsPage from '../pages/ProjectsPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import NGOLoginPage from '../pages/NGOLoginPage.vue';
import LogoutPage from '../pages/LogoutPage.vue';
import SignupPage from '../pages/SignupPage.vue';
import NGOSignupPage from '../pages/NGOSignupPage.vue';
import Page404 from '../pages/Page404.vue';

import ProjectListWrapper from '../components/ProjectListWrapper.vue';
import ProjectInfo from '../components/ProjectInfo.vue';

const routes = [
  {path: '/'},
  {
    path: '/projects',
    component: ProjectsPage,
    children: [
      {path: '', component: ProjectListWrapper},
      {path: ':id', component: ProjectInfo}
    ]
  },
  {path: '/login', component: LoginPage},
  {path: '/ngologin', component: NGOLoginPage},
  {path: '/signup', component: SignupPage},
  {path: '/ngosignup', component: NGOSignupPage},
  {path: '/logout', component: LogoutPage},
  {path: '*', component: Page404}
];

export default routes;
