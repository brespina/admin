<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Manage Matches</strong>
      </CCardHeader>
      <CCardBody>
        <CButton color="primary" @click="openAddMatchModal" class="mb-4">
          <CIcon name="cil-plus" /> Add Match
        </CButton>

        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>ACTIONS</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="match in matches" :key="match.id">
              <CTableDataCell>{{ match.id }}</CTableDataCell>
              <CTableDataCell>{{ match.id }}</CTableDataCell>
              <CTableDataCell>{{ match.id }}</CTableDataCell>
              <CTableDataCell>{{ match.id }}</CTableDataCell>
              <CTableDataCell>{{ match.id }}</CTableDataCell>
              <CTableDataCell>{{ match.id }}</CTableDataCell>
              <CtableDataCell>
                <CButton
                  color="warning"
                  size="sm"
                  @click="openEditMatchModal(match)"
                >
                  <CIcon name="cil-pencil" /> Edit
                </CButton>
                <!-- again ask admin are you sure TODO FIXME -->
                <CButton
                  color="danger"
                  size="sm"
                  @click="deleteMatch(match.id)"
                  class="ml-2"
                >
                  <CIcon name="cil-trash" /> Delete
                </CButton>
              </CtableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>

    <CModal :visible="isModalOpen" @close="closeModal">
      <CModalHeader>
        <CModalTitle>{{ isEditing ? "Edit Match" : "Add Match" }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <!-- ONCE AGAIN validating inputs is good for ones health TODO-->
        <CForm>
          <CFormInput
            v-model="form.name"
            label="Name"
            placeholder="Enter Name"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal">Cancel</CButton>
        <CButton color="primary" @click="saveMatch">{{
          isEditing ? "Update" : "Add"
        }}</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
// TODO: POPULATE EXISTING VALUES INTO EDIT FORM
const matches = ref([
  {
    id: 1,
  },
]);

const isModalOpen = ref(false);
const isEditing = ref(false);
const form = ref({
  id: null,
});

const openAddMatchModal = () => {
  isEditing.value = false;
  resetForm();
  isModalOpen.value = true;
};

const openEditMatchModal = (match) => {
  isEditing.value = true;
  form.value = { ...match };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const resetForm = () => {
  form.value = {
    id: null,
  };
};

const saveMatch = () => {
  if (isEditing.value) {
    const index = matches.value.findIndex((m) => m.id === match.value.id);
    matches.value.splice(index, 1, { ...form.value });
  } else {
    form.value.id = matches.value.length + 1;
    matches.value.push({ ...form.value });
  }
  closeModal();
};

const deleteMatch = (id) => {
  matches.value = matches.value.filter((match) => match.id !== id);
};
</script>
