<template>
  <div>
    <h1 class='h1'>{{msg}}</h1>
    <img src="./a.jpeg" alt="">
    <a href="/index">首页</a>
    <a href="/discover">探索</a>

    <p id="demo">html</p>
  </div>
</template>


<script>
export default {
  created() {
    console.log(222)
    // console.log($('#demo'.html()))
  },
	data() {
		return {
			msg: '关于我 '
		}
	}
}
</script>

<style lang="scss" scoped>
.h1 {
  color: pink;
}
</style>

