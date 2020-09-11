<template>
  <div class="Container">
    <div class="text-left GmapAutoCompleteContainer">
      <GmapAutocomplete
        class="GmapAutoComplete"
        :value="name"
        placeholder="Enter Place Name"
        :options="{ componentRestrictions: { country: 'mm' } }"
        @place_changed="setPlace"
      />
    </div>

    <GmapMap
      ref="map"
      style="width: '100%'; height: 400px;"
      :zoom="16"
      :center="latLng"
      :options="mapOptions"
    >
      <GmapMarker
        ref="marker"
        :position="latLng"
        draggable
        clickable
        :icon="{ url: '/movemove_pointer.png' }"
        @click="openInfoWindow"
        @drag="updateInfoPosition"
        @dragend="updateCoordinates"
      />

      <GmapInfoWindow
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
/* eslint-disable no-undef */
/* eslint-disable new-cap */
export default {
  middleware: ['isAuth', 'checkAuth'],
  data() {
    return {
      geocoder: null,

      latLng: {
        lat: 16.850916,
        lng: 96.2343559
      },

      place_id: null,
      name: '',
      formatted_address: 'Unamed Road, Yangon, Myanmar (Burma)',
      coordinates: null,

      mapOptions: {
        scrollwheel: !false,
        maxZoom: 18,
        minZoom: 14,
        styles: []
      },

      infoPosition: {
        lat: 16.850916,
        lng: 96.2343559
      },
      infoWindow: {
        open: true
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
        this.mapOptions.styles = [
          { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
          {
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#242f3e' }]
          },
          { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }]
          }
        ]
      } else {
        this.mapOptions.styles = []
      }
    }
  },

  beforeMount() {
    this.mapOptions.styles =
      this.theme === 'dark'
        ? [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            {
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#242f3e' }]
            },
            {
              elementType: 'labels.text.fill',
              stylers: [{ color: '#746855' }]
            },
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#263c3f' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#6b9a76' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#38414e' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#212a37' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#9ca5b3' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{ color: '#746855' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#1f2835' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#f3d19c' }]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ color: '#2f3948' }]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#515c6d' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#17263c' }]
            }
          ]
        : []
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

      this.name = place.name
      this.place_id = place.id
      this.formatted_address = place.formatted_address
    },

    /**
     * When Drag End
     */
    updateCoordinates(location) {
      this.latLng = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng()
      }

      this.name = null
      this.place_id = null
      this.geocodePosition(this.latLng)
    },

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
    geocodePosition(pos) {
      this.geocoder = new google.maps.Geocoder()
      this.geocoder.geocode(
        {
          latLng: pos
        },
        (responses) => {
          if (responses && responses.length > 0) {
            this.formatted_address = responses[0].formatted_address
          }
        }
      )
    },

    openInfoWindow() {
      this.infoWindow.open = false
      setTimeout(() => {
        this.infoWindow.open = true
      }, 100)
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
.GmapAutoCompleteContainer {
  position: relative;
}
.GmapAutoComplete {
  width: 370px;
  height: 42px;
  display: inline-block;
  position: absolute;
  bottom: -51px;
  padding: 0 1rem;
  left: 13rem;
  z-index: 100;
  background: white;
  border: 1px solid #dfdfdf;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
}
.textDark {
  color: #010101;
}
</style>
