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
		
		<view class="loadingState" v-show="loadState">
			<u-skeleton
				rows="4"
				title
				loading
				></u-skeleton>
		</view>
		
		<view class="content">
			<view class="item" v-for="item in dataList">
				<blog-item></blog-item>
			</view>
		</view>
		
		<view class="edit" @click="editadd">
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
	
	const dataList = ref([1,2,3])
	
	const loadState = ref(false)
	
	const clickNav = (e) => {
		console.log(e)
	}
	
	// 跳转到新增长文页面
	const editadd = () => {
		uni.navigateTo({
			url:'/pages/edit/edit'
		})
	}
</script>

<style lang="scss" scoped>
	.home {
		.topnav {
			margin-bottom: 30rpx;
		}
		.loadingState{
			padding: 30rpx;
		}
		.content {
			.item {
				padding: 30rpx;
				border-bottom: #F7F7F7 15rpx solid;
			}
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
