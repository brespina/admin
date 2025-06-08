<template>
  <CModal :visible="visible" @close="emit('close')">
    <CModalHeader>
      <CModalTitle>{{ form.team_id ? 'Edit Team' : 'Add Team' }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm @submit.prevent="handleSubmit">
        <CFormInput v-model="form.team_name" label="Team Name" required class="mb-2" />
        <!-- need to show game name associated with team -->
        <CFormInput v-model="form.game_id" label="Game ID" type="number" required class="mb-2" />
        <CFormInput v-model="form.achievements" label="Achievements" class="mb-2" />
        <!-- need to show name associated with coordinator_id -->
        <CFormInput v-model="form.coordinator_id" label="Coordinator ID" type="number" required class="mb-2" />
        <CFormInput v-model="form.wins" label="Wins" type="number" min="0" class="mb-2" />
        <CFormInput v-model="form.losses" label="Losses" type="number" min="0" class="mb-2" />
        <!-- For now, omit player_image input (needs upload/preview logic) -->
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="emit('close')">Cancel</CButton>
      <CButton color="primary" @click="handleSubmit">{{ form.team_id ? 'Save' : 'Add' }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CForm, CFormInput, CButton } from '@coreui/vue'

const props = defineProps({
  visible: Boolean,
  team: Object,
})
const emit = defineEmits(['submit', 'close'])

const form = ref({
  team_id: null,
  team_name: '',
  game_id: '',
  achievements: '',
  coordinator_id: '',
  player_image: '', // For future file/image support
  wins: 0,
  losses: 0,
})

watch(
  () => props.team,
  (team) => {
    if (team) {
      form.value = { ...team }
    } else {
      form.value = {
        team_id: null,
        team_name: '',
        game_id: '',
        achievements: '',
        coordinator_id: '',
        player_image: '',
        wins: 0,
        losses: 0,
      }
    }
  },
  { immediate: true }
)

function handleSubmit() {
  emit('submit', { ...form.value })
}
</script>
