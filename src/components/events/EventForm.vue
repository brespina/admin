<template>
  <CModal :visible="visible" @close="emit('close')">
    <CModalHeader>
      <CModalTitle>{{
        form.event_id ? "Edit Event" : "Add Event"
      }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm @submit.prevent="handleSubmit">
        <CFormInput v-model="form.title" label="Title" required class="mb-2" />
        <CFormTextarea
          v-model="form.description"
          label="Description"
          required
          class="mb-2"
          rows="3"
        />
        <CFormInput
          v-model="form.location"
          label="Location"
          required
          class="mb-2"
        />
        <CFormInput
          v-model="form.date_time"
          label="Start Date/Time"
          type="datetime-local"
          required
          class="mb-2"
        />
        <CFormInput
          v-model="form.end_time"
          label="End Date/Time"
          type="datetime-local"
          required
          class="mb-2"
        />
        <CFormInput
          v-model="form.attendance"
          label="Attendance"
          type="number"
          min="0"
          class="mb-2"
        />
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="emit('close')">Cancel</CButton>
      <CButton color="primary" @click="handleSubmit">{{
        form.event_id ? "Save" : "Add"
      }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script setup>
import { ref, watch } from "vue";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormTextarea,
  CButton,
} from "@coreui/vue";

const props = defineProps({
  visible: Boolean,
  event: Object,
});
const emit = defineEmits(["submit", "close"]);

const form = ref({
  event_id: null,
  title: "",
  description: "",
  location: "",
  date_time: "",
  end_time: "",
  attendance: 0,
});

watch(
  () => props.event,
  (event) => {
    if (event) {
      form.value = { ...event };
    } else {
      form.value = {
        event_id: null,
        title: "",
        description: "",
        location: "",
        date_time: "",
        end_time: "",
        attendance: 0,
      };
    }
  },
  { immediate: true },
);

function handleSubmit() {
  emit("submit", { ...form.value });
}
</script>
