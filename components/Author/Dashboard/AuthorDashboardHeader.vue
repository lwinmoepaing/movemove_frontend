<template>
  <v-row no-gutters>
    <v-col cols="12" md="8">
      <Container
        class="mr-md-5 Welcome"
        :class="{ light: !isDark, dark: isDark }"
      >
        <p class="coming">
          လစဉ်ပြိုင်ပွဲများ
        </p>
        <p class="yellow-text">
          COMING SOON
        </p>
      </Container>
    </v-col>
    <v-col class="d-none d-md-flex" cols="12" md="4">
      <Container class="ml-md-5">
        <TitleText :component="'h2'" class="text-center">
          {{ $t('author.welcomeText') }}
        </TitleText>
      </Container>
    </v-col>
  </v-row>
</template>

<style scoped>
.Welcome {
  background-position: center center !important; /* Center the image */
  background-repeat: no-repeat !important; /* Do not repeat the image */
  background-size: cover !important; /* Resize the background image to cover the entire container */
}
.Welcome.dark {
  background-image: url('/image/dark-welcome.jpg') !important; /* The image used */
}
.Welcome.light {
  background-image: url('/image/light-welcome.jpg') !important; /* The image used */
}
.ImgContainer {
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 1rem;
  text-align: center;
  background-color: #05050d;
}
.ImgContainer > img {
  height: 150px;
  object-fit: contain;
  object-position: center center;
}

p {
  text-align: center;
  font-size: 1.8em;
  padding: 0.8rem 0 0.8rem 0;
}

a {
  text-decoration: none;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
  font-family: 'Josefin Sans', sans-serif;
}

p.coming {
  color: #fff;
  font-family: Monoton;
  font-family: 'Josefin Sans', sans-serif;
}

p.coming {
  color: #ff1177;
  font-family: 'Josefin Sans', sans-serif;
  text-shadow: 0 0 3px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff1177,
    0 0 35px #ff1177, 0 0 40px #ff1177, 0 0 50px #ff1177, 0 0 75px #ff1177;
}

p.yellow-text {
  color: #ff9900;
  font-family: 'Josefin Sans', sans-serif;
  text-shadow: 0 0 3px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff9900,
    0 0 35px #ff9900, 0 0 40px #ff9900, 0 0 50px #ff9900, 0 0 75px #ff9900;
}

p.light {
  animation: none;
}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      type: 'theme/type'
    }),
    isDark() {
      return this.type === 'dark'
    }
  }
}
</script>
