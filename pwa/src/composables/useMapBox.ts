import mapboxgl, { Map, MapMouseEvent, Marker } from 'mapbox-gl'
import { ref, Ref } from 'vue-demi'
import MapProps from '../interfaces/map-props.interface'

export default (props: MapProps) => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

  const map: Ref<Map> = ref({} as Map)
  const markers: Ref<Marker[]> = ref([])

  const style: Ref<string> = ref('mapbox://styles/mapbox/streets-v11')
  const defaultZoom: Ref<number> = ref(1)

  const addedSources: Ref<string[]> = ref([])

  const _setupDefaultSettings = () => {
    map.value.on('style.load', () => {
      map.value.setFog({})
    })

    map.value.on('load', function () {
      map.value.resize()
    })
  }

  const removeMapData = () => {
    return new Promise<void>((resolve) => {
      markers.value.forEach((marker) => marker.remove())
      markers.value = []
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
      const m = new mapboxgl.Marker().setLngLat(marker).addTo(map.value)
      markers.value.push(m)

      map.value.flyTo({
        center: marker,
        zoom: 10,
        speed: 1,
      })
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
