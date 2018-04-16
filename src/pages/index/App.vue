<template>
  <div>
    <h1 class='h1'>{{msg}}</h1>

    <child msg='from index parent' />

    <a href="/me">关于我</a>    
    <a href="/discover">探索</a>
  </div>
</template>


<script>
import child from './child/child'
// import _ from 'lodash'


export default {
	components: {
		child
	},

	data() {
		return {
			msg: '首页'
		}
	}
}
</script>

<style lang="scss" scoped>
.h1 {
  color: red;
}
</style>
