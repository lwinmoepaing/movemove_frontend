<template>
  <div>
    <Container>
      <TitleText :component="'h3'" class="float-left pt-3 px-2 px-md-0">
        Blog with Tag search
      </TitleText>
      <v-text-field
        v-model="tagModel"
        :label="'Input Tag Name'"
        dense
        class="mt-2  mx-3 float-left"
        hide-details
        height="40"
        type="text"
        outlined
        color="primary"
        @keyup.enter="searchWithTagName"
      ></v-text-field>

      <TitleText
        v-if="tagname && total"
        :component="'h3'"
        class="float-left pt-3 px-2 px-md-0"
      >
        Total Blogs ( {{ total }} )
      </TitleText>
      <div class="float-clear"></div>

      <div>
        <v-row no-gutters>
          <v-col
            v-for="blog in items"
            :key="blog._id"
            cols="12"
            xs="12"
            sm="6"
            md="6"
            lg="3"
          >
            <BlogCard
              :blog="blog"
              class="my-3 mx-auto mx-lg-0"
              :tagname="tagname"
            />
          </v-col>
        </v-row>

        <div class="Scroll-More my-2">
          <v-btn
            v-if="isMoreData"
            color="primary"
            :loading="isFetchingLoading"
            block
            rounded
            @click="fetchBlog"
          >
            <v-icon left>mdi-reload</v-icon> More
          </v-btn>
        </div>
      </div>

      <div
        v-if="!isFetchingLoading && items.size <= 0"
        class="EmptyContainer mt-5"
      >
        <EmptySVG />
        <p>No Data with this Tag "{{ tagname }}"</p>
      </div>
    </Container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { GET_ALL_BLOGS } from '~/assets/api/blog/blogApi'
import { errorHandler, aysncErrorHandler } from '~/assets/util/helper'

export default {
  layout: 'author',
  middleware: ['isAuth', 'isUser'],

  async asyncData({ store, app, query }) {
    const token = store.state.auth.token
    // const user = store.state.auth.user
    // const Console = console
    // Console.log('token', token)
    // Console.log('query', query)

    const tagQuery = query.tagname ? 'tag=' + query.tagname : ''
    const tagname = query.tagname ? query.tagname : ''
    const tagModel = tagname
    // Console.log('query', tagQuery)

    try {
      const response = await GET_ALL_BLOGS(
        app.$axios,
        token,
        `${tagQuery}&page=1`
      )
      // Console.log(response.data)

      return {
        items: new Set(response.data) || new Set([]),
        total: response.meta.itemCount || 0,
        currentPage: response.meta.currentPage || 0,
        lastPage: response.meta.pageCount || 0,
        query,
        tagQuery,
        tagname,
        tagModel
      }
    } catch (e) {
      // Console.log('Actions', store)
      const { toLogout, messageArray } = errorHandler(e, null, store) || {}
      return {
        toLogout,
        messageArray,
        items: new Set([]),
        total: 0,
        currentPage: 0,
        lastPage: 0,
        query,
        tagQuery,
        tagname,
        tagModel
      }
    }
  },

  watchQuery: ['page', 'tagname'],

  data() {
    return {
      isFetchingLoading: false,
      // Create Blog Form,
      isShowForm: false
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
      token: 'auth/token'
    }),
    isMoreData() {
      return this.currentPage < this.lastPage
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
        this.items = new Set([newValue, ...this.items])
      }
    },

    query(val) {
      this.currentPage = 1
      // console.log('QueryChanges Watcher', val)
    }
  },

  beforeMount() {
    // Async data Error Handler
    aysncErrorHandler(this)
  },

  methods: {
    ...mapActions({
      // Global Snack Message Show Hide
      showSnack: 'snackbar/showSnack',
      setSnackMessage: 'snackbar/setSnackMessage',
      setSnackColor: 'snackbar/setSnackColor'
    }),

    /**
     *  When User Enter Search Box
     *  Search With Tag Name
     */
    searchWithTagName() {
      this.$router.push(`/user/tag?tagname=${this.tagModel}`)
    },

    /**
     * Fetching Blog
     */
    async fetchBlog() {
      // const Console = console
      if (!this.isMoreData) {
        return
      }

      try {
        this.isFetchingLoading = true
        const response = await GET_ALL_BLOGS(
          this.$axios,
          this.token,
          `page=${this.currentPage + 1}&${this.tagQuery}`
        )
        this.currentPage = response.meta.currentPage
        this.items = new Set([...this.items, ...response.data])
        this.total = response.meta.itemCount
        this.lastPage = response.meta.pageCount
        this.isFetchingLoading = false
        // await Console.log(response)
      } catch (e) {
        // Console.log('Actions', e)
        errorHandler(e, this)
        // Console.log(e.message)
        this.isFetchingLoading = false
      }
    }
  }
}
</script>

<style scoped>
.float-clear {
  clear: both;
}

.BlogFormContainer {
  max-width: 550px;
  margin: 10px auto;
  display: block;
}

.EmptyContainer {
  max-width: 280px;
  margin: 0 auto;
}
</style>
