import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Add from '@/components/Add.vue'
import Done from '@/components/Done.vue'
import Delete from '@/components/Delete.vue'
import Edit from '@/components/Edit.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '', redirect: { name: 'add' } },
      { path: '/add', name: 'add', component: Add },
      { path: '/done', name: 'done', component: Done },
      { path: '/delete', name: 'delete', component: Delete },
      {
        path: '/edit',
        name: 'edit',
        component: Edit,
        beforeEnter: (to, from, next) => {
          if (from.path === '/add') {
            next()
          } else {
            next('/add')
          }
        }
      }
    ]
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
