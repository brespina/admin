<template>
  <CModal :visible="visible" @close="emit('close')">
    <CModalHeader>
      <CModalTitle>{{ form.sponsor_id ? 'Edit Sponsor' : 'Add Sponsor' }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm @submit.prevent="handleSubmit">
        <CFormInput v-model="form.sponsor_name" label="Sponsor Name" required class="mb-2" />
        <CFormInput v-model="form.start_date" label="Start Date" type="date" required class="mb-2" />
        <CFormInput v-model="form.end_date" label="End Date" type="date" required class="mb-2" />
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="emit('close')">Cancel</CButton>
      <CButton color="primary" @click="handleSubmit">{{ form.sponsor_id ? 'Save' : 'Add' }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CForm, CFormInput, CButton } from '@coreui/vue'

const props = defineProps({ visible: Boolean, sponsor: Object })
const emit = defineEmits(['submit', 'close'])
const form = ref({ sponsor_id: null, sponsor_name: '', start_date: '', end_date: '' })

watch(() => props.sponsor, (s) => {
  if (s) form.value = { ...s }
  else form.value = { sponsor_id: null, sponsor_name: '', start_date: '', end_date: '' }
}, { immediate: true })

function handleSubmit() {
  emit('submit', { ...form.value })
}
</script>
