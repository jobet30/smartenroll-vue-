<template>
  <p class="text-red-500 text-sm mt-1">{{ message }}</p>
</template>

<script lang="ts">
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
/* Error Container */
.error-container {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: rgba(252, 165, 165, 0.2); /*Soft red Background*/
  border-left: 4px solid #f87171;
  border-radius: 0.375rem;
  transition: all 0.3s ease-in-out;
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeIn 0.4s;
}

.error-icon {
  width: 24px;
  height: 24px;
  margin-right: 0.75rem;
  color: #f87171;
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
    padding: 0, 5rem;
  }

  .error-icon {
    width: 20px;
    height: 20px;
  }
}
</style>
