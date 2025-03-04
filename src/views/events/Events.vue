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
              <CTableHeaderCell v-for="attri in eventAttributes" :key="attri">{{
                attri
              }}</CTableHeaderCell>
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
              <CTableDataCell>{{ event.attendance }}</CTableDataCell>
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

    <CModal :visible="isModalOpen" @close="closeModal">
      <CModalHeader>
        <CModalTitle>{{ isEditing ? "Edit Event" : "Add Event" }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <!-- need to validate inputs TODO FIXME -->
          <!-- will make post request to db -->
          <!--  -->
          <CFormInput
            v-model="form.title"
            label="Title"
            placeholder="Enter Title"
          />
          <CFormInput
            v-model="form.desc"
            label="Description"
            placeholder="Enter Description"
          />
          <CFormInput
            v-model="form.loc"
            label="Location"
            placeholder="Enter Location"
          />
          <!-- NEED TO MAKE CALENDAR POPUP AND VALID TIME SELECTION TODO FIXME -->
          <CFormInput
            v-model="form.date_time"
            label="Date Time"
            placeholder="Enter Date and Time"
          />
          <CFormInput
            v-model="form.end_time"
            label="End Time"
            placeholder="Enter End Time"
          />
          <CFormInput
            v-model="form.attendance"
            label="Attendance"
            placeholder="Enter Attendance"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal">Cancel</CButton>
        <CButton color="primary" @click="saveEvent">{{
          isEditing ? "Update" : "Add"
        }}</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script setup>
// TODO: I NEED TO POPULATE EXISTING VALUES FROM FORM TO EDIT FIELDS
import { ref } from "vue";

const events = ref([
  {
    id: 1,
    title: "test 1",
    desc: "testing with testers on test test desu",
    loc: "pgh 533",
    date_time: "2025-02-28T08:20:00",
    end_time: "2025-02-28T12:20:00",
    attendance: 200,
  },
  {
    id: 2,
    title: "test 2",
    desc: "hi hi hi",
    loc: "pgh 563",
    date_time: "2025-02-02T08:00:00",
    end_time: "2025-02-02T12:00:00",
    attendance: 200,
  },
]);

const eventAttributes = [
  "ID",
  "Title",
  "Description",
  "Location",
  "Date and Time",
  "End Time",
  "Attendance",
  "Actions",
];
const isModalOpen = ref(false);
const isEditing = ref(false);
const form = ref({
  id: null,
  title: "",
  desc: "",
  loc: "",
  date_time: "",
  start_time: "",
  attendance: 0,
});

const openAddEventModal = () => {
  isEditing.value = false;
  resetForm();
  isModalOpen.value = true;
};

const openEditEventModal = (event) => {
  isEditing.value = true;
  form.value = { ...event };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const resetForm = () => {
  form.value = {
    id: null,
    title: "",
    desc: "",
    loc: "",
    date_time: "",
    end_time: "",
    attendance: 0,
  };
};

const saveEvent = () => {
  if (isEditing.value) {
    const index = events.value.findIndex((e) => e.id === form.value.id);
    events.value.splice(index, 1, { ...form.value });
  } else {
    form.value.id = events.value.length + 1;
    events.value.push({ ...form.value });
  }
  closeModal();
};

// ASK ARE YOU SURE TODO FIXME
const deleteEvent = (id) => {
  events.value = events.value.filter((event) => event.id !== id);
};
</script>
