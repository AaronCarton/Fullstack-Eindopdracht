import { provideApolloClient, useLazyQuery, useQuery } from '@vue/apollo-composable'
import { Ref, ref, watch } from 'vue'
import { GET_SELF_USER } from '../graphql/query.user'
import { Role } from '../interfaces/user.interface'

import User from '../interfaces/user.interface'
import useAuthentication from './useAuthentication'
import useGraphQL from './useGraphQL'

const user: Ref<User | null> = ref(null)

export default () => {
  const { user: firebaseUser } = useAuthentication()
  const { apolloClient } = useGraphQL()
  provideApolloClient(apolloClient)

  const setUser = (u: User) => (user.value = u)

  const { result, load, document } = useLazyQuery(GET_SELF_USER)
  const loadUser = () => {
    load(document.value)
  }

  watch(result, ({ self }) => {
    console.log('watch result', self)

    if (self) setUser({ ...self, ...firebaseUser.value })
    console.log('db user', user.value)
    console.log('firebase user', firebaseUser.value)
  })

  return {
    user,
    loadUser,
    Role,
  }
}
