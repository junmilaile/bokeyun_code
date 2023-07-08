<template>
	<view class="edit">
		<view class="title">
			<input type="text" placeholder="请输入标题" placeholder-class="placeholderClass">
		</view>
		<view class="content">
			<editor
			placeholder="写点什么吧~"
			></editor>
		</view>
		<view class="btnGroup">
			<u-button type="primary" text="确认发表" disabled=""></u-button>
		</view>
		<view class="tools">
			<view class="item">
				<text class="iconfont icon-zitibiaoti"></text>
			</view>
			<view class="item">
				<text class="iconfont icon-zitijiacu"></text>
			</view>
			<view class="item">
				<text class="iconfont icon-zitixieti"></text>
			</view>
			<view class="item">
				<text class="iconfont icon-fengexian"></text>
			</view>
			<view class="item">
				<text class="iconfont icon-charutupian"></text>
			</view>
			<view class="item">
				<text class="iconfont  icon-duigou_kuai"></text>
			</view>
		</view>
	</view>
</template>

<script setup>

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
				&:active {
					color: #0199FE;
				}
			}
			
		}
	}
</style>
