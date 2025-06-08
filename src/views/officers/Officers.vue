<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Officers</h2>
      <CButton color="primary" @click="openAddModal">Add Officer</CButton>
    </div>
    <CInputGroup class="mb-3" size="sm">
      <CFormInput v-model="search" placeholder="Search officers..." />
    </CInputGroup>
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Officer ID</CTableHeaderCell>
          <CTableHeaderCell>User ID</CTableHeaderCell>
          <CTableHeaderCell>Role ID</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="o in filteredOfficers" :key="o.officer_id">
          <CTableDataCell>{{ o.officer_id }}</CTableDataCell>
          <CTableDataCell>{{ o.user_id }}</CTableDataCell>
          <CTableDataCell>{{ o.role_id }}</CTableDataCell>
          <CTableDataCell>
            <CButton size="sm" color="info" @click="openEditModal(o)"
              >Edit</CButton
            >
            <CButton size="sm" color="danger" class="ms-2" @click="onDelete(o)"
              >Delete</CButton
            >
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <OfficerForm
      :visible="modalVisible"
      :officer="editingOfficer"
      @submit="onFormSubmit"
      @close="closeModal"
    />
    <CModal
      :visible="confirmDelete.visible"
      @close="confirmDelete.visible = false"
    >
      <CModalHeader><CModalTitle>Delete Officer</CModalTitle></CModalHeader>
      <CModalBody
        >Are you sure you want to delete officer #<b>{{
          confirmDelete.officer?.officer_id
        }}</b
        >?</CModalBody
      >
      <CModalFooter>
        <CButton color="secondary" @click="confirmDelete.visible = false"
          >Cancel</CButton
        >
        <CButton color="danger" @click="confirmDeleteOfficer">Delete</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import OfficerForm from "@/components/officers/OfficerForm.vue";
import {
  getOfficers,
  createOfficer,
  updateOfficer,
  deleteOfficer,
} from "@/services/officers.js";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CInputGroup,
  CFormInput,
} from "@coreui/vue";
const officers = ref([]);
const loading = ref(true);
const search = ref("");
const modalVisible = ref(false);
const editingOfficer = ref(null);
const confirmDelete = ref({ visible: false, officer: null });
const fetchOfficers = async () => {
  loading.value = true;
  const { data } = await getOfficers();
  officers.value = data;
  loading.value = false;
};
onMounted(fetchOfficers);
const filteredOfficers = computed(() => {
  if (!search.value.trim()) return officers.value;
  const s = search.value.toLowerCase();
  return officers.value.filter(
    (o) =>
      String(o.officer_id).includes(s) ||
      String(o.user_id).includes(s) ||
      String(o.role_id).includes(s),
  );
});
const openAddModal = () => {
  editingOfficer.value = null;
  modalVisible.value = true;
};
const openEditModal = (o) => {
  editingOfficer.value = { ...o };
  modalVisible.value = true;
};
const closeModal = () => {
  modalVisible.value = false;
  editingOfficer.value = null;
};
const onFormSubmit = async (o) => {
  o.officer_id ? await updateOfficer(o.officer_id, o) : await createOfficer(o);
  await fetchOfficers();
  closeModal();
};
const onDelete = (o) => {
  confirmDelete.value = { visible: true, officer: o };
};
const confirmDeleteOfficer = async () => {
  if (confirmDelete.value.officer) {
    await deleteOfficer(confirmDelete.value.officer.officer_id);
    await fetchOfficers();
    confirmDelete.value.visible = false;
    confirmDelete.value.officer = null;
  }
};
</script>
