<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
        <v-form-title class="headline">Add Album</v-form-title>
        <v-text-field label="Title" v-model="title" :rules="[rules.required]" required></v-text-field>
        <v-text-field label="Price" v-model="price" :rules="[v => v > 0 && !!v || 'Price is required']" prefix="฿" type="number" required></v-text-field>
        <v-card-actions>
          <v-btn flat @click="reset">Reset</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat @click="submit">Register</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  import firebase from "firebase";
  export default {
    data() {
      return {
        title: null,
        price: null,
        rules: {
          required: value => !!value || "Required."
        }
      };
    },
  
    methods: {
      reset() {
        this.title = "";
        this.price = null;
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
            firebase
              .database()
              .ref()
              .child("company")
              .child(this.user)
              .set({
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
