<template>
  <v-btn outlined :fab="small" color="secondary" x-small @click="reload">
    <v-icon :left="!small" :class="{ animate: isLoading }">mdi-reload</v-icon>
    {{ !small ? 'Reload' : '' }}
  </v-btn>
</template>

<script>
export default {
  props: {
    small: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      defualt: false
    },
    reload: {
      type: Function,
      required: true
    }
  },
  methods: {}
}
</script>

<style scoped>
.animate {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
