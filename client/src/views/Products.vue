<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

const page = ref({ title: 'Lista de Produtos' });
const breadcrumbs = shallowRef([
  {
    title: 'Produtos',
    disabled: false,
    href: '#'
  },
  {
    title: 'Lista de Produtos',
    disabled: true,
    href: '#'
  }
]);

const products = ref([
  {
    name: 'Teclado Gamer',
    desc: 'Teclado mecânico com iluminação RGB.',
    price: 150.75,
    validate: '2026-05-20',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 1, name: 'Eletrônicos' }
  },
  {
    name: 'Mousepad Grande',
    desc: 'Mousepad de tecido, ideal para jogos.',
    price: 35.9,
    validate: '2027-01-15',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 1, name: 'Eletrônicos' }
  },
  {
    name: 'Fone de Ouvido',
    desc: 'Fone de ouvido com cancelamento de ruído.',
    price: 220.5,
    validate: '2026-10-10',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 1, name: 'Eletrônicos' }
  },
  {
    name: 'Monitor LED',
    desc: 'Monitor de 27 polegadas Full HD.',
    price: 850.0,
    validate: '2028-03-22',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 2, name: 'Hardware' }
  },
  {
    name: 'Teclado Gamer',
    desc: 'Teclado mecânico com iluminação RGB.',
    price: 150.75,
    validate: '2026-05-20',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 1, name: 'Eletrônicos' }
  },
  {
    name: 'Mousepad Grande',
    desc: 'Mousepad de tecido, ideal para jogos.',
    price: 35.9,
    validate: '2027-01-15',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 1, name: 'Eletrônicos' }
  },
  {
    name: 'Fone de Ouvido',
    desc: 'Fone de ouvido com cancelamento de ruído.',
    price: 220.5,
    validate: '2026-10-10',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 1, name: 'Eletrônicos' }
  },
  {
    name: 'Monitor LED',
    desc: 'Monitor de 27 polegadas Full HD.',
    price: 850.0,
    validate: '2028-03-22',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 2, name: 'Hardware' }
  },
  {
    name: 'Teclado Gamer',
    desc: 'Teclado mecânico com iluminação RGB.',
    price: 150.75,
    validate: '2026-05-20',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 1, name: 'Eletrônicos' }
  },
  {
    name: 'Mousepad Grande',
    desc: 'Mousepad de tecido, ideal para jogos.',
    price: 35.9,
    validate: '2027-01-15',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 1, name: 'Eletrônicos' }
  },
  {
    name: 'Fone de Ouvido',
    desc: 'Fone de ouvido com cancelamento de ruído.',
    price: 220.5,
    validate: '2026-10-10',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 1, name: 'Eletrônicos' }
  },
  {
    name: 'Monitor LED',
    desc: 'Monitor de 27 polegadas Full HD.',
    price: 850.0,
    validate: '2028-03-22',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 2, name: 'Hardware' }
  },
  {
    name: 'Teclado Gamer',
    desc: 'Teclado mecânico com iluminação RGB.',
    price: 150.75,
    validate: '2026-05-20',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 1, name: 'Eletrônicos' }
  },
  {
    name: 'Mousepad Grande',
    desc: 'Mousepad de tecido, ideal para jogos.',
    price: 35.9,
    validate: '2027-01-15',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 1, name: 'Eletrônicos' }
  },
  {
    name: 'Fone de Ouvido',
    desc: 'Fone de ouvido com cancelamento de ruído.',
    price: 220.5,
    validate: '2026-10-10',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 1, name: 'Eletrônicos' }
  },
  {
    name: 'Monitor LED',
    desc: 'Monitor de 27 polegadas Full HD.',
    price: 850.0,
    validate: '2028-03-22',
    img: 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png',
    categorie: { id: 2, name: 'Hardware' }
  }
]);
</script>

<template>
  <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Produtos">
        <v-row>
          <v-col v-for="(product, index) in products" :key="index" cols="12" sm="6" md="4" lg="3">
            <v-card class="mx-auto" max-width="400">
              <v-img :src="product.img" height="200px" cover></v-img>

              <v-card-title>
                {{ product.name }}
              </v-card-title>

              <v-card-subtitle class="mt-0">
                {{ product.categorie.name }}
              </v-card-subtitle>
              <v-card-title>
                <div class="price">R$ {{ product.price.toFixed(2).replace('.', ',') }}</div>
              </v-card-title>

              <v-card-text style="padding-left: 17px">
                <div>{{ product.desc }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.price {
  color: #7cb342;
  font-weight: 700;
  opacity: 1;
  font-size: 14px;
}
</style>
