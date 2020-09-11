<template>
  <!-- Publis Loading -->
  <v-dialog v-model="dialog" persistent width="300">
    <v-card color="primary" dark class="pt-4">
      <v-card-text>
        <div class="mb-4">
          {{ title }}
        </div>
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
  <!-- Publish Loading End -->
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    },

    title: {
      type: String,
      default: 'Loading ...'
    }
  },
  data() {
    return {}
  }
}
</script>
