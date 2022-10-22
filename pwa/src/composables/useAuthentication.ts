import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  User as FirebaseUser,
  UserCredential,
} from 'firebase/auth'
import { ref, Ref } from 'vue'
import useFirebase from './useFirebase'
import User from '../interfaces/user.interface'
import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import { CREATE_NEW_USER } from '../graphql/mutation.user'
import { GET_SELF_USER } from '../graphql/query.user'
import useGraphQL from './useGraphQL'

const user: Ref<User | null> = ref(null)

export default () => {
  const { auth } = useFirebase()
  const { apolloClient } = useGraphQL()
  provideApolloClient(apolloClient)

  const setUser = (u: User | null) => (user.value = u)

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<Ref<User | null>> => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((u: UserCredential) => {
          updateProfile(u.user, {
            displayName: name,
          })
            .then(() => {
              const { onResult } = useQuery(CREATE_NEW_USER, { uid: u.user.uid })
              onResult((result) => {
                setUser({ ...u.user, ...result.data.createUser } as User) // combine Firebase User with CustomUser
                resolve(user)
              })
            })
            .catch((error) => {
              reject(error)
            })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const login = (email: string, password: string): Promise<Ref<User | null>> => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((u: UserCredential) => {
          const { onResult } = useQuery(GET_SELF_USER, { uid: u.user.uid })
          onResult((result) => {
            setUser({ ...u.user, ...result.data.findUser } as User) // combine Firebase User with CustomUser
            resolve(user)
          })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const logout = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      auth
        .signOut()
        .then(() => {
          setUser(null)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const forgotPassword = (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then(() => resolve())
        .catch((error) => reject(error))
    })
  }

  const restoreUser = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((u: FirebaseUser | null) => {
        if (u) {
          const { onResult } = useQuery(GET_SELF_USER, { uid: u.uid })
          onResult((result) => {
            setUser({ ...u, ...result.data.findUser } as User) // combine Firebase User with CustomUser
            resolve()
          })
        } else {
          resolve()
        }
      })
    })
  }

  return {
    user,

    register,
    login,
    logout,
    setUser,
    forgotPassword,
    restoreUser,
  }
}
