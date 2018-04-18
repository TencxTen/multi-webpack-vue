<template>
  <div>
    <h1 class='h1'>{{msg}}</h1>

    <child msg='from index parent' />
  </div>
</template>


<script>
import child from './child/child'

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
