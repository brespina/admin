<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Sponsors</h2>
      <CButton color="primary" @click="openAddModal">Add Sponsor</CButton>
    </div>
    <CInputGroup class="mb-3" size="sm">
      <CFormInput v-model="search" placeholder="Search sponsors..." />
    </CInputGroup>
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Name</CTableHeaderCell>
          <CTableHeaderCell>Start Date</CTableHeaderCell>
          <CTableHeaderCell>End Date</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="s in filteredSponsors" :key="s.sponsor_id">
          <CTableDataCell>{{ s.sponsor_name }}</CTableDataCell>
          <CTableDataCell>{{ formatDate(s.start_date) }}</CTableDataCell>
          <CTableDataCell>{{ formatDate(s.end_date) }}</CTableDataCell>
          <CTableDataCell>
            <CButton size="sm" color="info" @click="openEditModal(s)"
              >Edit</CButton
            >
            <CButton size="sm" color="danger" class="ms-2" @click="onDelete(s)"
              >Delete</CButton
            >
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <SponsorForm
      :visible="modalVisible"
      :sponsor="editingSponsor"
      @submit="onFormSubmit"
      @close="closeModal"
    />
    <CModal
      :visible="confirmDelete.visible"
      @close="confirmDelete.visible = false"
    >
      <CModalHeader><CModalTitle>Delete Sponsor</CModalTitle></CModalHeader>
      <CModalBody
        >Are you sure you want to delete
        <b>{{ confirmDelete.sponsor?.sponsor_name }}</b
        >?</CModalBody
      >
      <CModalFooter>
        <CButton color="secondary" @click="confirmDelete.visible = false"
          >Cancel</CButton
        >
        <CButton color="danger" @click="confirmDeleteSponsor">Delete</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import SponsorForm from "@/components/sponsors/SponsorForm.vue";
import {
  getSponsors,
  createSponsor,
  updateSponsor,
  deleteSponsor,
} from "@/services/sponsors.js";
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

const sponsors = ref([]);
const loading = ref(true);
const search = ref("");
const modalVisible = ref(false);
const editingSponsor = ref(null);
const confirmDelete = ref({ visible: false, sponsor: null });

const fetchSponsors = async () => {
  loading.value = true;
  const { data } = await getSponsors();
  sponsors.value = data;
  loading.value = false;
};
onMounted(fetchSponsors);

const filteredSponsors = computed(() => {
  if (!search.value.trim()) return sponsors.value;
  const s = search.value.toLowerCase();
  return sponsors.value.filter((t) => t.sponsor_name.toLowerCase().includes(s));
});
function formatDate(d) {
  return d ? new Date(d).toLocaleDateString() : "";
}
const openAddModal = () => {
  editingSponsor.value = null;
  modalVisible.value = true;
};
const openEditModal = (s) => {
  editingSponsor.value = { ...s };
  modalVisible.value = true;
};
const closeModal = () => {
  modalVisible.value = false;
  editingSponsor.value = null;
};
const onFormSubmit = async (s) => {
  s.sponsor_id ? await updateSponsor(s.sponsor_id, s) : await createSponsor(s);
  await fetchSponsors();
  closeModal();
};
const onDelete = (s) => {
  confirmDelete.value = { visible: true, sponsor: s };
};
const confirmDeleteSponsor = async () => {
  if (confirmDelete.value.sponsor) {
    await deleteSponsor(confirmDelete.value.sponsor.sponsor_id);
    await fetchSponsors();
    confirmDelete.value.visible = false;
    confirmDelete.value.sponsor = null;
  }
};
</script>
