<template>
  <div class="flex">
    <button
      :disabled="currentRole <= 0 || user.uid === currUser.uid"
      @click="currentRole--"
      :class="`${getRoleColor()} rounded-l-xl px-2 text-gray-100 disabled:cursor-not-allowed disabled:bg-opacity-50`"
    >
      &lt
    </button>
    <a
      :class="`${getRoleColor()} cursor-default border-x-2 px-2 font-medium capitalize text-gray-100`"
    >
      {{ RoleList[currentRole].toLowerCase() }}
    </a>
    <button
      :disabled="currentRole >= 2 || user.uid === currUser.uid"
      @click="currentRole++"
      :class="`${getRoleColor()} rounded-r-xl px-2 text-gray-100  disabled:cursor-not-allowed disabled:bg-opacity-50`"
    >
      >
    </button>
  </div>
</template>

<script lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { ref, watch } from 'vue'

import User from '../../../../interfaces/user.interface'
import { UPDATE_USER_ROLE } from '../../../../graphql/mutation.user'
import { useToast } from 'vue-toastification'
import useUser from '../../../../composables/useUser'

export default {
  props: {
    user: {
      type: Object as () => User,
      required: true,
    },
  },
  setup({ user }) {
    enum RoleList {
      USER,
      DRIVER,
      ADMIN,
    }
    const currentRole = ref(RoleList[user.role])
    const toast = useToast()
    const { user: currUser, loadUser } = useUser()

    watch(currentRole, (newRole, oldRole) => {
      const { mutate, onDone, onError } = useMutation(UPDATE_USER_ROLE, {
        variables: {
          uid: user.uid,
          role: RoleList[newRole],
        },
      })
      mutate()
      onError((error) => {
        console.log(error)
        toast.error(`Failed to update role, ${error.message}`)
      })
    })

    const getRoleColor = () => {
      switch (RoleList[currentRole.value]) {
        case 'ADMIN':
          return 'bg-amber-600 active:bg-amber-700'
        case 'DRIVER':
          return 'bg-cyan-600 active:bg-cyan-700'
        default:
          return 'bg-gray-500 active:bg-gray-600'
      }
    }

    return {
      currUser,
      currentRole,
      RoleList,
      getRoleColor,
    }
  },
}
</script>
