<template>
  <Container>
    <TitleText
      :component="'h2'"
      class="mb-2 mx-2 mx-md-3 mx-lg-15 text-center text-md-left"
    >
      {{ $t('author.storyList') }}
    </TitleText>

    <StoryCard
      v-if="isEmptyData"
      class="mx-4"
      empty
      :on-show-create-form="onShowCreateForm"
    ></StoryCard>

    <client-only>
      <v-slide-group
        v-if="!block"
        :show-arrows="false"
        :center-active="true"
        class="ScrollSmooth"
      >
        <v-slide-item
          v-for="story in data"
          :key="story.title + story.id"
          v-slot:default="{ active, toggle }"
        >
          <StoryCard
            class="mx-2 my-2"
            :author="isAuthor"
            :author-data="user"
            :story="story"
            @click.native="toggle"
          />
        </v-slide-item>

        <v-slide-item class="ma-2 pa-3">
          <v-row class="fill-height" align="center" justify="center">
            <v-btn
              v-if="isMoreData"
              color="primary"
              :loading="isFetchingLoading"
              @click="fetchStory"
            >
              <v-icon left>mdi-reload</v-icon> More
            </v-btn>
          </v-row>
        </v-slide-item>
      </v-slide-group>

      <div v-else class="ScrollY">
        <StoryCard
          v-for="story in data"
          :key="story.title + story.id"
          class="mx-2 my-2"
          :author="isAuthor"
          :author-data="user"
          :story="story"
        />
        <div class="px-10 Scroll-More">
          <v-btn
            v-if="isMoreData"
            color="primary"
            :class="{ lineHeight: isLocaleMm }"
            :loading="isFetchingLoading"
            @click="fetchStory"
          >
            <v-icon left>mdi-reload</v-icon> More
          </v-btn>
        </div>
      </div>
    </client-only>

    <div class="mt-5 mb-2 mx-2 mx-md-3 mx-lg-14">
      <v-btn class="" color="primary" rounded block @click="onShowCreateForm">
        <v-icon left>mdi-plus</v-icon> {{ $t('storyform.label') }}
      </v-btn>
    </div>
  </Container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    isFetchingLoading: {
      type: Boolean,
      required: true
    },
    isMoreData: {
      type: Boolean,
      required: true
    },
    block: {
      type: Boolean,
      required: true
    },
    fetchStory: {
      type: Function,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    lastPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      cardAlignment: 'center'
    }
  },

  computed: {
    ...mapGetters({
      type: 'theme/type',
      user: 'auth/user',
      token: 'auth/token',

      // Story
      showStoryCreateComponent: 'story/showStoryCreateComponent',
      addedNewStory: 'story/addedNewStory',

      // Right Navigator
      isShowRightAside: 'isShowRightAside',

      // Localization
      localization: 'locale'
    }),

    isAuthor() {
      return this.user.role === 'author' || this.user.role === 'premiumAuthor'
    },

    isDark() {
      return this.type === 'dark'
    },

    isEmptyData() {
      return this.data ? this.data.length <= 0 : false
    },

    isLocaleMm() {
      return this.localization === 'mm'
    }
  },

  watch: {
    isShowRightAside(value) {
      if (value === false) {
        this.setShowStoryCreateComponent(false)
      }
    },

    addedNewStory(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.data = [newValue, ...this.data]
      }
    }
  },

  methods: {
    ...mapActions({
      // Global Snack Message Show Hide
      showSnack: 'snackbar/showSnack',
      setSnackMessage: 'snackbar/setSnackMessage',
      setSnackColor: 'snackbar/setSnackColor',

      // To show Right Drawer
      setRightAside: 'setRightAside',

      // Show Create Form
      setShowStoryCreateComponent: 'story/setShowStoryCreateComponent'
    }),

    // When we click to show Our Story Form
    // to Create new one
    onShowCreateForm() {
      this.setRightAside(!this.isShowRightAside)
      this.setShowStoryCreateComponent()
      // console.log('query', this.$route.query)
    }
  }
}
</script>

<style scoped>
.StoryContainer.dark {
  background: rgba(255, 255, 255, 0.1);
}

.StoryContainer.light {
  background: #f0f0f0;
}

@media screen and (max-width: 600px) {
  .StoryContainer.dark,
  .StoryContainer.light {
    background: transparent;
  }
}

@media screen and (min-width: 600px) {
  .StoryContainer {
    border-radius: 1rem;
    padding: 2rem 0;
  }
}

.Container {
  padding: 1rem;
  /* text-align: center; */
}
.v-slide-group__content {
  scroll-behavior: smooth;
}
.ScrollY {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-behavior: smooth;
}
.ScrollY > .card {
  flex: 0 0 auto;
}

.ScrollY::-webkit-scrollbar {
  display: none;
}

.Scroll-More {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
