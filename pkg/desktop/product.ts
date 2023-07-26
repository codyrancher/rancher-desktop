import { createDesktopRoute } from './routing/utils';

export function init($plugin: any, store: any) {
  const { product } = $plugin.DSL(store, $plugin.name);

  product({
    inStore:             'management',
    icon:                'gear',
    removable:           false,
    showClusterSwitcher: false,
    weight:              100,
    to:                  createDesktopRoute('general')
  });
}
