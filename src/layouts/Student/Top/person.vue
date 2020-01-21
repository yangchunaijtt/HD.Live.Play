<template>
    <div class="person">
        <div class="center">
            <div class="hd clearfix">
                <img :src="student[0].Ext.Avatar.FileUrl" >
                <div class="info">
                    <h4 class="title">{{student[0].sName}}</h4>
                    <p class="idiograph">{{student[0].sPhone}}</p>
                </div>
            </div>
            <div class="navbar clearfix">
                <div class="item"  @click='logout'>
                    注销
                </div>
            </div>
            <div class="link" v-show="teacher.length > 0">
                <router-link to="/teacher/home" class='tostudent'>切换老师</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    student: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      liveCaller: {},
      teacher: this.$store.getters['global/teacher']
    }
  },
  created () {
    this.liveCaller = new DE.Sch.SchLessonLiveAPI.Caller()
  },
  methods: {
    ...mapMutations([
      'global/SetStudentNull'
    ]),
    tonewHashurl () {
      this.$emit('clickMask')
    },
    logout () {
      this.$cookies.set('phone', '')
      this['global/SetStudentNull']()
      setTimeout(() => {
        this.$router.push({
          path: '/login',
          replace: true
        })
      }, 400)
    }
  },
  computed: {
    ...mapGetters([
      'layout/teacher'
    ])
  }
}
</script>

<style lang="scss" scoped>
    .person{
        box-sizing:border-box;
        padding:20px 30px 0px 20px;
        .center{
            .hd{
                img {
                    width:40px;
                    height:40px;
                    border-radius:50%;
                    float:left;
                }
                .info{
                    margin-left:15px ;
                    width:115px;
                    float:left;
                    .title{
                        font-size:14px;
                        font-weight:600;
                        color:rgba(51,51,51,1);
                        line-height:18px;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;

                    }
                    .idiograph{
                        margin-top:5px;
                        font-size:12px ;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                        line-height:16px;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                    }
                }
            }
            .navbar{
                box-sizing: border-box;
                min-height:40px;
                padding:5px 0px;
                .item{

                    width:90px;
                    height:30px;
                    margin:0 auto;
                    line-height: 30px;
                    text-align: center;
                    font-size:12px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    background:rgba(248,248,248,1);
                    border-radius:4px;
                    cursor: pointer;
                }
            }
            .link{
                box-sizing: border-box;
                padding:10px 0px;
                min-height:40px;
                .tostudent{
                    display: block;
                    color:#fff;
                    background-image: linear-gradient(90deg, #fd9552 0%, #ff6601 100%);
                    width:100%;
                    height:30px;
                    margin:0 auto;
                    border-radius: 10px;
                    line-height: 30px;
                    font-size: 14px;
                    color: #FFFFFF;
                    text-align: center;
                }
            }
        }

    }

</style>
