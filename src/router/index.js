import Vue from 'vue';
import Router from 'vue-router';
import Page1 from '@/components/Page1';
import Page2 from '@/components/Page2';
import Page3 from '@/components/Page3';

Vue.use(Router);

export default new Router({
  root: '/',
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: { name: 'page-1' }
    },
    {
      path: '/page-1',
      name: 'page-1',
      component: Page1,
      meta: {
        appearance: 'slide-right-to-left'
      }
    },
    {
      path: '/page-2',
      name: 'page-2',
      component: Page2,
      meta: {
        appearance: 'slide-right-to-left'
      }
    },
    {
      path: '/page-3',
      name: 'page-3',
      component: Page3,
      meta: {
        appearance: 'slide-right-to-left'
      }
    }
  ]
});
