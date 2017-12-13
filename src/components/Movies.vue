<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-carousel>
          <v-carousel-item v-for="(item,i) in banner" v-bind:src="item" :key="i"></v-carousel-item>
        </v-carousel>
      <v-flex xs3 v-for="item in allmovie" :key="item">
        <v-card>
          <v-card-media src="item.url" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ item.Title }}</h3>
              <div>{{ item.Actor1}}</div>
              <div>{{ item.Actor2}}</div>
              <div>{{ item.Actor3}}</div>
              <div>{{ item.Director1}}</div>
              <div>{{ item.Director2}}</div>
              <div>{{ item.Genre1}}</div>
              <div>{{ item.Genre2}}</div>
              <div>{{ item.Subtitle}}</div>
              <div>{{ item.Writer1}}</div>
              <div>{{ item.Writer2}}</div>
              <div>{{ item.checkboxEng}}</div>
              <div>{{ item.checkboxThai}}</div>
              <div>{{ item.duration}}</div>
              <div>{{ item.price}}</div>
              <div>{{ item.year}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="orange" @click="addtoCart('movie', item.key)">
              <v-icon>add_library</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
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
        allmovie: '',
     banner: ['static/avatar.jpg','static/babydriver.jpg','static/backtofuture.jpg','static/justiceleague.jpg','static/starwars.jpg'
         
         
       ]

      }

    },
    
    created() {
      db.ref()
        .child("library")
        .on("value", snapshot => {
          var snap = snapshot.val();
          let itemArray = []
          Object.keys(snap).forEach(k => {
            snap[k].key = k
            itemArray.push(snap[k])
          })
          this.allmovie = itemArray
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
