<template>
	<view class="reply">
		<view class="top">
			<comment-item :childState="true" :closeBtn="true" :item="replyItemset"></comment-item>
		</view>
		<view class="list">
			<view v-if="flag">
				<u-skeleton
					    rows="2"
					    title
						loading
						avatar
					></u-skeleton>
			</view>
	
			<view v-else class="row" v-for="item in childReply">
				<comment-item @removeEnv="PremoveEnv" :childState="true" :item="item"></comment-item>
			</view>
		</view>
		<view>
			<uni-load-more v-if="showLoading" :status="uniLoading"></uni-load-more>
		</view>
		<view v-if="!childReply.length && noComment">
			<u-empty
					mode="comment"
					icon="https://cdn.uviewui.com/uview/empty/comment.png"
			>
			</u-empty>
		</view>
		<view>
			<comment-frame @commentEnv="PcommentEnv" :commentObjadd="commentObj" :placeholder="`回复：${giveName(replyItemset)}`"></comment-frame>
		</view>
	</view>
</template>

<script setup>
	import {giveName,giveAvatar} from "../../utils/tools.js"
	import { store } from '../../uni_modules/uni-id-pages/common/store.js';
	import {ref} from 'vue'
	// 小程序生命周期
	import {onLoad,onHide,onShow,onUnload,onReachBottom} from  '@dcloudio/uni-app'
	const db = uniCloud.database()
	
	const showLoading = ref(false)
	const uniLoading = ref('more')
	const noMore = ref(false)
	const noComment = ref(false)
	// 文章表单参数
	const commentObj = ref({
		article_id: "",
		comment_type: 1,
		reply_user_id: '',
		reply_comment_id: ''
	})
	const flag = ref(true)
	const replyItemset = ref('')
	onLoad((e) => {
		let replyItem  =  uni.getStorageSync("replyItem")
		if(!replyItem) {
			uni.showToast({
				title:'参数错误',
				icon:'none'
			})
			setTimeout(() => {
				uni.navigateBack()
			},1000)
		}
		replyItemset.value  = replyItem || {}
		commentObj.value.comment = e.comment
		commentObj.value.article_id = replyItemset.value.article_id
		commentObj.value.reply_user_id = replyItemset.value.user_id[0]._id
		commentObj.value.reply_comment_id = replyItemset.value._id
		getComment()
	})
	
	
	const childReply = ref([])
	//获取评论列表的二级回复
	const  getComment  = async () => {
		const commentTemp =  db.collection('quanzi_comment').where(`article_id == '${replyItemset.value.article_id}' && comment_type == 1 && reply_comment_id == "${replyItemset.value._id}"`).orderBy('comment_date desc').getTemp()
		const userTemp = db.collection('uni-id-users').field('_id,avatar_file,username,nickname').getTemp()
		const res = await db.collection(commentTemp,userTemp).where(`comment_status != 0`).skip(childReply.value.length).limit(5).get() 
		console.log(res)
		if(res.result.data.length === 0) {
			noMore.value = true
		
		}
		if(res.result.data.length === 5) {
			showLoading.value = true
		}
		const oldArr = [...childReply.value,...res.result.data]
		childReply.value = oldArr
		flag.value = false
		if(!childReply.value.length) noComment.value = true
		// console.log(childReply.value)
	}
	
	
	// 离开二级回复页面清除本地存储的内容
	onUnload(() => {
		uni.removeStorageSync("replyItem")
	})
	
	//删除方法成功回调
	const PremoveEnv = (e) => {
		childReply.value = childReply.value.filter(item =>  item._id != e._id)
	}
	
	//触底加载更多
	onReachBottom( async () => {
		// console.log(noMore.value)
		uniLoading.value = 'loading'
		if(noMore.value) {
			uniLoading.value = 'noMore'
			return
		}
		 await getComment()
		if(noMore.value) {
			uniLoading.value = 'noMore'
			return
		}
	})
		
	// 二级回复成功的回调函数
	const PcommentEnv = (e) => {
		uni.showToast({
			title:'回复成功'
		})
		childReply.value.unshift({
			...commentObj.value,
			...e,
			user_id: [store.userInfo]
		})
		flag.value = false
	}
</script>

<style lang="scss">
	.reply {
		padding-bottom: 100rpx;
		.top {
			padding: 30rpx;
			border-bottom: 15px solid #eee;
		}
		.list {
			padding: 30rpx;
			
			.row {
				padding-bottom: 15rpx;
			}
		}
	}
</style>
