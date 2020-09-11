<template>
  <component
    :is="component"
    :class="{
      mmBodyFont: isLocaleMm,
      enBodyFont: !isLocaleMm,
      enTitleFont: !isLocaleMm
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
      required: true
    }
  },
  data() {
    return {
      tags: ['h1', 'h2', 'h3', 'h4', 'h5']
    }
  },
  computed: {
    isLocaleMm() {
      return this.type === 'mm'
    }
  }
}
</script>
