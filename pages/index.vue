<template>
  <div class="Container">
    <img src="/icon.png" alt="" class="Image" />
    <TitleText :component="'h1'" class="primary--text mb-4">
      Welcome to MoveMove Blog
    </TitleText>
    <v-btn color="info" rounded :to="'/login'">
      Start With Move-Move
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: ['isAuth', 'checkAuth'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      type: 'theme/type',
      isAuthenticated: 'auth/isAuthenticated',
      user: 'auth/user'
    })
  }
}
</script>

<style scoped>
.Container {
  padding: 1rem;
  text-align: center;
}

.Image {
  display: block;
  width: 150px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;
  margin-bottom: 20px;
}
</style>
