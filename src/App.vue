<template>
  <div id="app" @touchmove.prevent>
    <m-head></m-head>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHead from 'components/m-header/m-header'

  export default {
    components: {
      MHead
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>