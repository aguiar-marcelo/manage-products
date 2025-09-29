<script setup lang="ts">
import { ref } from 'vue';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const showPassword = ref(false);

const schema = yup.object({
  email: yup.string().email('E-mail deve ser válido').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória').min(6, 'Senha deve ter no mínimo 6 caracteres')
});

async function validate(values: any, { setErrors }: any) {
  try {
    await authStore.login(values.email, values.password);
  } catch (e: any) {
    setErrors({ apiError: e?.message || 'Ocorreu um erro' });
  }
}
</script>

<template>
  <Form :validation-schema="schema" @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <Field name="email" v-slot="{ field, errorMessage }">
      <v-text-field
        :model-value="field.value"
        @update:modelValue="field.onChange"
        @blur="field.onBlur"
        type="email"
        label="E-mail"
        class="mt-4 mb-8"
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
        variant="outlined"
        color="primary"
        class="pwdInput"
        hide-details="auto"
        :error-messages="errorMessage"
      />
    </Field>

    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error" class="error">{{ errors.apiError }}</v-alert>
    </div>
    <v-btn :loading="isSubmitting" type="submit" block color="secondary" class="mt-6" variant="flat" size="large">Entrar</v-btn>
  </Form>
  <div class="mt-5 text-right">
    <v-divider />
    <v-btn variant="plain" to="/register" class="mt-2 text-none mr-n2">Não tem uma conta?</v-btn>
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
.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}
.error {
  padding: 5px 1rem;
}
</style>
