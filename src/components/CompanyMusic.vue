<template>
  <v-data-table v-bind:headers="headers" :items="items" hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
                          <td>{{ props.item.title }}</td>
                          <td class="text-xs-right">{{ props.item.artist }}</td>
                          <td class="text-xs-right">{{ props.item.genre }}</td>
                          <td class="text-xs-right">{{ props.item.duration }}</td>
                          <td class="text-xs-right">{{ props.item.price }}</td>
                          <td class="text-xs-right">{{ props.item.year }}</td>
</template>
  </v-data-table>
</template>

<script>
  import {
    db
  } from '@/main'
  
  export default {
    data() {
      return {
        headers: [{
            text: 'Title',
            align: 'left',
            sortable: true,
            value: 'title'
          },
          {
            text: 'Artist',
            value: 'artist'
          },
          {
            text: 'Genre',
            value: 'genre'
          },
          {
            text: 'Duration',
            value: 'duration'
          },
          {
            text: 'Price',
            value: 'price'
          },
          {
            text: 'Year',
            value: 'year'
          }
        ],
        items: ''
      }
    },
    created() {
      var vm = this
      db.ref()
        .child("music")
        .on("value", snapshot => {
          var snap = snapshot.val();
          let itemArray = []
          Object.keys(snap).forEach(k => {
            snap[k].key = k
            itemArray.push(snap[k])
          })
          for (var i = itemArray.length - 1; i >= 0; i--) {
            if (array[i].companyname === this.user.id) {
              array.splice(i, 1);
            }
          }
          vm.items = itemArray
        });
    },
    mounted() {
      var vm = this
      var userObj
      var userState = this.$store.state.user
  
      this.$store
        .dispatch("autoSign", userState)
    },
    computed: {
      user() {
        return this.$store.getters.user
      }
    }
  }
</script>