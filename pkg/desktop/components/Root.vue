<script>
export default { layout: 'standalone' };
</script>

<template>
  <div>
    Root route has been overridden<br />
    <n-link :to="{name: 'c-cluster-explorer', params: { cluster: 'local' }}">
      Link to Local Cluster Without Global Nav
    </n-link>
  </div>
</template>
