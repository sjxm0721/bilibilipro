import { createRouter, createWebHashHistory } from "vue-router";

let router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/Layout/index.vue"), // 这里直接指定组件对象
      children: [
        {
          path: "", // 子路由的路径
          component: () => import("../views/Home/index.vue"), // 子路由对应的组件
        },
        {
          path: "video/:videoId",
          name: "video",
          component: () => import("../views/Video/index.vue"),
        },
        {
          path: "member/:uid",
          component: () => import("../views/Member/index.vue"),
          children: [
            {
              path: "home",
              name: "memberHome",
              component: () =>
                import("../views/Member/components/Home/src/index.vue"),
            },
            {
              path: "dynamic",
              name: "memberDynamic",
              component: () =>
                import("../views/Member/components/Dynamic/src/index.vue"),
            },
            {
              path: "video",
              component: () =>
                import("../views/Member/components/Video/src/index.vue"),
              children: [
                {
                  path: "",
                  name: "memberVideo",
                  component: () =>
                    import(
                      "../views/Member/components/Video/components/ShowVideo.vue"
                    ),
                },
                {
                  path:"audio",
                  name:"memberAudio",
                  component:()=>import("../views/Member/components/Video/components/ShowAudio.vue")
                },
                {
                  path:"article",
                  name:"memberArticle",
                  component:()=>import("../views/Member/components/Video/components/ShowArticle.vue")
                },
                {
                  path:"album",
                  name:"memberAlbum",
                  component:()=>import("../views/Member/components/Video/components/ShowAlbum.vue")
                },
              ],
            },
            {
              path: "favlist",
              name: "memberFavlist",
              component: () =>
                import("../views/Member/components/Favlist/src/index.vue"),
            },
            {
              path: "fans",
              component: () =>
                import("../views/Member/components/Fans/src/index.vue"),
              children: [
                {
                  path: "fans",
                  name: "memberFans",
                  component: () =>
                    import(
                      "../views/Member/components/Fans/components/Fans.vue"
                    ),
                },
                {
                  path: "follow",
                  name: "memberFollow",
                  component: () =>
                    import(
                      "../views/Member/components/Fans/components/Follow.vue"
                    ),
                },
              ],
            },
          ],
        },
        {
          path: "search",
          name: "search",
          component: () => import("../views/Search/index.vue"),
        },
      ],
    },
    {
      path: "/message/:uid",
      component: () => import("../views/Message/index.vue"),
      children:[
        {
          path:'response',
          name:'messageResponse',
          component:()=>import("@/views/Message/components/MessageResponse.vue")
        },
        {
          path:'at',
          name:'messageAt',
          component:()=>import("@/views/Message/components/MessageAt.vue")
        },
        {
          path:'like',
          name:'messageLike',
          component:()=>import("@/views/Message/components/MessageLike.vue")
        },
        {
          path:'system',
          name:'messageSys',
          component:()=>import("@/views/Message/components/MessageSys.vue")
        },
        {
          path:'line',
          name:'messageLine',
          component:()=>import("@/views/Message/components/MessageLine/index.vue"),
          children:[
            {
              path:'whisper',
              name:'messageWhisper',
              component:()=>import("@/views/Message/components/MessageLine/components/MessageBox.vue")
            }
          ]
        },
      ]
    },
    {
      path: "/dynamic/:uid",
      name: "dynamic",
      component: () => import("../views/Dynamic/index.vue"),
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
