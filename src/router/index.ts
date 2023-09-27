import { createRouter, createWebHashHistory } from "vue-router";

import Home from '@/views/Home/index.vue'

let router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: ()=>import('@/views/Layout/index.vue'), // 这里直接指定组件对象
      children: [
        {
          path: '', // 子路由的路径
          component:()=>import('@/views/Home/index.vue') , // 子路由对应的组件
        },
        {
          path: 'video/BV1',
          component: ()=>import('@/views/Video/index.vue'),
        },
        {
          path:'member/114514',
          component:()=>import('@/views/Member/index.vue'),
          children:[
            {
              path:'',
              component:()=>import('@/views/Member/components/Home/src/index.vue')
            },
            {
              path:'dynamic',
              component:()=>import('@/views/Member/components/Dynamic/src/index.vue')
            },
            {
              path:'video',
              component:()=>import('@/views/Member/components/Video/src/index.vue'),
              children:[
                {
                  path:'',
                  component:()=>import('@/views/Member/components/Video/components/ShowVideo.vue')
                }
              ]
            },
            {
              path:'favlist',
              component:()=>import('@/views/Member/components/Favlist/src/index.vue')
            },
          ]
        }
      ],
    },
    {
      path:'/message',
      component:()=>import('@/views/Message/index.vue')
    }
  ],
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    };
  },
});

export default router;