import { Point } from 'geojson'

export default interface LiveLocation {
  driverId: string
  driverName: string
  geolocation: Point
}
