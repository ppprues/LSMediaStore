<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-card>
        <v-card-text>
          <v-form>
            <v-form-title class="headline">Adding Music</v-form-title>
            <v-text-field label="Title" v-model="title" :rules="[v => !!v || 'Title is required']" required></v-text-field>
            <v-select label="Genre" v-model="genre" :items="genres" :rules="[v => !!v || 'Item is required']" required></v-select>
            <v-text-field label="Duration" v-model="duration" :rules="[v => !!v || 'Duration is required']" required></v-text-field>
            <v-text-field label="Price" v-model="price" prefix="฿" :rules="[v => !!v || 'Price is required']" required></v-text-field>
            <v-text-field label="Year" v-model="year" :rules="[v => !!v || 'Year is required']" required></v-text-field>
            <v-card-actions row>
              <v-btn @click="reset">reset</v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="submit">submit</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { db, auth, storage } from "@/main";
  export default {
    data: () => ({
      title: "",
      genre: null,
      genres: ["Pop", "Rock", "Classice", "Blue", "Hiphop", "EDM", "Soul", "R&B"],
      duration: "",
      price: "",
      year: ""
    }),
    update() {
      var vm = this;
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
    methods: {
      reset() {
        this.title = ''
        this.genre = ''
        this.duration = ''
        this.price = ''
        this.year = ''
        console.log('clear')
      },
      submit() {
        console.log(this.user);
        var vm = this;
        this.$store
          .dispatch("signUp", {
            email: this.email,
            password: this.password
          })
          .then(() => {
            var newMusic =
              firebase
              .database()
              .ref()
              .child("music")
              .push({
                title: vm.title,
                genre: vm.genre,
                duration: vm.duration,
                price: vmprice,
                year: vm.year
              });
            var postID = newMusic.key;
            firebase
              .database()
              .ref()
              .child("company")
              .child(this.user)
              .child("music")
              .set({
                postID: true
              });
            alert("Successfully sign up");
          })
          .catch(err => {
            alert(err);
          });
      }
    }
  };
</script>