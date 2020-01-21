<template>
  <div id="app">
	 <div  class="views clearfix" >
		  <router-view></router-view>
    </div>
  </div>
</template>
<script>


export default {
  name: 'app',

}
</script> 

<style lang="scss">

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width:100%;
  height: 100%;
  position: relative;
  background-color:#f5f5f5;
  z-index:1;
  overflow-y: hidden;
  a {
    text-decoration: none
  }
}
.views{
  z-index:10;
  max-width:700px;
  height:100%;
  position: relative;
  margin: 0 auto;
  background-color:#fff;
  overflow-y: hidden;
}


</style>
