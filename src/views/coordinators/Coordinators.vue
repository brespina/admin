<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Manage Coordinators</strong>
      </CCardHeader>
      <CCardBody>
        <CButton color="primary" @click="openAddCoordinatorModal" class="mb-4">
          <CIcon name="cil-plus" /> Add Coordinator
        </CButton>

        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell
                v-for="attri in coordinatorAttributes"
                :key="attri"
                >{{ attri }}</CTableHeaderCell
              >
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow
              v-for="coordinator in coordinators"
              :key="coordinator.id"
            >
              <CTableDataCell>{{ coordinator.id }}</CTableDataCell>
              <CTableDataCell>{{ coordinator.first_name }}</CTableDataCell>
              <CTableDataCell>{{ coordinator.last_name }}</CTableDataCell>
              <CTableDataCell>{{ coordinator.team }}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="warning"
                  size="sm"
                  @click="openEditCoordinatorModal(coordinator)"
                >
                  <CIcon name="cil-pencil" /> Edit
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  @click="deleteCoordinator(coordinator.id)"
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
        <CModalTitle>{{
          isEditing ? "Edit Coordinator" : "Add User"
        }}</CModalTitle>
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
          <CFormSelect v-model="form.team" label="Team" class="mb-4">
            <option v-for="team in teams" :key="team" :value="team">
              {{ team }}
            </option>
          </CFormSelect>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal">Cancel</CButton>
        <CButton color="primary" @click="saveCoordinator">{{
          isEditing ? "Update" : "Add"
        }}</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>
<script setup>
import { ref } from "vue";
const coordinators = ref([
  {
    id: 1,
    first_name: "coordinator1",
    last_name: "teehee",
    team: "League of Legends",
  },
  {
    id: 2,
    first_name: "her jett",
    last_name: "his sage",
    team: "Marvel Rivals",
  },
]);
const teams = [
  "League of Legends",
  "Marvel Rivals",
  "Counter Strike 2",
  "Valorant",
];
const coordinatorAttributes = [
  "ID",
  "First Name",
  "Last Name",
  "Team",
  "Actions",
];

const isModalOpen = ref(false);
const isEditing = ref(false);
const form = ref({
  id: null,
  first_name: "",
  last_name: "",
});

// want to make a general openAddModal for each page to use
const openAddCoordinatorModal = () => {
  isEditing.value = false;
  resetForm();
  isModalOpen.value = true;
};

const openEditCoordinatorModal = (coordinator) => {
  isEditing.value = true;
  form.value = { ...coordinator };
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

const saveCoordinator = () => {
  if (isEditing.value) {
    const index = coordinators.value.findIndex((o) => o.id === form.value.id);
    coordinators.value.splice(index, 1, { ...form.value });
  } else {
    form.value.id = coordinators.value.length + 1;
    coordinators.value.push({ ...form.value });
  }
  closeModal();
};

const deleteCoordinator = (id) => {
  coordinators.value = coordinators.value.filter(
    (coordinator) => coordinator.id !== id,
  );
};
</script>
