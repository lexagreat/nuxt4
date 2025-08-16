<script setup lang="ts">
// import CheckIcon from "@/assets/icons/check.svg"

const props = defineProps<{
  id?: string;
}>();

const modelValue = defineModel<boolean>();
</script>

<template>
  <label class="app-checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="($event) => {
        if ($event.target) modelValue = ($event.target as HTMLInputElement).checked
      }"
    />
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
