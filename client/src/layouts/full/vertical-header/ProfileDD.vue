<script setup lang="ts">
import { ref } from 'vue';
import { SettingsIcon, LogoutIcon, UserIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>
<template>
  <div class="pa-4">
    <h4 class="mb-n1"><span class="font-weight-regular">{{ authStore.user?.first_name }} {{ authStore.user?.last_name }}</span></h4>
    <span class="text-subtitle-2 text-medium-emphasis">{{ authStore.user?.email }}</span>

    <v-divider class="mt-2"></v-divider>
    <perfect-scrollbar>
      <v-list>
        <v-list-item @click="authStore.logout()" color="secondary" rounded="md">
          <template v-slot:prepend>
            <SettingsIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> Account Settings</v-list-item-title>
        </v-list-item>

        <v-list-item @click="authStore.logout()" color="secondary" rounded="md">
          <template v-slot:prepend>
            <LogoutIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </div>
</template>
