<template>
  <v-row no-gutters class="mt-5 mt-xs-5 mt-sm-0">
    <v-col cols="12" md="8" class="pr-4 pl-4 pl-sm-0 pr-md-4">
      <Container class="mr-md-5 MinContainer">
        <div class="px-5 px-sm-0 ">
          <BackButton />

          <v-btn
            v-if="user._id === author._id"
            color="primary"
            @click="$emit('onEdit')"
          >
            <v-icon small left>mdi-pencil</v-icon>
            Edit
          </v-btn>
          <v-btn
            v-if="user._id === author._id"
            depressed
            @click="$emit('onDelete')"
          >
            <v-icon small left>mdi-delete-sweep</v-icon>
            Delete
          </v-btn>
        </div>
        <TitleText :component="'h2'" class="px-5 px-sm-0 mb-3 mb-sm-0">
          {{ title }}
        </TitleText>
        <div>
          <v-list-item-avatar color="grey" size="25" class="ml-0">
            <img src="/image/profile.png" alt="John" />
          </v-list-item-avatar>
          by {{ author.name ? author.name : '' }}
          <v-chip
            v-for="tag in tags"
            :key="tag._id"
            class="my-1 mx-1 cursor-pointer"
            small
            outlined
            :to="'/user/tag?tagname=' + tag.name"
          >
            {{ tag.name }}
          </v-chip>
        </div>
        <BodyText component="p" class="px-5 px-sm-0 mb-3 mb-sm-0 ">
          {{ description }}
        </BodyText>
      </Container>
    </v-col>
    <v-col cols="12" md="4">
      <Container class="my-4  ImageContainer">
        <v-img src="/image/default-book.jpg" max-height="200" />
      </Container>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    episodeMonthlyCount: {
      type: Number,
      required: false,
      default: 0
    },
    storyImg: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    isFinished: {
      type: Boolean,
      required: true
    },
    author: {
      type: Object,
      required: true
    },
    tags: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      type: 'locale'
    }),
    isLocaleMm() {
      return this.type === 'mm'
    }
  }
}
</script>

<style scoped>
.ImageContainer {
  padding: 0 !important;
  position: relative;
}

.MinContainer {
  min-height: 200px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
