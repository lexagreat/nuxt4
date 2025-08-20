<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const iconsList = ref<{ [key: string]: string } | null>(null);

function getIconName(iconPath: string | number) {
  const regex = /\/([\w-]+)\.svg$/;
  const match = iconPath.toString().match(regex);
  return match ? match[1] : '';
}

async function getIcon() {
  try {
    iconsList.value = import.meta.glob('@/assets/icons/*.svg', {
      query: '?raw',
      import: 'default',
      eager: true,
    });
  } catch {
    console.error(`[ui-icons] Icon doesn't exist`);
  }
}

watchEffect(getIcon);
</script>

<template>
  <svg width="0" height="0">
    <symbol
      v-for="(icon, key) in iconsList"
      :id="getIconName(key)"
      :key="key"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      v-html="icon"
    />
  </svg>
</template>
