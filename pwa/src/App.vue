<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { provide } from '@vue/runtime-core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import useFirebase from './composables/useFirebase'
import useGraphQL from './composables/useGraphQL'
import useUser from './composables/useUser'
import useAuthentication from './composables/useAuthentication'

export default {
  setup() {
    const { user } = useAuthentication()
    const { apolloClient } = useGraphQL()
    const { loadUser } = useUser()

    provide(DefaultApolloClient, apolloClient)
    if (user.value) loadUser()

    return {}
  },
}
</script>
