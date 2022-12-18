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

  const _fetchRoute = async (start: number[], end: number[]) => {
    if (!start || !end) return

    // @ts-ignore
    const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`

    const query = await fetch(url).then((response) => response.json())
    return query.routes[0].geometry.coordinates
  }

  // const start = [3.3232699, 50.8425729]
  // const end = [3.2375572, 50.8352095]

  const getRoute = async () => {
    // @ts-ignore
    if (!props.startRoute || !props.endRoute) return map.value.getSource('route').setData({})

    const coords = await _fetchRoute(props.startRoute, props.endRoute)

    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coords,
      },
    }

    if (map.value.getSource('route')) {
      // @ts-ignore
      map.value.getSource('route').setData(geojson)
    }
    // otherwise, we'll make a new request
    else {
      map.value.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson as any,
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#AA2E26',
          'line-width': 7,
          'line-opacity': 0.75,
        },
      })
    }

    const end = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: coords,
          },
        },
      ],
    }

    if (map.value.getLayer('end')) {
      // @ts-ignore
      map.value.getSource('end').setData(end)
    } else {
      map.value.addLayer({
        id: 'end',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: coords,
                },
              },
            ],
          },
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#f30',
        },
      })
    }
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
      if (!marker) return
      const m = new mapboxgl.Marker().setLngLat(marker).addTo(map.value)
      markers.value.push(m)
    }
    map.value.flyTo({
      center: props.markers.at(-1),
      zoom: 12,
      speed: 1,
    })
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
    getRoute,
  }
}
