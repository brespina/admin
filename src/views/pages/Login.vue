<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="handleLogin">
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  
                  <CAlert v-if="error" color="danger" dismissible @dismiss="error = ''">
                    {{ error }}
                  </CAlert>

                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="email"
                      placeholder="Email"
                      autocomplete="email"
                      required
                      :disabled="loading"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="password"
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      required
                      :disabled="loading"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton 
                        type="submit" 
                        color="primary" 
                        class="px-4"
                        :disabled="loading"
                      >
                        <CSpinner v-if="loading" size="sm" class="me-2" />
                        {{ loading ? 'Logging in...' : 'Login' }}
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0" :disabled="loading">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              class="text-white bg-primary py-5"
              style="width: 44%"
            >
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Don't have an account yet? Contact your administrator to get
                    access.
                  </p>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { login } from '@/services/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = '';
    
    const response = await login(email.value, password.value);
    authStore.setAuth(response);
    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
