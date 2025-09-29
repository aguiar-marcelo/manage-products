<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { UploadIcon, PlusIcon, TrashIcon } from 'vue-tabler-icons';
import { postProduct, getCategories, postCategory, deleteCategory } from '@/services/productServices';
import type { NewProduct, Category } from '@/types/product';
import { titleize } from '@/utils/texts';

const page = ref({ title: 'Adicionar Produto' });
const breadcrumbs = shallowRef([
  {
    title: 'Produtos',
    disabled: false,
    href: '#'
  },
  {
    title: 'Adicionar Produto',
    disabled: true,
    href: '#'
  }
]);

const newProduct = ref<NewProduct>({
  name: '',
  desc: '',
  price: 0.0,
  validate: '',
  img: null,
  category: null
});

const categories = ref<Category[]>([]);
const dialog = ref(false);
const newCategoryName = ref('');
const isSubmitting = ref(false);
const isModalSubmitting = ref(false);

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
    const selectedFile = files[0];
    if (selectedFile) {
      newProduct.value.img = selectedFile;
      fileName.value = selectedFile.name;
    } else {
      newProduct.value.img = null;
      fileName.value = '';
    }
  } else {
    newProduct.value.img = null;
    fileName.value = '';
  }
};

const handleAddProduct = async () => {
  isSubmitting.value = true;
  try {
    await postProduct(newProduct.value);
    alert('Produto adicionado com sucesso!');
    newProduct.value = {
      name: '',
      desc: '',
      price: 0.0,
      validate: '',
      img: null,
      category: null
    };
    fileName.value = '';
  } catch (error: any) {
    console.error('Erro ao adicionar produto:', error);
    if (error.response && error.response.data) {
      alert('Erro: ' + JSON.stringify(error.response.data));
    } else {
      alert('Ocorreu um erro ao adicionar o produto. Tente novamente.');
    }
  } finally {
    isSubmitting.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await getCategories();
    categories.value = response;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
  }
};

const handleAddCategory = async () => {
  console.log('aq' + newCategoryName.value);
  if (!newCategoryName.value) return;
  isModalSubmitting.value = true;
  try {
    await postCategory(titleize(newCategoryName.value));
    newCategoryName.value = '';
    await fetchCategories();
    alert('Categoria adicionada com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar categoria:', error);
    alert('Ocorreu um erro ao adicionar a categoria.');
  } finally {
    isModalSubmitting.value = false;
  }
};

const handleDeleteCategory = async (id: number) => {
  if (confirm('Tem certeza que deseja excluir esta categoria?')) {
    isModalSubmitting.value = true;
    try {
      await deleteCategory(id);
      await fetchCategories();
      alert('Categoria excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      alert('Ocorreu um erro ao excluir a categoria.');
    } finally {
      isModalSubmitting.value = false;
    }
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Adicionar Produto">
        <v-form @submit.prevent="handleAddProduct">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="newProduct.name" label="Nome do Produto" variant="outlined" density="compact" required></v-text-field>
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
              <div class="d-flex align-center">
                <v-select
                  v-model="newProduct.category"
                  :items="categories"
                  item-title="name"
                  item-value="id"
                  label="Categoria"
                  placeholder="Selecione uma categoria"
                  return-object
                  variant="outlined"
                  density="compact"
                  required
                  class="flex-grow-1"
                ></v-select>
                <v-btn icon variant="tonal" color="primary" class="ml-2" @click="dialog = true" title="Gerenciar Categorias">
                  <PlusIcon />
                </v-btn>
              </div>
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
              <v-btn type="submit" color="primary" class="mt-4" :loading="isSubmitting"> Adicionar Produto </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </UiParentCard>
    </v-col>
  </v-row>

  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="text-h6 d-flex align-center justify-space-between">
        Gerenciar Categorias
        <v-btn icon flat @click="dialog = false" size="small">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form @submit.prevent>
          <v-text-field
            v-model="newCategoryName"
            label="Nova Categoria"
            variant="outlined"
            density="compact"
            class="mb-4"
            hide-details
            required
          >
            <template #append-inner>
              <v-btn color="primary" :loading="isModalSubmitting" variant="flat" size="small" class="px-4" @click="handleAddCategory">
                Adicionar
              </v-btn>
            </template>
          </v-text-field>
        </v-form>

        <v-list density="compact">
          <v-list-item v-for="category in categories" :key="category.id" :title="category.name" class="mb-2">
            <template #append>
              <v-btn
                icon
                flat
                color="error"
                size="small"
                @click="handleDeleteCategory(category.id)"
                :loading="isModalSubmitting"
                title="Excluir Categoria"
              >
                <TrashIcon />
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.price {
  color: #7cb342;
  font-weight: 700;
  opacity: 1;
  font-size: 14px;
}
</style>
