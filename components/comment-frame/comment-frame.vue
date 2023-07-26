<template>
	<view>
		<view class="commentFrame">
			<uni-easyinput ref="uipt" @confirm="goComment" suffixIcon="paperplane" v-model="replyContent"
				:placeholder="placeholder" @iconClick="goComment">
			</uni-easyinput>
		</view>
	</view>
</template>

<script setup>
	import {getProvince} from "@/utils/tools.js"
	import {ref,defineProps} from 'vue'
	const db=uniCloud.database();
	const utilsObj=uniCloud.importObject("utilsObj",{
		customUI: true
	});	
	
	const placeholder = ref('评论点什么吧~')
	const replyContent = ref('')
	
	const props = defineProps({
		id: {
			type: String,
			default() {
				''
			}
		}
	})
	

	
	const goComment = () => {
		db.collection('quanzi_comment').add({
			// "article_id": props.id,
			// "comment_content",
			// "comment_type",
			// "reply_user_id",
			// "reply_comment_id"
		})
	}
</script>

<style lang="scss" scoped>
	.commentFrame {
		width: 100%;
		background: #fff;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
	}
</style>
