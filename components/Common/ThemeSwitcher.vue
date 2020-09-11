<template>
  <v-btn
    :color="isDark ? 'secondary' : 'dark'"
    fab
    x-small
    dark
    @click="toggle"
  >
    <v-icon>
      {{ isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}
    </v-icon>
  </v-btn>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      type: 'theme/type'
    }),
    isDark() {
      return this.type === 'dark'
    }
  },
  methods: {
    ...mapActions({
      changeTheme: 'theme/changeTheme'
    }),
    toggle() {
      this.$vuetify.theme.isDark = this.type === 'light'
      const changeTheme = this.type === 'light' ? 'dark' : 'light'
      this.changeTheme(changeTheme)
    }
  }
}
</script>
