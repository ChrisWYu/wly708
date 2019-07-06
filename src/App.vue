<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'

}
</script>

<style>
#app,body,html{
  padding:0;
  margin:0;
  height: 100%;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

} */
/* body{
  margin-left: 0px;
  background:url(./assets/img/backgroundimg.png)  no-repeat center center;
  background-size:cover;
  background-attachment:fixed; */
  /* background-color:#CCCCCC; */
/* } */
</style>
