<template>
  <v-card max-width="240" class="rounded-xl">
    <v-list-item class="text-left">
      <v-list-item-avatar color="grey">
        <img src="/image/profile.png" alt="John" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ blog.title }}
        </v-list-item-title>
        <v-list-item-subtitle> by {{ blog.author.name }} </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text class="px-2 py-0 minHeightChip">
      <v-chip
        v-for="tag in blog.tags"
        :key="tag._id"
        class="my-1 cursor-pointer"
        :color="tagname === tag.name ? 'primary' : ''"
        :outlined="tagname ? false : true"
        small
        :to="'/user/tag?tagname=' + tag.name"
      >
        {{ tag.name }}
      </v-chip>
    </v-card-text>
    <!-- Sample Image Height -->
    <v-img src="/image/default-book.jpg" height="150"></v-img>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        color="info"
        block
        outlined
        class="rounded-bl-xl rounded-br-xl rounded-tl-md rounded-tr-md"
        :to="'/user/blog/' + blog._id"
      >
        View Detail
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script scoped>
export default {
  filters: {
    categoryTypeFilter(value = '') {
      value = value.toLowerCase() || ''
      return value === 'horror' ? '#EF5350' : 'primary'
    }
  },
  props: {
    blog: {
      type: Object,
      default: null
    },
    onShowCreateForm: {
      type: Function,
      default: () => {},
      required: false
    },
    tagname: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {}
}
</script>

<style scoped>
.CustomLineHeight {
  line-height: 1.7 !important;
}

.mmFontSize {
  font-size: 1.1rem !important;
}

.cursor-pointer {
  cursor: pointer;
}

.minHeightChip {
  min-height: 31px;
}
</style>
