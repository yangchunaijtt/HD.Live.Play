<template>
  <div class="top"   ref="Top" >
    <div class="center dbg">
      <div class="left clearfix">
        <Item :Topitem='Topitem' @updataNews="updataNews" @hiddenMask='hiddenMask'></Item>
      </div>
      <div class="right" @click="() =>clickMask() ">
        <div class="people">
          <span class="username"  @click="(e) => clickMask(e)">{{student[0].sName}}</span>
          <transition name="fade">
            <IconSvg :class="'icon ' + (showMask ? 'active' : '')" icon="de-arrow-b-bottom"></IconSvg>
          </transition>

        </div>

      </div>
      <transition name="person">
        <div class="oneself" v-show="showMask">
          <person @clickMask="clickMask"  :student='student'></person>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
import Item from "./item"
import person from "./person"
import { mapMutations,mapGetters } from 'vuex'


export default {

  name:'Top',
  components: {
    Item,
    person,
  },
  props: {
    showMask: {
      type: Boolean,
      type: false
    },
  },
  data() {
    return {
      Topitem: [
        {
          name: "我的课表",
          isNews: true,
          hashurl: "/student/home"
        },
      ],
      student:this.$store.getters['global/student']
    }
  },
  computed: {
    ...mapGetters([
      'global/student'
    ]),
  },
  mounted () {
    
    console.log('top',this.$refs.Top.offsetHeight);
    let curHeight = this.$refs.Top.offsetHeight
    this['layout/SetTopHeight'](curHeight)
 
  },
  methods: {
    ...mapMutations([
      'layout/SetTopHeight'
    ]),
    updataNews(value) {
      this.Topitem[value].isNews = false;
    },
    clickMask(e) {
      if (e){
        e.stopPropagation()
      }
      this.$emit("clickMask");
    },
    hiddenMask(){
      this.$emit('hiddenMask')
    }
  },
}
</script>

<style lang="scss" scoped>
  .top {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 600;

    .center {
      position: relative;
      display: flex;
      width: 100%;
      height: 50px;
      .oneself {
        width: 220px;
        position: absolute;
        top: 45px;
        right: 20px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        border: 1px solid rgba(237, 237, 238, 1);
        z-index: 1200;

        &.person-enter-active, &.person-leave-active {
           transition: all 0.3s ease;
        }

        &.person-enter {
          transform: translateY(-220px);
        }

        &.person-leave-active {
          transform: translateY(-220px);
        }
      }

      .left {
        flex: 1;
      }

      .right {
        box-sizing: border-box;
        padding-right: 22px;
        min-width: 112px;
        max-width: 150px;
        position: relative;

        .people {
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;

          .username {
            flex: 1;
            box-sizing: border-box;
            padding-right: 20px;
            font-size: 16px;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: right;
            cursor: pointer;
          }

          .icon {
            box-sizing: border-box;
            position: absolute;
            top: 50%;
            right: 0;
            margin-top: -10px;
            font-size: 20px;
            color: #fff;
            transition: all .4s;
            &.active{
              transform: rotate(180deg);
            }

            &.fade-enter-active, .fade-leave-active {
              transition: all 0.5s;
            }

            &.fade-enter {
              transform: rotate(180deg);
            }

            &.fade-leave-to {
              transform: rotate(180deg);
            }
          }
        }
      }
    }
  }

</style>
