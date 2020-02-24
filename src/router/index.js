import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/index/index.vue'
Vue.use(Router)

const Aside = r => require.ensure([], () => r(require('@/views/aside.vue')), 'home')//侧边栏
const Login = r => require.ensure([], () => r(require('@/views/login/index.vue')), 'login')//登录
// 忘记密码
const Forgivepwd = r => require.ensure([], () => r(require('@/views/login/forgivepwd.vue')), 'forgivepwd')
//机器人
const numberList = r => require.ensure([], () => r(require('@/views/rolengt/compontents/numverList.vue')), 'numberList')
const Rolengt = r => require.ensure([], () => r(require('@/views/rolengt/index.vue')), 'rolengt')
const setRole = r => require.ensure([], () => r(require('@/views/rolengt/compontents/setRole.vue')), 'setRole')
// 商品
const shopping = r => require.ensure([], () => r(require('@/views/shopping/index.vue')), 'shopping')
const Storelnfor = r => require.ensure([], () => r(require('@/views/storengt/components/storelnfor.vue')), 'storelnfor')//商户详情
//特别关注
const like = r => require.ensure([], () => r(require('@/views/like/index.vue')), 'like')
const Employee = r => require.ensure([], () => r(require('@/views/employee/index.vue')),'employee')//员工列表
const Addemployee = r => require.ensure([], () => r(require('@/views/employee/components/addemployee.vue')),'addemployee')
const Detailemployee = r => require.ensure([], () => r(require('@/views/employee/components/detailemployee.vue')),'detailemployee')
const Disposeemployee = r => require.ensure([], () => r(require('@/views/employee/components/disposeemployee.vue')),'disposeemployee')

export default new Router({
  routes: [
    {
      path: '/',
      component:Login
    },
    {
      path:'/forgivepwd',
      component:Forgivepwd
    },
    {
      path: '/index',
      name: 'aside',
      component:Aside,
      children:[{
        path:'/rolengt',
        component:Rolengt,
        meta:['机器人管理','机器人列表']
      },{
        path:'/numberList',
        component:numberList,
        meta:['机器人管','库存列表']
      },{
        path:'/setRole',
        component:setRole,
        meta:['机器人管','添加机器人']
      },
      {
        path:'/shopping',
        component:shopping,
        meta:['商品管理','商品列表']
      },{
        path:'/storelnfor',
        component:Storelnfor,
        meta:['商户管理','商户详情']
      },
      {
        path:'/like',
        component:like,
        meta:['商品管理','特别关注']
      },{
        path:'/employee',
        component:Employee,
        meta:['员工管理','员工列表']
      },{
        path:'/addemployee',
        component:Addemployee,
        meta:['员工管理','添加员工']
      },{
        path:'/detailemployee',
        component:Detailemployee,
        meta:['员工管理','员工详情']
      },{
        path:'/disposeemployee',
        component:Disposeemployee,
        meta:['员工管理','角色配置']
      }
      ,
    ]
    },
  ]

})
