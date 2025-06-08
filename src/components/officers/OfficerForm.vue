<template>
  <CModal :visible="visible" @close="emit('close')">
    <CModalHeader>
      <CModalTitle>{{ form.officer_id ? 'Edit Officer' : 'Add Officer' }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm @submit.prevent="handleSubmit">
        <CFormInput v-model="form.user_id" label="User ID" type="number" required class="mb-2" />
        <CFormInput v-model="form.role_id" label="Role ID" type="number" required class="mb-2" />
        <!-- officer_image (optional file input) not implemented for now -->
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="emit('close')">Cancel</CButton>
      <CButton color="primary" @click="handleSubmit">{{ form.officer_id ? 'Save' : 'Add' }}</CButton>
    </CModalFooter>
  </CModal>
</template>
<script setup>
import { ref, watch } from 'vue'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CForm, CFormInput, CButton } from '@coreui/vue'
const props = defineProps({ visible: Boolean, officer: Object })
const emit = defineEmits(['submit', 'close'])
const form = ref({ officer_id: null, user_id: '', role_id: '', officer_image: '' })
watch(() => props.officer, (o) => {
  if (o) form.value = { ...o }
  else form.value = { officer_id: null, user_id: '', role_id: '', officer_image: '' }
}, { immediate: true })
function handleSubmit() { emit('submit', { ...form.value }) }
</script>
