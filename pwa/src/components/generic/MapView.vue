<template>
  <div class="my-3" ref="mapElement"></div>
</template>

<script lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'

import { LngLatLike } from 'mapbox-gl'
import { onMounted, Ref, ref, watch } from 'vue'

import useMapbox from '../../composables/useMapbox'

export default {
  props: {
    mapCoordinates: {
      type: Object as () => LngLatLike,
      required: true,
    },
    markers: {
      type: Array as () => LngLatLike[],
      required: false,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const { createMap, renderMarkerIfAny, removeMapData } = useMapbox(props)

    const mapElement: Ref<HTMLElement | null> = ref(null)

    // DOM Content Loaded
    onMounted(() => {
      console.log('Map mounted')

      const map = createMap(mapElement.value!)

      // This can help.
      map.on('load', () => {
        // renderMarkerIfAny()
      })

      // When props change, update the map data each time
      // watch(props, async () => {
      //   await removeMapData()
      //   renderMarkerIfAny()
      // })
    })

    return {
      mapElement,
    }
  },
}
</script>
