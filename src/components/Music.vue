<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3 v-for="item in allmusic" :key="item">
        <v-card>
          <v-card-media src="item.url" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ item.title }}</h3>
              <div>{{ item.artist }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="orange">Add to Cart</v-btn>
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
        allmusic: ''
      }
    },
    created() {
      db.ref()
        .child("music")
        .on("value", snapshot => {
          var snap = snapshot.val();
          this.allmusic = snap;
        });
    },
    computed: {
      user() {
        return this.$store.getters.user
      }
    }
  }
</script>