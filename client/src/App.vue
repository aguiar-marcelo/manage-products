<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useAlertStore } from '@/stores/alertStore';

import Alert from '@/components/apps/Alert.vue';

const alertComponent = ref<InstanceType<typeof Alert> | null>(null);

const alertStore = useAlertStore();

onMounted(() => {
  alertStore.triggerAlert = (alert) => {
    if (alertComponent.value) {
      alertComponent.value.showAlert(alert.message, alert.type);
    }
  };
});
</script>

<template>
  <router-view />
  <Alert ref="alertComponent" />
</template>