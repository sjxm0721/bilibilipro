<template>
    <div>
            <HomeNav/>
        <div class="body">
            <HomeCategory/>
            <div class="home-hot">
                <div class="left-carousel">
                    <HomeCarousel/>
                </div>
                <div class="right-hot">
                    <HomeSuggest/>
                </div>
            </div>
            <div class="hot-video">
                <HomeVideo/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HomeNav from './components/HomeNav.vue'
// import HomeBanner from './components/HomeBanner.vue'
import HomeCategory from './components/HomeCategory.vue'
import HomeCarousel from './components/HomeCarousel.vue'
import HomeSuggest from './components/HomeSuggest.vue'
import HomeVideo from './components/HomeVideo.vue'

</script>

<style scoped lang="scss">
.body{
    padding: 10px 60px;

    .home-hot{
    height: 500px;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    .left-carousel{
        width: 48%;
        height: 83%;
        border-radius: 10px;
        overflow: hidden;
    }
    .right-hot{
        width:48%;
        height: 100%;
    }
}
}

</style>