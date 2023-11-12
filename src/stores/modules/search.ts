import { defineStore } from "pinia";
import { reqSearchPageList, reqAddSearch } from "@/api/search";
import { ref } from "vue";
import type { SearchInfo, SearchPostInfo } from "@/api/search/type";
import { localGet, localSet } from "@/utils/localStorageUtil";

interface SearchHistoryInfo {
  searchContent: string;
  timestamp: number;
}

export const useSearchStore = defineStore(
  "search",
  () => {
    const searchHotList = ref<SearchInfo[]>([]);
    const hotListTotal = ref<number>(0);
    const searchHistoryInfoList = ref<SearchHistoryInfo[]>([]);
    const getSearchHotList = async () => {
      const res = await reqSearchPageList(1, 10);
      if (res.code === 200) {
        searchHotList.value = res.data.record;
        hotListTotal.value = res.data.total;
      }
    };

    const addSearchHistory = async (searchContent: string) => {
      const timestamp: number = Date.parse(new Date().toString());
      let searchHistoryInfo: SearchHistoryInfo = {
        searchContent,
        timestamp,
      };

      // 调用 getSearchHistory 以更新 searchHistoryInfoList 的值
      getSearchHistory();

      // 将新的搜索历史信息添加到数组开头
      searchHistoryInfoList.value = searchHistoryInfoList.value.filter(item=>item.searchContent!==searchContent)
      searchHistoryInfoList.value.unshift(searchHistoryInfo)

      // 限制搜索历史记录的长度
      const maxHistoryLength = 10; // 假设最多保留 10 条搜索历史记录
      searchHistoryInfoList.value = searchHistoryInfoList.value.slice(
        0,
        maxHistoryLength
      );
      localSet("searchHistory", searchHistoryInfoList.value);
      const searchPostInfo:SearchPostInfo = {
        searchContent
      }
      await reqAddSearch(searchPostInfo)
    };

    const getSearchHistory = () => {
      const historyFromLocal = localGet("searchHistory");
      searchHistoryInfoList.value = historyFromLocal||[]
    };

    const closeSearchHistory = (searchContent:string)=>{
      searchHistoryInfoList.value = searchHistoryInfoList.value.filter(item=>item.searchContent!==searchContent)
      localSet("searchHistory", searchHistoryInfoList.value);
    }

    return {
      searchHotList,
      hotListTotal,
      searchHistoryInfoList,
      getSearchHotList,
      addSearchHistory,
      getSearchHistory,
      closeSearchHistory
    };
  },
  {
    persist: true, //持久化配置
  }
);
