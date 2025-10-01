<script setup lang="ts">
import QuantityProducts from './components/QuantityProducts.vue';
import QuantityCategories from './components/QuantityCategories.vue';
import PricesProducts from './components/PricesProducts.vue';
import ProductsPerCategoryChart from './components/ProductsPerCategoryChart.vue';
import { onMounted, ref } from 'vue';
import { getDashboardData } from '@/services/dashboardServices';
import type { Dashboard } from '@/types/product';

const dashboarData = ref<Dashboard>({
  total_products: 0,
  total_categories: 0,
  total_products_price: 0,
  total_expired_products_price: 0,
  products_per_category: []
});

const DashboardData = async () => {
  try {
    const response = await getDashboardData();
    dashboarData.value = response;
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
  }
};
onMounted(() => {
  DashboardData();
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="4">
      <QuantityProducts :value="dashboarData.total_products" label="Produto(s)" />
    </v-col>

    <v-col cols="12" md="4">
      <QuantityCategories :value="dashboarData.total_categories" label="Categoria(s)" />
    </v-col>

    <v-col cols="12" md="4">
      <PricesProducts
        :productsPrice="(Number(dashboarData.total_products_price) || 0).toFixed(2).replace('.', ',')"
        productsLabel="Total em produtos"
        :productsExpiredPrice="(Number(dashboarData.total_expired_products_price) || 0).toFixed(2).replace('.', ',')"
        productsExpiredLabel="Total em produtos vencidos"
      />
    </v-col>

    <v-col cols="12" >
      <ProductsPerCategoryChart :chart-data=dashboarData.products_per_category />
    </v-col>

  </v-row>
</template>
