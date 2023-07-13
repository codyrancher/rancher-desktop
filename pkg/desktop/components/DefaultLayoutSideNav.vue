<script>
import { mapGetters } from 'vuex';
import { getVersionInfo } from '@shell/utils/version';
import { HCI } from '@shell/config/types';
import Group from '@shell/components/nav/Group';

export default {
  name:       'DefaultLayoutSideNav',
  components: { Group },
  props:      {
    groups: {
      type:    Array,
      default: () => []
    },
    showClusterTools: {
      type:    Boolean,
      default: true
    },
    showProductFooter: {
      type:    Boolean,
      default: false
    },
    clusterId: {
      type:    String,
      default: () => ''
    },
    isSingleProduct: {
      type:    Boolean,
      Object,
      default: () => false
    }
  },
  methods: {
    groupSelected(selected) {
      this.$refs.groups.forEach((grp) => {
        if (grp.canCollapse) {
          grp.isExpanded = (grp.group.name === selected.name);
        }
      });

      // this.$emit('expand', selected);
    },
    collapseAll() {
      this.$refs.groups.forEach((grp) => {
        grp.isExpanded = false;
      });
    },
    switchLocale(locale) {
      this.$store.dispatch('i18n/switchTo', locale);
    }
  },
  computed: {
    ...mapGetters(['isExplorer', 'isVirtualCluster']),
    ...mapGetters({ locale: 'i18n/selectedLocaleLabel', availableLocales: 'i18n/availableLocales' }),

    supportLink() {
      const product = this.$store.getters['currentProduct'];

      if (product?.supportRoute) {
        return { ...product.supportRoute, params: { ...product.supportRoute.params, cluster: this.clusterId } };
      }

      return { name: `c-cluster-${ product?.name }-support` };
    },
    displayVersion() {
      if (this.isSingleProduct?.getVersionInfo) {
        return this.isSingleProduct?.getVersionInfo(this.$store);
      }
      const { displayVersion } = getVersionInfo(this.$store);

      return displayVersion;
    },
    singleProductAbout() {
      return this.isSingleProduct?.aboutPage;
    },
    harvesterVersion() {
      return this.$store.getters['cluster/byId'](HCI.SETTING, 'server-version')?.value || 'unknown';
    },
  },
};
</script>

<template>
  <nav class="side-nav">
    <div class="nav">
      <template v-for="(g) in groups">
        <Group
          ref="groups"
          :key="g.name"
          id-prefix=""
          class="package"
          :group="g"
          :can-collapse="!g.isRoot"
          :show-header="!g.isRoot"
          @selected="groupSelected($event)"
          @expand="groupSelected($event)"
        />
      </template>
    </div>
    <n-link
      v-if="showClusterTools"
      tag="div"
      class="tools"
      :to="{name: 'c-cluster-explorer-tools', params: {cluster: clusterId}}"
    >
      <a
        class="tools-button"
        @click="collapseAll()"
      >
        <i class="icon icon-gear" />
        <span>{{ t('nav.clusterTools') }}</span>
      </a>
    </n-link>
    <div
      v-if="showProductFooter"
      class="footer"
    >
      <nuxt-link
        :to="supportLink"
        class="pull-right"
      >
        {{ t('nav.support', {hasSupport: true}) }}
      </nuxt-link>

      <span
        v-clean-tooltip="{content: displayVersion, placement: 'top'}"
        class="clip version text-muted"
      >
        {{ displayVersion }}
      </span>

      <span v-if="isSingleProduct">
        <v-popover
          popover-class="localeSelector"
          placement="top"
          trigger="click"
        >
          <a
            data-testid="locale-selector"
            class="locale-chooser"
          >
            {{ locale }}
          </a>

          <template slot="popover">
            <ul
              class="list-unstyled dropdown"
              style="margin: -1px;"
            >
              <li
                v-for="(label, name) in availableLocales"
                :key="name"
                class="hand"
                @click="switchLocale(name)"
              >
                {{ label }}
              </li>
            </ul>
          </template>
        </v-popover>
      </span>
    </div>
    <div
      v-else
      class="version text-muted flex"
    >
      <nuxt-link
        v-if="singleProductAbout"
        :to="singleProductAbout"
      >
        {{ displayVersion }}
      </nuxt-link>
      <template v-else>
        <span>{{ displayVersion }}</span>
        <span
          v-if="isVirtualCluster && isExplorer"
          v-tooltip="{content: harvesterVersion, placement: 'top'}"
          class="clip text-muted ml-5"
        >
          (Harvester-{{ harvesterVersion }})
        </span>
      </template>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.side-nav {
    display: flex;
    flex-direction: column;
    .nav {
      flex: 1;
      overflow-y: auto;
    }
  }
</style>
