<template>
    <span class="display">
        {{trans}}
    </span>
</template>

<script>
export default {

    props:{
        value: {
            type:Number,
        },
        code: {
         type: String,
        }
    },
    computed: {
      trans(){
        let text = ''
        switch (this.value) {
            case 9 :
                text = '已完成'
                break
            case 1 :
                text = '直播中'
                break
            case 0 :
                text = '未直播'
                break
            default :
                text = ''
        }
        return text
      }
    }
}
</script>