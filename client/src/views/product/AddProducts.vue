<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { UploadIcon, PlusIcon, TrashIcon } from 'vue-tabler-icons';
import { postProduct, getCategories, postCategory, deleteCategory } from '@/services/productServices';
import type { Category } from '@/types/product';
import { titleize } from '@/utils/texts';
import { useAlertStore } from '@/stores/alertStore';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import dayjs from 'dayjs';
dayjs().locale('pt-br');

const alert = useAlertStore();

const dialog = ref(false);
const newCategoryName = ref('');
const isSubmitting = ref(false);
const isModalSubmitting = ref(false);

const fileInputRef = ref<HTMLInputElement | null>(null);
const fileName = ref('');

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

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório').max(50, 'Nome deve ter no máximo 50 caracteres'),
  price: yup.number().typeError('Preço deve ser um número').required('Preço é obrigatório').positive('Preço deve ser maior que 0'),
  desc: yup.string().max(200, 'Descrição deve ter no máximo 200 caracteres'),
  validate: yup.date()
    .required('Data de validade obrigatório')
    .min(dayjs().startOf('day').toDate(), 'A data de validade não pode ser anterior à data atual'),
  category: yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required('Categoria é obrigatória'),
  }).nullable().required('Categoria é obrigatória'),
  img: yup.mixed().required('Imagem é obrigatória'),
});


const handleAddProduct = async (values: any, { resetForm }: any) => {
  try {
    const productData = {
      name: values.name,
      desc: values.desc || '',
      price: values.price,
      validate: values.validate,
      img: values.img,
      category: values.category
    };
    await postProduct(productData);
    alert.success('Produto adicionado com sucesso!');
    resetForm();
    fileName.value = '';
  } catch (error: any) {
    console.error('Erro ao adicionar produto:', error);
    alert.error('Erro ao adicionar produto. Verifique os dados.');
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
  } catch (error) {
    console.error('Erro ao adicionar categoria:', error);
    alert.error('Ocorreu um erro ao adicionar a categoria.');
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
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Adicionar Produto">
        <Form @submit="handleAddProduct" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
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
                  v-model="field.value"
                  v-bind="field"
                  label="Preço"
                  placeholder="Ex: 150.75"
                  prefix="R$"
                  type="number"
                  variant="outlined"
                  density="compact"
                  required
                  :error-messages="errorMessage"
                />
              </Field>
            </v-col>
            <v-col cols="12">
              <Field name="desc" v-slot="{ field, errorMessage }">
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
              <Field name="validate" v-slot="{ field, errorMessage }">
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
                  Selecionar Imagem
                </v-btn>
                <span v-if="fileName" class="text-subtitle-1 ml-4">{{ fileName }}</span>
                <input ref="fileInputRef" type="file" style="display: none" accept="image/*" @change="e => onFileChange(e, handleChange)" />
                <div v-if="errorMessage" class="text-error mt-2">{{ errorMessage }}</div>
              </Field>
            </v-col>
            <v-col cols="12" sm="4" class="text-right">
              <v-btn type="submit" color="primary" class="mt-4" :loading="isSubmitting"> Adicionar Produto </v-btn>
            </v-col>
          </v-row>
        </Form>
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