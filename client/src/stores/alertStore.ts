import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  actions: {
    success(message: string) {
      this.triggerAlert({ message, type: 'success' });
    },
    warning(message: string) {
      this.triggerAlert({ message, type: 'warning' });
    },
    error(message: string) {
      this.triggerAlert({ message, type: 'error' });
    },
    triggerAlert: (alert: { message: string, type: 'success' | 'warning' | 'error' }) => {}
  }
});