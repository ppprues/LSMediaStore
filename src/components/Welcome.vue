<template>
  <v-carousel hide-delimiters style="height: 680px">
    <v-carousel-item v-for="(item,i) in items" v-bind:src="item" :key="i"></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data () {
    return {
      items: ['static/customer.jpg','static/company.jpg','static/admin.jpg']
    }
  }
}
</script>
