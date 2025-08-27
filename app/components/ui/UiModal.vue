<template lang="">
  <div class="modal" :class="{ open: isOpen }" @click="detectWhere" @keydown="handleEscape">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { bodyLock, bodyUnlock } from '@/utils/bodyLocker';

const isOpen = defineModel<boolean>('isOpen', { required: true });

function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    isOpen.value = false;
  }
}

function detectWhere(e: MouseEvent) {
  if (!e.target.closest('.modal__content')) {
    isOpen.value = false;
  }
}

watch(isOpen, (value) => {
  value ? bodyLock() : bodyUnlock();
});

onMounted(() => {
  window.addEventListener('keydown', handleEscape);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape);
});
</script>
<style lang="scss">
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 110;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(15px);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
  transition: 0.5s;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 1024px) {
    height: 100vh;
  }
}

.modal__content {
  position: absolute;
  // width: 100px;
  // height: 100px;
  top: 50%;
  left: 50%;
  -webkit-transform: translateY(-50%) translateX(-50%) scale(0);
  -ms-transform: translateY(-50%) translateX(-50%) scale(0);
  transform: translateY(-50%) translateX(-50%) scale(0);
  border-radius: 8px;
  background: #f8f8f8;
  padding: 40px;
  opacity: 0;
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
  transition: 0.5s;

  @media (max-width: 1024px) {
    border-radius: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: unset !important;
  }
}

.modal__close {
  cursor: pointer;
}

.modal.open {
  opacity: 1;
  visibility: visible;
}

.modal.open .modal__content {
  -webkit-transform: translateY(-50%) translateX(-50%) scale(1);
  -ms-transform: translateY(-50%) translateX(-50%) scale(1);
  transform: translateY(-50%) translateX(-50%) scale(1);
  opacity: 1;
}
</style>
