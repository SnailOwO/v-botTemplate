<template>
  <!-- <div class="hello">
    12222
  </div>   -->
  <Content :style="{padding: '0 16px 16px'}">
      <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
      </Breadcrumb>
      <Card>
          <div style="height: 600px">Content</div>
      </Card>
      <!-- <div class="content">
          <div>233333</div>
      </div> -->
  </Content>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
