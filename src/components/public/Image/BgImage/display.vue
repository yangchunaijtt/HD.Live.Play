<template>
    <div class="display"  :style="{'background-image':'url('+bgImg+')'}"></div>
</template>

<script>
export default {
    
   
    props:{
        bnImg:[String, Object],
    },
    computed:{
        bgImg () {
            var img

            if (typeof this.bnImg === 'string'){
                try{
                    img = JSON.parse(this.bnImg)
                }catch{
                    return this.bnImg
                }
            }

            return img.FileUrl

        },
    },
}
</script>

<style lang="scss" scoped>
    .display{
        border-radius: 50%;
        overflow: hidden;
        background-repeat: no-repeat;
        background-size: contain;
        background-size: cover;
    }
</style>