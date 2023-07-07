<template>
	<view class="home">
		<view class="topnav">
			 <u-tabs :list="navlist"
			 :activeStyle="{
					  color: '#333',
					  fontWeight: 'bold',
					  transform: 'scale(1.08)'
				}"
				:inactiveStyle="{
						color: '#888',
						transform: 'scale(1)'
					}"				
			  @click="clickNav"></u-tabs>
		</view>
		
		<view class="content">
			主体
		</view>
		
		<view class="edit">
			<text class="iconfont icon-a-21-xiugai"></text>
		</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	
	const navlist = ref([
		{
			name: '最新'
		},
		{
			name: '热门'
		}
	])
	
	const clickNav = (e) => {
		console.log(e)
	}
	
</script>

<style lang="scss" scoped>
	.home {
		.topnav {
			margin-bottom: 30rpx;
		}
		.edit {
			width: 120rpx;
			height: 120rpx;
			background-color: #0199FE;
			border-radius: 50%;
			color: #fff;
			position: fixed;
			z-index: 999;
			bottom: 150rpx;
			right: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 0 20rpx rgba(1,153,254,.8);
			.iconfont {
				font-size: 50rpx;
			}
		}
	}
</style>
