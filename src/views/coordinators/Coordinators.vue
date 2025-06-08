<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Coordinators</h2>
      <CButton color="primary" @click="openAddModal">Add Coordinator</CButton>
    </div>
    <CInputGroup class="mb-3" size="sm">
      <CFormInput v-model="search" placeholder="Search coordinators..." />
    </CInputGroup>
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Coordinator ID</CTableHeaderCell>
          <CTableHeaderCell>User ID</CTableHeaderCell>
          <CTableHeaderCell>Game ID</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="c in filteredCoordinators" :key="c.coordinator_id">
          <CTableDataCell>{{ c.coordinator_id }}</CTableDataCell>
          <CTableDataCell>{{ c.user_id }}</CTableDataCell>
          <CTableDataCell>{{ c.game_id }}</CTableDataCell>
          <CTableDataCell>
            <CButton size="sm" color="info" @click="openEditModal(c)">Edit</CButton>
            <CButton size="sm" color="danger" class="ms-2" @click="onDelete(c)">Delete</CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <CoordinatorForm :visible="modalVisible" :coordinator="editingCoordinator" @submit="onFormSubmit" @close="closeModal" />
    <CModal :visible="confirmDelete.visible" @close="confirmDelete.visible = false">
      <CModalHeader><CModalTitle>Delete Coordinator</CModalTitle></CModalHeader>
      <CModalBody>Are you sure you want to delete coordinator #<b>{{ confirmDelete.coordinator?.coordinator_id }}</b>?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="confirmDelete.visible = false">Cancel</CButton>
        <CButton color="danger" @click="confirmDeleteCoordinator">Delete</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import CoordinatorForm from '@/components/coordinators/CoordinatorForm.vue'
import { getCoordinators, createCoordinator, updateCoordinator, deleteCoordinator } from '@/services/coordinators.js'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CInputGroup, CFormInput } from '@coreui/vue'
const coordinators = ref([])
const loading = ref(true)
const search = ref('')
const modalVisible = ref(false)
const editingCoordinator = ref(null)
const confirmDelete = ref({ visible: false, coordinator: null })
const fetchCoordinators = async () => {
  loading.value = true
  const { data } = await getCoordinators()
  coordinators.value = data
  loading.value = false
}
onMounted(fetchCoordinators)
const filteredCoordinators = computed(() => {
  if (!search.value.trim()) return coordinators.value
  const s = search.value.toLowerCase()
  return coordinators.value.filter(c =>
    String(c.coordinator_id).includes(s) ||
    String(c.user_id).includes(s) ||
    String(c.game_id).includes(s)
  )
})
const openAddModal = () => { editingCoordinator.value = null; modalVisible.value = true }
const openEditModal = (c) => { editingCoordinator.value = { ...c }; modalVisible.value = true }
const closeModal = () => { modalVisible.value = false; editingCoordinator.value = null }
const onFormSubmit = async (c) => { c.coordinator_id ? await updateCoordinator(c.coordinator_id, c) : await createCoordinator(c); await fetchCoordinators(); closeModal() }
const onDelete = (c) => { confirmDelete.value = { visible: true, coordinator: c } }
const confirmDeleteCoordinator = async () => {
  if (confirmDelete.value.coordinator) {
    await deleteCoordinator(confirmDelete.value.coordinator.coordinator_id)
    await fetchCoordinators()
    confirmDelete.value.visible = false
    confirmDelete.value.coordinator = null
  }
}
</script>
