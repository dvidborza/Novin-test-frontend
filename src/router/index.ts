import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { RoleTypeEnum } from '@/model/RoleTypeEnum'
import { useToast } from "vue-toastification";

const toast = useToast()

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: { inMenu: true },
    component: HomeView
  },
  {
    path: '/administration',
    name: 'Administration',
    meta: { authorize: [RoleTypeEnum.ROLE_ADMINISTRATOR], inMenu: true },
    component: () => import('../views/AdministrationView.vue')
  },
  {
    path: '/bills',
    name: 'Bills',
    meta: { inMenu: true },
    component: () => import('../views/BillsView.vue')
  },
  {
    path: '/bill-details/:id',
    name: 'Bill Details',
    component: () => import('../views/BillDetails.vue')
  },
  {
    path: '/create-bill',
    name: 'Create Bill',
    meta: {authorize: [RoleTypeEnum.ROLE_ADMINISTRATOR, RoleTypeEnum.ROLE_ACCOUNTANT]},
    component: () => import('../views/CreateBillView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  const { authorize } = to.meta as any;

  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = JSON.parse(localStorage.getItem("loggedUser") as string);

  if (authRequired && loggedIn === null) {
    next('/login');
  } else {

    //Role check
    if (authorize) {
      let permit = false

      authorize.forEach((element: any) => {
        if (loggedIn.roles.includes(element)) {
          permit = true;
        }
      });

      if (permit) {
        next();
      } else {
        toast.error("Acces denied!")
        next(from.path)
      }
    } else {
      next();
    }
  }
});

export default router
