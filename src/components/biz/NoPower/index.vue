<template>
    <div class="nopower" >
        <div class="center">
            <IconSvg icon ='de-info-circle-warning' class="icon"></IconSvg>
            <p class='message'>抱歉，您没有访问权限</p>
            <div class="auto">
                <router-link to='/login' class="link" @click.native='toLogin'>重新登录</router-link>
            </div>

        </div>
    </div>
</template>

<script>
export default {

  methods: {
    toLogin () {
      console.log(111, this.$cookies.get('phone'))
      if (this.$cookies.get('phone') === null) {
        this.$router.push({
          path: '/login'
        })
      } else {
        this.$cookies.set('phone', '')
        this.$router.push({
          path: '/login'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .nopower{
        width:100%;
        height:100%;
        position: relative;
        .center{
            position: absolute;
            top:50%;
            left:0px;
            bottom:0px;
            width:100%;
            margin-top:-90px;
            min-height:170px;
            max-height:200px;
            .icon{
                display: block;
                width:100%;
                color:#E4E4E4;
                font-size:80px;
                line-height: 100px;
                text-align:center;
            }
            .message{
                padding-top:16px;
                margin-bottom:50px;
                line-height: 30px;
                text-align: center;
                font-size: 12px;
                color: #aaa;
            }
            .auto{
                display:block;
                position: relative;
                .link{
                    display: inline-block;
                    position: absolute;
                    left:50%;
                    top:0px;
                    margin-left:-65px;
                    width:130px;
                    height:40px;
                    background-image: linear-gradient(90deg, #fa9a5b 0%, #ff6601 100%);
                    border-radius: 20px;
                    overflow: hidden;
                    color:#fff;
                    font-size: 16px;
                    line-height: 40px;
                    text-align:center;
                }
            }
        }
    }
</style>
