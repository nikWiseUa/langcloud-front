<template>
  <div class="small">
    <lineChart
      :chart-data="datacollection"
      :options="{
        type: 'bar',
        layout: {
          padding: 20,
        },
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }"
    ></lineChart>
  </div>
</template>

<script>
import LineChart from './LineChart.js';

export default {
  components: {
    LineChart,
  },
  props: {
    weekData: {
      type: Object,
      default: () => ({
        wordsInWeek: [0, 0, 0, 0, 0, 0, 0],
      }),
    },
  },
  data() {
    return {
      datacollection: {},
    };
  },
  watch: {
    weekData(e) {
      if (!e) return;
      this.fillData();
    },
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [
          {
            label: 'Words Learned',
            backgroundColor: '#f87979',
            data: this.weekData.wordsInWeek,
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>

<style>
.small {
  width: 50%;
  max-width: 600px;
}
</style>
