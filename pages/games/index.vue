<template>
  <section class="games">
    <h2 class="text-h2">{{ title }}</h2>
    <component
      :is="currentComponent"
      @swipeToSettings="swipeToSettings('settings')"
    />
  </section>
</template>
<script>
import temes from '../../components/game/temes.vue';
import settings from '../../components/game/settings.vue';

export default {
  components: { temes, settings },
  data: () => ({
    currentComponent: 'temes',
    title: 'Chouse Game Category',
  }),
  methods: {
    swipeToSettings(componentName) {
      this.title = 'Settings';
      this.currentComponent = componentName;
    },
  },
};
</script>
