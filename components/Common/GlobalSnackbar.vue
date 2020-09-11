<template>
  <v-snackbar v-model="show" top multi-line :color="snackColor">
    <TitleText
      v-for="(mes, index) in message"
      :key="mes + index"
      :component="'h3'"
      class="my-2"
    >
      {{ mes }}
    </TitleText>

    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="closeSnack">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      message: 'snackbar/message',
      showSnack: 'snackbar/showSnack',
      snackColor: 'snackbar/snackColor'
    })
  },
  watch: {
    show(newValue, oldValue) {
      if (newValue === false) {
        this.closeSnack()
      }
    },
    showSnack(newValue) {
      if (newValue === true) {
        this.show = true
      } else {
        this.show = false
      }
    }
  },
  methods: {
    ...mapActions({
      closeSnack: 'snackbar/closeSnack'
    })
  }
}
</script>
