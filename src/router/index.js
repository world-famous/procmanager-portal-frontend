import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login';
import Register from '@/components/register';
import Dashboard from '@/components/dashboard';
import Verify from '@/components/verify';
import Profile from '@/components/profile';
import Users from '@/components/users/index';
import EditUser from '@/components/users/edit';
import Layouts from '@/components/layouts';
import Workorders from '@/components/workorders/index';
import CreateWorkOrder from '@/components/workorders/create';
import DetailWorkOrder from '@/components/workorders/detail';
import MapViewWorkOrders from '@/components/workorders/mapview';
import SavedRouteWorkOrder from '@/components/workorders/savedRoute';
import Processes from '@/components/processes';
import Chat from '@/components/chat';
import Notifications from '@/components/notifications';
import UserAcitivites from '@/components/activity/index';
import { requireAuth } from '../../utils/auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/verify',
      name: 'verify',
      component: Verify,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      beforeEnter: requireAuth,
      component: Dashboard,
    },
    {
      path: '/profile',
      name: 'profile',
      beforeEnter: requireAuth,
      component: Profile,
    },
    {
      path: '/users',
      name: 'users',
      beforeEnter: requireAuth,
      component: Users,
    },
    {
      path:'/user/edit/:id',
      name: 'edituser',
      beforeEnter: requireAuth,
      component: EditUser
    },
    {
      path: '/workorders',
      name: 'workorders',
      beforeEnter: requireAuth,
      component: Workorders,
    },
    {
      path: '/workorders/mapview',
      name: 'workordersmapview',
      beforeEnter: requireAuth,
      component: MapViewWorkOrders
    },
    {
      path: '/workorder/create',
      name: 'createworkorder',
      beforeEnter: requireAuth,
      component: CreateWorkOrder
    },
    {
      path: '/workorder/detail/:id',
      name: 'detailworkorder',
      beforeEnter: requireAuth,
      component: DetailWorkOrder
    },
    {
      path: '/workorders/savedRoute',
      name: 'savedRouteWorkorder',
      beforeEnter: requireAuth,
      component: SavedRouteWorkOrder
    },
    {
      path: '/processes',
      name: 'processes',
      beforeEnter: requireAuth,
      component: Processes,
    },
    {
      path: '/layouts',
      name: 'layouts',
      beforeEnter: requireAuth,
      component: Layouts,
    },
    {
      path: '/chat',
      name: 'chat',
      beforeEnter: requireAuth,
      component: Chat,
    },
    {
      path: '/notifications',
      name: 'notifications',
      beforeEnter: requireAuth,
      component: Notifications,
    },
    {
      path: '/activities',
      name: 'userActivities',
      beforeEnter: requireAuth,
      component: UserAcitivites
    }
  ],
});
