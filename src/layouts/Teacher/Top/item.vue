<template>
    <div class="item">
        <ul >
            <li v-for="(item,index) in Topitem" :key="index">
                <router-link :to="item.hashurl" class="link" :class="showborder(item.hashurl)" @click.native="updataNews(item.hashurl)">
                    {{item.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        Topitem:{
            type:Array,
            default: () => []
        }
    },
    computed:{
        showborder(){
           return function (url) {
              return  this.$route.path === url ? 'yes':'no';
           }
        }
    },
    methods:{
        updataNews(path){
            for ( let i = 0;i<this.Topitem.length;i++) {
                if (this.Topitem[i].hashurl === path){
                    this.$emit("updataNews",i);
                }
            }
            this.$emit('hiddenMask')
        }
    },
}
</script>

<style lang="scss" scoped>
    .item {
        width:100%;
        height:100%;
        ul {
            height:100% ;
            li {
                float:left;
                position:relative;
                box-sizing :border-box;
                padding:0px 20px ;
                height:50px;
                .icon{
                    position:absolute;
                    right: 14px;
                    top: 14px;
                    width:4px; 
                    height:4px; 
                    background:rgba(255,255,255,1);
                    border-radius:50%;
                }
                .link {
                    display:block;
                    box-sizing:border-box ;
                    height:49px;
                    line-height:50px ;
                    font-size:14px ;
                    font-weight:400;
                    color:#fff;
                    border-bottom:1px solid #ff6601;
                    &.no {
                        border-bottom:1px solid #ff6601;
                        font-weight:400;
                    }
                    &.yes{ 
                        border-bottom:1px solid #fff;
                        font-weight:600 ;

                    }
                }
            }
        }
    }             
</style>
