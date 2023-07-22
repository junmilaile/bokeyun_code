<template>
	<view class="edit">
		<view class="title">
			<input type="text" v-model="artObj.title" placeholder="请输入标题" placeholder-class="placeholderClass">
		</view>
		<view class="content">
			<editor
			class="myEdita"
			placeholder="请输入内容"
			show-img-size
			show-img-toolbar
			show-img-resize
			@ready="onEditReady"
			@focus="onFocus"
			@statuschange="onStatuschange"
			></editor>
		</view>
		<view class="btnGroup">
			<u-button @click="onSubmit" type="primary" text="确认发表" :disabled="!artObj.title.length"></u-button>
		</view>
		<view class="tools" v-if="toolShow">
			<view class="item" @click="clickHead">
				<text class="iconfont icon-zitibiaoti" :class="headShow ? 'active' : '' "></text>
			</view>
			<view class="item" @click="clickBold">
				<text class="iconfont icon-zitijiacu"  :class="boldShow ? 'active' : '' "></text>
			</view>
			<view class="item" @click="clickitalic">
				<text class="iconfont icon-zitixieti"  :class="italicShow ? 'active' : '' "></text>
			</view>
			<view class="item" @click="clickDivider">
				<text class="iconfont icon-fengexian"  :class="DividerShow ? 'active' : '' "></text>
			</view>
			<view class="item" @click="clickInsertImage">
				<text class="iconfont icon-charutupian" :class="insertImageShow ? 'active' : '' "></text>
			</view>
			<view class="item" @click="editOk">
				<text class="iconfont  icon-duigou_kuai"></text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref,onMounted} from 'vue'
	import {getImgSrc,getProvince} from '@/utils/tools.js'
	// 小程序生命周期
	import {onLoad,onHide,onShow} from  '@dcloudio/uni-app'
	const db = uniCloud.database()
	
	onLoad(() => {
		getProvince().then(res => {
			// console.log(res)
			artObj.value.province = res
		})
	
	})
	
	onShow(() => {
		instance.value = this 
	})
	
	const toolShow = ref(false)
	const editoorCtx = ref(null)
	
	const headShow = ref(false)
	const boldShow = ref(false)
	const italicShow = ref(false)
	const insertImageShow = ref(false)
	const DividerShow = ref(false)
	
	const instance = ref(null)
	const artObj = ref({
		title: '',
		content: '',
		description: '',
		picurls: '',
		province: ''
	})
	// 初始化
	const onEditReady = async () => {
		const query = await uni.createSelectorQuery().in(instance.value)
		await query.select('.myEdita').fields({
			context: true,
			size: true
		}, res => {
			console.log(res)
			editoorCtx.value = res.context
		})
		await query.exec()
	}
	
	const checkStatus = (name, detail, obj) => {
		if (detail.hasOwnProperty(name)) {
			obj.value = true;					
		} else {
			obj.value = false;
		}
	}
	
	// 当样式发生改变的时候触发方法
	const onStatuschange = (e) => {
		let detail = e.detail
		checkStatus('header', detail, headShow)
		checkStatus('bold', detail, boldShow)
		checkStatus('italic', detail, italicShow)
	}
	
	
	//离开焦点事件
	const onFocus = () => {
		toolShow.value = true
	}
	
	// 添加分割线
	const clickDivider = () => {
		DividerShow.value = !DividerShow.value
		console.log(editoorCtx.value)
		editoorCtx.value.insertDivider()
	}
	
	// 添加大标题 
	const clickHead = () => {
		headShow.value = !headShow.value
		editoorCtx.value.format("header",headShow.value ? 'H2' : false)
	}
	
	// 字体加粗方法
	const clickBold = () => {
		boldShow.value = !boldShow.value
		editoorCtx.value.format("bold")
	}
	
	// 字体倾斜方法
	const clickitalic = () => {
		italicShow.value = !italicShow.value
		editoorCtx.value.format("italic")
	}
	
	// 点击工具条的确认方法
	const editOk = () => {
		toolShow.value = false
	}
	
	// 点击添加图片方法
	const clickInsertImage =  () => {
		insertImageShow.value = !insertImageShow.value
		
		uni.chooseImage({
			success:async res => {
				console.log(res.tempFiles)
				uni.showLoading({
					title:'上传中,请稍后',
					mask: true
				})
				for(let item of res.tempFiles) {
				 let res = await uniCloud.uploadFile({
						filePath:item.path,
						cloudPath:item.name
					})
					
					editoorCtx.value.insertImage({
						src: res.fileID
					})
				}
				uni.hideLoading()
			}
		})
	}
	
	// 点击提交按钮的方法
	const onSubmit = () => {
		editoorCtx.value.getContents({
			success: res => {
				console.log(res)
				artObj.value.description = res.text.slice(0,50)
				artObj.value.content = res.html
				artObj.value.picurls = getImgSrc(res.html)
				console.log(artObj.value)
				uni.showLoading({
					title:'发布中...'
				})
				addData()
			}
		})
	}
	
	const addData = () => {
			db.collection("quanzi_aticle").add({
				...artObj.value
			}).then(res => {
				// console.log(res)
				uni.hideLoading()
				uni.showToast({
					title:'发布成功'
				})
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				},800)
			})
	}
</script>

<style lang="scss">
 ::v-deep .ql-blank::before {
	font-style: normal;
	color: #e0e0e0;
}	

	.edit {
		padding: 30rpx;
		.title {
			input {
				height: 120rpx;
				font-size: 46rpx;
				border-bottom: 1px solid #e4e4e4;
				margin-bottom: 30rpx;
				
			}
			.placeholderClass {
				color: #e0e0e0
			}
		}
		.content {
			.myEdita {
				height: calc(100vh - 500rpx);
				margin-bottom: 30rpx;
			}
			height: calc(100vh - 500rpx);
			margin-bottom: 30rpx;
		}
		.tools {
			width: 100%;
			height: 80rpx;
			background-color: #fff;
			border-top: 1px solid #f4f4f4;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.iconfont {
				font-size: 36rpx;
				color: #333;
				&.active {
					color: #0199FE;
				}
			}
			
		}
	}
</style>
