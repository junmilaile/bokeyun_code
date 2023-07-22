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
				<blog-item :item="item" ></blog-item>
			</view>
		</view>
		
		<view class="edit" @click="editadd">
			<text class="iconfont icon-a-21-xiugai"></text>
		</view>
	</view>
</template>

<script setup>
	import {store,mutations} from '@/uni_modules/uni-id-pages/common/store.js'
	import {ref} from 'vue'
	// 小程序生命周期
	import {onLoad,onHide,onShow} from  '@dcloudio/uni-app'
	
	const db = uniCloud.database()
	const dbCmd = db.command
	
	onLoad( async () => {
		await getData()
	})
	
	const navlist = ref([
		{
			name: '最新',
			type: 'publish_date'
		},
		{
			name: '热门',
			type: 'view_count'
		}
	])
	
	const dataList = ref([])
	
	const navAction = ref(0)
	
	const loadState = ref(true)
	
	const clickNav = (e) => {
		loadState.value = true
		dataList.value = []
		// console.log(e)
		navAction.value = e.index
		getData()
	}
	
	const getData = () => {
	 	let artTemp = db.collection('quanzi_aticle').field("title,user_id,description,picurls,view_count,like_count,comment_count,publish_date,delState").getTemp()
		let userTemp = db.collection('uni-id-users').field("_id,username,nickname,avatar_file").getTemp() 
			
			db.collection(artTemp,userTemp).where(`delState != true`).orderBy( navlist.value[navAction.value].type ,"desc").get().then(async res => {
				
				let idArr = []
				let resDataArr = res.result.data
				
				if(store.hasLogin){
				resDataArr.forEach(item => {
					idArr.push(item._id)
				})
				
				const likeRes = await db.collection('quanzi_like').where({
					article_id:dbCmd.in(idArr),
					user_id: uniCloud.getCurrentUserInfo().uid
				}).get()
				
				likeRes.result.data.forEach(item => {
					let findIndex = resDataArr.findIndex(find => item.article_id === find._id)
					resDataArr[findIndex].isLike = true
				})
				
			}
			// console.log(idArr)
			dataList.value = resDataArr
			loadState.value = false
		})
	}
	
	// 跳转到发布长文页面
	const editadd = () => {
		uni.navigateTo({
			url:'/pages/edit/edit'
		})
	}
	
	uni.$on('delEvent',(val) => {
		
		// console.log(val)
	 	dataList.value = dataList.value.filter(item =>  item.user_id[0]._id !== val)
		// console.log(dataList.value)
		// getData()
	})
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
