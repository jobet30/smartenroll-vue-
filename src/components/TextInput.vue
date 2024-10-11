<template>
  <div class="mb-6">
    <label :for="id" class="block text-gray-700 font-semibold mb-2">{{
      label
    }}</label>
    <input
      :id="id"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :class="[
        'shadow-md border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight transition duration-300 ease-in-out focus:outline-none',
        error
          ? 'border-red-600 bg-red-50 placeholder-red-400'
          : 'border-gray-300 bg-white placeholder-gray-400',
        'focus:ring-2 focus:ring-blue-500',
      ]"
      v-model="inputValue"
      @input="handleInput"
      @blur="validateField"
    />
    <ErrorMessage v-if="error" :message="error" />
    <p v-if="helpText" class="text-gray-500 text-sm mt-1">{{ helpText }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ErrorMessage from "@/components/ErrorMessage.vue"; // Adjust the path if necessary
import type { PropType } from "vue"; // Separate import for PropType

export default defineComponent({
  components: {
    ErrorMessage,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
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
    type: {
      type: String as PropType<"text" | "email" | "password">,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    helpText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      inputValue: this.modelValue, // Create a local data property
    };
  },
  watch: {
    modelValue(newValue) {
      this.inputValue = newValue; // Update local property if the prop changes
    },
  },
  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement;
      this.inputValue = target.value; // Update local property
      this.$emit("update:modelValue", this.inputValue); // Emit the updated value
    },
    validateField() {
      this.$emit("validate", this.id); // Emit a validation event with the input ID
    },
  },
});
</script>

<style scoped>
input:focus {
  outline: none;
  box-shadow:
    0 0 5px rgba(59, 130, 246, 0.5),
    0 0 10px rgba(59, 130, 246, 0.3);
}
</style>
