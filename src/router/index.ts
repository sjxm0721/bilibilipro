import { createRouter, createWebHashHistory } from "vue-router";
import { useAccountStore } from "@/stores/modules/account";

let router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/Layout/index.vue"),
      children: [
        {
          path: "",
          meta: { requireAuth: false },
          component: () => import("../views/Home/index.vue"),
        },
        {
          path: "video/:videoId",
          name: "video",
          meta: { requireAuth: true },
          component: () => import("../views/Video/index.vue"),
        },
        {
          path: "member/:uid?",
          component: () => import("../views/Member/index.vue"),
          meta: { requireAuth: true },
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
                  path: "audio",
                  name: "memberAudio",
                  component: () =>
                    import(
                      "../views/Member/components/Video/components/ShowAudio.vue"
                    ),
                },
                {
                  path: "article",
                  name: "memberArticle",
                  component: () =>
                    import(
                      "../views/Member/components/Video/components/ShowArticle.vue"
                    ),
                },
                {
                  path: "album",
                  name: "memberAlbum",
                  component: () =>
                    import(
                      "../views/Member/components/Video/components/ShowAlbum.vue"
                    ),
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
          meta: { requireAuth: true },
          component: () => import("../views/Search/index.vue"),
        },
      ],
    },
    {
      path: "/message/:uid?",
      meta: { requireAuth: true, uidNeeded: true },
      component: () => import("../views/Message/index.vue"),
      children: [
        {
          path: "response",
          name: "messageResponse",
          component: () =>
            import("@/views/Message/components/MessageResponse.vue"),
        },
        {
          path: "at",
          name: "messageAt",
          component: () => import("@/views/Message/components/MessageAt.vue"),
        },
        {
          path: "like",
          name: "messageLike",
          component: () => import("@/views/Message/components/MessageLike.vue"),
        },
        {
          path: "system",
          name: "messageSys",
          component: () => import("@/views/Message/components/MessageSys.vue"),
        },
        {
          path: "line",
          name: "messageLine",
          component: () =>
            import("@/views/Message/components/MessageLine/index.vue"),
          children: [
            {
              path: "whisper",
              name: "messageWhisper",
              component: () =>
                import(
                  "@/views/Message/components/MessageLine/components/MessageBox.vue"
                ),
            },
          ],
        },
      ],
    },
    {
      path: "/dynamic/:uid?",
      name: "dynamic",
      meta: { requireAuth: true, uidNeeded: true },
      component: () => import("../views/Dynamic/index.vue"),
    },
    {
      path: "/read/:uid?",
      name: "read",
      meta: { requireAuth: true, uidNeeded: true },
      component: () => import("../views/Read/index.vue"),
      children: [
        {
          path: "home",
          name: "readHome",
          component: () => import("../views/Read/components/ReadMain.vue"),
        },
        {
          path: "info/:readId",
          name: "readInfo",
          component: () => import("../views/Read/components/ReadInfo.vue"),
        },
      ],
    },
    {
      path: "/upload/:uid?",
      name: "upload",
      meta: { requireAuth: true, uidNeeded: true },
      component: () => import("../views/Upload/index.vue"),
    },
    {
      path: "/404",
      name: "404",
      meta: { requireAuth: false },
      component: () => import("../views/404/index.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/404",
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    };
  },
});

router.beforeEach((to, _, next) => {
  const accountStore = useAccountStore();
  if (to.meta.requireAuth) {
    if (accountStore.myInfo !== null) {
      if (to.meta.uidNeeded) {
        if (parseInt(to.params.uid as string) !== accountStore.myInfo.uid) {
          router.replace("/404");
        } else {
          next();
        }
      } else {
        next();
      }
    } else {
      accountStore.logout();
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  // 判断是否从 "video" 路由离开
  if (from.name === "video") {
    // 延迟刷新页面，确保路由能够顺利完成
    setTimeout(() => {
      router.replace(to.fullPath);
      window.location.reload();
    }, 0);
  }
  next();
});

export default router;
