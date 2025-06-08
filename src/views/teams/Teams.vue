<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Teams</h2>
      <CButton color="primary" @click="openAddModal">Add Team</CButton>
    </div>

    <CInputGroup class="mb-3" size="sm">
      <CFormInput
        v-model="search"
        placeholder="Search teams..."
      />
    </CInputGroup>

    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Team Name</CTableHeaderCell>
          <CTableHeaderCell>Game ID</CTableHeaderCell>
          <CTableHeaderCell>Coordinator ID</CTableHeaderCell>
          <CTableHeaderCell>Achievements</CTableHeaderCell>
          <CTableHeaderCell>Wins</CTableHeaderCell>
          <CTableHeaderCell>Losses</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="team in filteredTeams" :key="team.team_id">
          <CTableDataCell>{{ team.team_name }}</CTableDataCell>
          <CTableDataCell>{{ team.game_id }}</CTableDataCell>
          <CTableDataCell>{{ team.coordinator_id }}</CTableDataCell>
          <CTableDataCell>{{ team.achievements }}</CTableDataCell>
          <CTableDataCell>{{ team.wins }}</CTableDataCell>
          <CTableDataCell>{{ team.losses }}</CTableDataCell>
          <CTableDataCell>
            <CButton size="sm" color="info" @click="openEditModal(team)">Edit</CButton>
            <CButton size="sm" color="danger" class="ms-2" @click="onDelete(team)">Delete</CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>

    <TeamForm
      :visible="modalVisible"
      :team="editingTeam"
      @submit="onFormSubmit"
      @close="closeModal"
    />

    <CModal :visible="confirmDelete.visible" @close="confirmDelete.visible = false">
      <CModalHeader>
        <CModalTitle>Delete Team</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Are you sure you want to delete <b>{{ confirmDelete.team?.team_name }}</b>?
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="confirmDelete.visible = false">Cancel</CButton>
        <CButton color="danger" @click="confirmDeleteTeam">Delete</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TeamForm from '@/components/teams/TeamForm.vue'
import { getTeams, createTeam, updateTeam, deleteTeam } from '@/services/teams.js'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CInputGroup, CFormInput } from '@coreui/vue'

// State
const teams = ref([])
const loading = ref(true)
const search = ref('')
const modalVisible = ref(false)
const editingTeam = ref(null)
const confirmDelete = ref({
  visible: false,
  team: null,
})

// Fetch teams
const fetchTeams = async () => {
  loading.value = true
  const { data } = await getTeams()
  teams.value = data
  loading.value = false
}

onMounted(fetchTeams)

// Search filter
const filteredTeams = computed(() => {
  if (!search.value.trim()) return teams.value
  const s = search.value.toLowerCase()
  return teams.value.filter(
    t =>
      t.team_name.toLowerCase().includes(s) ||
      (t.achievements && t.achievements.toLowerCase().includes(s))
  )
})

// Add/Edit Modal
const openAddModal = () => {
  editingTeam.value = null
  modalVisible.value = true
}
const openEditModal = (team) => {
  editingTeam.value = { ...team }
  modalVisible.value = true
}
const closeModal = () => {
  modalVisible.value = false
  editingTeam.value = null
}

// Handle form submit
const onFormSubmit = async (team) => {
  if (team.team_id) {
    await updateTeam(team.team_id, team)
  } else {
    await createTeam(team)
  }
  await fetchTeams()
  closeModal()
}

// Delete logic
const onDelete = (team) => {
  confirmDelete.value = {
    visible: true,
    team,
  }
}
const confirmDeleteTeam = async () => {
  if (confirmDelete.value.team) {
    await deleteTeam(confirmDelete.value.team.team_id)
    await fetchTeams()
    confirmDelete.value.visible = false
    confirmDelete.value.team = null
  }
}
</script>
