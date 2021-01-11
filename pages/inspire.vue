<template>
  <v-row no-gutters class="my-9">
    <v-row no-gutters class="align-center justify-space-between">
      <v-col v-if="textData.title">
        <h2>{{ textData.title.en }}</h2>
      </v-col>
    </v-row>
    <v-row no-gutters class="my-6">
      <v-card
        ref="translateCard"
        class="pa-2 translate transition"
        elevation="2"
        shaped
        :style="`transform: translate(${position.x}px, ${position.y}px)`"
      >
        {{ transText }}
      </v-card>
      <p
        class="text-h5 px-10"
        @mouseout="stage = false"
        @mouseover="stage = true"
        style="user-select: none"
      >
        <!-- @mousemove="mousemoveTextHandler" -->
        <span
          v-for="(word, ind) in post"
          :key="word + ind"
          class="word"
          @dblclick.prevent="showTranslateTest"
        >
          {{ word }}
        </span>
      </p>
    </v-row>
    <v-row>
      <v-tabs v-model="tab" align-with-title>
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab class="min-auto mr-10 ml-2">X</v-tab>
        <v-tab> show full translate </v-tab>
        <v-tab> translae sentances </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="w-full">
        <v-tab-item class="d-none"></v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="text-h6">
              {{ textData.ru }}
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-expansion-panels>
              <v-expansion-panel
                v-for="sent in sentences"
                :key="sent.en"
                class="py-2"
              >
                <v-expansion-panel-header>{{
                  sent.en
                }}</v-expansion-panel-header>
                <v-expansion-panel-content>{{
                  sent.ru
                }}</v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-row>
  </v-row>
</template>

<style lang="scss" scoped></style>

<script>
export default {
  async fetch() {
    const textData = await fetch('http://localhost:3000/text/random', {
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
    this.post = textData.en.split(/[ ]/).map((e) => {
      e = e.replace('__', ' ');
      return e;
    });
    this.textData = textData;
    this.sentences = textData.sentences[0];
    this.words = textData.words[0];
  },
  data() {
    return {
      textData: {},
      tab: null,
      post: 'rkgnrkjngj',
      sentences: '',
      words: {},
      stage: false,
      lastMove: 0,
      transText: '',
      position: {},
    };
  },
  methods: {
    showTranslateTest({ target }) {
      const word = target.closest('.word');
      if (!word) return;
      const position = word.getBoundingClientRect();
      // const positionEl = this.$refs.translateCard.$el.getBoundingClientRect();
      this.$refs.translateCard.$el.classList.add('transition');
      this.$refs.translateCard.$el.style.opacity = 0;
      const positionCenterXElement = position.left;
      const positionCenterYElement = position.top - position.height - 15;
      this.position = {
        x: positionCenterXElement,
        y: positionCenterYElement,
      };
      this.showTranslate(word.textContent.trim());
    },
    mousemoveTextHandler({ target }) {
      const date = Date.now();
      this.lastMove = date;
      const word = target.closest('.word');
      if (!word) return;
      setTimeout(() => {
        if (date === this.lastMove && this.stage) {
          this.showTranslate(word);
        }
      }, 2000);
    },
    showTranslate(word) {
      word = word.replace(/[^a-z ]/gi, '');

      if (word in this.words) {
        this.transText = this.words[word].ru;

        setTimeout(() => {
          this.$refs.translateCard.$el.classList.remove('transition');
          this.$refs.translateCard.$el.style.opacity = 1;
        }, 200);
      }
    },
  },
};
</script>
