<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Manage Users</strong>
      </CCardHeader>
      <CCardBody>

        <CButton color="primary" @click="openAddUserModal" class="mb-4">
          <CIcon name="cil-plus" /> Add User
        </CButton>

        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Username</CTableHeaderCell>
              <CTableHeaderCell>First Name</CTableHeaderCell>
              <CTableHeaderCell>Last Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Sign Up Date</CTableHeaderCell>
              <CTableHeaderCell>Role</CTableHeaderCell>
              <CTableHeaderCell>Paid Dues</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="user in users" :key="user.id">
              <CTableDataCell>{{ user.id }}</CTableDataCell>
              <CTableDataCell>{{ user.username }}</CTableDataCell>
              <CTableDataCell>{{ user.first_name }}</CTableDataCell>
              <CTableDataCell>{{ user.last_name }}</CTableDataCell>
              <CTableDataCell>{{ user.email }}</CTableDataCell>
              <CTableDataCell>{{ user.signup_date }}</CTableDataCell>
              <CTableDataCell>{{ user.role }}</CTableDataCell>
              <CTableDataCell>{{ user.paid_dues }}</CTableDataCell>
              <CTableDataCell>
                <CButton color="warning" size="sm" @click="openEditUserModal(user)">
                  <CIcon name="cil-pencil" /> Edit
                </CButton>
                <CButton color="danger" size="sm" @click="deleteUser(user.id)" class="ml-2">
                  <CIcon name="cil-trash" /> Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>

    <CModal :visible="isModalOpen" @close="closeModal">
      <CModalHeader>
        <CModalTitle>{{ isEditing ? 'Edit User' : 'Add User' }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput v-model="form.name" label="Name" placeholder="Enter name" />
          <CFormInput v-model="form.email" label="Email" placeholder="Enter email" class="mt-3" />
          <CFormSelect v-model="form.role" label="Role" class="mt-3">
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="member">Member</option>
          </CFormSelect>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal">Cancel</CButton>
        <CButton color="primary" @click="saveUser">{{ isEditing ? 'Update' : 'Add' }}</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([
  { id: 1, username: 'jDoe087', first_name: 'John', last_name: 'Doe', email: 'john@example.com', signup_date: '2025-02-26', role: 'member', paid_dues: true },
  { id: 2, username: 'hertzoXOXO', first_name: 'Jane', last_name: 'Dash', email: 'jane@example.com', signup_date: '2025-02-26', role: 'user', paid_dues: false },
  { id: 3, username: 'hetzo', first_name: 'Het', last_name: 'Zo', email: 'het@zo.com', signup_date: '2024-01-17', role: 'admin', paid_dues: true },
]);

const isModalOpen = ref(false);
const isEditing = ref(false);
const form = ref({
  id: null,
  name: '',
  email: '',
  role: 'user',
});

const openAddUserModal = () => {
  isEditing.value = false;
  resetForm();
  isModalOpen.value = true;
};

const openEditUserModal = (user) => {
  isEditing.value = true;
  form.value = { ...user };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const resetForm = () => {
  form.value = {
    id: null,
    name: '',
    email: '',
    role: 'user',
  };
};

const saveUser = () => {
  if (isEditing.value) {
    // Update user
    const index = users.value.findIndex((u) => u.id === form.value.id);
    users.value.splice(index, 1, { ...form.value });
  } else {
    // Add new user
    form.value.id = users.value.length + 1;
    users.value.push({ ...form.value });
  }
  closeModal();
};

const deleteUser = (id) => {
  users.value = users.value.filter((user) => user.id !== id);
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
