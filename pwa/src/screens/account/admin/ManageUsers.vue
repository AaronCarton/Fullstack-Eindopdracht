<template>
  <div class="w-full p-5">
    <h2 class="mb-4 text-xl font-medium">Manage Users</h2>
    <div>
      <table class="text-md w-full border-neutral-700 text-left text-neutral-800">
        <thead class="text-sm font-medium uppercase text-neutral-600">
          <tr>
            <th scope="col" class="py-3 px-6">Name</th>
            <th scope="col" class="py-3 px-6">Role</th>
            <th scope="col" class="py-3 px-6">Created</th>
            <th scope="col" class="py-3 px-6">UID</th>
          </tr>
        </thead>
        <tbody class="font-medium">
          <template v-if="users.length > 0">
            <tr
              v-for="user in users"
              :key="user.uid"
              class="border-b-2 border-neutral-300 last:border-b-0"
            >
              <td class="py-4 px-6">{{ user.displayName || 'Ooga' }}</td>
              <td class="py-4 px-6">
                <RoleToggle :user="user" />
              </td>
              <td class="py-4 px-6">
                {{ new Date(user.createdAt).toLocaleDateString() }}
              </td>
              <td class="py-4 px-6">
                <p class="font-mono">{{ user.uid }}</p>
              </td>
              <td class="flex items-center justify-center py-4 px-6">
                <button
                  class="w-13 flex items-center justify-center rounded-lg border-4 bg-red-600 py-2 px-3 text-2xl font-extrabold text-neutral-50 outline-none hover:opacity-80 focus-visible:ring"
                  :disabled="loading"
                >
                  <span v-if="!loading"><Trash class="h-5 w-5" /></span>
                  <div v-else>
                    <Loader2 class="animate-spin" />
                  </div>
                </button>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr class="text-center font-bold uppercase text-neutral-400">
              <td class="px-6 pb-9 pt-11" colspan="5">No users found</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { computed, watch } from 'vue-demi'
import { Trash, Loader2 } from 'lucide-vue-next'

import RoleToggle from './components/RoleToggle.vue'
import User from '../../../interfaces/user.interface'
import { GET_ALL_USERS } from '../../../graphql/query.users'

export default {
  components: {
    Trash,
    Loader2,
    RoleToggle,
  },
  setup() {
    const { result, loading, error } = useQuery(GET_ALL_USERS)

    const users = computed(() => (result.value?.users as User[]) ?? [])
    watch(users, (val) => console.log(val))

    return {
      users,
      result,
      loading,
      error,
    }
  },
}
</script>
