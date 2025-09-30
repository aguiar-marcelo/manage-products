<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Product } from '@/types/product';
import dayjs from 'dayjs';
import { CalendarIcon, PencilIcon, TagIcon, TrashIcon, XIcon } from 'vue-tabler-icons';
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
      <v-card-title class="text-h4 font-weight-medium d-flex align-center justify-space-between">
        Gerenciar Categorias
        <v-btn icon @click="dialogVisible = false" variant="text">
          <XIcon/>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-img
              :src="product.image || 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500'"
              cover
              height="350px"
            ></v-img>
            <div class="mt-2 text-center text-caption text-medium-emphasis d-flex align-center justify-center">
              Validade: &nbsp;<strong>{{ dayjs(product.expiration_date).format('DD/MM/YYYY') }} </strong>
              <CalendarIcon :size="16" class="ml-2" />
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <h4 class="text-h2 font-weight-regular mb-2">{{ product.name }}</h4>
            <div class="d-flex align-center my-3">
              <span class="price">R$ {{ (Number(product.price) || 0).toFixed(2).replace('.', ',') }}</span>
              <v-chip size="small" class="ml-5 text-body-1" variant="flat" color="primary">
                <TagIcon :size="16" class="mr-2" />
                {{ product.category?.name ?? 'Sem categoria' }}
              </v-chip>
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
.price {
  font-size: 20px;
  font-weight: bold;
  color: #7cb342;
}
</style>
