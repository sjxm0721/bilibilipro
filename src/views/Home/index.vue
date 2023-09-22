<template>
    <div>
        <HomeBanner/>
        <div class="body">
            <HomeCategory/>
        </div>
    </div>
</template>

<script setup lang="ts">
import HomeBanner from './components/HomeBanner.vue'
import HomeCategory from './components/HomeCategory.vue'

</script>

<style scoped lang="scss">
.body{
    width: 100%;
    padding: 10px 100px;
}
</style>