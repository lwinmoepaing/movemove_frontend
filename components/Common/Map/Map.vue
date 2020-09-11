<template>
  <div class="">
    <client-only v-if="startPosition">
      <div class="text-left GmapAutoCompleteContainer">
        <GmapAutocomplete
          v-if="draggable"
          class="GmapAutoComplete"
          :value="name"
          placeholder="Enter Place Name"
          :options="{ componentRestrictions: { country: 'mm' } }"
          @place_changed="setPlace"
        />
      </div>

      <GmapMap
        ref="map"
        class="MapContainer"
        :style="small ? 'height: 300px' : ''"
        :class="{ dark: theme === 'dark' }"
        :zoom="17"
        :center="startPosition"
        :options="mapOptions"
      >
        <GmapMarker
          ref="marker"
          clickable
          :position="latLng"
          :draggable="draggable"
          :icon="{ url: '/movemove_pointer.png' }"
          @click="openInfoWindow"
          @drag="updateInfoPosition"
          @dragend="updateCoordinates"
        />

        <GmapInfoWindow
          v-if="isShowInfo"
          :options="{
            maxWidth: 300,
            pixelOffset: { width: 0, height: -35 }
          }"
          :position="infoPosition"
          :opened="infoWindow.open"
          @closeclick="closeInfoWindow"
        >
          <div class="textDark">{{ formatted_address }}</div>
        </GmapInfoWindow>
      </GmapMap>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '~/config/index'
/* eslint-disable no-undef */
/* eslint-disable new-cap */
export default {
  props: {
    startPosition: {
      type: Object,
      required: true
    },

    setData: {
      type: Object,
      required: false,
      default: () => null
    },

    draggable: {
      type: Boolean,
      required: false,
      default: true
    },

    isShowInfo: {
      type: Boolean,
      required: false,
      default: true
    },

    small: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      geocoder: null,

      latLng: {
        lat: 0,
        lng: 0
      },

      // Infomation of Geo
      place_id: null,
      name: '',
      formatted_address: '',

      // Info Window Pop Up When click Pin Locator
      infoPosition: {
        lat: 0,
        lng: 0
      },

      infoWindow: {
        open: true
      },

      mapOptions: {
        scrollwheel: !false,
        maxZoom: 18,
        minZoom: 13,
        styles: [],
        streetViewControl: false
      }
    }
  },

  computed: {
    ...mapGetters({
      theme: 'theme/type'
    })
  },

  watch: {
    theme(val) {
      if (val === 'dark') {
        this.mapOptions.styles = config.MAP_DARK_STYLES
      } else {
        this.mapOptions.styles = []
      }
    },

    setData(val) {
      if (val) {
        this.setPayloadToMapEditor()
      }
    },

    /**
     * When Change Start Position From Parents
     */
    startPosition(val) {
      if (val) {
        this.latLng = { ...val }
        this.infoPosition = { ...val }
      }
    }
  },

  beforeMount() {
    // Before Mount if There is Theme Changes
    this.mapOptions.styles = this.theme === 'dark' ? config.MAP_DARK_STYLES : []
    // If There Is Payloads from Parents
    if (this.setData) {
      this.setPayloadToMapEditor()
    } else {
      this.latLng = this.startPosition
      this.infoPosition = this.startPosition
    }
  },

  methods: {
    /**
     * When Input Auto Complete
     */
    setPlace(place) {
      if (!place) return
      // If No Geo Location
      const noGeo = Object.keys(place).length === 1
      if (noGeo) return false

      this.latLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }

      this.infoPosition = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }

      this.$emit('onChangeCenter', { ...this.latLng })

      this.name = place.name
      this.place_id = place.place_id
      this.formatted_address = place.formatted_address

      this.emitOnChangeData()
    },

    /**
     * When DragEnd
     */
    updateCoordinates(location) {
      this.latLng = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng()
      }

      this.name = null
      this.place_id = null
      this.geocodePosition(this.latLng)
      this.emitOnChangeData()
    },

    /**
     * When Payloads Is Changes,
     * We need to setup
     */
    setPayloadToMapEditor() {
      this.latLng = { ...this.setData.latLng }
      this.infoPosition = { ...this.setData.latLng }
      this.place_id = this.setData.place_id
      this.name = this.setData.name
      this.formatted_address = this.setData.formatted_address

      if (this.formatted_address === 'Current Detected Place') {
        // We need to wait a little bcoz of loaidng google
        // const Console = console
        // Console.log('Check Current is True')
        this.name = ''
        setTimeout(async () => {
          await this.geocodePosition(this.latLng, this.emitOnChangeData)
        }, 200)
      }
    },

    /**
     * When Drag Pin ,
     * We Need to move info Popup
     */
    updateInfoPosition(location) {
      this.infoPosition = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng()
      }
      this.geocodePosition(this.infoPosition)
    },

    /**
     * Set Geo Code Position , Formatted Name
     * When Drag Marker
     */
    geocodePosition(pos, callback) {
      this.geocoder = new google.maps.Geocoder()
      this.geocoder.geocode(
        {
          latLng: pos
        },
        (responses) => {
          if (responses && responses.length > 0) {
            this.formatted_address = responses[0].formatted_address
            if (callback) callback()
          }
        }
      )
    },

    /**
     * Emit On Change Data
     */
    emitOnChangeData() {
      const payloads = {
        ...{
          latLng: { ...this.latLng },
          place_id: this.place_id,
          name: this.name,
          formatted_address: this.formatted_address
        }
      }
      // const Console = console
      // Console.log('Call to Emit', payloads)
      this.$emit('onChange', payloads)
    },

    /**
     * Open & Close Window Information
     */
    openInfoWindow() {
      this.infoWindow.open = false
      setTimeout(() => {
        this.infoWindow.open = true
      }, 30)
    },

    closeInfoWindow() {
      this.infoWindow.open = false
    }
  }
}
</script>

<style scoped>
.Container {
  padding: 1rem;
  text-align: center;
}
.MapContainer {
  width: 100%;
  height: 350px;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid #dfdfdf;
}

.MapContainer.dark {
  border: 1px solid #585858;
}
.GmapAutoCompleteContainer {
  position: relative;
}
.GmapAutoComplete {
  width: 250px;
  height: 32px;
  display: inline-block;
  position: absolute;
  bottom: -88px;
  padding: 0 1rem;
  left: 10px;
  z-index: 100;
  background: white;
  border: 1px solid #dfdfdf;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
}
.textDark {
  color: #010101;
}
</style>
