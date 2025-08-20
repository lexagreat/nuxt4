<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  icon: string;
  size?: number;
}>();

const iconName = computed(() => '#' + props.icon);
</script>

<template>
  <svg :class="['ui-icon', icon]" :width="size" :height="size">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style lang="scss" scoped>
.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
