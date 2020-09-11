<template>
  <v-app dark>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="submitLogout">
          <v-list-item-action>
            <v-icon class="red--text text--lighten-1">
              mdi-logout-variant
            </v-icon>
          </v-list-item-action>
          <v-list-item-content class="red--text text--lighten-1">
            <v-list-item-title v-text="'Logout'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Navigation Drawer Finished  -->

    <!-- Top App Bar -->
    <v-app-bar
      :clipped-left="clipped"
      :fixed="false"
      :color="!isDark ? 'primary' : 'accent'"
      app
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="'MoveMove Blogs'" />

      <v-spacer />
      <ThemeSwitcher class="mr-2" />
      <!-- Right Turn/ Click -->
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <!-- Top App Bar Finished-->
    <v-main>
      <div class="Container">
        <GlobalSnackbar />
        <nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Blogs',
          to: '/user'
        },
        {
          icon: 'mdi-alpha-t-box',
          title: 'Tags',
          to: '/user/tag'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      rightTemporary: false
    }
  },
  computed: {
    ...mapGetters({
      theme: 'theme/type',
      type: 'locale',
      isShowRightAside: 'isShowRightAside'
    }),

    isDark() {
      return this.theme === 'dark'
    }
  },

  watch: {
    rightDrawer(newValue, oldValue) {
      if (newValue !== oldValue) {
        // console.log('Calling', value)
        this.setRightAside(newValue)
      }
    },
    isShowRightAside(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.rightDrawer = newValue
      }
    }
  },

  beforeMount() {
    // For Mobile Device, We already dont show off
    // this drawer!!
    if (window.innerWidth <= 1263) {
      this.drawer = false
      this.rightTemporary = true
    }

    // Set Initial State from vuex Store
    // To Show Right Aside
    this.rightDrawer = this.isShowRightAside
  },

  methods: {
    ...mapActions({
      submitLogout: 'auth/resetAuth',
      setRightAside: 'setRightAside'
    })
  }
}
</script>

<style scoped>
.Container {
  margin: 0 auto;
  max-width: 1600px;
}

@media screen and (min-width: 600px) {
  .Container {
    padding: 1rem 2rem;
  }
}
</style>
