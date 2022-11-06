import { ref } from 'vue'
import { io, Socket } from 'socket.io-client'
import useGeolocation from './useGeolocation'
import LiveLocation from '../interfaces/live-location.interface'
import useUser from './useUser'

const socketServer = ref<Socket>()
const connected = ref<boolean>(false)

export default () => {
  const { startTracking } = useGeolocation()
  const { user } = useUser()

  const trackOrder = (orderId: string) => {
    if (!connected) connectToServer()

    socketServer.value?.on(`order:track/${orderId}`, (location: LiveLocation) => {
      console.log('location', location)
    })
  }

  const trackDriver = (orderId: string) => {
    startTracking((p: GeolocationPosition) => {
      const payload: LiveLocation = {
        driverId: user.value!.uid,
        driverName: user.value!.displayName || 'The Driver',
        geolocation: {
          type: 'Point',
          coordinates: [p.coords.longitude, p.coords.latitude],
        },
      }

      socketServer.value!.emit(`order:track/${orderId}`, payload)
    })
  }

  const _connect = () => {
    console.log('Connected')
    connected.value = true
  }

  const _disconnect = () => {
    console.log('Disconnected')
    connected.value = false
  }

  const _error = (error: any) => {
    console.error(error)
  }

  const disconnectFromServer = () => {
    if (socketServer.value) {
      socketServer.value.disconnect()
      socketServer.value = undefined
    }
  }

  const connectToServer = () => {
    if (socketServer.value) {
      return
    }

    socketServer.value = io('ws://[::1]:3006', {
      transports: ['websocket'], // polling is default, can give cors errors
    })

    socketServer.value.on('connect', _connect)
    socketServer.value.on('disconnect', _disconnect)
    socketServer.value.on('error', _error)
  }

  return {
    connected,

    trackOrder,
    trackDriver,
    connectToServer,
    disconnectFromServer,
  }
}
