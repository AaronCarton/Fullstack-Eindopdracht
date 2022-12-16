<template>
  <div class="my-3" ref="mapElement"></div>
</template>

<script lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'

import { LngLatLike } from 'mapbox-gl'
import { onMounted, Ref, ref, watch } from 'vue-demi'

import useMapbox from '../../composables/useMapBox'

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
    startRoute: {
      type: Object as () => number[],
      required: false,
      default: () => undefined,
    },
    endRoute: {
      type: Object as () => number[],
      required: false,
      default: () => undefined,
    },
  },

  setup(props, { emit }) {
    const { createMap, renderMarkerIfAny, removeMapData, getRoute } = useMapbox(props)

    const mapElement: Ref<HTMLElement | null> = ref(null)

    // DOM Content Loaded
    onMounted(() => {
      console.log('Map mounted')

      const map = createMap(mapElement.value!)

      // This can help.
      map.on('load', () => {
        renderMarkerIfAny()
      })

      // When props change, update the map data each time
      watch(props, async () => {
        console.log('Map props changed', props)

        await removeMapData()
        renderMarkerIfAny()
        getRoute()
      })
    })

    return {
      mapElement,
    }
  },
}
</script>
