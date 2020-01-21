<template>
  <transition name="msgdtname">
    <div class="msgdetails">
      <div class="center">
        <div class="hd dbg">
          <span class="text">消息通知</span>
        </div>
        <div class="circle">
          <div class="timeitem">
            <span class="text">{{msgdetailsData.time}}</span>
          </div>
          <div class="item">
            <span class="text">{{msgdetailsData.content}}</span>
          </div>
        </div>
        <div class="konw clearfix">
          <span class="myknow" @click="hiddMsg">我知道了</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import { mapMutations} from "vuex"

export default {


  computed: {
   
    msgdetailsData() {
      return this.$store.state.msgItemData;
    },
  },
  methods: {
    ...mapMutations({
      storehiddenMsgDetails: "HIDDEN_MSG_DETAILS",
    }),
    hiddMsg() {
      this.storehiddenMsgDetails();
    },

  },
}
</script>

<style lang="scss" scoped>
  .msgdetails {
    position: fixed;
    top: 160px;
    left: 50%;
    width: 280px;
    height: auto;
    margin-left: -140px;
    z-index: 450;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;

    &.msgdtname-enter-active, &.msgdtname-leave-active {
      transition: opacity .3s ease;
    }

    &.msgdtname-enter, &.msgdtname-leave-to {
      opacity: 0;
    }

    .hd {
      line-height: 32px;
      height: 32px;
      box-sizing: border-box;
      padding: 0px 10px;
      .text {
        color: #fff;
        font-size: 14px;
      }
    }

    .circle {
      padding: 12px 10px;
      border-bottom: 1px solid #EDEDEE;

      .timeitem {
        padding-bottom: 6px;

        .text {
          font-size: 14px;
          line-height: 24px;
          color: #333;
          font-weight: 500;
        }
      }
    }

    .item {
      .text {
        flex: 1;
        font-size: 12px;
        font-weight: 400;
        color: #aaa;
        line-height: 16px;
      }
    }

    .konw {
      padding: 10px;

      .myknow {
        float: right;
        width: 70px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        color: #333;
        border: 1px solid #aaa;
        border-radius: 4px;
      }
    }

  }
</style>
