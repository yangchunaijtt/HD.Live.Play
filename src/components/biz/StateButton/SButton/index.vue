<template>
    <div class="sbutton">
       <a :href='hrefUrl' target="_blank" class="finished button dbg"  v-show ='finishedBlack' >看回放</a>
    </div>
</template>

<script>
import { Toast } from 'vant';

export default {
    
    props:{
        state:{
            type:Number,
        },
        item:{
            type:Object,
            default: () => {}
        }
    },
	components:{
		[Toast.name]:Toast
    },
    data(){
        return {
            clientType:!DE.Call._clientType,
        }
    },
    computed:{
        finishedBlack(){
            let haveVideo = false 
            haveVideo = null != this.item.Ext.LiveMeeting &&   null != this.item.Ext.LiveMeeting.sPlayBackVID &&   '' !== this.item.Ext.LiveMeeting.sPlayBackVID
            return  haveVideo && this.state === 9
        },
        hrefUrl(){
            let haveVideo = false 
            haveVideo = null != this.item.Ext.LiveMeeting &&   null != this.item.Ext.LiveMeeting.sPlayBackVID &&   '' !== this.item.Ext.LiveMeeting.sPlayBackVID
            if ( haveVideo) {
                return  `${this.item.Ext.VideoUrl}${this.item.Ext.LiveMeeting.sPlayBackVID}?cid=${this.item.sClassID}&lid=${this.item.sID}&sid=${this.item.Ext.userID}` 
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .button{
        display:block;
        box-sizing:border-box;
        height:30px;
        padding:0px 10px;
        border-radius:4px;
        line-height:30px;
        font-size:14px;
        font-weight:500;
        color:rgba(255,255,255,1);
        text-align: center;
        cursor: pointer;
        &.notblank{
            pointer-events: none;
        }
        &:hover{
            color:rgba(255,255,255,1);
        }
        &.NoVideo{
            background:#cccccc;
        }
    }
</style>