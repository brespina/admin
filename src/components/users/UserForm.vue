<template>
  <CModal :visible="visible" @close="emit('close')">
    <CModalHeader>
      <CModalTitle>{{ form.user_id ? "Edit User" : "Add User" }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm @submit.prevent="handleSubmit">
        <CFormInput
          v-model="form.username"
          label="Username"
          required
          class="mb-2"
        />
        <CFormInput
          v-model="form.email"
          label="Email"
          type="email"
          required
          class="mb-2"
        />
        <CFormInput
          v-model="form.first_name"
          label="First Name"
          required
          class="mb-2"
        />
        <CFormInput
          v-model="form.last_name"
          label="Last Name"
          required
          class="mb-2"
        />
        <CFormSwitch v-model="form.paid_dues" label="Paid Dues" class="mb-2" />
        <CFormInput
          v-model="form.signup_date"
          label="Signup Date"
          type="date"
          required
          class="mb-2"
        />
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="emit('close')">Cancel</CButton>
      <CButton color="primary" @click="handleSubmit">
        {{ form.user_id ? "Save" : "Add" }}
      </CButton>
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
  CFormSwitch,
  CButton,
} from "@coreui/vue";

const props = defineProps({
  visible: Boolean,
  user: Object, // null for add, object for edit
});

const emit = defineEmits(["submit", "close"]);

const form = ref({
  user_id: null,
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  paid_dues: false,
  signup_date: "",
});

// Reset form on user prop change
watch(
  () => props.user,
  (user) => {
    if (user) {
      form.value = { ...user };
      form.value.password = ""; // Never prefill password!
    } else {
      form.value = {
        user_id: null,
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        paid_dues: false,
        signup_date: "",
        password: "",
      };
    }
  },
  { immediate: true },
);

function handleSubmit() {
  emit("submit", { ...form.value });
}
</script>
