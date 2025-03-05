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
              <CTableHeaderCell v-for="attri in userAttributes" :key="attri">{{
                attri
              }}</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="user in users" :key="user.id">
              <!-- maybe find a way to loop this as well -->
              <CTableDataCell>{{ user.id }}</CTableDataCell>
              <CTableDataCell>{{ user.username }}</CTableDataCell>
              <CTableDataCell>{{ user.first_name }}</CTableDataCell>
              <CTableDataCell>{{ user.last_name }}</CTableDataCell>
              <CTableDataCell>{{ user.email }}</CTableDataCell>
              <CTableDataCell>{{ user.signup_date }}</CTableDataCell>
              <CTableDataCell>{{ user.role }}</CTableDataCell>
              <CTableDataCell>{{ user.paid_dues }}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="warning"
                  size="sm"
                  @click="openEditUserModal(user)"
                >
                  <CIcon name="cil-pencil" /> Edit
                </CButton>

                <!-- need to ask admin ARE YOU SURE TODO FIXME-->
                <CButton
                  color="danger"
                  size="sm"
                  @click="deleteUser(user.id)"
                  class="ml-2"
                >
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
        <CModalTitle>{{ isEditing ? "Edit User" : "Add User" }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <!-- need to validate inputs TODO FIXME -->
        <!-- will make post request to db -->
        <CForm>
          <CFormInput
            v-model="form.username"
            label="Username"
            placeholder="Enter username"
          />
          <CFormInput
            v-model="form.first_name"
            label="First name"
            placeholder="Enter first name"
          />
          <CFormInput
            v-model="form.last_name"
            label="Last name"
            placeholder="Enter last name"
          />
          <CFormInput
            v-model="form.email"
            label="Email"
            placeholder="Enter email"
            class="mb-4"
          />
          <CFormInput
            v-model="form.signup_date"
            label="Sign up date"
            placeholder="Enter sign up date"
          />
          <CFormSelect v-model="form.role" label="Role" class="mb-4">
            <option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </option>
          </CFormSelect>

          <!-- TRY CHECK BOX -->
          <CFormSelect v-model="form.paid_dues" label="Paid dues" class="mb-4">
            <option value="true">True</option>
            <option value="false">False</option>
          </CFormSelect>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal">Cancel</CButton>
        <CButton color="primary" @click="saveUser">{{
          isEditing ? "Update" : "Add"
        }}</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
const users = ref([
  {
    id: 1,
    username: "jDoe087",
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    signup_date: "2025-02-26",
    role: "member",
    paid_dues: true,
  },
  {
    id: 2,
    username: "hertzoXOXO",
    first_name: "Jane",
    last_name: "Dash",
    email: "jane@example.com",
    signup_date: "2025-02-26",
    role: "user",
    paid_dues: false,
  },
  {
    id: 3,
    username: "hetzo",
    first_name: "Het",
    last_name: "Zo",
    email: "het@zo.com",
    signup_date: "2024-01-17",
    role: "admin",
    paid_dues: true,
  },
]);

const userAttributes = [
  "ID",
  "Username",
  "First Name",
  "Last Name",
  "Email",
  "Sign Up Date",
  "Role",
  "Paid Dues",
  "Actions",
];

const roles = ref(["admin", "user", "member"]);
const isModalOpen = ref(false);
const isEditing = ref(false);
const form = ref({
  id: null,
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  signup_date: "",
  role: "user",
  paid_dues: false,
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
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    signup_date: "",
    role: "user",
    paid_dues: false,
  };
};

const saveUser = () => {
  if (isEditing.value) {
    const index = users.value.findIndex((u) => u.id === form.value.id);
    users.value.splice(index, 1, { ...form.value });
  } else {
    form.value.id = users.value.length + 1;
    users.value.push({ ...form.value });
  }
  closeModal();
};

const deleteUser = (id) => {
  users.value = users.value.filter((user) => user.id !== id);
};
</script>
