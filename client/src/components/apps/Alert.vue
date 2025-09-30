<script setup lang="ts">
import { ref } from 'vue';

const alerts = ref<any[]>([]);

const showAlert = (message: string, type: 'success' | 'warning' | 'error' = 'success', timeout: number = 5000) => {
  const id = Date.now();
  alerts.value.push({ id, message, type });
  setTimeout(() => {
    alerts.value = alerts.value.filter((alert) => alert.id !== id);
  }, timeout);
};

defineExpose({ showAlert });
</script>

<template>
  <div class="app-alert-container">
    <transition-group name="fade">
      <v-alert v-for="alert in alerts" :key="alert.id" :type="alert.type" class="alert-msg" density="compact" rounded="sm" variant="flat" closable>
        {{ alert.message }}
      </v-alert>
    </transition-group>
  </div>
</template>

<style scoped>
.alert-msg {
  margin-bottom: 1rem;
  border-radius: 1rem;
  display: flex;
  font-size: 0.9rem;
}
.app-alert-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%); /* Desliza para a direita ao sumir */
}
</style>
