<template>
  <div class="max-w-4xl p-5">
    <h2 class="text-xl font-bold">Account Info</h2>
    <div>
      <div class="my-6 flex flex-col space-y-6">
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label
              for="first_name"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >First name</label
            >
            <input
              type="text"
              id="first_name"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label
              for="last_name"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >Last name</label
            >
            <input
              type="text"
              id="last_name"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >Email</label
            >
            <input
              type="email"
              id="email"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="John@gmail.com"
              required
            />
          </div>
          <div>
            <label
              for="phone_number"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >Phone Number</label
            >
            <input
              type="tel"
              id="phone_number"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="123-456-7890"
              required
            />
          </div>
        </div>
        <div class="grid gap-6 md:grid-cols-4">
          <div class="col-span-2">
            <label
              for="street_address"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >Street Address</label
            >
            <input
              type="text"
              id="street_address"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="1234 Main St"
              required
            />
          </div>
          <div>
            <label
              for="house_number"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >House Number</label
            >
            <input
              type="text"
              id="house_number"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="14"
              required
            />
          </div>
          <div>
            <label
              for="postal_code"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >Postal Code</label
            >
            <input
              type="text"
              id="postal_code"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="8500"
              required
            />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-6">
        <button
          class="w-13 mt-6 flex items-center justify-center rounded-lg border-4 bg-red-600 py-2 px-3 text-2xl font-extrabold text-neutral-50 outline-none hover:opacity-80 focus-visible:ring"
          :disabled="loading"
        >
          <span v-if="!loading"><Trash class="h-5 w-5" /></span>
          <div v-else>
            <Loader2 class="animate-spin" />
          </div>
        </button>
        <button
          class="col-start-6 mt-6 flex w-full items-center justify-center rounded-md border-4 border-neutral-800 bg-neutral-800 py-2 px-3 text-xl font-extrabold text-neutral-50 outline-none ring-neutral-300 transition-all duration-300 ease-out hover:bg-transparent hover:text-neutral-800 focus-visible:ring"
          :disabled="loading"
        >
          <span v-if="!loading">Save</span>
          <div v-else>
            <Loader2 class="animate-spin" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useUser from '../../composables/useUser'
import { Trash } from 'lucide-vue-next'
import { ref } from 'vue'
export default {
  components: {
    Trash,
  },
  setup() {
    const { user } = useUser()
    const loading = ref(false)

    return {
      user,
      loading,
    }
  },
}
</script>
