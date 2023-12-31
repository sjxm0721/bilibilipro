import { defineConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver({
          importStyle: 'sass',
        })],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `
          @use "@/styles/variable.scss" as *;          
          @use "@/styles/element/index.scss";
          `,
          
        },
      },
    },
    //本地运行配置，反向代理配置
    server:{
      cors:true,
      open:true,
      //配置反向代理
      proxy:{
        '/api':{
          target:'http://localhost:8080',
          changeOrigin:true,
          ws: true, //允许websocket代理
          rewrite: (path)=> path.replace(/^\/api/,'')//将api替换为空字符
        }
      }
    }
  };
});
