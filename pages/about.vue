<template>
  <div class="Container">
    <TitleText :component="'h1'">About App</TitleText>
    <div class="AddressContainer text-left">
      <p>
        <BodyText>
          <v-icon class="primary--text" left>mdi-cellphone-iphone</v-icon>
          App v1 is released to test blog system with geolocation.
        </BodyText>
      </p>
      <p>
        <BodyText>
          <v-icon small left class="liLeft primary--text"
            >mdi-check-circle-outline
          </v-icon>
          Can CRUD Blogs
        </BodyText>
      </p>
      <p>
        <BodyText>
          <v-icon small left class="liLeft primary--text"
            >mdi-check-circle-outline
          </v-icon>
          Can Search By Tags
        </BodyText>
      </p>
      <p>
        <BodyText>
          <v-icon small left class="liLeft primary--text"
            >mdi-check-circle-outline
          </v-icon>
          Can Attach Geolocation (Draggable, AutoComplte, ThemeChange)
        </BodyText>
      </p>
      <p>
        <BodyText>
          <v-icon class="primary--text" left>mdi-shield-account</v-icon>
          Author LMP.
        </BodyText>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: ['isAuth', 'checkAuth'],
  data() {
    return {
      test: 'Test'
    }
  },
  computed: {
    ...mapGetters({
      type: 'theme/type'
    })
  }
}
</script>

<style scoped>
.Container {
  padding: 1rem;
  text-align: center;
}

.AddressContainer {
  max-width: 630px;
  margin: 0 auto;
}
.liLeft {
  margin-left: 4px;
}
</style>
