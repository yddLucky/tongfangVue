<template>
  <div id="app" @touchmove.prevent>
    <m-head></m-head>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHead from 'components/m-header/m-header'
  import {isiphoneX} from 'common/js/util'

  export default {
    components: {
      MHead
    },
    mounted() {
      isiphoneX()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>