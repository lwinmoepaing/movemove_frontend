<template>
  <div class="Container">
    <TitleText :component="'h1'">Contact Us</TitleText>
    <div class="text-left AddressContainer">
      <p>
        <BodyText>
          <v-icon class="primary--text" left>mdi-home-outline</v-icon>
          09 766 882288
        </BodyText>
      </p>
      <p>
        <BodyText>
          <v-icon class="primary--text" left>mdi-email-outline</v-icon>
          info@movemove.co
        </BodyText>
      </p>
      <p>
        <BodyText>
          <v-icon class="primary--text" left>mdi-map-marker</v-icon>
          8th Floor, Tower A, The Leaf Residence, DamaThukha Kyaung Str, Hlaing
          Township
        </BodyText>
      </p>
      <Map
        :start-position="mapData.latLng"
        :draggable="false"
        :is-show-info="true"
        :set-data="mapData"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: ['isAuth', 'checkAuth'],
  data() {
    return {
      mapData: {
        latLng: {
          lat: 16.847165,
          lng: 96.119964
        },
        place_id: null,
        name: '',
        formatted_address:
          'The Leaf Resident, Dhama Thuka Kyaung Street, Yangon, (Near Hlaing Futsal Ground) '
      }
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
</style>
