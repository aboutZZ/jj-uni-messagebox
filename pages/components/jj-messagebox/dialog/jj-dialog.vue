<template>
	<div v-if="jj_visible" class="jj-dialog">
		<div class="messagebox-shade" :style="[{'background-color':maskColor}]" @touchmove.stop = ""  @click="touchClose?close():''">
			<div class="messagebox-main popIn" @click="mainClick" :style="[{'animation-duration':duration+'s','width':width,'background':background,'border-radius':radius+'px'}]">
				<div class = "background-content">
					<slot name="backgroundContent"></slot>
				</div>
				<div class="messagebox-content" :style="[{'padding':padding}]">
					<div v-if="showClose" class="rightTopClose"  @click="close">
						<image class = "closeImage" :style="[closeStyle]" :src="closeImgUrl"></image>
					</div>
					<div v-if="title.length > 0" class="flexCenter" :style="[titleStyle]"><span>{{title}}</span></div>
					<div v-if="message.length > 0" class="flexCenter" style="margin-top: 10px;" :style="[messageStyle]"><span>{{message}}</span></div>
					<slot></slot>
				</div>
				<slot name="footer"></slot>
			</div>
		</div>
	</div>

</template>

<script>
	import {close_icon} from '../static/image.js'
	export default {
		name: 'jj-dialog',//需要设置名字，在index.js文件注册插件的时候用到这个名字，这个名字作为改组件的名字
		props: {
			visible: {
				//是否显示
				type: Boolean,
				default: false,
			},
			duration:{
				//动画时间
				type: Number,
				default: 0.25,
			},
			radius:{
				//圆角
				type: Number,
				default: 5,
			},
			background:{
				//弹窗的背景
				type: String,
				default: "#fff",
			},
			maskColor: {
				//遮罩层的背景颜色
				type: String,
				default: "rgba(0, 0, 0, 0.35)",
			},
			touchClose: {
				//点击背景图层，是否关闭弹框
				type: Boolean,
				default: false,
			},
			showClose: {
				//是否显示右上角的关闭按钮
				type: Boolean,
				default: true
			},
			closeStyle: {
				//关闭按钮的样式
				type: Object,
				default: function(){
					return {}
				}
			},
			closeImageUrl:{
				type: String,
				default: ''
			},
			title: {
				//标题
				type: String,
				default: ''
			},
			titleStyle: {
				//标题样式
				type: Object,
				default: function(){
					return {}
				}
			},
			message: {
				//信息内容
				type: String,
				default: ''
			},
			messageStyle: {
				//信息内容的样式
				type: Object,
				default: function(){
					return {}
				}
			},
			width: {
				////内容显示框的大小，可以按照窗口的百分比指定大小，也可以是具体px,如300px
				type: String,
				default: '80%'
			},
			padding: {
				type: String,
				default: '20px'
			}
		},
		watch: {
			visible: {
				handler(newVal) {
					this.jj_visible = newVal
				},
				immediate: true
			},
		},
		data() {
			return {
				jj_visible: this.visible
			}
		},
		computed:{
			//图片采用base64位，为了兼容小程序，app，vue3
			closeImgUrl(){
				if((this.closeImageUrl||'').length > 0){
					return this.closeImageUrl
				}
				return close_icon()
			},
		},
		methods: {
			close() {
				this.$emit('close')
				this.jj_visible = false
			},
			mainClick(e) {
				//阻止事件冒泡
				// e.stopPropagation()
			},
		}
	}
</script>

<style scoped>
	@import "../jj-messagebox.css";
	@import "../jj-pop.css";
	.jj-dialog{
		display: flex;
		flex-direction: column;
	}
</style>
