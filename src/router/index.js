import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import StudentLayout from '@/layouts/Student'
import TeacherLayout from '@/layouts/Teacher'

Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('views/home'),
    meta: {
      title: '首页',
      keepAlive: true
    }
  },
  {
    path: '/student',
    name: 'student',
    component: StudentLayout,
    children: [
      {
        path: 'message',
        name: 'student/message',
        component: () => import('views/student/message'),
        meta: {
          title: '我的课表',
        },
      },
      {
        path: 'home',
        name: 'student/home',
        component: () => import('views/student/home'),
        meta: {
          title: '学生端主页',
        },
      },
    ]
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: TeacherLayout,
    children: [
      {
        path: 'message',
        name: 'teacher/message',
        component: () => import('views/teacher/message'),
        meta: {
          title: '我的课表',
        },
      },
      {
        path: 'home',
        name: 'teacher/home',
        component: () => import('views/teacher/home'),
        meta: {
          title: '教师端主页',
        },
      },
    ]
  },
  {
    path: '/videoEle',
    name: 'videoEle',
    component: () => import('@/components/biz/VideoEle'),
    meta: {
      title: '播放回放',
      keepAlive: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('views/404'),
    meta: {
      title: '404',
      keepAlive: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login'),
    meta: {
      title: '账号登录',
      keepAlive: true
    }
  },
]

const routerContext = require.context('./', true, /\.js$/)
routerContext.keys().forEach(route => {

  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = routes.concat(routerModule.default || routerModule)
})

routes = routes.concat({
  path: '*',
  redirect: '/404'
})

const createRouter = () => new Router({
  // mode: 'history', // require service support
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

const myRouter = createRouter()
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/show', 0)

myRouter.beforeEach((to, from, next) => {

  store.commit('SetAppDefine',to.query.appcode)
    
  let params = {}
  if (to.params.direction) {
    store.commit('updateDirection', to.params.direction)
  } else {
    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)
    // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
    if (toIndex) {
      if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
        store.commit('updateDirection', 'forward')
      } else {
        store.commit('updateDirection', 'back')
      }
    } else {
      ++historyCount
      history.setItem('count', historyCount)
      to.path !== '/' && history.setItem(to.path, historyCount)
      store.commit('updateDirection', 'forward')
    }
  }
  if (from.query.appcode) {
    
    params.appcode = from.query.appcode
   
  } else if (from.path !== '/') {
    alert('非法入侵！')
    return
  }
  if (from.query.du) {
    params.du = from.query.du
  }
  if (to.query.appcode) {
    
    next()
  } else {
    next({ path: to.path, query: { ...to.query, ...params } })
  }
})

export default myRouter
