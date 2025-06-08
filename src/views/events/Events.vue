<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Events</h2>
      <CButton color="primary" @click="openAddModal">Add Event</CButton>
    </div>

    <CInputGroup class="mb-3" size="sm">
      <CFormInput
        v-model="search"
        placeholder="Search events..."
      />
    </CInputGroup>

    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Title</CTableHeaderCell>
          <CTableHeaderCell>Description</CTableHeaderCell>
          <CTableHeaderCell>Location</CTableHeaderCell>
          <CTableHeaderCell>Start</CTableHeaderCell>
          <CTableHeaderCell>End</CTableHeaderCell>
          <CTableHeaderCell>Attendance</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="event in filteredEvents" :key="event.event_id">
          <CTableDataCell>{{ event.title }}</CTableDataCell>
          <CTableDataCell>
            <span style="max-width: 200px; display: inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              {{ event.description }}
            </span>
          </CTableDataCell>
          <CTableDataCell>{{ event.location }}</CTableDataCell>
          <CTableDataCell>{{ formatDateTime(event.date_time) }}</CTableDataCell>
          <CTableDataCell>{{ formatDateTime(event.end_time) }}</CTableDataCell>
          <CTableDataCell>{{ event.attendance }}</CTableDataCell>
          <CTableDataCell>
            <CButton size="sm" color="info" @click="openEditModal(event)">Edit</CButton>
            <CButton size="sm" color="danger" class="ms-2" @click="onDelete(event)">Delete</CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>

    <EventForm
      :visible="modalVisible"
      :event="editingEvent"
      @submit="onFormSubmit"
      @close="closeModal"
    />

    <CModal :visible="confirmDelete.visible" @close="confirmDelete.visible = false">
      <CModalHeader>
        <CModalTitle>Delete Event</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Are you sure you want to delete <b>{{ confirmDelete.event?.title }}</b>?
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="confirmDelete.visible = false">Cancel</CButton>
        <CButton color="danger" @click="confirmDeleteEvent">Delete</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import EventForm from '@/components/events/EventForm.vue'
import { getEvents, createEvent, updateEvent, deleteEvent } from '@/services/events.js'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CInputGroup, CFormInput } from '@coreui/vue'

// State
const events = ref([])
const loading = ref(true)
const search = ref('')
const modalVisible = ref(false)
const editingEvent = ref(null)
const confirmDelete = ref({
  visible: false,
  event: null,
})

// Fetch events
const fetchEvents = async () => {
  loading.value = true
  const { data } = await getEvents()
  events.value = data
  loading.value = false
}

onMounted(fetchEvents)

// Search filter
const filteredEvents = computed(() => {
  if (!search.value.trim()) return events.value
  const s = search.value.toLowerCase()
  return events.value.filter(
    e =>
      e.title.toLowerCase().includes(s) ||
      (e.location && e.location.toLowerCase().includes(s)) ||
      (e.description && e.description.toLowerCase().includes(s))
  )
})

// Helpers
function formatDateTime(dt) {
  return dt ? new Date(dt).toLocaleString() : ''
}

// Add/Edit Modal
const openAddModal = () => {
  editingEvent.value = null
  modalVisible.value = true
}
const openEditModal = (event) => {
  editingEvent.value = { ...event }
  modalVisible.value = true
}
const closeModal = () => {
  modalVisible.value = false
  editingEvent.value = null
}

// Handle form submit
const onFormSubmit = async (event) => {
  if (event.event_id) {
    await updateEvent(event.event_id, event)
  } else {
    await createEvent(event)
  }
  await fetchEvents()
  closeModal()
}

// Delete logic
const onDelete = (event) => {
  confirmDelete.value = {
    visible: true,
    event,
  }
}
const confirmDeleteEvent = async () => {
  if (confirmDelete.value.event) {
    await deleteEvent(confirmDelete.value.event.event_id)
    await fetchEvents()
    confirmDelete.value.visible = false
    confirmDelete.value.event = null
  }
}
</script>
