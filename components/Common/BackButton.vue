<template>
  <v-btn outlined :fab="small" color="primary" :x-small="small" @click="back">
    <v-icon :left="!small">mdi-chevron-left</v-icon>
    {{ !small ? 'Back' : '' }}
  </v-btn>
</template>

<script>
export default {
  props: {
    small: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>
