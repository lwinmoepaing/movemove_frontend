<template>
  <v-card class="mx-5 px-5 pb-5 mb-5  rounded-card" :loading="isLoading">
    <v-card-text>
      <TitleText :component="'h2'" class="text-center mb-5">
        {{ isEditedForm ? 'Edit' : 'Create New' }} Blog
      </TitleText>
      <v-form>
        <v-text-field
          v-model="title"
          :label="'Title'"
          dense
          class="mb-3"
          hide-details
          height="40"
          type="text"
          outlined
          color="primary"
          @keyup.enter="onSubmit"
        ></v-text-field>

        <v-textarea
          v-model="description"
          :label="'Description'"
          color="primary"
          :rows="3"
          outlined
          hide-details
          class="mb-3"
          dense
        ></v-textarea>

        <v-combobox
          v-model="tagModel"
          :items="items"
          :search-input.sync="search"
          hide-selected
          hint="Maximum of 5 tags (It's Optional)"
          label="Add Tags"
          class="mb-2"
          multiple
          outlined
          persistent-hint
          small-chips
          deletable-chips
        >
        </v-combobox>

        <Map
          :start-position="startPosition"
          :is-show-info="true"
          :set-data="mapData"
          @onChangeCenter="onChangeStartPointCenter"
          @onChange="onChangeMap"
        />

        <v-btn
          :disabled="!isNotEmpty"
          :loading="isLoading"
          color="primary "
          block
          class="mt-2"
          @click="onSubmit"
        >
          Submit
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  CREATE_BLOG_BY_AUTHOR,
  UPDATE_BLOG_BY_AUTHOR
} from '~/assets/api/blog/blogApi'
import { errorHandler } from '~/assets/util/helper'

export default {
  props: {
    storyId: {
      type: String,
      default: '0'
    },
    isShowForm: {
      type: Boolean,
      required: true
    },
    setData: {
      type: Object,
      required: false,
      default: () => null
    }
  },
  data() {
    return {
      title: '',
      description: '',
      tags: [],

      /**
       * Map Data To Setup Only
       */
      mapData: {
        latLng: {
          lat: 16.774481,
          lng: 96.158769
        },
        place_id: null,
        name: '',
        formatted_address: 'Current Detected Place'
      },

      payloadFromMapOnchange: null,

      startPosition: {
        lat: 16.774481,
        lng: 96.158769
      },

      // ComboBox
      items: [],
      tagModel: [],
      search: null,
      // Loading And Image_Path
      isLoading: false
    }
  },

  computed: {
    ...mapGetters({
      // Localization
      type: 'locale',
      user: 'auth/user',
      token: 'auth/token'
    }),

    isNotEmpty() {
      return !!this.description && !!this.title
    },

    isLocaleMm() {
      return this.type === 'mm'
    },

    isEditedForm() {
      return this.setData !== null
    }
  },

  watch: {
    tagModel(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.tagModel.pop())
      }
    },
    async isShowForm(val) {
      if (val) {
        if (this.setData) {
          // If We Edit Data
          this.setEditablePayload()
        } else {
          // Else We Create New Blog
          // const Console = console
          // Console.log('getLocation')
          await this.getLocation()
        }
      } else {
        // If Close Form
        this.resetForm()
      }
    }
  },

  async beforeMount() {
    /**
     * If We Edit Data
     */
    if (this.setData) {
      this.setEditablePayload()
    } else {
      // Else We Create New Blog
      await this.getLocation()
    }
  },

  methods: {
    // Actions
    ...mapActions({
      // Global Snack Message Show Hide
      showSnack: 'snackbar/showSnack',
      setSnackMessage: 'snackbar/setSnackMessage',
      setSnackColor: 'snackbar/setSnackColor'
    }),

    /**
     * We Decide when submitting
     */
    onSubmit() {
      // Set Payload for new creating story
      const payloads = this.setPayload()
      // const Console = console
      // if (payloads) {
      //   Console.log(payloads)
      // }

      if (!this.isEditedForm) {
        this.createBlog(payloads)
      } else {
        this.editBlog(payloads)
      }
    },

    /**
     * Create New Blog
     */
    async createBlog(payloads) {
      // const Console = console
      this.isLoading = true
      try {
        const response = await CREATE_BLOG_BY_AUTHOR(
          this.$axios,
          this.token,
          payloads
        )
        // Console.log(response)
        this.showSnack()
        this.setSnackMessage(['You Successfully Create Blog'])
        this.setSnackColor('successs')

        // To add new Episode
        this.$emit('onSuccessCreateBlog', response.data)
        // After Success
        this.resetForm()
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
        errorHandler(e, this)
      }
    },

    /**
     * Create New Blog
     */
    async editBlog(payloads) {
      // const Console = console
      this.isLoading = true
      try {
        const response = await UPDATE_BLOG_BY_AUTHOR(
          this.$axios,
          this.token,
          this.setData._id,
          payloads
        )
        // Console.log(response)
        this.showSnack()
        this.setSnackMessage(['You Successfully Edited Blog'])
        this.setSnackColor('successs')

        // To add new Episode
        this.$emit('onSuccessEditBlog', response.data)
        // After Success
        this.resetForm()
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
        errorHandler(e, this)
      }
    },

    /**
     * We Manage, It's Edit or Submit Paylaod
     */
    setPayload() {
      // const Console = console
      // Console.log('Set Payload')
      // Console.log(this.payloadFromMapOnchange)
      const payload = {
        title: this.title,
        description: this.description,
        lat: this.payloadFromMapOnchange.latLng.lat,
        lng: this.payloadFromMapOnchange.latLng.lng,
        formatted_address: this.payloadFromMapOnchange.formatted_address
      }

      if (this.payloadFromMapOnchange.name) {
        payload.place_name = this.payloadFromMapOnchange.name || ''
      }

      if (this.payloadFromMapOnchange.place_id) {
        payload.place_id = this.payloadFromMapOnchange.place_id || ''
      }

      // If Created Form And Tag is Exists
      if (this.tagModel.length > 0 && !this.isEditedForm) {
        payload.tags = this.tagModel.map((tag) => tag.trim())
      }

      /**
       * If We Are Editing this Blog
       * We had to know specific whick is addedTag or removeTag
       */
      if (this.isEditedForm) {
        const addedTags = this.tagModel.filter(
          (tag) => !this.setData.tags.some((oldTag) => oldTag.name === tag)
        )

        const tagExceptNewTags = this.tagModel.filter(
          (tag) => !addedTags.includes(tag)
        )

        const removeTags = this.setData.tags
          .filter((tag) => !tagExceptNewTags.includes(tag.name))
          .map((tag) => tag.name)

        // console.log('addedTags', addedTags)
        // console.log('removeTags', removeTags)
        if (addedTags.length > 0) payload.addedTags = addedTags
        if (removeTags.length > 0) payload.removeTags = removeTags
      }

      return payload
    },

    resetForm() {
      this.title = ''
      this.description = ''
      this.tagModel = []
      this.getLocation()
    },

    /**
     * Get Geolocation Data From Webapi
     * From navigator api
     */
    async getLocation() {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(this.setPosition)
      } else {
        this.mapData.latLng.lat = 16.774481
        this.mapData.latLng.lng = 96.158769
        this.startPosition = {
          lat: 16.774481,
          lng: 96.158769
        }
      }

      this.payloadFromMapOnchange = { ...this.mapData }
    },

    /**
     * Set position from Web Api ( Navigator )
     * Something We can't acceess user browser or mobile
     */
    setPosition(position) {
      // const Console = console
      // Console.log('Set position from Web Api ( Navigator )')
      this.startPosition = JSON.parse(
        JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      )
      this.mapData.latLng.lat = position.coords.latitude
      this.mapData.latLng.lng = position.coords.longitude
    },

    /**
     * When Search User in Google Autocomplete
     * We need to set center of map
     */
    onChangeStartPointCenter(startPosition) {
      this.startPosition = { ...startPosition }
    },

    /**
     * When Dragend Gmap or When Search Autocomplete
     * We Set Change Mat
     */
    onChangeMap(data) {
      // const Console = console
      // Console.log('On Change Map', data)
      this.payloadFromMapOnchange = { ...data }
    },

    /**
     * When Edit Client We set the Payload
     */
    setEditablePayload() {
      this.title = this.setData.title
      this.description = this.setData.description
      this.tagModel = this.setData.tags.map((tag) => tag.name)

      setTimeout(() => {
        // const Console = console
        // Console.log('Set Editable ', this.setData)
        this.startPosition = JSON.parse(
          JSON.stringify({ ...this.setData.latLng })
        )
        this.mapData.latLng.lat = this.setData.latLng.lat
        this.mapData.latLng.lng = this.setData.latLng.lng
        this.mapData.place_id = this.setData.place_id
        this.mapData.formatted_name = this.setData.formatted_name
        this.mapData.name = this.setData.place_name
      }, 100)
    }
  }
}
</script>
