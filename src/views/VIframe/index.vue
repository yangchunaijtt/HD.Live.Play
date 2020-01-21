<template>
    <div class="iframe" :style='{"height":iframeHeight}'>
        <iframe :src='videoUrl' id="iframe"></iframe>
    </div>
</template>

<script>
export default {
    
    props:{
        videoUrl:String,
    },
    data(){
        return {
            iframeHeight:document.body.clientHeight +'px'
        }
    },
    mounted(){
        // 静止打开右键操作
        document.oncontextmenu=function(){return false};
        // 获取浏览器是不是chrome
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
        if (!isChrome) {
             this.$toast.fail({
                duration: 1500, // 持续展示 toast
                forbidClick: true,
                message: '请使用chrome浏览器进行直播'
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .iframe{
        display:fixed;
        top:0px;
        bottom:0px;
        left:0px;
        right:0px;
        width:100%;
        height:100%;
    }
</style>