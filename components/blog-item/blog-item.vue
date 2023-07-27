<template>
	<view class="blogitem">
			<view class="head">
				<view class="userinfo">
					<view class="avatar">
						<image :src="giveAvatar(props.item)"  mode="aspectFill"></image>
					</view>
					<view class="name">{{giveName(props.item)}}</view>
					<view class="time">
						<uni-dateformat :date="item.publish_date" format="MM月dd hh:mm" :threshold="[60000,3600000*24*30]"></uni-dateformat>
					</view>
				</view>
				
				<view class="more" @click="clickMore(uniIDHasRole('admin') || uniIDHasRole('webmaster'))">
					<text class="iconfont icon-ellipsis"></text>
				</view>
			</view>
			
			<view class="body">
				<view class="title" @click="goDetail">{{props.item.title}}</view>
				<view class="text" @click="goDetail" v-if="props.item.description">
					<view class="t">{{props.item.description}}</view>
				</view>
				<view class="piclist" v-if="props.item.picurls.length">
					<view class="pic" :class="props.item.picurls.length == 1 ? 'only': ''" v-for="(item,index) in props.item.picurls" :key="item">
						<image @click="clickPic(index)" :src="item" mode="aspectFill"></image>
					</view>					
				</view>
			</view>
			
			
			<view class="info">
				<view class="box"><text class="iconfont icon-a-27-liulan"></text> <text>{{props.item.view_count}}</text></view>
				<view class="box"  @click="goDetail"><text class="iconfont icon-a-5-xinxi"></text> <text>{{props.item.comment_count && props.item.comment_count > 0 ?  props.item.comment_count : '评论'  }}</text></view>
				<view class="box" :class="props.item.isLike ? 'active' : ''" @click="clickLike"><text class="iconfont icon-a-106-xihuan"></text> <text>{{props.item.like_count === 0 ? '点赞' : props.item.like_count}}</text></view>
			</view>
			
		
			<u-action-sheet :actions="list" @close="cancel" cancelText="取消" :show="show"
			:closeOnClickOverlay="true" :closeOnClickAction="true"
			@select="sheetSelect"
			></u-action-sheet>
		</view>
</template>

<script setup>
	import {ref,defineProps,onMounted,getCurrentInstance  } from 'vue'
	import {giveName,giveAvatar,likeFun} from '../../utils/tools.js'
	import { store } from '../../uni_modules/uni-id-pages/common/store.js';
	// 小程序生命周期
	import {onLoad,onHide,onShow,onReady} from  '@dcloudio/uni-app'
	import pageJson from '@/pages.json'
	
	const db = uniCloud.database()
	let likeTime = ref(null)
	
	const list = ref([
		{
			name: "修改",
			type: 'edit',
			disabled: true,
			role: ''
		},
		{
			name: "删除",
			type: 'del',
			color: '#e45656',
			disabled: true,
			role:''
		}
	])
	const show = ref(false)

	const props = defineProps({
		item: {
			type: Object,
			default(){
				return {}
			}
		}
	})
	
	// 改变评论数量
	uni.$on('comment_count',(val) => {
		// console.log('comment', val);
		props.item.comment_count += val
	})
	
	// 点击图片
	const clickPic = (index) => {
		uni.previewImage({
			urls: props.item.picurls,
			current:index
		})
	}
	
	// 点击跳转到详情
	const goDetail = () => {
			uni.navigateTo({
				url:'/pages/detail/detail?id=' + props.item._id
			})
	}
	// 点击弹出编辑
	const clickMore = (role) => {
		show.value = true
		let uid = uniCloud.getCurrentUserInfo().uid
		if(uid === props.item.user_id[0]._id || role) {
			list.value.forEach(item => {
				item.disabled = false
			})
		}
	}
	// 点击取消按钮触发的方法
	const cancel = () => {
		show.value = false
	}
	// 点击上拉菜单的一个属性会触发的方法
	const sheetSelect = (e) => {
		let {type} = e
		console.log(type)
		if(type === 'del') {
			delFun()
		}
	}
	// 删除方法
	const delFun = () => {
	
			uni.showLoading({
				title:'加载中'
			})
			db.collection('quanzi_aticle').doc(props.item._id).update({
				delState: true
			}).then(res => {
				uni.hideLoading()
				uni.showToast({
					title:'删除成功',
					icon:'none'
				})
				uni.$emit("delEvent",props.item.user_id[0]._id)
			}).catch(res => {
				uni.hideLoading()
				uni.showToast({
					title:'删除失败',
					icon:'none'
				})
			})	
	}
	// 点赞操作
	const clickLike = () => {
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
		likeTime.value = time
		props.item.isLike ? props.item.like_count-- : props.item.like_count++
		props.item.isLike = !props.item.isLike
		// 调用点赞方法
		likeFun(props.item._id)
	}
</script>

<style lang="scss">
.blogitem{
	.head{
		display:flex;
		font-size: 32rpx;
		align-items: center;
		justify-content: space-between;
		.userinfo{
			display: flex;
			align-items: center;
			.avatar{ 
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				border-radius: 50%;
				overflow: hidden;
				image{ 
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			.name{				
				color:#222;				
				padding-left:10rpx;
			}
			.time{
				color:#888;
				font-size: 22rpx;
				padding-left:20rpx;
			}
		}
		.more{
			padding:5rpx;			
			.iconfont{ 
				font-size: 50rpx;
				color:#888;
			}
		}
	}
	
	.body{
		padding:15rpx 0 30rpx;
		.title{
			font-size: 44rpx;
			color:#000;
			font-weight: 600;	
			text-align: justify;
		}
		.text{
			padding-top:10rpx;
			padding-bottom:10rpx;
			font-size: 30rpx;
			text-align: justify;
			color:#888;				
			.t{
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;				
				text-overflow: ellipsis;		
				display: -webkit-box;			
				-webkit-line-clamp: 2;			
				line-clamp: 2;					
				-webkit-box-orient: vertical;	
			}
		}
		.piclist{
			display: flex;
			padding-top:20rpx;
			.pic{
				width: 225rpx;
				height: 225rpx;
				margin-right: 6rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}	
				&:first-child{
					border-radius: 20rpx 0 0 20rpx;					
				}
				&:last-child{
					border-radius: 0 20rpx 20rpx 0;					
				}
				&.only{
					border-radius: 20rpx;
				}
				
			}
			
		}
	}
	
	.info{
		display: flex;
		align-items: center;
		justify-content:space-around;
		font-size: 26rpx;	
		color:#333;
		.box{
			display: flex;
			align-items: center;			
			padding:15rpx 0 5rpx;
			flex:1;
			display: flex;
			justify-content: center;
			.iconfont{
				font-size: 40rpx;
				padding-right: 10rpx;
			}
		}
		.active {
			 color: #0199FE;
		}
	}
}
</style>