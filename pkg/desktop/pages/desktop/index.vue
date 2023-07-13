<script>
import { rootDesktopRoute, createDesktopRoute } from '../../routing/utils';

export default {
  name: 'DesktopBaseView',
  data() {
    return {
      generalLink:       createDesktopRoute('general'),
      portFowardingLink: createDesktopRoute('portforwarding'),
    };
  },

  middleware({ redirect, route } ) {
    if (route.name === rootDesktopRoute().name ) {
      return redirect(createDesktopRoute('general'));
    }
  }
};
</script>

<template>
  <div id="base-layout">
    <div class="desktop-menu">
      <router-link :to="generalLink">
        GENERAL
      </router-link>
      <router-link :to="portFowardingLink">
        PORT-FORWARDING
      </router-link>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#base-layout {
  padding: 0;
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: nowrap;
  flex-direction: row;

  .desktop-menu {
    width: 120px;
    height: 100%;
    border: 2px solid black;
    padding: 10px;

    a {
      display: block;
      margin-bottom: 10px;
    }
  }

  .main-content {
    width: 100%;
    height: 100%;
    border: 1px solid red;
  }
}
</style>
