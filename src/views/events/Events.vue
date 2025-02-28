<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Manage Events</strong>
      </CCardHeader>

      <CCardBody>
        <CButton color="primary" @click="openAddEventModal" class="mb-4">
          <CIcon name="cil-plus" /> Add Event
        </CButton>

        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>
              <CTableHeaderCell>Location</CTableHeaderCell>
              <CTableHeaderCell>Date Time</CTableHeaderCell>
              <CTableHeaderCell>End Time</CTableHeaderCell>
              <CTableHeaderCell>Attendance</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            <CTableRow v-for="event in events" :key="event.id">
              <CTableDataCell>{{ event.id }}</CTableDataCell>
              <CTableDataCell>{{ event.title }}</CTableDataCell>
              <CTableDataCell>{{ event.desc }}</CTableDataCell>
              <CTableDataCell>{{ event.loc }}</CTableDataCell>
              <CTableDataCell>{{ event.date_time }}</CTableDataCell>
              <CTableDataCell>{{ event.end_time }}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="warning"
                  size="sm"
                  @click="openEditEventModal(event)"
                >
                  <CIcon name="cil-pencil" /> Edit
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  @click="deleteEvent(event.id)"
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
  </div>
</template>

<script setup>
import { ref } from "vue";

const events = ref([
  {
    id: 1,
    title: "test 1",
    desc: "testing with testers on test test desu",
    loc: "pgh 533",
    date_time: "2025-02-28T08:20:00",
    end_time: "2025-02-28T12:20:00",
  },
  {
    id: 2,
    title: "test 2",
    desc: "hi hi hi",
    loc: "pgh 563",
    date_time: "2025-02-02T08:00:00",
    end_time: "2025-02-02T12:00:00",
  },
]);

const isModalOpen = ref(false);
const isEditing = ref(false);
const form = ref({
  id: null,
  title: "",
  desc: "",
  loc: "",
  date_time: "",
  start_time: "",
});




</script>

