<template>
<v-layout justify-center>
  <v-flex xs12 sm6>
  <v-card>
    <v-card-text>
      <v-form v-model="userRegister">
        <v-form-title class="headline">Register</v-form-title>
        <v-text-field label="Email" v-model="email" :rules="[rules.required, rules.email]" required></v-text-field>
        <v-text-field label="Password" hint="At least 8 characters" v-model="password" min="8"
          :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'"
          :rules="[rules.required]" required></v-text-field>
        <v-text-field label="Repeat Password" hint="At least 8 characters" v-model="password2" min="8"
          :append-icon="e2 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e2 = !e2)" :type="e2 ? 'password' : 'text'"
          :rules="[rules.required]" required></v-text-field>
        <v-text-field label="Name" v-model="name" :rules="[rules.required]" required></v-text-field>
        <v-select label="Gender" v-model="gender" :items="genderList" required></v-select>
        <v-text-field label="Address (Optional)" v-model="address" multi-line></v-text-field>
        <v-select label="Country" v-model="country" :items="countries" required></v-select>
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
            <v-btn flat @click="reset">Clear</v-btn>
          </router-link>
          <v-spacer></v-spacer>
          <v-btn flat @click="submit">Register</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
  </v-flex>
</v-layout>
</template>

<script>
  export default {
    data () {
      return {
        e1: true,
        e2: true,
        password: '',
        password2: '',
        gender: [],
        genderList: ['Male', 'Female'],
        country: [],
        // eslint-disable-next-line
        countries: ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"],
        rules: {
          required: (value) => !!value || 'Required.',
          country: [val => (val || '').length > 0 || 'This field is required'],
          email: (value) => {
            // eslint-disable-next-line
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
    },
    methods: {
      resetForm () {
        // this.errorMessages = []
        // this.formHasErrors = false
        // Object.keys(this.form).forEach(f => {
        //   this.$refs[f].reset()
        // })
      },
      submit () {
        this.formHasErrors = false
        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true
          this.$refs[f].validate(true)
        })
      }
    }
  }
</script>