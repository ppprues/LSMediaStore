<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
        <v-form-title class="headline">Artist Register</v-form-title>
        <v-text-field label="Name" v-model="name" :rules="[rules.required,rules.Namerequired]" required></v-text-field>
        <v-text-field label="Email" v-model="email" :rules="[rules.required, rules.email]" required></v-text-field>
        <v-text-field label="Password" hint="At least 8 characters" v-model="password" min="8" :error-messages="passwordErrors"
          :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'"
          :rules="[rules.required]" required></v-text-field>
        <v-text-field name="repeatPass" label="Repeat Password" hint="At least 8 characters" v-model="password2" min="8" :error-messages="passwordErrors"
          :append-icon="e2 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e2 = !e2)" :type="e2 ? 'password' : 'text'"
          :rules="[rules.required]" required></v-text-field>
        <v-select label="Type" v-model="type" :items="types" required></v-select>
        <v-select label="Country" v-model="country" :items="countries" required></v-select>
        <v-select label="Bank Name" v-model="bankname" :items="banknames" required></v-select>
        <v-text-field label="BankId" v-model="bankid" :rules="[rules.required]" required></v-text-field>
        <v-text-field label="Telephone No." v-model="telephone":rules="[rules.required,rules.Telephonerequired]" type = "number" required></v-text-field>

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
        name: null,
        email: null,
        password: '',
        password2: '',
        type: null,
        types: ['Single','Band'],
        country: null,
        countries: ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"],
        bankname: null,
        banknames:['BBL - Bangkok Bank','KBANK - Kasikornbank','KTB - Krung Thai Bank','TMB - TMB Bank','SCB - Siam Commercial Bank'],
        bankid: null,
        telephone: null,
        rules: {
        Namerequired: (v) => v.length <= 10 || 'Name cannot more than 10 characters',
        Telephonerequired: (v) => v.length < 10 && v.length > 10 || 'Telephone must be 10 numbers',
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

      }
    },
    methods: {
      reset () {
        this.name = ''
        this.email = ''
        this.password = ''
        this.password2 = ''
        this.bankname = ''
        this.bankid = ''
        this.type = ''
        this.telephone = ''
        this.country = ''
        console.log('clear')
      },
      submit () {
        if (this.$refs.form.validate()) {
         // Native form submission is not yet supported
         axios.post('/api/submit', {
           name: this.name,
           email: this.email,
           password: this.password,
           password2: this.password2,
           country: this.country,
           bankname: this.bankname,
           type: this.type,
           bankid: this.bankid,
           telephone: this.telephone

         })
       }
      }
    }
  }
</script>
