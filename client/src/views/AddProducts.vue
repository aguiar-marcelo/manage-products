<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { UploadIcon } from 'vue-tabler-icons';

// const page = ref({ title: 'Adicionar Produto' });
// const breadcrumbs = shallowRef([
//   {
//     title: 'Produtos',
//     disabled: false,
//     href: '#'
//   },
//   {
//     title: 'Adicionar Produto',
//     disabled: true,
//     href: '#'
//   }
// ]);

const newProduct = ref({
  name: '',
  desc: '',
  price: 0.0,
  validate: '',
  img: null as File | null,
  categorie: null as { id: number; name: string } | null
});

const categories = ref([
  { id: 1, name: 'Eletrônicos' },
  { id: 2, name: 'Hardware' },
  { id: 3, name: 'Acessórios' },
  { id: 4, name: 'Móveis' }
]);

const fileInputRef = ref<HTMLInputElement | null>(null);

const fileName = ref('');

const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    newProduct.value.img = files[0];
    fileName.value = files[0].name;
  } else {
    newProduct.value.img = null;
    fileName.value = '';
  }
};

const submitForm = () => {
  console.log('Dados do produto a ser enviado:', newProduct.value);
  alert('Formulário enviado! Verifique o console para os dados.');
};
</script>

<template>
  <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Adicionar Produto">
        <v-form @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newProduct.name"
                label="Nome do Produto"
                variant="outlined"
                density="compact"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model.number="newProduct.price"
                label="Preço"
                placeholder="Ex: 150.75"
                prefix="R$"
                type="number"
                variant="outlined"
                density="compact"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="newProduct.desc"
                label="Descrição do Produto"
                placeholder="Descreva o produto com detalhes"
                rows="3"
                variant="outlined"
                density="compact"
                required
              ></v-textarea>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="newProduct.categorie"
                :items="categories"
                item-title="name"
                item-value="id"
                label="Categoria"
                placeholder="Selecione uma categoria"
                return-object
                variant="outlined"
                density="compact"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newProduct.validate"
                label="Data de Validade"
                type="date"
                variant="outlined"
                density="compact"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="8">
              <v-btn color="primary" variant="tonal" class="mt-2" @click="triggerFileInput">
                <UploadIcon :size="20" class="mr-2" />
                Selecionar Imagem
              </v-btn>
              <span v-if="fileName" class="text-subtitle-1 ml-4">{{ fileName }}</span>
              <input ref="fileInputRef" type="file" style="display: none" accept="image/*" @change="onFileChange" />
            </v-col>

            <v-col cols="12" sm="4" class="text-right">
              <v-btn type="submit" color="primary" class="mt-4"> Adicionar Produto </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
