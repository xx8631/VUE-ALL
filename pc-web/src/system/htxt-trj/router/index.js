import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/manage_data',
    component: Layout,
    redirect: '/manage_data/dataStatistics',
    name: '数据统计',
    meta: { title: '数据统计', icon: 'example' },
    children: [
      {
        path: 'dataStatistics',
        name: '数据统计',
        component: () => import('@/views/manage_data/dataStatistics'),
        meta: { title: '数据统计' }
      }
    ]
  },
  {
    path: '/manage_account',
    component: Layout,
    redirect: '/manage_account/accountManage',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'accountManage',
        name: '账号管理',
        component: () => import('@/views/manage_account/accountManage'),
        meta: { title: '账号管理', icon: 'table' }
      },
      {
        path: 'customerManage',
        name: '客户管理',
        component: () => import('@/views/manage_account/customerManage'),
        meta: { title: '客户管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/manage_system',
    component: Layout,
    redirect: '/manage_system/menu',
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu',
        component: () => import('@/views/manage_system/menu'), // Parent router-view
        name: '菜单管理',
        meta: { title: '菜单管理' }
      },
      {
        path: 'role',
        component: () => import('@/views/manage_system/role'), // Parent router-view
        name: '角色管理',
        meta: { title: '角色管理' }
      },
      {
        path: 'user',
        component: () => import('@/views/manage_system/user'), // Parent router-view
        name: '用户管理',
        meta: { title: '用户管理' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
