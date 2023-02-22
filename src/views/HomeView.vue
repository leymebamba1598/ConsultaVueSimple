<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Dona></Dona>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Dona from '@/components/Dona.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Dona
    
  }
}
</script>
