<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Users</h2>
      <CButton color="primary" @click="openAddModal">Add User</CButton>
    </div>

    <CInputGroup class="mb-3" size="sm">
      <CFormInput
        v-model="search"
        placeholder="Search users..."
      />
    </CInputGroup>

    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Username</CTableHeaderCell>
          <CTableHeaderCell>Email</CTableHeaderCell>
          <CTableHeaderCell>First Name</CTableHeaderCell>
          <CTableHeaderCell>Last Name</CTableHeaderCell>
          <CTableHeaderCell>Paid Dues</CTableHeaderCell>
          <CTableHeaderCell>Signup Date</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="user in filteredUsers" :key="user.user_id">
          <CTableDataCell>{{ user.username }}</CTableDataCell>
          <CTableDataCell>{{ user.email }}</CTableDataCell>
          <CTableDataCell>{{ user.first_name }}</CTableDataCell>
          <CTableDataCell>{{ user.last_name }}</CTableDataCell>
          <CTableDataCell>
            <CBadge :color="user.paid_dues ? 'success' : 'danger'">
              {{ user.paid_dues ? 'Yes' : 'No' }}
            </CBadge>
          </CTableDataCell>
          <CTableDataCell>{{ formatDate(user.signup_date) }}</CTableDataCell>
          <CTableDataCell>
            <CButton size="sm" color="info" @click="openEditModal(user)">Edit</CButton>
            <CButton size="sm" color="danger" class="ms-2" @click="onDelete(user)">Delete</CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>

    <UserForm
      :visible="modalVisible"
      :user="editingUser"
      @submit="onFormSubmit"
      @close="closeModal"
    />

    <CModal :visible="confirmDelete.visible" @close="confirmDelete.visible = false">
      <CModalHeader>
        <CModalTitle>Delete User</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Are you sure you want to delete <b>{{ confirmDelete.user?.username }}</b>?
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="confirmDelete.visible = false">Cancel</CButton>
        <CButton color="danger" @click="confirmDeleteUser">Delete</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import UserForm from '@/components/users/UserForm.vue'
import { getUsers, createUser, updateUser, deleteUser } from '@/services/users.js'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CBadge, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CInputGroup, CFormInput } from '@coreui/vue'

// State
const users = ref([])
const loading = ref(true)
const search = ref('')
const modalVisible = ref(false)
const editingUser = ref(null)
const confirmDelete = ref({
  visible: false,
  user: null,
})

// Fetch users
const fetchUsers = async () => {
  loading.value = true
  const { data } = await getUsers()
  users.value = data
  loading.value = false
}

onMounted(fetchUsers)

// Search filter
const filteredUsers = computed(() => {
  if (!search.value.trim()) return users.value
  const s = search.value.toLowerCase()
  return users.value.filter(
    u =>
      u.username.toLowerCase().includes(s) ||
      u.email.toLowerCase().includes(s) ||
      u.first_name.toLowerCase().includes(s) ||
      u.last_name.toLowerCase().includes(s)
  )
})

// Helpers
function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

// Add/Edit Modal
const openAddModal = () => {
  editingUser.value = null
  modalVisible.value = true
}
const openEditModal = (user) => {
  editingUser.value = { ...user }
  modalVisible.value = true
}
const closeModal = () => {
  modalVisible.value = false
  editingUser.value = null
}

// Handle form submit
const onFormSubmit = async (user) => {
  if (user.user_id) {
    await updateUser(user.user_id, user)
  } else {
    await createUser(user)
  }
  await fetchUsers()
  closeModal()
}

// Delete logic
const onDelete = (user) => {
  confirmDelete.value = {
    visible: true,
    user,
  }
}
const confirmDeleteUser = async () => {
  if (confirmDelete.value.user) {
    await deleteUser(confirmDelete.value.user.user_id)
    await fetchUsers()
    confirmDelete.value.visible = false
    confirmDelete.value.user = null
  }
}
</script>
