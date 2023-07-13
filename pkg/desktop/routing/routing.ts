import { PRODUCT_NAME } from '../config/types';
import NewRoot from '../pages/index.vue';
import DesktopIndex from '../pages/desktop/index.vue';
import General from '../pages/desktop/general.vue';
import PortForwarding from '../pages/desktop/port-forwarding.vue';

const BLANK_CLUSTER = '_';

const routes = [
  {
    name:      `root`,
    path:      `/`,
    component: NewRoot,
  },
  {
    name:      `${ PRODUCT_NAME }-c-cluster`,
    path:      `/${ PRODUCT_NAME }/c/:cluster/desktop`,
    component: DesktopIndex,
    meta:      {
      product: PRODUCT_NAME,
      cluster: BLANK_CLUSTER,
      pkg:     PRODUCT_NAME
    },
    children:  [
      {
        name:      `${ PRODUCT_NAME }-c-cluster-general`,
        path:      `/${ PRODUCT_NAME }/c/:cluster/general`,
        component: General,
        meta:      {
          product: PRODUCT_NAME,
          cluster: BLANK_CLUSTER,
          pkg:     PRODUCT_NAME
        },
      },
      {
        name:      `${ PRODUCT_NAME }-c-cluster-portforwarding`,
        path:      `/${ PRODUCT_NAME }/c/:cluster/portforwarding`,
        component: PortForwarding,
        meta:      {
          product: PRODUCT_NAME,
          cluster: BLANK_CLUSTER,
          pkg:     PRODUCT_NAME
        },
      }
    ],
  }
];

export default routes;
