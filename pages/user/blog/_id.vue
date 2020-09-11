<template>
  <div>
    <AuthorStoryHeader
      :title="title"
      :description="description"
      :story-img="headImg"
      :tags="tags"
      :author="author"
      :is-loading="isLoading"
      :is-finished="false"
      :user="user"
      @onEdit="onEdit"
      @onDelete="onDelete"
    />

    <div>
      <Map
        :start-position="{ lat: coordinates[0], lng: coordinates[1] }"
        :draggable="false"
        small
        :set-data="{
          latLng: {
            lat: coordinates[0],
            lng: coordinates[1]
          },
          place_id,
          name: place_name,
          formatted_address
        }"
      />
    </div>

    <!-- <pre>{{ editData }}</pre> -->
    <BottomDialog
      :modal-dialog="isShowForm"
      title="Editing Blog"
      @onCloseForm="onCloseForm"
    >
      <div class="px-5 BlogFormContainer">
        <BlogForm
          :is-show-form="isShowForm"
          :set-data="setData"
          @onSuccessEditBlog="onSuccessEditBlog"
        />
      </div>
    </BottomDialog>

    <ModalLoading :dialog="publishDialog" title="Deleting Blog ..." />

    <v-dialog v-model="isShowDeleteForm" max-width="500px">
      <v-card>
        <v-card-title class="text-center">
          <span>Confirm to delete this blog</span>
        </v-card-title>
        <v-card-actions>
          <v-btn depressed style="flex: 1" @click="isShowDeleteForm = false">
            Cancel
          </v-btn>
          <v-btn color="primary" style="flex: 1" @click="cofirmDeleted">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { errorHandler, aysncErrorHandler } from '~/assets/util/helper'
import AuthorStoryHeader from '~/components/Author/Story/AuthorStoryHeader'
import {
  DELETED_BLOG_BY_AUTHOR,
  GET_BLOG_BY_ID
} from '~/assets/api/blog/blogApi'

const setBlogPayload = (blog = {}) => {
  return {
    tags: blog.tags || [],
    _id: blog._id || '',
    title: blog.title || '',
    description: blog.description || '',
    headImg: blog.headImg || '',
    author: blog.author || {},
    coordinates: blog.coordinates || [0, 0],
    place_id: blog.place_id || '',
    place_name: blog.place_name || '',
    formatted_address: blog.formatted_address || ''
  }
}

export default {
  layout: 'author',
  middleware: ['isAuth', 'isUser'],
  components: { AuthorStoryHeader },
  async asyncData({ params, store, app, redirect }) {
    const Console = console
    const blogId = params.id
    const token = store.state.auth.token
    const user = store.state.auth.user
    Console.log('User', user)
    try {
      const response = await GET_BLOG_BY_ID(app.$axios, blogId, token)

      return {
        blogId,
        ...setBlogPayload(response.data),
        editData: response.data
      }
    } catch (e) {
      const { toLogout, messageArray } =
        errorHandler(e, null, store, redirect) || {}
      Console.log(e)
      return {
        toLogout,
        messageArray,
        blogId,
        editData: null,
        ...setBlogPayload()
      }
    }
  },
  data() {
    return {
      isLoading: false,
      // Create Show Form,
      isShowForm: false,
      isShowDeleteForm: false,
      // External Loading
      publishDialog: false,
      // Editable Data
      setData: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      token: 'auth/token'
    })
  },
  watch: {
    // isShowForm(v) {
    //   console.log('isShowForm', v)
    // }
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
     * When Client Click On Edit
     */
    onEdit() {
      this.isShowForm = true
      this.setData = {
        ...this.editData,
        latLng: {
          lat: this.editData.coordinates[0],
          lng: this.editData.coordinates[1]
        }
      }
    },

    /**
     * on Close Edit Form
     */
    onCloseForm() {
      this.isShowForm = false
      this.setData = null
    },

    /**
     * On Success Edit Blog
     */
    onSuccessEditBlog(blog) {
      this.setData = null
      this.setBlogPayload(blog)
      this.editData = { ...blog }
      this.isShowForm = false
    },

    /**
     * Helper Method to Show Overview Author Dashboard
     */
    setBlogPayload(blog = {}) {
      this.tags = blog.tags || []
      this._id = blog._id || ''
      this.title = blog.title || ''
      this.description = blog.description || ''
      this.headImg = blog.headImg || ''
      this.coordinates = blog.coordinates || [0, 0]
      this.place_id = blog.place_id || ''
      this.place_name = blog.place_name || ''
      this.formatted_address = blog.formatted_address || ''
    },

    /**
     *  When Client Click Delete Btn
     *  Confirm to delete or not
     */
    onDelete() {
      this.isShowDeleteForm = true
    },

    /**
     * User Decided sure to delete blog
     */
    async cofirmDeleted() {
      this.isShowDeleteForm = false
      this.publishDialog = true

      try {
        const response = await DELETED_BLOG_BY_AUTHOR(
          this.$axios,
          this.token,
          this.blogId
        )
        const Console = console
        Console.log(response)
        this.$router.push('/')
      } catch (e) {
        errorHandler(e, this)
      }
    }
  }
}
</script>

<style scoped>
.EpisodeForm {
  max-width: 400px;
}
.BlogFormContainer {
  max-width: 550px;
  margin: 10px auto;
  display: block;
}
</style>
