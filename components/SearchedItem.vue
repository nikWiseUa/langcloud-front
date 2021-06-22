<template>
  <v-card width="500px" class="mx-auto my-12 d-flex flex-column align-center">
    <v-img
      width="100%"
      :src="
        item.image
          ? item.image
          : `https://via.placeholder.com/400X400.JPEG?text=${item.en}`
      "
      alt="Words image"
    />
    <v-card-title class="text-h4"
      ><h4>{{ item.en }}</h4></v-card-title
    >
    <v-card-text class="text-h5"
      >Translate - <span>{{ item[currLang] }}</span></v-card-text
    >
  </v-card>
</template>

<script>
export default {
  name: 'SearcheItem',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({
        en: 'Errors',
      }),
    },
  },
  data: () => ({
    currLang: 'ua',
  }),
};
</script>
