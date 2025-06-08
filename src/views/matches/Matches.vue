<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Matches</h2>
      <CButton color="primary" @click="openAddModal">Add Match</CButton>
    </div>

    <CInputGroup class="mb-3" size="sm">
      <CFormInput v-model="search" placeholder="Search matches..." />
    </CInputGroup>

    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Date & Time</CTableHeaderCell>
          <CTableHeaderCell>Opponent</CTableHeaderCell>
          <CTableHeaderCell>Team ID</CTableHeaderCell>
          <CTableHeaderCell>Watch Link</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="match in filteredMatches" :key="match.match_id">
          <CTableDataCell>{{ formatDateTime(match.date_time) }}</CTableDataCell>
          <CTableDataCell>{{ match.opponent_name }}</CTableDataCell>
          <CTableDataCell>{{ match.team_id }}</CTableDataCell>
          <CTableDataCell>
            <a v-if="match.watch_link" :href="match.watch_link" target="_blank">
              {{ match.watch_link }}
            </a>
          </CTableDataCell>
          <CTableDataCell>
            <CButton size="sm" color="info" @click="openEditModal(match)"
              >Edit</CButton
            >
            <CButton
              size="sm"
              color="danger"
              class="ms-2"
              @click="onDelete(match)"
              >Delete</CButton
            >
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>

    <MatchForm
      :visible="modalVisible"
      :match="editingMatch"
      @submit="onFormSubmit"
      @close="closeModal"
    />

    <CModal
      :visible="confirmDelete.visible"
      @close="confirmDelete.visible = false"
    >
      <CModalHeader>
        <CModalTitle>Delete Match</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Are you sure you want to delete the match against
        <b>{{ confirmDelete.match?.opponent_name }}</b
        >?
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="confirmDelete.visible = false"
          >Cancel</CButton
        >
        <CButton color="danger" @click="confirmDeleteMatch">Delete</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import MatchForm from "@/components/matches/MatchForm.vue";
import {
  getMatches,
  createMatch,
  updateMatch,
  deleteMatch,
} from "@/services/matches.js";
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

// State
const matches = ref([]);
const loading = ref(true);
const search = ref("");
const modalVisible = ref(false);
const editingMatch = ref(null);
const confirmDelete = ref({
  visible: false,
  match: null,
});

// Fetch matches
const fetchMatches = async () => {
  loading.value = true;
  const { data } = await getMatches();
  matches.value = data;
  loading.value = false;
};

onMounted(fetchMatches);

// Search filter
const filteredMatches = computed(() => {
  if (!search.value.trim()) return matches.value;
  const s = search.value.toLowerCase();
  return matches.value.filter(
    (m) =>
      m.opponent_name.toLowerCase().includes(s) ||
      (m.watch_link && m.watch_link.toLowerCase().includes(s)),
  );
});

// Helpers
function formatDateTime(dt) {
  return dt ? new Date(dt).toLocaleString() : "";
}

// Add/Edit Modal
const openAddModal = () => {
  editingMatch.value = null;
  modalVisible.value = true;
};
const openEditModal = (match) => {
  editingMatch.value = { ...match };
  modalVisible.value = true;
};
const closeModal = () => {
  modalVisible.value = false;
  editingMatch.value = null;
};

// Handle form submit
const onFormSubmit = async (match) => {
  if (match.match_id) {
    await updateMatch(match.match_id, match);
  } else {
    await createMatch(match);
  }
  await fetchMatches();
  closeModal();
};

// Delete logic
const onDelete = (match) => {
  confirmDelete.value = {
    visible: true,
    match,
  };
};
const confirmDeleteMatch = async () => {
  if (confirmDelete.value.match) {
    await deleteMatch(confirmDelete.value.match.match_id);
    await fetchMatches();
    confirmDelete.value.visible = false;
    confirmDelete.value.match = null;
  }
};
</script>
