<template>
  <div>
    <h1 class='h1'>{{msg}}</h1>
    <img src="./a.jpeg" alt="">
    <a href="/index">首页</a>
    <a href="/discover">探索</a>
  </div>
</template>


<script>
export default {
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

