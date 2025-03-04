<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Manage Teams</strong>
      </CCardHeader>
      <CCardBody>
        <CButton color="primary" @click="openAddTeamModal" class="mb-4">
          <CIcon name="cil-plus" /> Add Team
        </CButton>

        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell v-for="attri in teamAttributes" :key="attri">{{
                attri
              }}</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="team in teams" :key="team.id">
              <CTableDataCell>{{ team.id }}</CTableDataCell>
              <CTableDataCell>{{ team.first_name }}</CTableDataCell>
              <CTableDataCell>{{ team.last_name }}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="warning"
                  size="sm"
                  @click="openEditTeamModal(team)"
                >
                  <CIcon name="cil-pencil" /> Edit
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  @click="deleteTeam(team.id)"
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
        <CModalTitle>{{ isEditing ? "Edit Team" : "Add User" }}</CModalTitle>
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
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal">Cancel</CButton>
        <CButton color="primary" @click="saveTeam">{{
          isEditing ? "Update" : "Add"
        }}</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>
<script setup>
import { ref } from "vue";
// TODO: REFACTOR FOR TEAMS ATTRIBUTES.
const teams = ref([
  {
    id: 1,
    first_name: "team1",
    last_name: "teehee",
  },
  {
    id: 2,
    first_name: "team1",
    last_name: "his sage",
  },
]);
const teamAttributes = ["ID", "First Name", "Last Name", "Actions"];

const isModalOpen = ref(false);
const isEditing = ref(false);
const form = ref({
  id: null,
  first_name: "",
  last_name: "",
});

// want to make a general openAddModal for each page to use
const openAddTeamModal = () => {
  isEditing.value = false;
  resetForm();
  isModalOpen.value = true;
};

const openEditTeamModal = (team) => {
  isEditing.value = true;
  form.value = { ...team };
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
  };
};

const saveTeam = () => {
  if (isEditing.value) {
    const index = teams.value.findIndex((o) => o.id === form.value.id);
    teams.value.splice(index, 1, { ...form.value });
  } else {
    form.value.id = teams.value.length + 1;
    teams.value.push({ ...form.value });
  }
  closeModal();
};

const deleteTeam = (id) => {
  teams.value = teams.value.filter((team) => team.id !== id);
};
</script>
