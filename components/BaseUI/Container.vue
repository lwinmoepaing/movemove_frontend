<template>
  <component
    :is="'div'"
    class="Container_"
    :class="{ mmBodyFont: isLocaleMm, dark: isDark, light: !isDark }"
  >
    <slot></slot>
  </component>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      type: 'locale',
      theme: 'theme/type'
    }),

    isLocaleMm() {
      return this.type === 'mm'
    },

    isDark() {
      return this.theme === 'dark'
    }
  }
}
</script>

<style scoped>
.Container_ {
  width: 100%;
  overflow: hidden;
}

.Container_.dark {
  background: rgba(255, 255, 255, 0.1);
}

.Container_.light {
  background: #fbfbfb;
}

@media screen and (max-width: 600px) {
  .Container_.dark,
  .Container_.light {
    background: transparent;
  }
}

@media screen and (min-width: 600px) {
  .Container_ {
    border-radius: 1rem;
    padding: 1rem;
    margin: 1rem 0;
  }
}
</style>
