<template>
  <div class="error-container">
    <span class="error-icon">
      <!-- SVG Warning Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M4.293 4.293A1 1 0 005 4h14a1 1 0 00.707-1.707l-15 15A1 1 0 004 18h14a1 1 0 00.707-1.707l-15-15z"
        />
      </svg>
    </span>
    <p class="error-message">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorMessage",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.error-container {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: rgba(252, 165, 165, 0.2); /* Soft red Background */
  border-left: 4px solid #f87171; /* Border color */
  border-radius: 0.375rem; /* Rounded corners */
  transition: all 0.3s ease-in-out;
  opacity: 1; /* Ensure it's visible by default */
  animation: fadeIn 0.4s; /* Animation when the component appears */
}

.error-icon {
  width: 24px;
  height: 24px;
  margin-right: 0.75rem; /* Space between icon and message */
  color: #f87171; /* Icon color */
}

.error-message {
  color: #dc2626; /* Bright red text */
  font-size: 0.875rem; /* Slightly smaller font */
  font-weight: 600; /* Semi-bold text */
  letter-spacing: 0.025em; /* Slightly spaced letters for readability */
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .error-message {
    font-size: 0.75rem; /* Slightly smaller font */
    letter-spacing: 0.015em; /* Slightly spaced letters for readability */
  }

  .error-container {
    padding: 0.5rem; /* Adjust padding for smaller screens */
  }

  .error-icon {
    width: 20px;
    height: 20px; /* Smaller icon for smaller screens */
  }
}
</style>
