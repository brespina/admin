<!-- ONLY PRESIDENT AND VICE PRESIDENT SHOULD HAVE WRITE ACCESS THIS VIEW -->
<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Manage Officers</strong>
      </CCardHeader>
      <CCardBody>
        <CButton color="primary" @click="openAddOfficerModal" class="mb-4">
          <CIcon name="cil-plus" /> Add Officer
        </CButton>

        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell
                v-for="attri in officerAttributes"
                :key="attri"
                >{{ attri }}</CTableHeaderCell
              >
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="officer in officers" :key="officer.id">
              <CTableDataCell>{{ officer.id }}</CTableDataCell>
              <CTableDataCell>{{ officer.first_name }}</CTableDataCell>
              <CTableDataCell>{{ officer.last_name }}</CTableDataCell>
              <CTableDataCell>{{ officer.admin_role }}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="warning"
                  size="sm"
                  @click="openEditOfficerModal(officer)"
                >
                  <CIcon name="cil-pencil" /> Edit
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  @click="deleteOfficer(officer.id)"
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
        <CModalTitle>{{ isEditing ? "Edit Officer" : "Add User" }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
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
        </CForm>

        <CFormSelect v-model="form.admin_role" label="Admin Role" class="mb-4">
          <option v-for="role in adminRoles" :key="role" :value="role">
            {{ role }}
          </option>
        </CFormSelect>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal">Cancel</CButton>
        <CButton color="primary" @click="saveOfficer">{{
          isEditing ? "Update" : "Add"
        }}</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>
<script setup>
import { ref } from "vue";
const officers = ref([
  {
    id: 1,
    first_name: "BlockedBy",
    last_name: "James",
    admin_role: "Vice President",
  },
  {
    id: 2,
    first_name: "ZOLTRAAK",
    last_name: "FRIEREN",
    admin_role: "President",
  },
]);

const adminRoles = ref([
  "President",
  "Vice President",
  "Secretary",
  "Esports Director",
  "Treasurer",
  "Event Planner",
  "Sponsorship Manager",
  "Marketing Coordinator",
  "Social Media Manager",
]);

const officerAttributes = ref([
  "ID",
  "First Name",
  "Last Name",
  "Admin Role",
  "Actions",
]);

const isModalOpen = ref(false);
const isEditing = ref(false);
const form = ref({
  id: null,
  first_name: "",
  last_name: "",
  admin_role: "",
});

// want to make a general openAddModal for each page to use
const openAddOfficerModal = () => {
  isEditing.value = false;
  resetForm();
  isModalOpen.value = true;
};

const openEditOfficerModal = (officer) => {
  isEditing.value = true;
  form.value = { ...officer };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const resetForm = () => {
  form.value = {
    id: null,
    first_name: "",
    last_name: "",
    admin_role: "",
  };
};

const saveOfficer = () => {
  if (isEditing.value) {
    const index = officers.value.findIndex((o) => o.id === form.value.id);
    officers.value.splice(index, 1, { ...form.value });
  } else {
    form.value.id = officers.value.length + 1;
    officers.value.push({ ...form.value });
  }
  closeModal();
};

const deleteOfficer = (id) => {
  officers.value = officers.value.filter((officer) => officer.id !== id);
};
</script>
