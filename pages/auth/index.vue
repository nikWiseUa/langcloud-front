<template>
  <div>
    Auth
    <template>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="pass"
          :rules="passRules"
          type="password"
          label="Pass"
          required
        >
        </v-text-field>

        <v-checkbox
          v-model="checkbox"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="registerHandler"
        >
          Register
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Reset Validation
        </v-btn>
      </v-form>
    </template>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    pass: '',
    passRules: [
      (v) => !!v || 'Pass is required',
      (v) => /[0-9a-z]{6,}/.test(v) || 'Pass must be 6 length or more',
    ],
    checkbox: false,
  }),

  methods: {
    ...mapActions({ register: 'auth/register' }),
    async registerHandler() {
      if (!this.$refs.form.validate()) return;
      const fData = {
        username: this.name,
        password: this.pass,
      };
      const isTrueAuth = await this.register(fData);
      isTrueAuth && this.$router.push('/profile');
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
