<script setup lang="ts">
// import CheckIcon from "@/assets/icons/check.svg"

const props = defineProps<{
  id?: string;
  value: number | string;
}>();

const modelValue = defineModel<(number | string)[]>();

function updateValue(event: Event) {
  const target = event.target;

  // Проверяем, что target существует и это input (чекбокс)
  if (!(target instanceof HTMLInputElement)) return;

  const currentValue = props.value;
  const newValue = [...(modelValue.value || [])]; // Создаём копию массива

  if (target.checked) {
    // Добавляем значение, если ещё не добавлено
    if (!newValue.includes(currentValue)) {
      newValue.push(currentValue);
    }
  } else {
    // Удаляем значение
    const index = newValue.indexOf(currentValue);
    if (index > -1) {
      newValue.splice(index, 1);
    }
  }

  // Присваиваем новое значение (триггерим реактивность)
  modelValue.value = newValue;
}
</script>
<template>
  <label class="app-checkbox">
    <input type="checkbox" :checked="modelValue?.includes(value)" @change="updateValue" />
    <div>
      <!-- <CheckIcon /> -->
    </div>
    <span>
      <slot />
    </span>
  </label>
</template>

<style lang="scss">
.app-checkbox {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  div {
    --size: 20px;
    width: var(--size);
    height: var(--size);
    flex: 0 0 var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: $transition;

    svg {
      transition: $transition;
      opacity: 0;

      path {
      }
    }
  }

  &:has(input:checked) {
    div {
      background-color: #392b30;

      svg {
        opacity: 1;
      }
    }
  }

  input {
    display: none;
  }
}
</style>
