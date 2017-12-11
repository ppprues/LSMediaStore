<template>
<v-layout row warp justify-center>
  <v-flex xs12 sm6>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
      <v-form-title class="headline">Adding Music</v-form-title>

            <v-text-field
              name="input-1"
              label="Title"
              v-model="Title"
              :rules="[v => !!v || 'Title is required']"
              required
            ></v-text-field>

            <v-select
              name="input-1"
              label="Genre"
              v-model="select"
              :items="Genre"
              :rules="[v => !!v || 'Item is required']"
     		  required
            ></v-select>

            <v-text-field
              name="input-1"
              label="duration"
              v-model="duration"
              :rules="[v => !!v || 'Duration is required']"
              required
            ></v-text-field>

            <v-text-field
              name="input-1"
              label="price"
              v-model="price"
              prefix="฿"
              :rules="[v => !!v || 'Price is required']"
              required
            ></v-text-field>

            <v-text-field
              name="input-1"
              label="year"
              v-model="year"
              :rules="[v => !!v || 'Year is required']"
              required
            ></v-text-field>

         <v-btn @click="submit" :disabled="!valid">submit</v-btn>
         <v-btn @click="clear">reset</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
  </v-flex>
</v-layout>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      Title: '',
      select: null,
      Genre: [
      'pop','rock',
      'classice','blue',
      'hiphop','EDM',
      'soul','R&B'],
      duration: '',
      price: '',
      year: ''}),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            Title: this.Title,
            Genre: this.Genre,
            duration: this.duration,
            price: this.price,
            year: this.year
          })
        }
      },
      clear () {
       this.Title = ''
       this.select = ''
       this.duration = ''
       this.price = ''
       this.year = ''
      console.log('clear')
      }
    }
  }
</script>