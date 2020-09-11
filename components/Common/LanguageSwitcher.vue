<template>
  <v-btn
    v-if="isLocaleMm"
    :color="isLocaleMm ? 'primary' : 'secondary'"
    fab
    x-small
    dark
    @click="changeLanguage('en')"
  >
    EN
  </v-btn>
  <v-btn
    v-else
    :color="isLocaleMm ? 'primary' : 'secondary'"
    fab
    x-small
    dark
    @click="changeLanguage('mm')"
  >
    MM
  </v-btn>
</template>

<script>
export default {
  computed: {
    isLocaleMm() {
      return this.$i18n.locale === 'mm'
    }
  },
  methods: {
    changeLanguage(lang) {
      // Change the i18n context object's locale
      // This makes it so the correct locale file is used
      this.$i18n.locale = lang
    }
  }
}
</script>
