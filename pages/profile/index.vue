<template>
  <div>
    <h2 class="py-4 text-h3">
      <span v-if="stats.name">{{ stats.name }}</span>
    </h2>
    <div
      v-if="stats.isHavingStats"
      class="d-flex align-center justify-space-around"
    >
      <ProfileChart :week-data="stats.weekData" />
      <div v-if="stats.statistic" class="text-h6">
        <p>About</p>
        <p>
          Words learned: <span>{{ stats.statistic.wordsLearned }}</span>
        </p>
        <p>
          Text read:
          <span>{{
            stats.statistic.textsRead ? stats.statistic.textsRead : 0
          }}</span>
        </p>
      </div>
    </div>
    <div v-else class="">
      <p class="text-h4">
        Ви ще не вивчали нічого на цій платформі, для відкриття персональної
        статистики почніть вивчати ангійську на нашій платформі !
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileChart from '@/components/ProfileChart.vue';

export default {
  name: 'Profile',
  components: { ProfileChart },
  computed: {
    ...mapGetters({
      stats: 'user/getUserStats',
    }),
  },
  mounted() {
    this.fetchStats();
  },
  methods: {
    ...mapActions({
      fetchStats: 'user/fetchUserStatistic',
    }),
  },
};
</script>
