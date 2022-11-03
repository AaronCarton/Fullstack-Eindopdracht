<template>
  <div class="flex gap-4 text-center">
    <span v-for="name in names" :key="name">
      <input
        class="peer hidden"
        @click="handleClick"
        type="radio"
        :name="group"
        :id="name"
        :value="name"
        :checked="value === name"
      />
      <label
        :for="name"
        class="rounded-lg border-2 border-neutral-500 py-1 px-4 text-lg font-semibold capitalize text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 peer-checked:border-red-700 peer-checked:bg-red-700 peer-checked:text-neutral-50 peer-checked:hover:border-red-600 peer-checked:hover:bg-red-600"
      >
        {{ name }}
      </label>
    </span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    // group name
    group: {
      type: String,
      required: true,
    },
    // the button names
    names: {
      type: Array as () => string[],
      required: true,
    },
    // the current value
    value: {
      type: String,
      required: true,
    },
    // button click handler
    onClick: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { onClick, value } = props

    console.log('value', value)

    const handleClick = (e: Event) => {
      const target = e.target as HTMLInputElement

      onClick(target.value)
    }

    return { handleClick }
  },
}
</script>

<style scoped></style>
