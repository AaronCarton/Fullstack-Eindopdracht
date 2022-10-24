<template>
  <div class="w-full p-5">
    <h2 class="text-xl font-bold">Account Info</h2>
    <div>
      <div class="my-6 flex flex-col space-y-6">
        <div>
          <label
            for="first_name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >Name</label
          >
          <input
            type="text"
            id="first_name"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            :value="user?.displayName"
            required
          />
        </div>
        <div>
          <label
            for="first_name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >Email</label
          >
          <input
            type="text"
            id="first_name"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            :value="user?.email"
            required
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useUser from '../../composables/useUser'
export default {
  setup() {
    const { user } = useUser()

    return {
      user,
    }
  },
}
</script>
