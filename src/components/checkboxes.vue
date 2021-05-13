<template>
  <div id="app">
    <input type="checkbox" id="jack" value="Jack" v-model="checkedValues" />
    <label for="jack">Jack</label>
  </div>
</template>

<script>
import data from '../assets/data.json'
export default {
  name: "app",
  data: data,
  checkedValues: {}
};
</script>


<style lang="scss">


</style>