<template>
  <div class="lsit" >
    <div class="center">
      <ul>
        <li v-for=' (msgitem,index)  in messageData ' :key="index" @click="msgDetails(msgitem)">
          <div class="listCenter">
            <h4 class="time">{{msgitem.time}}</h4>
            <p class="content">{{msgitem.content}}</p>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import {mapMutations} from 'vuex'

export default {

  
  props: {
    messageData: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    ...mapMutations({
      showMsgDeatils: "SHOW_MSG_DETAILS"
    }),
    msgDetails(itemvlaue) {
      this.showMsgDeatils(itemvlaue);
    },
  },
}
</script>

<style lang="scss" scoped>
  .lsit {
    .center {
      ul {
        li {
          box-sizing: border-box;
          padding: 20px 0px;
          border-bottom: 1px solid #EDEDEE;

          &:first-child {
            padding-top: 0px;
          }

          .time {
            font-size: 12px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 16px;
          }

          .content {
            margin-top: 5px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
