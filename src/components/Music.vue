<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-carousel>
        <v-carousel-item v-for="(item,i) in banner" v-bind:src="item" :key="i"></v-carousel-item>
      </v-carousel>
      <v-flex xs3 v-for="item in allalbum" :key="item">
        <v-card>
          <v-card-media src="item.url" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ item.title }}</h3>
              <div>{{ item.price}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="orange" @click="addtoCart('album', item.key)">
              <v-icon>add_library</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-data-table v-bind:headers="headers" :items="allmusic" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
                      <td>{{ props.item.title }}</td>
                      <td class="text-xs-right">{{ props.item.artist }}</td>
                      <td class="text-xs-right">{{ props.item.duration }}</td>
                      <td class="text-xs-right">{{ props.item.genre }}</td>
                      <td class="text-xs-right">{{ props.item.price }}</td>
                      <td class="text-xs-right">{{ props.item.year }}</td>
                      <v-btn flat color="orange" @click="addtoCart('music', props.item.key)"><v-icon>add_library</v-icon></v-btn>
</template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
  import {
    db
  } from '@/main'
  export default {
    data() {
      return {
        allmusic: '',
        allalbum: '',
        headers: [{
            text: 'Music',
            align: 'left',
            sortable: true,
            value: 'title'
          },
          {
            text: 'Artist',
            value: 'artist'
          },
          {
            text: 'Duration',
            value: 'duration'
          },
          {
            text: 'Genre',
            value: 'genre'
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
        items: '',
        banner: ['static/coldplay.png', 'static/linkinpark.jpg', 'static/maroon5.jpg', 'static/taylor.jpg']
      }
    },
    mounted() {
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
          vm.allmusic = itemArray
        });
    },
    created() {
      db.ref()
        .child("album")
        .on("value", snapshot => {
          var snap = snapshot.val();
          let itemArray = []
          Object.keys(snap).forEach(k => {
            snap[k].key = k
            itemArray.push(snap[k])
          })
          this.allalbum = itemArray
        });
    },
    computed: {
      user() {
        return this.$store.getters.user
      }
    },
    methods: {
      addtoCart(type, uid) {
        console.log(this.user.uid)
        console.log(type, uid)
        var vm = this
        var userObj
        var userState = this.$store.state.user
  
        this.$store
          .dispatch("autoSign", userState)
          .then(() => {
            db.ref()
              .child("cart")
              .child(userState.uid)
              .child(type)
              .update({
                [uid]: "true"
              })
          })
          .catch(err => {
            alert(err)
          })
      }
    }
  }
</script>