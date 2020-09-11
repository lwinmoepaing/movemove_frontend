<template>
  <div>
    <nav>
      <v-row>
        <!-- Logo Start -->
        <v-col cols="12" md="4">
          <div class="text-md-left text-center">
            <TitleText :component="'h2'">
              <img class="MoveMoveIcon" src="/icon.png" alt="" />
              MoveMove Blog
            </TitleText>
          </div>
        </v-col>
        <!-- Logo Finished -->

        <!-- Routes Links Start -->
        <v-col cols="12" md="4">
          <ul class="text-center">
            <li v-for="route in routes" :key="route.name">
              <v-btn text color="primary" :to="route.href">
                <v-icon dark left class="d-none d-sm-flex">{{
                  route.iconName
                }}</v-icon>
                <BodyText>
                  {{ route.name }}
                </BodyText>
              </v-btn>
            </li>
          </ul>
        </v-col>
        <!-- Routes Links Finished -->

        <v-col cols="12" md="4">
          <div class="text-md-right text-center">
            <ThemeSwitcher />
            <span v-if="!isLogin">
              <!-- <v-btn text color="primary">
                Sign Up
              </v-btn> -->
              <v-btn depressed color="primary" :to="'login'">Login</v-btn>
            </span>
            <span v-else>
              <v-btn text color="primary" @click="submitLogout">
                Logout
              </v-btn>
            </span>
          </div>
        </v-col>
      </v-row>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      routes: [
        {
          name: 'Home',
          href: '/',
          iconName: 'mdi-home-outline'
        },
        {
          name: 'About',
          href: 'about',
          iconName: 'mdi-information-outline'
        },
        {
          name: 'Contact',
          href: 'contact',
          iconName: 'mdi-map-marker'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'auth/isAuthenticated',
      user: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      submitLogout: 'auth/resetAuth'
    })
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

li {
  display: inline-block;
  /* background: #dfdfdf; */
}

.MoveMoveIcon {
  width: 30px;
  position: relative;
  top: 0.56rem;
  margin-right: 4px;
}
</style>
