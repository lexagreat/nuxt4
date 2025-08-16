<script setup lang="ts">
import type { IOption } from '~/types';

// import ArrowDownIcon from '@/assets/icons/arrow-down-for-select.svg';

const props = defineProps<{
  options: IOption[];
  placeholder?: string;
}>();

const modelValue = defineModel<IOption[]>();

const localModel = computed<IOption[]>({
  get() {
    return modelValue.value || [];
  },
  set(newValue) {
    modelValue.value = newValue;
  },
});

function toggleOptions(event: Event) {
  if (!props.options.length) return;
  event.target.closest('.v-select').classList.toggle('open');
}

const output = computed(() => {
  if (localModel.value.length) {
    return localModel.value.map((item) => item.name).join(', ');
  } else {
    return props.placeholder;
  }
});

function updateValue(event: Event) {
  if (event.target.value == 0) {
    localModel.value = props.options.length ? [props.options[0]] : [];
    return;
  } else {
    let i = localModel.value.findIndex((item) => item.value === 0);
    if (i > -1) {
      localModel.value.splice(i, 1);
    }
  }
  let obj = props.options.find((item) => item.value == event.target.value);
  if (event.target.checked) {
    // Добавляем значение, если чекбокс выбран
    localModel.value.push(obj);
  } else {
    // Удаляем значение, если чекбокс снят
    const index = localModel.value.indexOf(obj);
    if (index > -1) {
      localModel.value.splice(index, 1);
    }
  }
}
</script>
<template>
  <div class="v-select select-multiple">
    <div class="v-select__backdrop" @click="toggleOptions"></div>
    <div class="v-select__wrapper" @click="toggleOptions">
      <span class="v-select__input" :class="{ placeholder: !localModel.length }">
        {{ output }}
      </span>
      <div class="v-select__icon">
        <!-- <ArrowDownIcon /> -->
      </div>
    </div>
    <div class="v-select__content" ref="content">
      <ul class="v-select__list">
        <template v-for="(option, index) in options" :key="index">
          <li
            class="v-select__item"
            v-if="String(option?.name)?.length"
            :class="{ active: localModel.some((item) => item.name == option.name) }"
          >
            <label>
              <input
                type="checkbox"
                :value="option.value"
                style="display: none"
                :checked="localModel.some((item) => item.value == option.value)"
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

<style lang="scss" scoped>
label {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &::after {
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    flex: 0 0 14px;
    // background: url(@/assets/img/icons/check.svg) center / contain no-repeat;
    transition: 0.3s;
    opacity: 0;
  }

  &:has(input:checked) {
    &::after {
      opacity: 1;
    }
  }
}

.v-select__input {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}
</style>
