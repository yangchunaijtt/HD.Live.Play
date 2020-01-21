<template>
  <div class="message"  :style="{'height':messageHeight + 'px' }">
    <div class="center">
      <messageList v-show="ishaveMsg" :messageData='messageData'></messageList>
      <nomessage v-show="!ishaveMsg"></nomessage>
    </div>
    <msgdetails v-show="msgdetailsDisplay"></msgdetails>
    <transition name="msgmaskname">
      <div class="msgmask" @click="hiddenMsgDeails" v-show="msgdetailsDisplay"></div>
    </transition>

  </div>
</template>

<script>
import {mapMutations} from "vuex"
import nomessage from "./nomessage"
import messageList from "./messageList"
import msgdetails from "./msgdetails" 

export default {
  
  components: {
    messageList,
    nomessage,
    msgdetails,
  },
  data() {
    return {
      messageHeight: document.body.offsetHeight,
      messageData: [
        {
          time: "2019-2-15 20:30",
          content: "您报名的课程 《新课程第一章我的前端我的全前端》 课程第一章有新练习发出，请您及时接受,课程第一章有新练习发出，请您及时接受课程第一章有新练习发出，请您及时接受"
        },
        {
          time: "2019-2-15 20:30",
          content: "您报名的课程 《新课程第一章我的前端我的全前端》 课程第一章有新练习发出，请您及时接受"
        },
      ],


    }
  },
  computed: {
    ishaveMsg() {

      return this.messageData.length > 0 ? true : false;
    },
    msgdetailsDisplay() {
      return this.$store.state.msgDetailsMask;
    },
    msgdetailsData() {
      return this.$store.state.msgItemData;
    }
  },
  methods: {
    ...mapMutations({
      storehiddenMsgDetails: "HIDDEN_MSG_DETAILS",
      storeshowMsgDeatils: "SHOW_MSG_DETAILS"
    }),
    showMsgDeatils(listvalue) {
      // this.msgdetailsData = listvalue;
      this.storeshowMsgDeatils(listvalue);
    },
    hiddenMsgDeails() {
      this.storehiddenMsgDetails();
    },
  },
}
</script>

<style lang="scss" scoped>
  .message {
    box-sizing: border-box;
    padding: 30px;
    padding-top: 80px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 100;

    .msgmask {
      position: fixed;
      top: 50px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      z-index: 400;
      backdrop-filter: blur(10px);

      &.msgmaskname-enter-active, &.msgmaskname-leave-active {
        transition: opacity .3s ease;
      }

      &.msgmaskname-enter, &.msgmaskname-leave-to {
        opacity: 0;
      }
    }
  }

</style>
