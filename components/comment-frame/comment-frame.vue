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
	import {ref,defineProps,defineEmits} from 'vue'
	const db=uniCloud.database();
	const utilsObj=uniCloud.importObject("utilsObj",{
		customUI: true
	});	

	const replyContent = ref('')
	
	const props = defineProps({
		commentObjadd: {
			type: Object,
			default() {
				return {}
			}
		},
		placeholder: {
			type: String,
			default: "评论点什么吧~"
		}
	})
	
	const emit = defineEmits(["commentEnv"])
	
	const goComment = async () => {
		const Province = await getProvince()
		if(!replyContent.value) {
			uni.showToast({
				title:'评论不能为空',
				icon:'none'
			})
			 return
		}
		const commentObj = props.commentObjadd
		 db.collection('quanzi_comment').add({
			...commentObj,
			"comment_content": replyContent.value,
			"province": Province
		}).then(res => {
			uni.showToast({
				title:'评论成功'
			})
			emit("commentEnv",{_id: res.result.id,comment_content: replyContent.value,province: Province,comment_date: Date.now()})
			// console.log(res)
			
			replyContent.value = ''
			uni.$emit('comment_count', 1)
			uni.$emit('totalReply',{count: 1,article_id: props.commentObjadd.article_id})
			utilsObj.operation('quanzi_aticle','comment_count',props.commentObjadd.article_id,1)
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
