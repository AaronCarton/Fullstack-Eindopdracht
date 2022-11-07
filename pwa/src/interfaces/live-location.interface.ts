import { Point } from 'geojson'

export default interface LiveLocation {
  orderId: string
  driverId: string
  driverName: string
  geolocation: Point
}
