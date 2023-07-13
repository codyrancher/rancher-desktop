
<script>
import { createDesktopRoute } from '../routing/utils';

export default {
  name: 'DesktopSidebar',
  data() {
    return {
      desktopLink:          createDesktopRoute('general'),
      clusterDashboardLink: {
        name:   'c-cluster-explorer',
        params: { cluster: 'local' }
      }
    };
  },
  methods: {
    toggle() {
      console.log('TOGGLE!');
    }
  },
};
</script>

<template>
  <div class="desktop-sidebar">
    <div class="fixed-panel">
      <div
        class="hamburger-menu mb-40 mt-10"
        @click="toggle()"
      >
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>

      <nuxt-link
        class="desktop-sidebar-link mb-20"
        :to="desktopLink"
      >
        <span>D</span>
      </nuxt-link>
      <nuxt-link
        class="desktop-sidebar-link mb-20"
        :to="clusterDashboardLink"
      >
        <span>C</span>
      </nuxt-link>
    </div>
    <div class="collapsible-panel">
      <nuxt-link :to="desktopLink">
        Rancher Desktop
      </nuxt-link>
      <nuxt-link :to="clusterDashboardLink">
        Dashboard
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $sidebar-width: 50px;
  $sidebar-padding: 10px;
  $sidebar-bg-color: #002c40;
  $sidebar-collapsible-width: 100px;

  .desktop-sidebar {
    width: $sidebar-width;
    height: 100vh;
    background-color: $sidebar-bg-color;
    box-shadow: 2px 0px 10px 0px rgba(0,0,0,0.6);
    z-index: 100;
    display: flex;

    .fixed-panel {
      display: flex;
      flex-direction: column;
      padding: 10px;
      background-color: $sidebar-bg-color;
      height: 100%;

      .hamburger-menu {
        display: block;
        height: 20px;
        width: calc(#{$sidebar-width} - #{$sidebar-padding} * 2);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .line {
          display: block;
          height: 2px;
          width: 100%;
          border-radius: 4px;
          background: #FFFFFF;
        }
      }

      .desktop-sidebar-link {
        color: #FFFFFF;
        border: 1px solid #FFFFFF;
        width: calc(#{$sidebar-width} - #{$sidebar-padding} * 2);
        height: calc(#{$sidebar-width} - #{$sidebar-padding} * 2);
        border-radius: 5px;
        text-align: center;
        font-size: 16px;

        span {
          margin-top: 4px;
          display: block;
        }
      }
    }

    .collapsible-panel {
      background-color: $sidebar-bg-color;
      padding: 85px 20px 0 0;

      a {
        display: block;
        font-size: 16px;
        color: #FFFFFF;
        white-space: nowrap;
        margin-bottom: 32px;
      }
    }
  }
</style>
