<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      :id="id"
      :name="name"
      :checked="modelValue"
      @change="handleChange"
      class="hidden peer"
    />
    <label :for="id" class="flex items-center cursor-pointer">
      <span
        class="w-5 h-5 flex items-center justify-center border-2 border-gray-300 rounded-md mr-2 transition duration-300 ease-in-out peer-checked:bg-blue-500 peer-checked:border-transparent peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-200"
      >
        <svg
          v-if="modelValue"
          class="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12l5 5L20 7"
          />
        </svg>
      </span>
      <span class="text-gray-700">{{ label }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleChange(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit("update:modelValue", target.checked);
    },
  },
});
</script>

<style scoped>
/* Checkbox styles */
input:checked + label span {
  border-color: transparent;
}

input:checked + label span svg {
  display: block; /* Show checkmark when checked */
}

input:not(:checked) + label span svg {
  display: none; /* Hide checkmark when unchecked */
}

label {
  transition: color 0.2s ease-in-out;
}

label:hover {
  color: #3b82f6; /* Change color on hover */
}

label:focus-within {
  outline: 2px solid #3b82f6; /* Focus outline */
}
</style>
