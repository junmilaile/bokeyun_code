<template>
		<view class="detail">
			<view class="container">
				
					<view v-if="loadState" >
						<u-skeleton :loading="true" :animate="true"  rows="5"></u-skeleton>
					</view>
					<view v-else>
						<view class="title">{{data.title}}</view>
						<view class="userinfo">
							<view class="avatar">
								<image :src="data.user_id[0].avater_file ? data.user_id[0].avater_file.url : '../../static/images/user-default.jpg'" mode="aspectFill"></image>
							</view>
							<view class="text">
								<view class="name">
									{{data.user_id[0].nickname ? data.user_id[0].nickname : data.user_id[0].username}}
								</view>
								<view class="small">
									<uni-dateformat :date="data.publish_date" format="yyyy年MM月dd hh:mm:ss" ></uni-dateformat>· 发布于{{data.province}}
								</view>
							</view>
						</view>
						<view class="content">
							<u-parse :content="data.content"  :tagStyle="tagStyle"></u-parse>
						</view>
						
						
							<view class="like">
								<view class="btn" :class="data.isLike ? 'active' : ''" @click="clickLike">
									<text class="iconfont icon-good-fill"></text>
									<text v-if="data.like_count">{{data.like_count}}</text>
								</view>								
								<view class="users">					
									<image src="../../static/images/user.jpg" mode="aspectFill" ></image>
								</view>				
								<view class="text"><text class="num">{{data.view_count}}</text>人看过</view>
							</view>
							
						</view>
					</view>
			
				
				
			
		
		<!-- 	<view class="comment">
				<view>
					<u-empty
							mode="comment"
							icon="https://cdn.uviewui.com/uview/empty/comment.png"
					>
					</u-empty>
				</view>
				
				<view class="content">
					<view class="item" v-for="item in 3">
						<comment-item></comment-item>									
					</view>
				</view>
				
			</view> -->
			
			
			
			<!-- <comment-frame></comment-frame> -->
		</view>
</template>

<script setup>
	import {ref} from 'vue'
	// 小程序生命周期
	import {onLoad,onHide,onShow} from  '@dcloudio/uni-app'
	
	const utilsObj = uniCloud.importObject('utilsObj',{
		customUI: true 
	})
	
	const db = uniCloud.database()
	const add = ref(true)
	const artid = ref('')
	const loadState = ref(true)
	const data = ref(null)
	const show = ref(true)
	let likeTime = ref(null)
	
	onLoad(async (e) => {
		if(!e.id) {
			errFun()
			return
		}
		// console.log(e)
		artid.value = e.id
		console.log(artid.value)
	   await getData()
		await update()
	})
	
	// 修改阅读量
	const update = () => {
		utilsObj.operation('quanzi_aticle','view_count',artid.value,1).then(res => {
			console.log(res)
		})
	}
	

	
	// 错误的处理
	const errFun = () => {
		uni.showToast({
			title: '参数错误',
			icon:'none'
		})
		setTimeout(() => {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		},1000)
	}
	
	
	// 拿到id联表查询里面的数据
	const getData = () => {
		const userid = uni.getStorageSync('uni-id-pages-userInfo')
		let artTemp =  db.collection('quanzi_aticle').where(`_id == '${artid.value}'`).getTemp()
		let userTemp =  db.collection('uni-id-users').field("_id,username,nickname,avatar_file").getTemp()
		let likeTemp = db.collection('quanzi_like').where(`article_id == '${artid.value}' && user_id == '${userid._id}'`).getTemp()
		db.collection(artTemp,userTemp,likeTemp).get({
			getOne: true
		}).then(res => {
			console.log(res)
			if(!res.result.data) {
				errFun()
				return	
			}
			data.value = res.result.data
			loadState.value = false
			let isLike = res.result.data._id.quanzi_like.length ? true : false
			res.result.data.isLike = isLike
			uni.setNavigationBarTitle({
				title:data.value.title
			})
		}).catch(err => {
			errFun()
		})
	}
	
	
	const tagStyle = ref({
		p: "line-height: 1.7em; font-size: 16px;  padding-bottom: 10rpx",
		img: "margin: 10rpx 0 "
	})
	
	// 点赞的方法
	const clickLike = async () => {
		let time = Date.now()
		if(time - likeTime.value < 2000) {
			uni.showToast({
				title:'操作频繁',
				icon:'none'
			})
			return
		}
		data.value.isLike ? data.value.like_count-- : data.value.like_count++
		data.value.isLike = !data.value.isLike
		likeTime.value = time
		// 调用点赞方法
		likeFun()
	}
	
	//点赞操作数据库的方法
	const likeFun = async () => {
		const userid = uni.getStorageSync('uni-id-pages-userInfo')
		let count = await db.collection('quanzi_like').where(`article_id == '${artid.value}' && user_id == '${userid._id}'`).count()
		if(count.result.total) {
			db.collection('quanzi_like').where(`article_id == '${artid.value}' && user_id == '${userid._id}'`).remove()
			utilsObj.operation('quanzi_aticle','like_count',artid.value,-1)
		}else {
			db.collection('quanzi_like').add({
				article_id: artid.value
			}).then(res => {
				console.log(res)
			})
			utilsObj.operation('quanzi_aticle','like_count',artid.value,1)
		}
	}
</script>

<style lang="scss">
.detail{
	background: #f8f8f8;
	min-height: calc(100vh - var(--window-top));	
	.container{
		padding:30rpx;	
		background: #fff;
		.title{
			font-size: 46rpx;
			color:#333;
			line-height: 1.4em;
			font-weight: 600;
		}
		.userinfo{
			padding:20rpx 0 50rpx;
			display: flex;
			align-items: center;
			.avatar{
				width: 60rpx;
				height: 60rpx;
				padding-right: 15rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.text{
				font-size: 28rpx;
				color:#555;
				.small{
					font-size: 20rpx;
					color:#999;
				}
			}
		}
		.content{
			
		}
		.like{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding:80rpx 50rpx 50rpx;
			.btn{
				width: 260rpx;
				height: 120rpx;
				background: #e4e4e4;
				border-radius: 100rpx;
				color:#fff;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 28rpx;
				.iconfont{
					font-size: 50rpx;
				}
				&.active{
					background: #0199FE;
				}
			}
			.text{
				font-size: 26rpx;
				color:#666;				
				.num{
					color:#0199FE
				}
				.spot{
					padding:0 10rpx;
				}
			}
			.users{
				display: flex;
				justify-content: center;
				padding:30rpx 0;
				image{
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					border:3px solid #fff;
					margin-left:-20rpx;
				}
			}
		}
		
	}

	.comment{
		padding:30rpx;
		padding-bottom:120rpx;
		.item{
			padding:10rpx 0;
		}
	}

}
</style>
