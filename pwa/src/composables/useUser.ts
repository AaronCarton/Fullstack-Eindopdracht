import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import { Ref, ref } from 'vue'
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

  const setCustomUser = (u: User) => (user.value = u)

  const loadUser = (): Promise<Ref<User | null>> => {
    return new Promise((resolve, reject) => {
      console.log('dddd')

      const { onResult } = useQuery(GET_SELF_USER)
      onResult((result) => {
        const data = result.data.self

        setCustomUser({ ...data, ...firebaseUser.value }) // combine Firebase User with CustomUser
        console.log('dsds')

        resolve(user)
      })
    })
  }

  return {
    user,
    loadUser,
    Role,
  }
}
