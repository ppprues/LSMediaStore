<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
        <v-form-title class="headline">Company Register</v-form-title>
        <v-text-field label="Email" v-model="email" :rules="[rules.required, rules.email]" required></v-text-field>
        <v-text-field label="Password" v-model="password":rule="[v => v >= 8 || 'At least 8 characters' ]"
          :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'"
          :rules="[rules.required]" required></v-text-field>
        <v-text-field name="repeatPass" label="Repeat Password"  v-model="password2" :rule="[v => v >= 8 || 'At least 8 characters' ]"
          :append-icon="e2 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e2 = !e2)" :type="e2 ? 'password' : 'text'"
          :rules="[rules.required,rules.passwordCheck]" required></v-text-field>
        <v-text-field label="Name" v-model="name" :rules="[rules.required]" required></v-text-field>

        <v-text-field label="Address (Optional)" v-model="address" multi-line></v-text-field>
        <v-select label="Bank Name" v-model="bankname" :items="banknames" required></v-select>
        <v-text-field  label="BankNumber" v-model="banknumber"></v-text-field>
        <v-text-field label="Telephone No." v-model="telephone":rules="[rules.required,rules.Telephonerequired]" type = "number" required></v-text-field>

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

import firebase from "firebase"
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
        rules: {
        passwordCheck:(v) => this.password2 == this.password , 
        Telephonerequired: (v) => v.length == 10 || 'Telephone must be 10 numbers',
        Pointsrequired: (v) => v && v <= 10 || 'Points must be between 1 to 10',
        required: (value) => !!value || 'Required.',
        email: (value) => {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
    },
    computed: {
      formIsValid () {
        return this.form
      },
      user() {
        return this.$store.getters.user
      }
    },
   methods: {
     reset () {
       this.email = ''
       this.password = ''
       this.password2 = ''
       this.name = ''
       this.address = ''
       this.bankname = ''
       this.banknumber = ''
       this.telephone = ''
      console.log('clear')
      },
      submit () {
        var vm = this
        this.$store
          .dispatch("signUp", { email: this.email, password: this.password })
          .then(() => {
            firebase.database().ref()
              .child("account")
              .child(this.user.uid)
              .set({
                email: vm.email,
                password: vm.password,
                name: vm.name,
                address: vm.address,
                bankname: vm.bankname,
                banknumber: vm.banknumber,
                telephone: vm.telephone,
                isCustomer: false,
                isCompany: true,
                isAdmin: false
              });
              
            alert("Successfully sign up")
            location.assign('/Company');
          })
          .catch(err => {
            alert(err)
          })
        }
      }
    }
</script>
