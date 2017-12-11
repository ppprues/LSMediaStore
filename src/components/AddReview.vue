<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-select
      label="Type of product"
      v-model="type"
      :items="types"
      :rules="[v => !!v || 'type is required']"
      required>
    </v-select>
    <v-text-field
      label="Product ID"
      v-model="productID"
      hint="Exactly 6 characters, ex. AL0001"
      :rules="productIDRules"
      :counter="6"
      required>
    </v-text-field>
    <v-text-field
      label="Title"
      v-model="title"
      :rules="[v => !!v || 'Title is required']"
      required>
    </v-text-field>

    <v-text-field
      label="Description"
      v-model="description"
      multi-line
      :rules="[v => !!v || 'Description is required']"
      required>
    </v-text-field>

    <v-select
      label="Rating"
      v-model="rating"
      :items="ratings"
      :rules="[v => !!v || 'Rating is required']"
      required>
    </v-select>

    <v-btn
      @click="submit"
      :disabled="!valid">
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
  export default {
    data () {
      return {
        type:null,
        types: ['Album', 'Music','Movie'],
        productID:'',
        title: '',
        description:'',
        rating:null,
        ratings: [1,2,3,4,5],
        productIDRules: [
          (v) => !!v || 'Product ID is required',
          (v) => v && v.length == 6 || 'Product ID must be 6 characters'
        ],
      }
    },
    methods: {
        submit () {
          if (this.$refs.form.validate()) {
            // Native form submission is not yet supported
            axios.post('/api/submit', {
              type: this.type,
              productID: this.productID,
              title: this.title,
              description: this.description,
              rating: this.rating
            })
          }
        },
        clear () {
          this.$refs.form.reset()
        }
      },
    name: 'Review'
  }
</script>
