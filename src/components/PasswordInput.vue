<template>
  <div class="mb-6">
    <label :for="id" class="block text-gray-800 font-semibold mb-2">{{
      label
    }}</label>

    <div class="relative">
      <input
        :type="showPassword ? 'text' : 'password'"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :class="[
          'peer shadow-md border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight transition-all duration-300 ease-in-out focus:outline-none',
          error
            ? 'border-red-600 bg-red-50 placeholder-red-400'
            : 'border-gray-300 bg-white placeholder-gray-400',
          'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        ]"
        v-model="inputValue"
        @input="handleInput"
        @blur="validateField"
        ref="inputRef"
      />

      <button
        type="button"
        @click="togglePassword"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 transition duration-200 ease-in-out hover:text-gray-800 focus:outline-none"
      >
        <svg
          v-if="showPassword"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19.5c-3.794 0-7-2.206-7-5 0-.345.036-.682.104-1.007M21 21l-3-3m0 0L9 9m3-5.5a7 7 0 0110.485 6.143M3 3l18 18"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm1 0a4 4 0 11-8 0 4 4 0 018 0zm9 0a12.042 12.042 0 00-5.5-7.5m1 14a12.042 12.042 0 01-5.5-7.5"
          />
        </svg>
      </button>
    </div>

    <div v-if="strength" class="mt-2">
      <div class="text-sm font-medium" :class="strengthColor">
        {{ strengthText }}
      </div>
      <div class="h-2 mt-1 bg-gray-300 rounded">
        <div
          :class="['h-full rounded', strengthBarColor]"
          :style="{ width: strengthPercentage }"
        ></div>
      </div>
    </div>

    <ErrorMessage v-if="error" :message="error" />
    <p v-if="helpText" class="text-gray-500 text-sm mt-1">{{ helpText }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

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
    placeholder: {
      type: String,
      default: "Enter your password",
    },
    helpText: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const showPassword = ref(false);
    const inputValue = ref(props.modelValue);
    const strength = ref("");

    const strengthText = computed(() => {
      switch (strength.value) {
        case "weak":
          return "Weak";
        case "medium":
          return "Medium";
        case "strong":
          return "Strong";
        default:
          return "";
      }
    });

    const strengthColor = computed(() => {
      switch (strength.value) {
        case "weak":
          return "text-red-600";
        case "medium":
          return "text-yellow-600";
        case "strong":
          return "text-green-600";
        default:
          return "";
      }
    });

    const strengthBarColor = computed(() => {
      switch (strength.value) {
        case "weak":
          return "bg-red-600";
        case "medium":
          return "bg-yellow-600";
        case "strong":
          return "bg-green-600";
        default:
          return "";
      }
    });

    const strengthPercentage = computed(() => {
      switch (strength.value) {
        case "weak":
          return "33%";
        case "medium":
          return "66%";
        case "strong":
          return "100%";
        default:
          return "0%";
      }
    });

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const validateField = () => {
      // Emit validation event (optional)
    };

    const sanitizeInput = (input: string): string => {
      return input.replace(
        /[^a-zA-Z0-9!@#$%^&*()_+~`=\-{}|[\]\\:";'<>?,./]/g,
        "",
      ); // Corrected regex
    };

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const sanitizedInput = sanitizeInput(target.value);
      inputValue.value = sanitizedInput;
      validatePassword();
    };

    const validatePassword = () => {
      const password = inputValue.value;
      if (password.length < 6) {
        strength.value = "weak";
      } else if (password.length < 10) {
        strength.value = "medium";
      } else {
        strength.value = "strong";
      }
      validateField();
    };

    return {
      showPassword,
      inputValue,
      strength,
      strengthText,
      strengthColor,
      strengthBarColor,
      strengthPercentage,
      togglePassword,
      handleInput,
      validateField,
    };
  },
});
</script>

<style scoped>
input:focus {
  outline: none;
  box-shadow:
    0 0 5px rgba(59, 130, 246, 0.5),
    0 0 10px rgba(59, 130, 246, 0.3);
  border-color: #3b82f6;
}

input {
  transition:
    border-color 0.3s,
    box-shadow 0.3s,
    background-color 0.3s;
}

.strength-bar {
  transition: width 0.3s ease-in-out;
}
</style>
