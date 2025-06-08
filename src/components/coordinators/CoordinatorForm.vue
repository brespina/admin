<template>
  <CModal :visible="visible" @close="emit('close')">
    <CModalHeader>
      <CModalTitle>{{ form.coordinator_id ? 'Edit Coordinator' : 'Add Coordinator' }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm @submit.prevent="handleSubmit">
        <CFormInput v-model="form.user_id" label="User ID" type="number" required class="mb-2" />
        <CFormInput v-model="form.game_id" label="Game ID" type="number" required class="mb-2" />
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="emit('close')">Cancel</CButton>
      <CButton color="primary" @click="handleSubmit">{{ form.coordinator_id ? 'Save' : 'Add' }}</CButton>
    </CModalFooter>
  </CModal>
</template>
<script setup>
import { ref, watch } from 'vue'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CForm, CFormInput, CButton } from '@coreui/vue'
const props = defineProps({ visible: Boolean, coordinator: Object })
const emit = defineEmits(['submit', 'close'])
const form = ref({ coordinator_id: null, user_id: '', game_id: '' })
watch(() => props.coordinator, (c) => {
  if (c) form.value = { ...c }
  else form.value = { coordinator_id: null, user_id: '', game_id: '' }
}, { immediate: true })
function handleSubmit() { emit('submit', { ...form.value }) }
</script>
