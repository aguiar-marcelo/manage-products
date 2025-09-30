<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { UploadIcon, PlusIcon, TrashIcon } from 'vue-tabler-icons';
import { getProductById, putProduct } from '@/services/productServices';
import { getCategories, postCategory, deleteCategory } from '@/services/categoryServices';
import type { Category, Product } from '@/types/product';
import { titleize } from '@/utils/texts';
import { useAlertStore } from '@/stores/alertStore';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';

dayjs().locale('pt-br');
const route = useRoute();
const router = useRouter();
const alert = useAlertStore();
const productId = ref(Number(route.params.id));

const dialog = ref(false);
const newCategoryName = ref('');
const isModalSubmitting = ref(false);
const isLoadingData = ref(true);

const fileInputRef = ref<HTMLInputElement | null>(null);
const fileName = ref('');
const initialProductData = ref<Product | null>(null);

const onFileChange = (event: Event, handleChange: Function) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;

  if (file) {
    fileName.value = file.name;
    handleChange(file);
  } else {
    fileName.value = '';
    handleChange(null);
  }
};

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const categories = ref<Category[]>([]);
const selectedCategory = ref<Category | null>(null);

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório').max(50, 'Nome deve ter no máximo 50 caracteres'),
  price: yup.number().typeError('Preço deve ser um número').required('Preço é obrigatório').positive('Preço deve ser maior que 0'),
  description: yup.string().max(200, 'Descrição deve ter no máximo 200 caracteres'),
  expiration_date: yup
    .date()
    .required('Data de validade obrigatório')
    .min(dayjs().startOf('day').toDate(), 'A data de validade não pode ser anterior à data atual'),
  category: yup
    .object()
    .shape({
      id: yup.number().required(),
      name: yup.string().required('Categoria é obrigatória')
    })
    .nullable()
    .required('Categoria é obrigatória'),
  img: yup.mixed().nullable()
});

const handlePriceChange = (value: string, handleChange: Function) => {
  let cleanValue = value.replace(/,/g, '.');
  let dotCount = cleanValue.split('.').length - 1;
  if (dotCount > 1) {
    const parts = cleanValue.split('.');
    cleanValue = parts.shift() + '.' + parts.join('');
  }
  handleChange(cleanValue);
};

const fetchProductData = async () => {
  isLoadingData.value = true;
  try {
    const product = await getProductById(productId.value);
    initialProductData.value = product;
    selectedCategory.value = product.category;
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    router.push('/error');
  } finally {
    isLoadingData.value = false;
  }
};

const handleEditProduct = async (values: any) => {
  try {
    const productData = {
      name: values.name.trim(),
      description: values.description.trim() || '',
      price: values.price,
      expiration_date: values.expiration_date,
      img: values.img,
      category_id: values.category?.id,
    };
    await putProduct(productId.value, productData);
    alert.success('Produto atualizado com sucesso!');
    router.push('/products');
  } catch (error: any) {
    console.error('Erro ao editar produto:', error);
    alert.error('Erro ao editar produto. Verifique os dados.');
  }
};

const fetchCategories = async () => {
  try {
    const response = await getCategories();
    categories.value = response;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    alert.error('Não foi possível carregar as categorias.');
  }
};

const handleAddCategory = async () => {
  if (!newCategoryName.value) return;
  isModalSubmitting.value = true;
  try {
    await postCategory(titleize(newCategoryName.value));
    newCategoryName.value = '';
    await fetchCategories();
    alert.success('Categoria adicionada com sucesso!');
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      alert.error('Categoria já existe.');
    } else {
      alert.error('Ocorreu um erro ao adicionar Categoria.');
    }
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
      alert.success('Categoria excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      alert.error('Ocorreu um erro ao excluir a categoria.');
    } finally {
      isModalSubmitting.value = false;
    }
  }
};

onMounted(() => {
  fetchCategories();
  fetchProductData();
});
</script>

<template>
  <v-btn to="/products" class="mb-4" prepend-icon="mdi-arrow-left">Voltar para a Listagem</v-btn>

  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard :title="'Editar Produto: ' + (initialProductData?.name || '')">
        <div v-if="isLoadingData" class="text-center py-10">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p class="mt-4">Carregando dados do produto...</p>
        </div>
        <div v-else-if="initialProductData">
          <Form @submit="handleEditProduct" :validation-schema="schema" :initial-values="initialProductData" v-slot="{ errors, isSubmitting }">
            <v-row>
              <v-col cols="12" sm="6">
                <Field name="name" v-slot="{ field, errorMessage }">
                  <v-text-field
                    v-model="field.value"
                    v-bind="field"
                    label="Nome do Produto"
                    variant="outlined"
                    density="compact"
                    required
                    :error-messages="errorMessage"
                  />
                </Field>
              </v-col>
              <v-col cols="12" sm="6">
                <Field name="price" v-slot="{ field, errorMessage }">
                  <v-text-field
                    v-bind="field"
                    :model-value="field.value"
                    @update:model-value="(val) => handlePriceChange(val, field.onChange)"
                    label="Preço"
                    placeholder="Ex: 15.50"
                    prefix="R$"
                    variant="outlined"
                    density="compact"
                    required
                    :error-messages="errorMessage"
                  />
                </Field>
              </v-col>
              <v-col cols="12">
                <Field name="description" v-slot="{ field, errorMessage }">
                  <v-textarea
                    v-model="field.value"
                    v-bind="field"
                    label="Descrição do Produto"
                    placeholder="Descreva o produto com detalhes"
                    rows="3"
                    variant="outlined"
                    density="compact"
                    :error-messages="errorMessage"
                  />
                </Field>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="d-flex">
                  <Field name="category" v-slot="{ field, errorMessage }">
                    <v-select
                      v-bind="field"
                      v-model="selectedCategory"
                      :items="categories"
                      item-title="name"
                      item-value="id"
                      label="Categoria"
                      placeholder="Selecione uma categoria"
                      variant="outlined"
                      density="compact"
                      return-object
                      required
                      class="flex-grow-1"
                      :error-messages="errorMessage"
                    />
                  </Field>
                  <v-btn icon variant="tonal" color="primary" class="ml-2" @click="dialog = true" title="Gerenciar Categorias">
                    <PlusIcon />
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <Field name="expiration_date" v-slot="{ field, errorMessage }">
                  <v-text-field
                    v-bind="field"
                    label="Data de Validade"
                    type="date"
                    variant="outlined"
                    density="compact"
                    :error-messages="errorMessage"
                  />
                </Field>
              </v-col>
              <v-col cols="12" sm="8">
                <Field name="img" v-slot="{ field, errorMessage, handleChange }">
                  <v-btn color="primary" variant="tonal" class="mt-2" @click="triggerFileInput">
                    <UploadIcon :size="20" class="mr-2" />
                    Nova Imagem
                  </v-btn>
                  <span v-if="fileName" class="text-subtitle-1 ml-4">{{ fileName }}</span>
                  <input
                    ref="fileInputRef"
                    type="file"
                    style="display: none"
                    accept="image/*"
                    @change="(e) => onFileChange(e, handleChange)"
                  />
                  <div v-if="errorMessage" class="text-error mt-2">{{ errorMessage }}</div>
                </Field>
              </v-col>
              <v-col cols="12" sm="4" class="text-right">
                <v-btn type="submit" color="primary" class="mt-4" :loading="isSubmitting"> Salvar Alterações </v-btn>
              </v-col>
            </v-row>
          </Form>
        </div>
        <div v-else>
          <p class="text-center py-10">Não foi possível carregar os dados do produto.</p>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>

  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="text-h4 font-weight-medium d-flex align-center justify-space-between">
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