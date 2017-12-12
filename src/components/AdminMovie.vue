<template>
  <v-data-table v-bind:headers="headers" :items="items" hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
        <td>{{ props.item.Title }}</td>
        <td class="text-xs-right">{{ props.item.duration }}</td>
        <td class="text-xs-right">{{ props.item.Genre1 }}</td>
        <td class="text-xs-right">{{ props.item.Resolution }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="text-xs-right">{{ props.item.year }}</td>
        <td class="text-xs-right" @click="remove(props.item.key)">remove</td>
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
            value: 'Title'
          },
          {
            text: 'Duration',
            value: 'Duration'
          },
          {
            text: 'Genre',
            value: 'Genre1'
          },
          {
            text: 'Resolution',
            value: 'Resolution'
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
    mounted() {
      console.log("aaaaaaaaaaaaaa")
      var vm = this
      db.ref()
        .child("movie")
        .on("value", snapshot => {
          var snap = snapshot.val();
          let itemArray = []
          Object.keys(snap).forEach(k => {
            snap[k].key = k
            itemArray.push(snap[k])
          })
          vm.items = itemArray
        });
    },
    computed: {
      user() {
        return this.$store.getters.user
      }
    },
    methods: {
      remove(key) {
        var vm = this
        var userObj
        var userState = this.$store.state.user
  
        this.$store
          .dispatch("autoSign", userState)
  
        db.ref()
          .child("account")
          .child(userState.uid)
          .on("value", snapshot => {
            var userObj = snapshot.val()
            console.log('inside')
            console.log(userObj)
  
            if (userObj.isAdmin) {
              db.ref()
                .child('movie')
                .child(key)
                .remove()
  
              console.log('c')
  
            } else {
              alert('Error, need to be in admin');
            }
          }).catch(err => {
            alert(err)
          })
      }
    }
  }
</script>