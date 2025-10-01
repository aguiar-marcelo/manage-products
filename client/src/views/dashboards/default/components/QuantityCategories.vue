<script setup lang="ts">
const props = defineProps({
  value: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  }
});
</script>

<template>
  <v-card elevation="0" class="bg-primary overflow-hidden bubble-shape bubble-primary-shape">
    <v-card-text>
      <div class="d-flex align-start mb-6">
        <v-btn icon rounded="sm" color="darkprimary" variant="flat">
          <TagIcon stroke-width="1.5" width="20" />
        </v-btn>
      </div>
      <h2 class="text-h1 font-weight-medium">
        {{ props.value }}
      </h2>
      <span class="text-subtitle-1 text-medium-emphasis text-white">{{ props.label }}</span>
    </v-card-text>
  </v-card>
</template>
