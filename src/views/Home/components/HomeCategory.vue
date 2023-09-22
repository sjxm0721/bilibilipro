<template>
    <div class="container">
        <el-row  justify="space-between" style="align-items: center;">
            <el-col :span="3" :xs="0">
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
            <el-col :span="16" :xs="24">
                <div style="background-color: yellow; height: 100px;"></div>
            </el-col>
            <el-col :span="5" :xs="0">
                <div class="category-right"></div>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
    .container{
        .category-left{
            display: flex;
            flex-direction: row;
            .left-box{
                cursor: pointer;
                width: 45%;
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

        .category-right{
            background-color: green;
            height: 100px;
        }
    }
</style>