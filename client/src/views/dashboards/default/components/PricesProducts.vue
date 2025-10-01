<script setup lang="ts">
import { CalendarCancelIcon } from 'vue-tabler-icons';

const props = defineProps({
  productsPrice: {
    type: [String, Number],
    required: true
  },
  productsLabel: {
    type: String,
    required: true
  },
  productsExpiredPrice: {
    type: [String, Number],
    required: true
  },
  productsExpiredLabel: {
    type: String,
    required: true
  }
});
</script>

<template>
  <v-card elevation="0" class="bg-primary overflow-hidden bubble-shape-sm bubble-primary mb-6">
    <v-card-text class="pa-5">
      <div class="d-flex align-center ga-4">
        <v-btn color="darkprimary" icon rounded="sm" variant="flat">
          <BuildingStoreIcon stroke-width="1.5" width="25" />
        </v-btn>
        <div>
          <h4 class="text-h4 font-weight-medium">R$ {{props.productsPrice}}</h4>
          <span class="text-subtitle-2 text-medium-emphasis text-white">{{ props.productsLabel }}</span>
        </div>
      </div>
    </v-card-text>
  </v-card>

  <v-card elevation="0" class="bubble-shape-sm overflow-hidden bubble-error">
    <v-card-text class="pa-5">
      <div class="d-flex align-center ga-4">
        <v-btn color="error" icon rounded="sm" variant="tonal">
          <CalendarCancelIcon stroke-width="1.5" width="25" class="text-error" />
        </v-btn>
        <div>
          <h4 class="text-h4 font-weight-medium">R$ {{props.productsExpiredPrice}}</h4>
          <span class="text-subtitle-2 text-disabled font-weight-medium">{{ props.productsExpiredLabel }}</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
