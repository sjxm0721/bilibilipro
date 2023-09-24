import { createRouter, createWebHashHistory } from "vue-router";
import Home from '@/views/Home/index.vue'
import Layout from '@/views/Layout/index.vue'
import Video from '@/views/Video/index.vue'

let router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Layout, // 这里直接指定组件对象
      children: [
        {
          path: '', // 子路由的路径
          component: Home, // 子路由对应的组件
        },
        {
          path: 'video/BV1',
          component: Video,
        }
      ],
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    };
  },
});

export default router;