<template>
  <div class="nomessage">
    <div class="center">
      <i class="icon de-icon "></i>
      <h4 class="text">您还没有消息~</h4>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .nomessage {
    .center {
      box-sizing: border-box;
      margin: 0 auto;
      margin-top: 90px;
      width: 240px;
      height: 240px;

      .text {
        margin-top: 30px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
      }
    }
  }
</style>
