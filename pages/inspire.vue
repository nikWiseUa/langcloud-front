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
      <p class="text-h5 px-10">
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
  middleware: 'auth',
  async fetch() {
    const textData = await fetch(process.env.baseUrl + '/text/random', {
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
      lastMove: 0,
      transText: '',
      position: {},
      localLang: 'ru',
      translateTimer: null,
    };
  },
  methods: {
    showTranslateTest({ target }) {
      const word = target.closest('.word');
      if (!word) return;
      this.showTranslate(word);
    },
    setPositionTranslate(position) {
      this.$refs.translateCard.$el.classList.add('transition');
      this.$refs.translateCard.$el.style.opacity = 0;
      const positionCenterXElement = position.left;
      const positionCenterYElement = position.top - position.height - 15;
      this.position = {
        x: positionCenterXElement,
        y: positionCenterYElement,
      };

      setTimeout(() => {
        this.$refs.translateCard.$el.classList.remove('transition');
        this.$refs.translateCard.$el.style.opacity = 1;
      }, 200);

      if (this.translateTimer) {
        clearInterval(this.translateTimer);
      }
      this.translateTimer = setTimeout(() => {
        this.$refs.translateCard.$el.style.opacity = 0;
      }, 10000);
    },
    showTranslate(word) {
      const wordTextContent = word.textContent.trim().replace(/[^a-z ]/gi, '');

      if (wordTextContent in this.words) {
        const traslation = this.words[wordTextContent][this.localLang];

        if (traslation) {
          this.transText = traslation;
          this.setPositionTranslate(word.getBoundingClientRect());
        } else {
          this.$refs.translateCard.$el.style.opacity = 0;
        }
      }
    },
  },
};
</script>
