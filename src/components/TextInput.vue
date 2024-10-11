<template>
  <div class="mb-6">
    <label for="id" class="block text-gray-700 font-semibold mb-2">
      {{ label }}
    </label>

    <input
      :type="type"
      :id="id"
      :name="name"
      v-model="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="validateField"
      :placeholder="placeholder"
      :class="[
        'peer shadow-md border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight transition duration-300 ease-in-out focus:outline-none',
        error
          ? 'border-red-600 bg-red-50 placeholder-red-400'
          : 'border-gray-300 bg-white placeholder-gray-400',
        'focus:ring-2 focus:ring-blue-500',
      ]"
      ref="inputRef"
    />
  </div>
</template>

<script>
    import { validate } from 'vee-validate';
import ErrorMessage from './ErrorMessage.vue';

    export default {
        props: {
            modelValue: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                required: true
            },
            type: {
                type: String,
                default: 'email'
            },
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                default: ''
            },
            error: {
                type: String,
                default: ''
            },
            helpText: {
                type: String,
                default: ''
            },
            autoFocus: {
                type: Boolean,
                default: false
            },
            components: {
                ErrorMessage,
            },
            mounted(){
                if(this.autoFocus && this.error){
                    this.$refs.input.focus();
                }

            },
            methods: {
                this.$emit('validate', this.id);
            },
        },
    };
</script>

<style>
input:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3);
    border-color: #3b82f6;
}

input{
    transition: border-color 0.3s, box-shadow 0.3s, background-color: 0.3s;
}

.error-message {
    animation: fadeIn 0.4s ease-in-out;
}

@media (max-width: 640px){
    .mb-6{
        margin-bottom: 1.5rem;
    }
}

@keyframes fadeIn {
    0%{
        opacity: 0;
        transform: translateY(-5px);
    }
    100%{
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
