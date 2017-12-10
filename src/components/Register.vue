<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
        <v-form-title class="headline">Register</v-form-title>
        <v-text-field label="Email" v-model="email" :rules="[rules.required, rules.email]" required></v-text-field>
        <v-text-field name="pass" label="Password" hint="At least 8 characters" v-model="password" min="8" :error-messages="passwordErrors"
          :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'"
          :rules="[rules.required]" required></v-text-field>
        <v-text-field name="repeatPass" label="Repeat Password" hint="At least 8 characters" v-model="password2" min="8" :error-messages="passwordErrors"
          :append-icon="e2 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e2 = !e2)" :type="e2 ? 'password' : 'text'"
          :rules="[rules.required]" required></v-text-field>
        <v-text-field label="Name" v-model="name" :rules="[rules.required]" required></v-text-field>
        <v-select label="Gender" v-model="gender" :items="gender" required></v-select>
        <v-text-field label="Address (Optional)" v-model="address" multi-line></v-text-field>
        <v-select label="Country" v-model="address" :items="country" required></v-select>
        <div class="form-group">
          <label for="inputBank">Bank Name</label>
          <select name="inputBank" class="form-control">
            <option selected value="">Choose...</option>
            <option value="BBL">BBL - Bangkok Bank</option>
            <option value="KBANK">KBANK - Kasikornbank</option>
            <option value="KTB">KTB - Krung Thai Bank</option>
            <option value="TMB">TMB - TMB Bank</option>
            <option value="SCB">SCB - Siam Commercial Bank</option>
          </select>
        </div>
        <div class="form-group">
          <label for="inputBankNo">Bank Number</label>
          <input type="text" class="form-control" name="inputBankNo" placeholder="081-2-345679">
        </div>
        <div class="form-group">
          <label for="inputTel">Telephone Number</label>
          <input type="text" class="form-control" name="inputTel" placeholder="081-234-5679">
        </div>
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
        gender : ['Male','Female'],
        country: ['Thailand'],
        rules: {
          required: (value) => !!value || 'Required.',
          country: [val => (val || '').length > 0 || 'This field is required'],
          email: (value) => {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
    },
    computed: {
      formIsValid () {
        return (
          this.form
        )
      }
    },
    methods: {
      reset () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
      }
    },
    name: 'Register'
  }
</script>