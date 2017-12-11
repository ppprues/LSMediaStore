<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
        <v-form-title class="headline">Add Album</v-form-title>
        <v-text-field label="Title" v-model="title" :rules="[rules.required]" required></v-text-field>
        <v-text-field label="Price" v-model="price" :rules="[rules.required]" type = "number"required></v-text-field>

        <v-card-actions>
          <router-link to="Register" @click.native.stop="login = false">
            <v-btn flat @click="reset">Reset</v-btn>
          </router-link>
          <v-spacer></v-spacer>
          <v-btn flat @click="submit">Register</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        title: null,
        price: null,
        rules: {
        required: (value) => !!value || 'Required.',
        }
      }
    },

    methods: {
      reset () {
        this.title = ''
        this.price = ''
        console.log('clear')
      },
      submit () {
        if (this.$refs.form.validate()) {
         // Native form submission is not yet supported
         axios.post('/api/submit', {
           title: this.title,
           price: this.price,
         })
       }
      }
    }
  }
</script>
