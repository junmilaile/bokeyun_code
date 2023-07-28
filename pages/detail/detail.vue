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
								<image :src="giveAvatar(data)" mode="aspectFill"></image>
							</view>
							<view class="text">
								<view class="name">
									{{giveName(data)}}
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
									<template v-for="item in likeUserArr" >
										<image v-if="item.user_id[0]" :src="giveAvatar(item)" mode="aspectFill" ></image>
									</template>
								</view>				
								<view class="text"><text class="num">{{data.view_count}}</text>人看过</view>
							</view>
							
						</view>
					</view>
			
			<view class="comment">
				<view v-if="!commentList.length && noComment">
					<u-empty
							mode="comment"
							icon="https://cdn.uviewui.com/uview/empty/comment.png"
					>
					</u-empty>
				</view>
				
				<view class="content" v-else>
					<view class="item" v-for="item in commentList">
						<comment-item :item="item" @removeEnv="PremoveEnv"></comment-item>									
					</view>
				</view>
				
			</view>
			
			
			
			<comment-frame :commentObjadd="commentObj" @commentEnv="PcommentEnv"></comment-frame>
		</view>
</template>

<script setup>
	import {ref} from 'vue'
	// 小程序生命周期
	import {onLoad,onHide,onShow} from  '@dcloudio/uni-app'
	import {giveName,giveAvatar,likeFun} from '../../utils/tools.js'
	import { store } from '../../uni_modules/uni-id-pages/common/store.js';
	import pageJson from '@/pages.json'
	
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
	const likeUserArr = ref([])
	const commentObj = ref({
		article_id: "",
		comment_type: 0
	})
	const noComment = ref(false)
	
	onLoad( (e) => {
		if(!e.id) {
			errFun()
			return
		}
		// console.log(e)
		artid.value = e.id
		commentObj.value.article_id = e.id
		// console.log(artid.value)
	   getData()
	   update()
	   getLikeUser()
	   getComment()
	})
	
	//删除的评论的回调
	const PremoveEnv = (e) => {
		commentList.value = commentList.value.filter(item =>  item._id !== e._id)
		console.log(e)
	}
	
	// 评论成功的回调
	const  PcommentEnv = (e) => {
		commentList.value.unshift({
			...commentObj.value,
			...e,
			user_id: [store.userInfo]
		})
		// console.log(e)
	}
	
	const commentList = ref([])
	// 获取文章的评论数量
	const  getComment  = async () => {
		const commentTemp =  db.collection('quanzi_comment').where(`article_id == '${artid.value}' && comment_type == 0`).orderBy('comment_date desc').limit(5).getTemp()
		const userTemp = db.collection('uni-id-users').field('_id,avatar_file,username,nickname').getTemp()
		const res = await db.collection(commentTemp,userTemp).where(`comment_status != ${0}`).get() 
		console.log(res)
		commentList.value = res.result.data
		console.log(commentList.value)
		if(!commentList.value.length) noComment.value = true
	}
	
	
	// 获取部分点赞的用户
	const getLikeUser = async () => {
		const  likeTemp = db.collection('quanzi_like').where(`article_id == "${artid.value}"`).getTemp()
		const userTemp  = db.collection('uni-id-users').field("_id,avatar_file").getTemp()
		const res = await db.collection(likeTemp,userTemp).orderBy(`publish_date desc`).limit(5).get()

		res.result.data = res.result.data.reverse()
		
		likeUserArr.value = res.result.data

		console.log(likeUserArr.value);
	}
	
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
			console.log(data.value)
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
		if(!store.hasLogin) {
			uni.showModal({
				title:'未登录，请先登录',
				success:res => {
					if(res.confirm) {
						uni.navigateTo({
							url:'/' + pageJson.uniIdRouter.loginPage
						})
					}
				}
			})
			return
		}
		
		
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
		likeFun(artid.value)
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
