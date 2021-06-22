<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in avalibleMenuList"
          :key="i"
          :to="item.to"
          router
          exact
          @click="item.handler && item.handler()"
        >
          <template>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="text-center">
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Lang Club',
    };
  },
  computed: {
    ...mapGetters({
      snackbar: 'snackbar/snackbar',
      text: 'snackbar/text',
      authenticated: 'auth/authenticated',
    }),
    avalibleMenuList() {
      return this.items.filter((el) => {
        return (
          el.authenticated === this.authenticated ||
          el.authenticated === undefined
        );
      });
    },
    items() {
      return [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-account-tie',
          title: 'Profile',
          to: '/profile',
          authenticated: true,
        },
        {
          icon: 'mdi-script-text',
          title: 'Texts',
          to: '/texts',
          authenticated: true,
        },
        {
          icon: 'mdi-plus-circle-multiple-outline',
          title: 'Register',
          to: '/auth',
          authenticated: false,
        },
        {
          icon: 'mdi-login',
          title: 'Login',
          to: '/auth/login',
          authenticated: false,
        },
        {
          icon: 'mdi-book-open-page-variant',
          title: 'Words',
          to: '/words',
          authenticated: true,
        },
        {
          icon: 'mdi-clipboard-text-search',
          title: 'Search',
          to: '/words/search',
          authenticated: true,
        },
        {
          icon: 'mdi-logout-variant',
          title: 'Logout',
          handler: this.logoutHandler,
          authenticated: true,
        },
      ];
    },
  },
  mounted() {
    this.tokenLogin();
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
      tokenLogin: 'auth/loginToken',
      openSnacbar: 'snackbar/openSnacbar',
      closeSnacbar: 'snackbar/closeSnacbar',
    }),
    logoutHandler() {
      this.logout();
      this.openSnacbar({ time: 1800, text: 'logout...' });
    },
  },
};
</script>
