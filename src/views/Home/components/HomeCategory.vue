<template>
    <div class="category-container">
        <el-row  justify="space-between" :gutter="10" style="align-items: center;">
            <el-col :span="3">
                <div class="category-left">
                    <div class="left-box">
                        <div class="left-icon1">
                            <def-svg-icon svg-name="dynamic" svg-height="25px" svg-width="25px" svg-color="#ffffff"></def-svg-icon>
                        </div>
                        <div class="left-text">动态</div> 
                    </div>
                    <div class="left-box">
                        <div class="left-icon2">
                            <def-svg-icon svg-name="hot" svg-height="25px" svg-width="25px" svg-color="#ffffff"></def-svg-icon>
                        </div>
                        <div class="left-text">热门</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="category-center">
                    <a>番剧</a>
                    <a>国创</a>
                    <a>综艺</a>
                    <a>动画</a>
                    <a>鬼畜</a>
                    <a>舞蹈</a>
                    <a>娱乐</a>
                    <a>科技</a>
                    <a>美食</a>
                    <a>运动</a>
                    <a>电影</a>
                    <a>电视剧</a>
                    <a>纪录片</a>
                    <a>游戏</a>
                    <a>音乐</a>
                    <a>影视</a>
                    <a>知识</a>
                    <a>生活</a>
                    <a>时尚</a>
                    <a>更多</a>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="category-right">
                    <a @mouseover="changeSvgColor('specolumn')" @mouseleave="svgColorReturn"><def-svg-icon svg-name="specolumn" :svg-color="svgColors.specolumn"></def-svg-icon>专栏</a>
                    <a @mouseover="changeSvgColor('activity')" @mouseleave="svgColorReturn"><def-svg-icon svg-name="activity" :svg-color="svgColors.activity"></def-svg-icon>活动</a>
                    <a @mouseover="changeSvgColor('community')" @mouseleave="svgColorReturn"><def-svg-icon svg-name="community" :svg-color="svgColors.community"></def-svg-icon>社区中心</a>
                    <a @mouseover="changeSvgColor('live')" @mouseleave="svgColorReturn"><def-svg-icon svg-name="live" :svg-color="svgColors.live"></def-svg-icon>直播</a>
                    <a @mouseover="changeSvgColor('class')" @mouseleave="svgColorReturn"><def-svg-icon svg-name="class" :svg-color="svgColors.class"></def-svg-icon>课堂</a>
                    <a @mouseover="changeSvgColor('music')" @mouseleave="svgColorReturn"><def-svg-icon svg-name="music" :svg-color="svgColors.music"></def-svg-icon>新歌热榜</a>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const svgColors:any=reactive({
    specolumn:'#707070',
    activity:'#707070',
    community:'#707070',
    live:'#707070',
    class:'#707070',
    music:'#707070'
})

const changeSvgColor=(svgName:string)=>{
    svgColors[svgName] = '#05AAE6';
}

const svgColorReturn = ()=>{
    for(const key in svgColors){
        svgColors[key] = '#707070';
    }
}

</script>

<style lang="scss" scoped>
    .category-container{
        padding: 0 20px;
        .category-left{
            display: flex;
            flex-direction: row;
            .left-box{
                cursor: pointer;
                width: 45%;
                margin-right: 15px;
                .left-icon1,
                .left-icon2{
                    display: inline-block;
                    padding: 14px;
                    border-radius: 50%;
                    &:hover{
                        opacity: 0.6;
                    }
                }
                .left-icon1{
                    background-color: #69D5B1;
                }
                .left-icon2{
                    background-color: #F0777F;
                }
                .left-text{
                    font-size: 15px;
                    line-height: 1.8;
                    margin-left: 12px;
                }
            }
        }

        .category-center{
            border-right: 1px solid rgba($color: #9499a0, $alpha: 0.5);
            height: 75px;
            padding: 4px;
            display: grid;
            grid-template-columns: 8% 8% 8% 8% 8% 8% 8% 8% 8% 8%;
            grid-column-gap: 2%;
            grid-template-rows:40% 40%;
            grid-row-gap: 20%;
            overflow: hidden;
            a{
                color: #61666D;
                cursor: pointer;
                display: inline-block;
                text-align: center;
                padding: 7px;
                background-color: #F6F7F8;
                border-radius: 5px;
                &:hover{
                    background-color: #e3e5e7;
                }
            }
        }

        .category-right{
            height: 100px;
            // display: flex;
            // flex-wrap: wrap;
            // align-items: center;
            display: grid;
            grid-template-columns: 25% 25% 40%;
            grid-column-gap: 5%;
            grid-template-rows:45% 45%;
            grid-row-gap: 10%;
            align-items: center;
            padding: 6px;
            a{
                text-decoration: none;
                color: #707070;
                display: inline-block;
                cursor: pointer;
                svg{
                    margin-right: 5%;
                    vertical-align:middle;
                }
                &:hover{
                    color:#05AAE6;
                }
            }
        }
    }
</style>