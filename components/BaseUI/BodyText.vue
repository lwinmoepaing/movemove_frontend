<template>
  <component
    :is="component"
    :class="{
      mmBodyFont: isLocaleMm,
      enBodyFont: !isLocaleMm,
      initial: !small,
      smallText: small
    }"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'en'
    },
    component: {
      type: String,
      default: 'span'
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isLocaleMm() {
      return this.type === 'mm'
    }
  }
}
</script>

<style scoped>
.InlineBlock {
  display: inline-block;
}

.initial {
  font-size: initial;
}

.smallText {
  font-size: 0.9rem;
}
</style>
