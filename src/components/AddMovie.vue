<template>
<v-layout row warp justify-center>
  <v-flex xs12 sm6>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
      <v-form-title class="headline">Adding Movie</v-form-title>

            <v-text-field
              name="input-1"
              label="Title"
              v-model="Title"
              :rules="[v => !!v || 'Title is required']"
              required
            ></v-text-field>

            <v-form-title><b>Genre</b></v-form-title>
            <v-layout row>
            <v-flex xs6>
            <v-select
              name="input-1"
              v-model="select1"
              :items="Genre1"
              placeholder="Choose..."
              :rules="[v => !!v || 'Item is required']"
          required
            ></v-select>
          </v-flex>
          <v-flex xs1>
          </v-flex>
          <v-flex xs6>
            <v-select
              name="input-1"
              v-model="select2"
              :items="Genre2"
              placeholder="Choose..."
              :rules="[v => !!v || 'Item is required']"
          required
            ></v-select>
          </v-flex>
            </v-layout>

            <v-text-field
              name="input-1"
              label="duration"
              v-model="duration"
              :rules="[v => !!v || 'Duration is required']"
              required
            ></v-text-field>

            <v-text-field
              name="input-1"
              label="year"
              v-model="year"
              type = "number"
              :rules="[v => v <2018 && !!v || 'Year is required']"
              required
            ></v-text-field>

            <v-text-field
              name="input-1"
              label="price"
              v-model="price"
              prefix="฿"
              type = "number"
              :rules="[v => v > 0 && !!v || 'Price is required']"
              required
            ></v-text-field>

            <v-form-title><b>SubTitle</b></v-form-title>
            <v-layout row>
            <v-checkbox
              label="Thai"
              v-model="checkbox1"
            ></v-checkbox>
            <v-checkbox
              label="English"
              v-model="checkbox2"
            ></v-checkbox>
            </v-layout>
            <v-select
              name="input-1"
              label="Resolution"
              v-model="select3"
              :items="Resolution"
              :rules="[v => !!v || 'Item is required']"
          required
            ></v-select>
            


          <v-form-title><b>Writter</b></v-form-title>  
          <v-text-field
              name="input-1"
              v-model="Writter1"
              :rules="[v => !!v || 'Title is required']"
            ></v-text-field>
             <v-text-field
              name="input-1"
              label="Optional.."
              v-model="Writter2"
            ></v-text-field>

          <v-form-title><b>Director</b></v-form-title>  
          <v-text-field
              name="input-1"
              v-model="Director1"
              :rules="[v => !!v || 'Title is required']"
            ></v-text-field>
             <v-text-field
              name="input-1"
              label="Optional.."
              v-model="Director2"
            ></v-text-field>

            <v-form-title><b>Actor</b></v-form-title>  
          <v-text-field
              name="input-1"
              v-model="Actor1"
              :rules="[v => !!v || 'Title is required']"
            ></v-text-field>
             <v-text-field
              name="input-1"
              label="Optional.."
              v-model="Actor2"
            ></v-text-field>
            <v-text-field
              name="input-1"
              label="Optional.."
              v-model="Actor3"
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
      select1: null,
      Genre1: [
      'Adventure','Animation',
      'Comendy','Drama',
      'Fantasy','History',
      'Horror','Mystery','Romance',
      'Sci-Fi','War','Western'],
      select2: null,
      Genre2: [
      'Adventure','Animation',
      'Comendy','Drama',
      'Fantasy','History',
      'Horror','Mystery','Romance',
      'Sci-Fi','War','Western','NONE'],
      duration: '',
      price: '',
      year: '',
      checkbox1: false,
      checkbox2: false,
      select3: null,
      Resolution: ['HD','FullHD','4K'],
      Writter1:'',
      Writter2:'',
      Director1:'',
      Director2:'',
      Actor1:'',
      Actor2:'',
      Actor3:''}),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            Title: this.Title,
            Genre1: this.Genre1,
            Genre2: this.Genre2,
            duration: this.duration,
            price: this.price,
            year: this.year,
            checkbox1: this.checkbox1,
            checkbox2: this.checkbox2,
            Resolution: this.Resolution,
            Writter1: this.Writter1,
            Writter2: this.Writter2,
            Director1: this.Director1,
            Director2: this.Director2,
            Actor1: this.Actor1,
            Actor2: this.Actor2,
            Actor3: this.Actor3
          })
        }
      },
      clear () {
       this.Title = ''
       this.select1 = '' // Clear select Genre1
       this.select2 = '' // Clear select Genre2
       this.duration = ''
       this.price = ''
       this.checkboxGenre1 = '' // Clear checkbox 'Thai'
       this.checkboxGenre2 = ''// Clear checkbox 'English'
       this.year = ''
       this.select3 = '' // Clear select Resolution
       this.Writter1 = ''
       this.Writter2 = ''
       this.Director1 = ''
       this.Director2 = ''
       this.Actor1 = ''
       this.Actor2 = ''
       this.Actor3 = ''
      console.log('clear')
      }
    }
  }
</script>