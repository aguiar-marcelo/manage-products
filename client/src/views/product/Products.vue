<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import type { Product } from '@/types/product';
import { getProducts } from '@/services/productServices';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useAlertStore } from '@/stores/alertStore';
import { SearchIcon, XIcon } from 'vue-tabler-icons';
import ProductDetailsModal from '@/components/product/ProductDetailsModal.vue';
dayjs.locale('pt-br');

const alert = useAlertStore();
const products = ref<Product[]>([]);
const isFetching = ref(true);
const showLoader = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const itemsPerPage = 10;

const searchTerm = ref('');
let searchTimeout: any = null;

const dialog = ref(false);
const selectedProduct = ref<Product | null>(null);

const fetchProducts = async (page: number, search: string = '') => {
  isFetching.value = true;
  const loaderTimeout = setTimeout(() => {
    showLoader.value = true;
  }, 1000);

  try {
    const response = await getProducts(page, itemsPerPage, search);
    products.value = response.data;
    currentPage.value = response.currentPage;
    totalPages.value = response.totalPages;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    alert.error('Erro ao buscar produtos.');
  } finally {
    isFetching.value = false;
    clearTimeout(loaderTimeout);
    showLoader.value = false;
  }
};

const onPageChange = (newPage: number) => {
  fetchProducts(newPage);
};

const openDetailsModal = (product: Product) => {
  selectedProduct.value = product;
  dialog.value = true;
};

const onProductAction = () => {
  fetchProducts(currentPage.value, searchTerm.value);
};

onMounted(() => {
  fetchProducts(currentPage.value);
});

watch(searchTerm, (newSearchTerm) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    fetchProducts(1, newSearchTerm);
  }, 500);
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Produtos">
        <v-row class="mb-2">
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="searchTerm" persistent-placeholder placeholder="Buscar nome, descrição ou categoria... " color="primary" variant="outlined" hide-details>
              <template v-slot:prepend-inner>
                <SearchIcon stroke-width="1.5" size="17" class="text-lightText SearchIcon" />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="isFetching">
          <v-col cols="12" class="text-center py-10">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <p class="mt-4">Carregando produtos...</p>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col v-if="!products || products.length === 0" cols="12" class="text-center py-6"> Nenhum produto encontrado. </v-col>
          <v-col v-else v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="mx-auto" max-width="400" @click="openDetailsModal(product)" style="cursor: pointer;">
              <v-img
                :src="product.image || 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500'"
                height="200px"
                cover
                ><span class="expiration">Validade: <strong>{{ dayjs(product.expiration_date).format('DD/MM/YYYY') }}</strong></span>
              </v-img>
              <v-card-title>{{ product.name || 'Sem nome' }}</v-card-title>
              <v-card-subtitle class="mt-0">
                {{ product?.category?.name ?? 'Sem categoria' }}
              </v-card-subtitle>
              <v-card-title>
                <div class="price">R$ {{ (Number(product?.price) || 0).toFixed(2).replace('.', ',') }}</div>
              </v-card-title>
              <v-card-text style="padding-left: 17px">
                <div class="description-truncate">{{ product?.description || '—' }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div class="mt-6 text-center text-subtitle-1">Página {{ currentPage }} / {{ totalPages }}</div>
      </UiParentCard>
      <div v-if="!isFetching" class="d-flex flex-column justify-center align-center mt-6">
        <v-pagination v-model="currentPage" :length="totalPages" @update:model-value="onPageChange"></v-pagination>
      </div>
    </v-col>
  </v-row>

  <ProductDetailsModal
    v-model="dialog"
    :product="selectedProduct"
    @product-deleted="onProductAction"
    @product-updated="onProductAction"
  />
</template>

<style lang="scss">
.price {
  color: #7cb342;
  font-weight: 700;
  opacity: 1;
  font-size: 14px;
}
.expiration {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #ecececc5;
  padding: 1px 5px;
  font-size: 10px;
  border-radius: 5px 0;
}
.description-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>