<template>
	<view>
		<view class="comment-item" @click.stop="goReply">
			<view class="avatar">
				<u-avatar :src="giveAvatar(props.item)" size="26"></u-avatar>
			</view>

			<view class="wrap">
				<view class="username">
					{{giveName(props.item)}}
					<text v-if="!closeBtn" class="iconfont icon-a-43-guanbi" @click.stop="delComment(uniIDHasRole('admin') || uniIDHasRole('webmaster'))"></text>
				</view>
				<view class="comment-content">{{props.item.comment_content}}</view>
				<view class="info">
					<view class="reply-btn" v-if="!childState">{{props.item.totalReply || ''}}回复 </view>
					<view>
						<uni-dateformat :date="props.item.comment_date" :threshold="[60000,3600000*24*30]">
						</uni-dateformat>
					</view>
					<view>{{props.item.province}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {giveName,giveAvatar} from "../../utils/tools.js"
	import {ref,defineProps,defineEmits} from 'vue'
	const db=uniCloud.database();
	const utilsObj=uniCloud.importObject("utilsObj",{
		customUI: true
	})
	
	const props = defineProps({
		item: {
			type: Object,
			default() {
				return{}
			}
		},
		childState: {
			type: Boolean,
			default:false
		},
		closeBtn: {
			type: Boolean,
			default:false
		},
		totalReply: {
			type: Number,
			default: 0
		}
	})
	//跳转到回复页面
	const goReply = () => {
		if(props.childState) return
		uni.setStorageSync("replyItem",props.item)
		// uni.$emit("replyItem",props.item)
		uni.navigateTo({
			url:'/pages/rebly/rebly'
		})
	}
	
	const emit = defineEmits(['removeEnv'])
	
	// 点击删除评论
	const  delComment = (role) => {
		let uid = uniCloud.getCurrentUserInfo().uid
		
		if(uid === props.item.user_id[0]._id || role) {
			uni.showModal({
				title:'是否确认删除',
				success: res => {
					if(res.confirm) {
						removeComment()
					}
				}
			})
			return
		}
			uni.showToast({
				title:"权限不够",
				icon:'error'
			})
	}
	
	// 删除逻辑
	const removeComment = () => {
		console.log(props.item)
		db.collection('quanzi_comment').doc(props.item._id).update({
			comment_status: 0
		}).then(res => {
			uni.showToast({
				title:'删除成功'
			})
			emit('removeEnv',{_id: props.item._id})
			uni.$emit('comment_count',-1)
			uni.$emit('totalReply',{count: -1,article_id: props.item.article_id})
			utilsObj.operation('quanzi_aticle','comment_count',props.item.article_id,-1)
		})
	}
	
	
</script>

<style lang="scss" scoped>
	.comment-item {
		display: flex;
				.wrap {
			flex: 1;
			padding-left: 20rpx;
			padding-bottom: 20rpx;

			.username {
				font-size: 26rpx;
				color: #666;
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.iconfont{
					font-size: 20rpx;					
					padding:10rpx;
					color:#999;
				}
			}

			.comment-content {
				font-size: 34rpx;
				color: #111;
				line-height: 1.8em;
			}

			.info {
				font-size: 26rpx;
				color: #666;
				display: flex;
				padding: 10rpx 0;
				align-items: center;

				view {
					margin-right: 25rpx;
				}

				.reply-btn {
					padding: 6rpx 18rpx;
					background: #e4e4e4;
					border-radius: 30rpx;
				}
			}
		}
	}
</style>
