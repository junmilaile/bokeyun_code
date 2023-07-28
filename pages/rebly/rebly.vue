<template>
	<view class="reply">
		<view class="top">
			<comment-item :item="replyItemset"></comment-item>
		</view>
		<view class="list">
			<view class="row" v-for="item in childReply">
				<comment-item :item="item"></comment-item>
			</view>
		</view>
		
		<view>
			<comment-frame :commentObjadd="commentObj" :placeholder="`回复：${giveName(replyItemset)}`"></comment-frame>
		</view>
	</view>
</template>

<script setup>
	import {giveName,giveAvatar} from "../../utils/tools.js"
	import {ref} from 'vue'
	// 小程序生命周期
	import {onLoad,onHide,onShow,onUnload} from  '@dcloudio/uni-app'
	const db = uniCloud.database()
	// 文章表单参数
	const commentObj = ref({
		article_id: "",
		comment_type: 1,
		reply_user_id: '',
		reply_comment_id: ''
	})
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
		commentObj.value.article_id = replyItemset.value.article_id
		commentObj.value.reply_user_id = replyItemset.value.user_id[0]._id
		commentObj.value.reply_comment_id = replyItemset.value._id
		getComment()
	})
	
	
	const childReply = ref([])
	//获取评论列表的二级回复
	const  getComment  = async () => {
		const commentTemp =  db.collection('quanzi_comment').where(`article_id == '${replyItemset.value.article_id}' && comment_type == 1`).orderBy('comment_date desc').limit(10).getTemp()
		const userTemp = db.collection('uni-id-users').field('_id,avatar_file,username,nickname').getTemp()
		const res = await db.collection(commentTemp,userTemp).where(`comment_status != ${0}`).get() 
		console.log(res)
		childReply.value = res.result.data
		console.log(commentList.value)
		if(!commentList.value.length) noComment.value = true
	}
	
	
	// 离开二级回复页面清除本地存储的内容
	onUnload(() => {
		uni.removeStorageSync("replyItem")
	})
	
	// uni.$on("replyItem",(val) => {
		
	// 	console.log(val)
	// 	replyItem.value = val
	// 	console.log(replyItem.val)
	// })
</script>

<style lang="scss">
	.reply {
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
