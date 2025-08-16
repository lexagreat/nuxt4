<script setup lang="ts">
const props = defineProps<{
  name: string;
  value: string | number;
}>();

const modelValue = defineModel<string | number>(); // Автоматически обрабатывает props и emit
</script>
<template>
  <label class="app-radio">
    <input
      :name="name"
      type="radio"
      :value="value"
      :checked="modelValue == value"
      @change="($event) => {
        if ($event.target) modelValue = ($event.target as HTMLInputElement).value
      }"
    />
    <div class="circle"></div>
    <span>
      <slot />
    </span>
  </label>
</template>

<style lang="scss">
.app-radio {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  //   @include body-xs-medium;

  .circle {
    --size: 20px;
    width: var(--size);
    height: var(--size);
    flex: 0 0 var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    //  border: 1px solid $border-dark-prim;
    transition: $transition;

    &::after {
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      flex: 0 0 16px;
      border-radius: 50%;
      // background-color: $text-dark-prim;
      opacity: 0;
      transition: $transition;
    }
  }

  &:has(input:checked) {
    .circle {
      // border-color: $text-dark-prim;

      &::after {
        opacity: 1;
      }
    }
  }

  input {
    display: none;
  }
}
</style>
