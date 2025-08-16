<script setup lang="ts">
import type { IOption, IFormTextInput } from '~/types';
import FormInput from '~/components/form/FormInput.vue';

const options = ref<IOption[]>([
  {
    name: 'string',
    value: 'string',
  },
  {
    name: 'string1',
    value: 'string1',
  },
  {
    name: 'string2',
    value: 'string2',
  },
]);

const checkedOption = ref<IOption | null>(null);
const checkedOptions = ref<IOption[]>([]);

type FormDataType = {
  EMAIL: IFormTextInput;
  PASSWORD: IFormTextInput;
  PHONE: IFormTextInput;
};

const formData = ref<FormDataType>({
  EMAIL: {
    value: '',
    type: 'email',
    required: true,
  },
  PHONE: {
    value: '',
    type: 'phone',
    required: true,
  },
  PASSWORD: {
    value: '',
    type: 'password',
    required: true,
  },
});
const formDataRefs = ref<InstanceType<typeof FormInput>[]>([]);

const checkboxMultiple = ref<string[]>([]);
const checkbox = ref<boolean>(false);
const radio = ref<string>('');

function validate() {
  let errors: string[] = [];

  formDataRefs.value.forEach((item, index) => {
    item.validate() ? '' : errors.push(Object.keys(formData.value)[index] || '');
  });
  if (!errors.length) {
    console.log('success');
  } else {
    console.log(errors);
  }
}
</script>
<template>
  <main class="main">
    <div class="ui-page">
      <div class="ui-page__section">
        <div class="ui-page__title">Селекты</div>
        <ul class="ui-page__items">
          <li>
            <span style="height: 24px">
              {{ checkedOption?.name }}
            </span>
            <SelectSolo v-model="checkedOption" :options="options" />
          </li>

          <li>
            <ul style="height: 24px; display: flex; gap: 12px">
              <li v-for="item in checkedOptions" :key="item.value">
                {{ item.name }}
              </li>
            </ul>
            <SelectMultiple v-model="checkedOptions" :options="options" />
          </li>
        </ul>
      </div>
      <div class="ui-page__section">
        <div class="ui-page__title">Инпуты</div>
        <ul class="ui-page__items">
          <li v-for="key in Object.keys(formData)" :key="key">
            {{ key }}
            <FormInput
              ref="formDataRefs"
              v-model="formData[key as keyof FormDataType].value"
              :required="formData[key as keyof FormDataType].required"
              :type="formData[key as keyof FormDataType].type"
              :phone="formData[key as keyof FormDataType].type == 'phone'"
            />
          </li>
          <button @click="validate">validate</button>
        </ul>
      </div>
      <div class="ui-page__section">
        <div class="ui-page__title">Радио, Чекбоксы</div>
        <div style="display: flex; flex-direction: column; gap: 8px">
          Значение: {{ radio }}
          <ul class="ui-page__items">
            <li>
              <FormRadio v-model="radio" name="radioBtn" value="0">value 0</FormRadio>
            </li>
            <li>
              <FormRadio v-model="radio" name="radioBtn" value="1">value 1</FormRadio>
            </li>
            <li>
              <FormRadio v-model="radio" name="radioBtn" value="2">value 2</FormRadio>
            </li>
          </ul>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px">
          Значение: {{ checkbox }}
          <ul class="ui-page__items">
            <li>
              <FormCheckbox v-model="checkbox">check</FormCheckbox>
            </li>
          </ul>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px">
          Значение: {{ checkboxMultiple }}
          <ul class="ui-page__items">
            <li>
              <FormCheckboxMultiple v-model="checkboxMultiple" value="0">value 0</FormCheckboxMultiple>
            </li>
            <li>
              <FormCheckboxMultiple v-model="checkboxMultiple" value="1">value 1</FormCheckboxMultiple>
            </li>
            <li>
              <FormCheckboxMultiple v-model="checkboxMultiple" value="2">value 2</FormCheckboxMultiple>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.ui-page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 32px 50px;
  background-color: #424242;
  color: white;
  min-height: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  // .ui-page__section

  &__section {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  // .ui-page__title

  &__title {
    font-size: 50px;
    font-weight: 500;
  }

  // .ui-page__items

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    & > li {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
}
</style>
