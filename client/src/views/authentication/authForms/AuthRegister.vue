<script setup lang="ts">
import { ref } from 'vue';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import Google from '@/assets/images/auth/social-google.svg';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const showPassword = ref(false);

// Schema de validação usando Yup para todos os campos
const schema = yup.object({
  firstname: yup.string().required('Nome é obrigatório'),
  lastname: yup.string().required('Sobrenome é obrigatório'),
  email: yup.string().email('E-mail deve ser válido').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória').min(6, 'Senha deve ter no mínimo 6 caracteres')
});

/* eslint-disable @typescript-eslint/no-explicit-any */
async function validate(values: any, { setErrors }: any) {
  try {
    // Chamada à função `register` do authStore com os dados do formulário
    await authStore.register(values.firstname, values.lastname, values.email, values.password);
  } catch (e: any) {
    // Captura erros da API e exibe no formulário
    setErrors({ apiError: e?.message || 'Ocorreu um erro.' });
  }
}
</script>

<template>
  <Form :validation-schema="schema" @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <v-row>
      <v-col cols="12" sm="6">
        <Field name="firstname" v-slot="{ field, errorMessage }">
          <v-text-field
            :model-value="field.value"
            @update:modelValue="field.onChange"
            @blur="field.onBlur"
            label="Nome"
            density="comfortable"
            hide-details="auto"
            variant="outlined"
            color="primary"
            :error-messages="errorMessage"
          />
        </Field>
      </v-col>
      <v-col cols="12" sm="6">
        <Field name="lastname" v-slot="{ field, errorMessage }">
          <v-text-field
            :model-value="field.value"
            @update:modelValue="field.onChange"
            @blur="field.onBlur"
            label="Sobre Nome"
            density="comfortable"
            hide-details="auto"
            variant="outlined"
            color="primary"
            :error-messages="errorMessage"
          />
        </Field>
      </v-col>
    </v-row>
    <Field name="email" v-slot="{ field, errorMessage }">
      <v-text-field
        :model-value="field.value"
        @update:modelValue="field.onChange"
        @blur="field.onBlur"
        type="email"
        label="E-mail"
        class="mt-4 mb-4"
        required
        density="comfortable"
        hide-details="auto"
        variant="outlined"
        color="primary"
        :error-messages="errorMessage"
      />
    </Field>
    <Field name="password" v-slot="{ field, errorMessage }">
      <v-text-field
        :model-value="field.value"
        @update:modelValue="field.onChange"
        @blur="field.onBlur"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? '$eye' : '$eyeOff'"
        @click:append="showPassword = !showPassword"
        label="Senha"
        required
        density="comfortable"
        variant="outlined"
        color="primary"
        hide-details="auto"
        class="pwdInput"
        :error-messages="errorMessage"
      />
    </Field>

    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error" class="error">{{ errors.apiError }}</v-alert>
    </div>
    <v-btn color="secondary" :loading="isSubmitting" block class="mt-6" variant="flat" size="large" type="submit">Registrar-se</v-btn>
  </Form>
  <div class="mt-5 text-right">
    <v-divider />
    <v-btn variant="plain" to="/login" class="mt-2 text-none mr-n2">Já tem uma conta?</v-btn>
  </div>
</template>

<style lang="scss">
.pwdInput {
  position: relative;
  .v-input__append {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.error {
  padding: 5px 1rem;
}
</style>