<script setup lang="ts">
import type { IOption } from '~/types';
// import ArrowDownIcon from "@/assets/img/icons/arrow_down.svg"

const props = defineProps<{
  options: IOption[];
  placeholder?: string;
}>();

const output = ref(null);

const modelValue = defineModel<IOption | null>();

function toggleOptions(event: Event) {
  const target = event.target as HTMLElement;
  if (!props.options.length) return;
  target.closest('.v-select')?.classList.toggle('open');
}

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement;
  if (modelValue.value == target?.value) {
    modelValue.value = null;
  } else {
    modelValue.value = props.options.find((item) => item.value == target?.value);
  }
  target?.closest('.v-select')?.classList.remove('open');
}
</script>

<template>
  <div class="v-select select-solo" @click="toggleOptions">
    <div class="v-select__backdrop"></div>
    <div class="v-select__wrapper" :class="{ placeholder: placeholder }" ref="output">
      <span class="v-select__input">
        {{ modelValue?.name || placeholder }}
      </span>
      <div class="v-select__icon">
        <!-- <ArrowDownIcon /> -->
      </div>
    </div>
    <div class="v-select__content" ref="content">
      <ul class="v-select__list">
        <template v-for="(option, index) in options" :key="index">
          <li v-if="String(option?.name)?.length" class="v-select__item">
            <label>
              <input
                type="radio"
                :value="option.value"
                style="display: none"
                :checked="modelValue?.value == option.value"
                @change="updateValue"
              />
              {{ option.name }}
            </label>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.v-select {
  cursor: pointer;
  position: relative;
  position: relative;
  z-index: 10;
  max-width: fit-content;

  &.open {
    z-index: 11;

    .v-select__backdrop {
      display: block;
    }

    ul {
      opacity: 1;
      pointer-events: all;
    }

    .v-select__icon {
      transform: rotate(180deg);
    }
  }

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 200px;
    height: 44px;
    padding-left: 16px;
    border: 1px solid black;
    border-radius: 4px;
  }

  &__icon {
    transition: 0.3s;
  }

  &__backdrop {
    // background-color: red;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: none;
  }

  &__input {
    display: block;
    cursor: pointer;
  }

  &__list {
    position: absolute;
    left: 0;
    // top: 24px;
    top: 100%;
    translate: 0 4px;
    width: 100%;
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    transition: 0.3s;
    display: flex;
    flex-direction: column;

    background-color: white;
  }

  &__item {
    label {
      background-color: rgba($color: #a0feef, $alpha: 0.3);
      display: flex;
      align-items: center;
      padding-left: 12px;
      height: 44px;
      color: black;
      &:has(input:checked) {
        background-color: rgba($color: #a0feef, $alpha: 1);
      }
    }
    &:last-child {
      border: 0;
    }
  }
}
</style>
