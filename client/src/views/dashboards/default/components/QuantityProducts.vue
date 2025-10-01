<script setup lang="ts">
import { shallowRef } from 'vue';
import { ShoppingCartIcon, CircleArrowUpRightIcon } from 'vue-tabler-icons';

const props = defineProps({
  value: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <v-card elevation="0" class="bg-secondary overflow-hidden bubble-shape bubble-secondary-shape">
    <v-card-text>
      <div class="d-flex align-start mb-6">
        <v-btn icon rounded="sm" color="darksecondary" variant="flat">
          <ShoppingCartIcon stroke-width="1.5" width="20" />
        </v-btn>
      </div>
      <h2 class="text-h1 font-weight-medium">
        {{ props.value }} <a href="/products"><CircleArrowUpRightIcon stroke-width="1.5" width="28" class="text-white" /> </a>
      </h2>
      <span class="text-subtitle-1 text-medium-emphasis text-white">{{ props.label }}</span>
    </v-card-text>
  </v-card>
</template>