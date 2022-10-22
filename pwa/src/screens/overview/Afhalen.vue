<template>
  Afhalen - UID: {{ user?.uid || 'null' }} - City: {{ user?.city || 'null' }}
</template>

<script>
import useUser from '../../composables/useUser'
export default {
  setup() {
    const { user } = useUser()
    return { user }
  },
}
</script>
