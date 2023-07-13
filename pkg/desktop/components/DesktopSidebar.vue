
<script>
import { rootDesktopRoute, createDesktopRoute } from '../routing/utils';

export default {
  name: 'DesktopSidebar',
  data() {
    return {
      desktopLink:          createDesktopRoute('general'),
      clusterDashboardLink: {
        name:   'c-cluster-explorer',
        params: { cluster: 'local' }
      },
      isSidepanelOpen: false
    };
  },
  computed: {
    isDesktopRoute() {
      return this.$route.name.includes(rootDesktopRoute().name);
    }
  },
  methods: {
    toggleSidepanel() {
      this.isSidepanelOpen = !this.isSidepanelOpen;
    },
    closeSidepanel() {
      this.isSidepanelOpen = false;
    }
  },
};
</script>

<template>
  <div class="desktop-sidebar">
    <div class="fixed-panel">
      <div
        class="hamburger-menu mb-40 mt-10"
        @click="toggleSidepanel()"
      >
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>

      <nuxt-link
        class="desktop-sidebar-link mb-20"
        :class="{ 'link-active': isDesktopRoute }"
        :to="desktopLink"
        @click.native="closeSidepanel()"
      >
        <i class="icon icon-rancher-desktop" />
      </nuxt-link>
      <nuxt-link
        class="desktop-sidebar-link mb-20"
        :to="clusterDashboardLink"
        @click.native="closeSidepanel()"
      >
        <i class="icon icon-dashboard" />
      </nuxt-link>
    </div>
    <transition name="slide">
      <div
        v-if="isSidepanelOpen"
        class="collapsible-panel"
      >
        <nuxt-link
          v-show="isSidepanelOpen"
          :to="desktopLink"
          @click.native="closeSidepanel()"
        >
          Rancher Desktop
        </nuxt-link>
        <nuxt-link
          v-show="isSidepanelOpen"
          :to="clusterDashboardLink"
          @click.native="closeSidepanel()"
        >
          Dashboard
        </nuxt-link>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  $sidebar-width: 60px;
  $sidebar-padding: 10px;
  $sidebar-bg-color: #002c40;

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
      z-index: 2;

      .hamburger-menu {
        display: block;
        height: 20px;
        width: calc(#{$sidebar-width} - #{$sidebar-padding} * 3);
        margin-left: calc(#{$sidebar-padding} / 2);
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
        border: 1px solid var(--header-border);
        width: calc(#{$sidebar-width} - #{$sidebar-padding} * 2);
        height: calc(#{$sidebar-width} - #{$sidebar-padding} * 2);
        border-radius: 5px;
        text-align: center;
        font-size: 16px;

        i {
          color: var(--header-border);
          font-size: 26px;
          margin-top: 6px;
        }

        &:hover {
          color: #FFFFFF;
          border-color: #FFFFFF;

          i {
            color: #FFFFFF;
          }
        }

        &.nuxt-link-active, &.link-active  {
          border-color: var(--primary) !important;
          background-color: var(--primary)  !important;

          i {
            color: #FFFFFF  !important;
          }
        }
      }
    }

    .collapsible-panel {
      background-color: $sidebar-bg-color;
      padding: 90px 20px 0 0;
      box-shadow: 2px 0px 10px 0px rgba(0,0,0,0.6);
      z-index: 1;

      a {
        display: block;
        font-size: 17px;
        color: #FFFFFF;
        white-space: nowrap;
        margin-bottom: 39px;
      }
    }
  }

  .slide-enter-active,
  .slide-leave-active
  {
      transition: transform 0.2s ease;
  }

  .slide-enter,
  .slide-leave-to {
      transform: translateX(-100%);
      transition: all 0.2s ease-in 0s;
  }
</style>
