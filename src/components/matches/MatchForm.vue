<template>
  <CModal :visible="visible" @close="emit('close')">
    <CModalHeader>
      <CModalTitle>{{ form.match_id ? 'Edit Match' : 'Add Match' }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm @submit.prevent="handleSubmit">
        <CFormInput v-model="form.opponent_name" label="Opponent Name" required class="mb-2" />
        <CFormInput v-model="form.team_id" label="Team ID" type="number" required class="mb-2" />
        <CFormInput v-model="form.date_time" label="Date/Time" type="datetime-local" required class="mb-2" />
        <CFormInput v-model="form.watch_link" label="Watch Link" class="mb-2" />
        <!-- bg_image omitted for now (file/image support would be needed) -->
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="emit('close')">Cancel</CButton>
      <CButton color="primary" @click="handleSubmit">{{ form.match_id ? 'Save' : 'Add' }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CForm, CFormInput, CButton } from '@coreui/vue'

const props = defineProps({
  visible: Boolean,
  match: Object,
})
const emit = defineEmits(['submit', 'close'])

const form = ref({
  match_id: null,
  opponent_name: '',
  team_id: '',
  date_time: '',
  bg_image: '', // For future image/file handling
  watch_link: ''
})

watch(
  () => props.match,
  (match) => {
    if (match) {
      form.value = { ...match }
    } else {
      form.value = {
        match_id: null,
        opponent_name: '',
        team_id: '',
        date_time: '',
        bg_image: '',
        watch_link: ''
      }
    }
  },
  { immediate: true }
)

function handleSubmit() {
  emit('submit', { ...form.value })
}
</script>
