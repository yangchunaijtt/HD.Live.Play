<template>
  <svg class="svg-icon" aria-hidden="true" @click="(e) => onClick(e)">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'IconSvg',
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick (e) {
      this.$emit("bindClick", e);
    }
  },
  computed: {
    iconName () {
      return `#${this.icon}`
    }
  }
}
</script>
<style lang="scss">
  .svg-icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
