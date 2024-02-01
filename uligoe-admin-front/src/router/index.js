import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useUser } from '../store/useUser'
import nProgress from 'nprogress'

const router = createRouter({
  history: createWebHashHistory(),  // hash 模式
  //   history: createWebHistory(),  // history 模式
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(`../views/DashBoard/DashBoard.vue`),
      meta: {
        title: '仪表盘',
        breadcrumb: ['仪表盘']
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(`../views/About/About.vue`),
      meta: {
        title: '关于',
        breadcrumb: ['设置', '关于']
      },
    },
    {
      path: '/write',
      name: 'write',
      component: () => import(`../views/Article/WriteArticle/WriteArticle.vue`),
      meta: {
        title: '写文章',
        breadcrumb: ['文章', '写文章']
      },
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import(`../views/Article/AllArticles/AllArticles.vue`),
      meta: {
        title: '所有文章',
        breadcrumb: ['文章', '所有文章']
      },
    },
    {
      path: '/category',
      name: 'category',
      component: () => import(`../views/Article/Categories/Categories.vue`),
      meta: {
        title: '分类目录',
        breadcrumb: ['文章', '分类目录']
      },
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import(`../views/Article/Tags/Tags.vue`),
      meta: {
        title: '所有文章',
        breadcrumb: ['文章', '标签']
      },
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import(`../views/Comment/Comment.vue`),
      meta: {
        title: '评论',
        breadcrumb: ['评论']
      },
    },
    {
      path: '/filelib',
      name: 'filelib',
      component: () => import(`../views/FileLib/FileLib.vue`),
      meta: {
        title: '附件',
        breadcrumb: ['附件']
      },
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import(`../views/Personal/Personal.vue`),
      meta: {
        title: '个人资料',
        breadcrumb: ['用户', '个人资料']
      },
    },
    {
      path: '/links_manage',
      name: 'linksManage',
      component: () => import(`../views/Links/Links.vue`),
      meta: {
        title: '链接管理',
        breadcrumb: ['用户', '链接管理']
      },
    },
    {
      path: '/set',
      name: 'set',
      component: () => import(`../views/BlogSet/BlogSet.vue`),
      meta: {
        title: '系统',
        breadcrumb: ['系统', '博客设置']
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(`../views/User/Login.vue`),
      meta: {
        title: '登录',
      }
    },
    {
      path: '/',
      redirect: '/login',
    },
  ]
})

let userStore = null;

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  // console.log(to, from)
  if (to.meta.title) {
    document.title = `${to.meta.title}`;
  }
  nProgress.start()

  if (!userStore) {
    userStore = useUser();
  }

  // 如果有token则不能去登录页
  if (userStore.token && to.path === '/login') {
    next('/dashboard');
  }
  // 如果有token并且去的不是登录页
  else if (userStore.token) {
    // 没有用户信息则获取一下
    if (userStore.userInfo !== null) {
      next();
    }
    else {
      try {
        await userStore.getUserInfo();
        next();
      } catch (error) {
        userStore.logout();
        next('/login');
      }
    }
  }
  // 如果没有token，必须重定向去登录
  else {
    if (to.path !== '/login') {
      next('/login?redirect=' + to.path);
    }
    else {
      next();
    }
  }
})

router.afterEach((to, from) => {
  // console.log(to, from)
  nProgress.done()
  // console.log('afterEach')
})

export default router