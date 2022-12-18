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

  const loadUser = (): Promise<Ref<User | null>> =>
    new Promise((resolve) => {
      const { onResult } = useQuery(GET_SELF_USER)
      onResult((data) => {
        setUser({ ...firebaseUser.value, ...data.data.self }) // merge firebase user with db user
        resolve(user)
      })
    })

  return {
    user,
    loadUser,
    Role,
  }
}
