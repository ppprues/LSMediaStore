<template>
  <v-layout row warp justify-center>
    <v-flex xs12 sm6>
      <v-card>
        <v-card-text>
          <v-form v-model="valid">
            <v-form-title class="headline">Adding Music</v-form-title>
             
            <v-text-field name="input-1" label="title" v-model="title" :rules="[v => !!v || 'Title is required']" required></v-text-field>
  
            <v-select name="input-1" label="genre" v-model="select" :items="genre" :rules="[v => !!v || 'Item is required']" required></v-select>
            <v-text-field name="input-1" label="artist" v-model="artist" :rules="[v => !!v || 'Title is required']" required></v-text-field>
            <v-text-field name="input-1" label="duration" v-model="duration" :rules="[v => !!v || 'Duration is required']" required></v-text-field>
  
            <v-text-field name="input-1" label="price" v-model="price" prefix="฿" :rules="[v => !!v || 'Price is required']" required></v-text-field>
  
            <v-text-field name="input-1" label="year" v-model="year" :rules="[v => !!v || 'Year is required']" required></v-text-field>
  
            <v-btn @click="submit" :disabled="!valid">submit</v-btn>
            <v-btn @click="clear">reset</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import {
    db
  } from "@/main"
  export default {
    data: () => ({
      valid: true,
      title: '',
      select: null,
      genre: [
        'pop', 'rock',
        'classice', 'blue',
        'hiphop', 'EDM',
        'soul', 'R&B'
      ],
      duration: '',
      price: '',
      year: '',
      artist: ''
    }),
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
    methods: {
      submit() {
        var vm = this
        var userObj
        var userState = this.$store.state.user
  
        console.log('submits')
        console.log(userState)
  
        this.$store
          .dispatch("autoSign", userState)
  
        console.log(userState)
        console.log(userState.uid)
        console.log('a')
  
        console.log('b')
  
        db.ref()
          .child("account")
          .child(userState.uid)
          .on("value", snapshot => {
            var userObj = snapshot.val()
            console.log('inside')
            console.log(userObj)
  
            if (userObj.isCompany) {
              db.ref()
                .child('music')
                .push({
                  title: vm.title,
                  genre: vm.select,
                  artist: vm.artist,
                  duration: vm.duration,
                  price: vm.price,
                  year: vm.year,
                  companyname: userState.uid
                });
  
              console.log('c')
  
              alert('Success!!!!');
              location.assign('/Company');
            } else {
              alert('Error, need to be in company');
            }
          }).catch(err => {
            alert(err)
          })
      },
      clear() {
        this.title = ''
        this.select = ''
        this.artist = ''
        this.duration = ''
        this.price = ''
        this.year = ''
        console.log('clear')
      }
    }
  }
</script>