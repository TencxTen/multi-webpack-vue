<template>
  <div>
    <h1 class="h1">{{msg}}</h1>
    <son msg="from discover" />

    <a href="/me">关于我</a>
    <a href="/index">首页</a>
  </div>
</template>


<script>
import son from '@/base/components/son'

export default {
  components: {
    son
  },
  data() {
    return {
      msg: '发现222fffff'
    }
  }
}
</script>

<style lang="scss" scoped>
.h1 {
  color: blue;
}
</style>
