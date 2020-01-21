<template>
    <div class="videoview" ref='videoview'>
		<van-nav-bar
			title="播放回放"
			left-text="返回"
			left-arrow
			fixed
			@click-left="onClickLeft"
		/>
		<div class="content">
			<div id="test" ref='videoViewTest' :style='[{"height":videoHeight +"px"},{"width":videoHeight}+"px"]'></div>
		</div>
	</div>
</template>

<script>
import { NavBar } from 'vant'

export default {

	name: "videoview",
	components:{
		[NavBar.name]:NavBar
	},
	data() {
		return {
			test:null,
			videoWidth:'400',
			videoHeight:'300',
			vid:'',
			siteid:'',
		};
	},
	methods: {
		createPlayer() {
			this.test = this.$refs.videoViewTest
			
			let self = this 
			this.player = window.createCCH5Player({
				vid: this.vid,
				siteid: this.siteid,
				autoStart: true,
				width: '100%',
				height: '100%',
				isShare:true,
				parentNode: this.test
			});
		},
		setPlayerCallBack() {
			window.onCCH5PlayerLoaded = this.onCCH5PlayerLoaded
			window.on_CCH5player_ready = this.onPlayerReady;
			window.on_switch_quality = this.onSwitchQuality;
		},

		onCCH5PlayerLoaded() {
			window.ccH5PlayerJsLoaded = true;
			this.createPlayer()
		},
		onPlayerReady(obj) {
			console.log('CCH5player_ready', obj)
			window.cc_js_Player.setQuality(10);
		},
		onSwitchQuality(vid, quality) {
			console.log("切换清晰度回调", vid, quality);
		},
		onClickLeft(){
			console.log('返回首页',this.$router)
			if ( window.history.length > 1 ) {
				
				this.$router.go(-1)
			}else {
				let dt = DETBrowser.getUrlParamByName('day', '') 
				
				this.$router.push({
					path:'/student/home',
					query:{
						day:dt === null || dt === undefined || dt === '' ? '' : dt
					}
				})
			}
			
		},
	},
	created() {
		const self = this 
		
		let query = this.$route.query
		this.vid = query.vid
		this.siteid = query.siteid
		setTimeout(() =>{
			self.setPlayerCallBack()
		}, 500);
	},
	mounted() {
		this.videoWidth = this.$refs.videoview.clientWidth 
		this.videoHeight = this.$refs.videoview.clientHeight -49
		window.onresize = () => {
			return ( () => {
				this.videoWidth = this.$refs.videoview.clientWidth 
				this.videoHeight = this.$refs.videoview.clientHeight -50
			})();
		}
		if(window.ccH5PlayerJsLoaded) {
			this.createPlayer()
		}
	},
	beforeDestroy: function() {
		console.log("销毁视频进程")
		// this.vId = null
		// this.siteId = null 
		// this.test  = null 
		// window.ccH5PlayerJsLoaded = false;
      	// window.onCCH5PlayerLoaded = null
		// window.on_CCH5player_ready = null;
		// window.on_switch_quality = null;
  	}
};
</script>

<style lang="scss" scoped>
.videoview{
	position:fixed;
	top:0px;
	left:0px;
	right:0px;
	bottom:0px;
    width:100%;
    height:100%;
	background: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(0.2rem);
	z-index:1000;
	.van-nav-bar__text,.van-icon-arrow-left{
		color:#ff6601;
	}
	.van-nav-bar__title{
		color:#333;
		font-size:20px;
		font-weight: 550;
	}
	.content{
		width:100%;
		height:100%;
		margin-top:50px;
		#test{
			display:block;
			margin:0 auto;
		}
	}
       
}


</style>