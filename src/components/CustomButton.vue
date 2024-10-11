<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="isLoading || disabled"
    @click="handleClick"
    class="relative inline-flex items-center justify-center rounded-lg text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50"
  >
    <span
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
        ></path>
      </svg>
    </span>

    <span v-if="icon" class="mr-2">
      <slot name="icon">{{ icon }}</slot>
    </span>

    <span>{{ label }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue"; // Type-only import for PropType

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<"button" | "submit" | "reset">,
      default: "button",
    },
    color: {
      type: String as PropType<"blue" | "green" | "red">,
      default: "blue",
    },
    size: {
      type: String as PropType<"small" | "medium" | "large">,
      default: "medium",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  computed: {
    buttonClasses() {
      const colorClasses = {
        blue: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-200",
        green: "bg-green-500 hover:bg-green-600 focus:ring-green-200",
        red: "bg-red-500 hover:bg-red-600 focus:ring-red-200",
      };

      const sizeClasses = {
        small: "px-3 py-1 text-sm",
        medium: "px-4 py-2",
        large: "px-5 py-3 text-lg",
      };

      return `${colorClasses[this.color]} ${sizeClasses[this.size]} ${
        this.disabled ? "opacity-50 cursor-not-allowed" : ""
      }`;
    },
  },
  methods: {
    handleClick() {
      if (!this.disabled && !this.isLoading) {
        this.$emit("click");
      }
    },
  },
});
</script>

<style scoped>
button {
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
}

button:focus {
  outline: none;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

button:active:not(:disabled) {
  transform: translateY(1px);
}

button:disabled {
  cursor: not-allowed;
  background-color: #d1d5db; /* Gray color for disabled state */
}

button:not(:disabled):hover {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

/* Loading spinner styles */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
