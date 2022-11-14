import mapboxgl, { Map, MapMouseEvent, Marker } from 'mapbox-gl'
import { ref, Ref } from 'vue'
import MapProps from '../interfaces/map-props.interface'

export default (props: MapProps) => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

  const map: Ref<Map> = ref({} as Map)
  const selectedMarker: Ref<Marker | undefined> = ref()

  const style: Ref<string> = ref('mapbox://styles/mapbox/streets-v11')
  const defaultZoom: Ref<number> = ref(1)

  const addedSources: Ref<string[]> = ref([])

  const _setupDefaultSettings = () => {
    map.value.on('style.load', () => {
      map.value.setFog({})
    })
  }

  const removeMapData = () => {
    return new Promise<void>((resolve) => {
      addedSources.value.map((source) => {
        if (map.value.getLayer(source)) map.value.removeLayer(source)
        if (map.value.getSource(source)) map.value.removeSource(source)
      })

      addedSources.value = []
      resolve()
    })
  }

  const renderMarkerIfAny = () => {
    if (props.markers && props.markers.length < 1) return

    for (const marker of props.markers!) {
      new mapboxgl.Marker().setLngLat(marker).addTo(map.value)
    }
  }

  const createMap = (htmlRef: HTMLElement): Map => {
    console.log(props.mapCoordinates)

    map.value = new Map({
      container: htmlRef,
      style: style.value,
      center: props.mapCoordinates,
      zoom: 13,
      projection: { name: 'mercator' },
    })

    _setupDefaultSettings()

    return map.value
  }

  return {
    createMap,
    renderMarkerIfAny,
    removeMapData,
  }
}
