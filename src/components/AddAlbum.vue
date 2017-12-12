<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
        <v-form-title class="headline">Add Album</v-form-title>
        <v-text-field label="Title" v-model="title" :rules="[rules.required]" required></v-text-field>
        <v-text-field label="CoverURL" v-model="cover" ></v-text-field>
        <v-text-field label="Price" v-model="price" :rules="[rules.required]" type = "number"required></v-text-field>
        <v-text-field label="Description" v-model="description" :rules="[rules.required]" required></v-text-field>

        <v-card-actions>
          
            <v-btn @click="clear">clear</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat @click="submit">Register</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { db } from '@/main'

  export default {
    data () {
      return {
        title: null,
        price: null,
       description: null,
       cover:null,
        rules: {
        required: (value) => !!value || 'Required.',
        }
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
                .child('album')
                .push({
                  title: vm.title,
                  price: vm.price,
                  description: vm.description,
                  cover: vm.cover,
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
        this.price = '' // Clear select Genre1
        this.description = '' // Clear select Genre2
        console.log('clear')
      }
    }
  }
</script>
