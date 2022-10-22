import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import { Ref, ref, watch } from 'vue'
import { GET_SELF_USER } from '../graphql/query.user'

import User from '../interfaces/user.interface'
import useAuthentication from './useAuthentication'
import useGraphQL from './useGraphQL'

const user: Ref<User | null> = ref(null)

export default () => {
  const { user: firebaseUser } = useAuthentication()
  const { apolloClient } = useGraphQL()
  provideApolloClient(apolloClient)

  const setCustomUser = (u: User) => (user.value = u)

  const loadUser = () => {
    const { onResult } = useQuery(GET_SELF_USER)
    onResult((result) => {
      const data = result.data.findUser
      console.log('data', data)
      console.log('firebaseUser', firebaseUser.value)

      setCustomUser({ ...data, ...firebaseUser.value }) // combine Firebase User with CustomUser
    })
  }

  return {
    user,
    loadUser,
  }
}
