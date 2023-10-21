<script setup lang="ts">
import { useAccountStore } from '@/stores/modules/account';
import { useWebSocketStore } from '@/stores/modules/websocket';
import { onMounted } from 'vue';
const account = useAccountStore().myInfo
const webSocketStore = useWebSocketStore()

const connectWebSocket = ()=>{
    if(account?.uid){
        webSocketStore.initializeWebSocket()
    }
}

onMounted(()=>connectWebSocket())

</script>
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<style lang="scss" scoped>
#app{
    min-width: 1240px;
    max-width: 1440px;
}
</style>
