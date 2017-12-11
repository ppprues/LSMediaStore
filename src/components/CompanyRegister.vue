<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
        <v-form-title class="headline">Company Register</v-form-title>
        <v-text-field label="Email" v-model="email" :rules="[rules.required, rules.email]" required></v-text-field>
        <v-text-field label="Password" hint="At least 8 characters" v-model="password" min="8" :error-messages="passwordErrors"
          :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'"
          :rules="[rules.required]" required></v-text-field>
        <v-text-field name="repeatPass" label="Repeat Password" hint="At least 8 characters" v-model="password2" min="8" :error-messages="passwordErrors"
          :append-icon="e2 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e2 = !e2)" :type="e2 ? 'password' : 'text'"
          :rules="[rules.required]" required></v-text-field>
        <v-text-field label="Name" v-model="name" :rules="[rules.required,rules.Namerequired]" required></v-text-field>

        <v-text-field label="Address (Optional)" v-model="address" multi-line></v-text-field>
        <v-select label="Bank Name" v-model="bankname" :items="banknames" required></v-select>
        <v-text-field  label="BankNumber" v-model="banknumber"></v-text-field>
        <v-text-field label="Telephone No." v-model="telephone":rules="[rules.required,rules.Telephonerequired]" type = "number" required></v-text-field>
        <v-text-field label="Points" v-model="point":rules="[rules.Pointsrequired]" required></v-text-field>
        <v-text-field label="Review(Optional)" v-model="review" multi-line></v-text-field>

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
        e1: true,
        e2: true,
        password: '',
        password2: '',
        bankname: null,
        banknames:['BBL - Bangkok Bank','KBANK - Kasikornbank','KTB - Krung Thai Bank','TMB - TMB Bank','SCB - Siam Commercial Bank'],
        banknumber: '',
        telephone: null,
        point: null,
        review: null,
        rules: {
        Namerequired: (v) => v.length <= 10 || 'Name cannot more than 10 characters',
        Telephonerequired: (v) => v.length < 10 && v.length > 10 || 'Telephone must be 10 numbers',
        Pointsrequired: (v) => v && v <= 10 || 'Points must be between 1 to 10',
        required: (value) => !!value || 'Required.',
        email: (value) => {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          date: null,
          dateFormatted: null,
          menu: false
        }
      }
    },
    computed: {
      formIsValid () {
        return this.form

      }
    },
   methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
           email: this.email,
           password: this.password,
          password2: this.password2,
           name: this.name,
           address: this.address,
           banknames: this.banknames,
            banknumber: this.banknumber,
           telephone: this.telephone,
           point: this.point,
           review: this.review
          })
        }
      },
      reset () {
       this.email = ''
       this.password = ''
       this.password2 = ''
       this.name = ''
       this.address = ''
       this.bankname = ''
       this.banknumber = ''
       this.telephone = ''
       this.point = ''
       this.review = ''
      console.log('clear')
      }
    }
    }
</script>
