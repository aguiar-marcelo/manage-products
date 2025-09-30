<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Product } from '@/types/product';
import dayjs from 'dayjs';
import { PencilIcon, TrashIcon } from 'vue-tabler-icons';
import { deleteProduct, putProduct } from '@/services/productServices';
import { useAlertStore } from '@/stores/alertStore';
import { useRouter } from 'vue-router';

const alert = useAlertStore();
const router = useRouter();

const props = defineProps<{
  modelValue: boolean;
  product: Product | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'productUpdated'): void;
  (e: 'productDeleted'): void;
}>();

const isProcessing = ref(false);

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const handleEdit = () => {
  if (!props.product) return;
  router.push({ name: 'EditProduct', params: { id: props.product.id } });
  dialogVisible.value = false;
};

const handleDelete = async () => {
  if (!props.product) return;

  if (confirm(`Tem certeza que deseja excluir o produto "${props.product.name}"?`)) {
    isProcessing.value = true;
    try {
      await deleteProduct(props.product.id);
      alert.success('Produto excluído com sucesso!');
      emit('productDeleted');
      dialogVisible.value = false;
    } catch (error) {
      alert.error('Ocorreu um erro ao excluir o produto.');
    } finally {
      isProcessing.value = false;
    }
  }
};
</script>

<template>
  <v-dialog v-model="dialogVisible" max-width="800">
    <v-card v-if="product">
      <v-toolbar flat>
        <v-card-title class="text-h6 font-weight-medium">{{ product.name }}</v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialogVisible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-img :src="product.image" cover height="350px"></v-img>
            <div class="mt-2 text-center text-caption text-medium-emphasis">
              Validade: <strong>{{ dayjs(product.expiration_date).format('DD/MM/YYYY') }}</strong>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <h4 class="text-h5 mb-2">{{ product.name }}</h4>
            <div class="d-flex align-center my-3">
              <span class="price-modal mr-4">R$ {{ (Number(product.price) || 0).toFixed(2).replace('.', ',') }}</span>
              <v-chip size="small" variant="flat" color="primary">{{ product.category?.name ?? 'Sem categoria' }}</v-chip>
            </div>
            <v-divider class="my-4"></v-divider>
            <p>{{ product.description }}</p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-end pa-4">
        <v-btn color="secondary" variant="flat" @click="handleEdit"> <PencilIcon :size="16" class="mr-2" /> Editar </v-btn>
        <v-btn color="error" variant="flat" @click="handleDelete" :loading="isProcessing">
          <TrashIcon :size="16" class="mr-2" /> Excluir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.price-modal {
  font-size: 24px;
  font-weight: bold;
  color: #7cb342;
}
</style>
