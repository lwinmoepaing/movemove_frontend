<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <!-- Header -->
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items> -->
        </v-toolbar>
        <!-- Header Finished  -->
        <v-list three-line subheader>
          <slot></slot>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    modalDialog: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: 'Setting'
    }
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    }
  },
  watch: {
    modalDialog(newValue) {
      this.dialog = newValue
    },

    dialog(newValue) {
      if (newValue === false) {
        this.$emit('onCloseForm')
      }
    }
  }
}
</script>
