<template>
  <div class="inline-flex justify-items-center rounded-2xl text-center">
    <span v-for="name in names" :key="name" class="group">
      <input
        class="peer hidden"
        @click="handleClick"
        type="radio"
        :name="group"
        :id="name"
        :value="name"
      />
      <label
        :for="name"
        class="bg-red-700 px-2.5 py-1 font-medium text-neutral-50 hover:bg-red-800 group-first:rounded-l-2xl group-last:last:rounded-r-2xl peer-checked:bg-red-600"
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
    // button click handler
    onClick: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { onClick } = props

    const handleClick = (e: Event) => {
      const target = e.target as HTMLInputElement

      onClick(target.value)
    }

    return { handleClick }
  },
}
</script>

<style scoped></style>
