<template>
  <section class="categories">
    <h3 class="text-h4 mt-2">
      <span>Category: </span>
      <span>
        {{ chousedCategory.en }}
      </span>
    </h3>
    <v-form ref="form" v-model="valid" class="settings mt-4" lazy-validation>
      <v-row class="settings my-3 d-flex justify-center">
        <v-col cols="4" class="d-flex justify-center align-center">
          <h6 class="text-h6">TimeLine</h6>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="timeline"
            row
            class="d-felx justify-space-between"
          >
            <v-radio
              cols="4"
              label="30"
              color="indigo"
              :value="30"
              class="flex-grow-1 radio justify-center"
            ></v-radio>
            <v-radio
              label="60"
              color="orange"
              :value="60"
              class="flex-grow-1 radio justify-center"
            ></v-radio>
            <v-radio
              label="120"
              color="red"
              :value="120"
              class="flex-grow-1 radio justify-center"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row class="settings my-3 d-flex justify-center">
        <v-col cols="4" class="d-flex justify-center align-center">
          <h6 class="text-h6">Type</h6>
        </v-col>
        <v-col class="d-flex justify-center" cols="2">
          <v-checkbox
            v-model="words"
            label="Words"
            color="indigo"
            hide-details
            :rules="typeRules"
          ></v-checkbox>
        </v-col>
        <v-col class="d-flex justify-center" cols="2">
          <v-checkbox
            v-model="idioms"
            label="Idioms"
            color="indigo"
            hide-details
            :rules="typeRules"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row class="settings my-3 d-flex justify-center">
        <v-col cols="4" class="d-flex justify-center align-center">
          <h6 class="text-h6">Mode</h6>
        </v-col>
        <v-col cols="4">
          <v-radio-group
            v-model="mode"
            row
            class="d-felx justify-space-between"
          >
            <v-radio
              label="[lang] => en"
              color="indigo"
              :value="1"
              class="flex-grow-1 radio justify-center"
            ></v-radio>
            <v-radio
              label="en => [lang]"
              color="indigo"
              :value="2"
              class="flex-grow-1 radio justify-center"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center mt-5">
        <v-btn color="success" @click="settingsAccceptHandler"> accept </v-btn>
      </v-row>
    </v-form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    words: true,
    idioms: true,
    timeline: 30,
    mode: 1,
    valid: true,
  }),
  computed: {
    ...mapGetters({
      chousedCategory: 'categories/chousedCategory',
    }),
    typeRules() {
      return [() => this.words || this.idioms];
    },
  },
  mounted() {},
  methods: {
    ...mapActions({ setGameSettings: 'game/setGameSettings' }),
    settingsAccceptHandler() {
      if (!this.validate) return;
      const { words, idioms, timeline, mode } = this;
      this.setGameSettings({ words, idioms, timeline, mode });
      this.$router.push(`/game/${this.chousedCategory.id}`, 1);
    },
    validate() {
      return this.$refs.form.validate();
    },
  },
};
</script>

<style lang="scss">
.v-radio .v-label {
  flex: 0 !important;
  white-space: nowrap;
}
</style>
