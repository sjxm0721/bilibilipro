<template>
    <svg :style="{width:svgWidth,height:svgHeight}">
        <use :xlink:href="`#icon-${svgName}`" :fill="svgColor" ></use>
    </svg> 
</template>

<script setup lang="ts">
    defineProps({
        svgName:String,
        svgColor:{
            type:String,
            default:'#000000'
        },
        svgWidth:{
            type:String,
            default:'18px'
        },
        svgHeight:{
            type:String,
            default:'18px'
        }
    })
</script>

<style scoped lang="scss">
svg{
    vertical-align:text-bottom;
}

</style>