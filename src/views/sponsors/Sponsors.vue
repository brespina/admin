<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Manage Sponsors</strong>
      </CCardHeader>
      <CCardBody>
        <CButton color="primary" @click="openAddSponsorModal" class="mb-4">
          <CIcon name="cil-plus" /> Add Sponsor
        </CButton>

        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell
                v-for="attri in sponsorAttributes"
                :key="attri"
                >{{ attri }}</CTableHeaderCell
              >
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="sponsor in sponsors" :key="sponsor.id">
              <CTableDataCell>{{ sponsor.id }}</CTableDataCell>
              <CTableDataCell>{{ sponsor.first_name }}</CTableDataCell>
              <CTableDataCell>{{ sponsor.last_name }}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="warning"
                  size="sm"
                  @click="openEditSponsorModal(sponsor)"
                >
                  <CIcon name="cil-pencil" /> Edit
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  @click="deleteSponsor(sponsor.id)"
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
        <CModalTitle>{{ isEditing ? "Edit Sponsor" : "Add User" }}</CModalTitle>
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
        <CButton color="primary" @click="saveSponsor">{{
          isEditing ? "Update" : "Add"
        }}</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>
<script setup>
import { ref } from "vue";
const sponsors = ref([
  {
    id: 1,
    first_name: "sponsor1",
    last_name: "aaaaaaaaaaa",
  },
  {
    id: 2,
    first_name: "jfkdl;saf",
    last_name: "smith",
  },
]);
const sponsorAttributes = ["ID", "First Name", "Last Name", "Actions"];

const isModalOpen = ref(false);
const isEditing = ref(false);
const form = ref({
  id: null,
  first_name: "",
  last_name: "",
});

// want to make a general openAddModal for each page to use
const openAddSponsorModal = () => {
  isEditing.value = false;
  resetForm();
  isModalOpen.value = true;
};

const openEditSponsorModal = (sponsor) => {
  isEditing.value = true;
  form.value = { ...sponsor };
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

const saveSponsor = () => {
  if (isEditing.value) {
    const index = sponsors.value.findIndex((o) => o.id === form.value.id);
    sponsors.value.splice(index, 1, { ...form.value });
  } else {
    form.value.id = sponsors.value.length + 1;
    sponsors.value.push({ ...form.value });
  }
  closeModal();
};

const deleteSponsor = (id) => {
  sponsors.value = sponsors.value.filter((sponsor) => sponsor.id !== id);
};
</script>
