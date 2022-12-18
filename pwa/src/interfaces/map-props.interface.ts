import { LngLatLike } from 'mapbox-gl'

export default interface MapProps {
  mapCoordinates: LngLatLike
  markers?: LngLatLike[]
  startRoute?: number[]
  endRoute?: number[]
}
