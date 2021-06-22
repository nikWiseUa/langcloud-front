<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="d-flex justify-center">
      <v-col cols="6">
        <img src="@/static/grand.jpg" alt="Godfather" class="godfather" />
      </v-col>
      <v-col cols="3" class="d-flex flex-column justify-center">
        <v-card-title class="headline">
          <h2>Welcome to the Lang Club</h2>
        </v-card-title>
        <v-card-text>
          This is where you can learn English to improve your skills.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style lang="scss">
.godfather {
  object-fit: contain;
  max-height: 750px;
  width: 100%;
}
.v-navigation-drawer {
  max-height: 100vh !important;
}
.v-footer {
  z-index: 999;
}
.v-card__title {
  word-break: normal;
}
</style>
