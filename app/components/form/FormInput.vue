<script setup lang="ts">
import { vMaska } from 'maska/vue';

const props = defineProps<{
  id?: string;
  label?: string;
  phone?: boolean;
  placeholder?: string;
  maxlength?: number;
  mask?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
}>();

const input = ref<HTMLInputElement | null>(null);
const modelValue = defineModel<string>();

const validated = ref<boolean>(false);

const filled = computed(() => {
  return !!modelValue.value && modelValue.value.length > 0;
});

const isValid = computed(() => {
  if (!props.required) return true;
  if (!modelValue.value?.length) return false;

  if (props.phone) {
    return modelValue.value.length > 13;
  }
  if (props.type == 'email') {
    return validEmail(modelValue.value);
  }
  if (props.type == 'password') {
    return modelValue.value.length > 3;
  }
  return true;
});

const debounceValidate = debounce(validate, 300);

function validate() {
  validated.value = true;

  if (isValid.value) {
    input.value?.classList.remove('error');
    return true;
  } else {
    input.value?.classList.add('error');
    return false;
  }
}

watch(modelValue, () => {
  if (!validated.value) return;
  debounceValidate();
});

onMounted(() => {
  if (modelValue.value && modelValue.value?.length > 0 && input.value) {
    input.value.classList.add('filled');
  }
});

defineExpose({
  validate,
});
</script>

<template>
  <div class="app-input" :class="{ filled: filled }" ref="input">
    <label v-if="label?.length" :for="id">{{ label }}</label>
    <input
      v-if="phone"
      :disabled="disabled"
      type="text"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="($event) => {
        if ($event.target) modelValue = ($event.target as HTMLInputElement).value
      }"
      v-maska="'+7 (###) ###-##-##'"
    />
    <input
      v-else-if="mask?.length"
      :disabled="disabled"
      type="text"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="($event) => {
        if ($event.target) modelValue = ($event.target as HTMLInputElement).value
      }"
      v-maska="mask"
    />
    <input
      v-else
      :disabled="disabled"
      :type="type == 'password' ? 'password' : 'text'"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      :maxlength="maxlength"
      @input="($event) => {
        if ($event.target) modelValue = ($event.target as HTMLInputElement).value
      }"
    />
  </div>
</template>

<style lang="scss">
.app-input {
  width: 100%;
  position: relative;
  &.error {
    input {
      border: 1px solid red !important;
    }
  }
  input {
    height: 40px;
    padding-left: 12px;
    width: 100%;
    background-color: white;
    border: 1px solid black;
    &::placeholder {
    }
  }

  label {
    height: 18px;
    position: absolute;
    left: 10px;
    top: 50%;
    white-space: nowrap;
    padding: 0 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    translate: 0 -50%;
    transition: $transition;
    pointer-events: none;
  }

  &.filled {
    label {
      top: 0;
    }
  }

  &:has(input:focus) label {
    top: 0;
  }
}
</style>
