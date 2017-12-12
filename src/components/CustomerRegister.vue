<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
        <v-form-title class="headline">Customer Register</v-form-title>
        <v-text-field label="Name" v-model="name" :rules="[rules.required,rules.Namerequired]" required></v-text-field>
        <v-text-field label="Email" v-model="email" :rules="[rules.required, rules.email]" required></v-text-field>
        <v-text-field label="Password"  v-model="password" :rule="[v => v >= 8 || 'At least 8 characters' ]" :error-messages="passwordErrors" :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" :rules="[rules.required]" required></v-text-field>
        <v-text-field name="repeatPass" label="Repeat Password" v-model="password2" :rule="[v => v >= 8 || 'At least 8 characters' ]" :error-messages="passwordErrors"
          :append-icon="e2 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e2 = !e2)" :type="e2 ? 'password' : 'text'"
          :rules="[rules.required,rules.passwordCheck]" required></v-text-field>
        <v-select label="Gender" v-model="gender" :items="genders" required></v-select>

        <v-layout row wrap>
          <v-flex xs11 sm5>
            <v-menu lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-right="40"
              max-width="290px" min-width="290px">
              <v-text-field slot="activator" label="Date in M/D/Y format" v-model="dateFormatted" prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
              <v-date-picker v-model="date" @input="dateFormatted = formatDate($event)" no-title scrollable actions>
                <template slot-scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                    <v-btn flat color="primary" @click="save">OK</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-menu>
            <p>Date in ISO format:
              <strong>{{ date }}</strong>
            </p>
          </v-flex>
        </v-layout>

        <v-text-field label="Address (Optional)" v-model="address" multi-line></v-text-field>
        <v-select label="Country" v-model="country" :items="countries" required></v-select>
        <v-select label="Bank Name" v-model="bankname" :items="banknames" required></v-select>
        <v-text-field label="BankId" v-model="bankid" type="number"></v-text-field>
        <v-text-field label="Telephone No." v-model="telephone" :rules="[rules.required,rules.telephone]" type="number" required></v-text-field>

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
  import firebase from "firebase"

  export default {
    data() {
      return {
        e1: true,
        e2: true,
        email: "",
        name: "",
        password: "",
        password2: "",
        gender: null,
        genders: ["Male", "Female"],
        dateFormatted: null,
        date: null,
        country: null,
        bankid: null,
        countries: [
          "Afghanistan",
          "Albania",
          "Algeria",
          "Andorra",
          "Angola",
          "Anguilla",
          "Antigua &amp; Barbuda",
          "Argentina",
          "Armenia",
          "Aruba",
          "Australia",
          "Austria",
          "Azerbaijan",
          "Bahamas",
          "Bahrain",
          "Bangladesh",
          "Barbados",
          "Belarus",
          "Belgium",
          "Belize",
          "Benin",
          "Bermuda",
          "Bhutan",
          "Bolivia",
          "Bosnia &amp; Herzegovina",
          "Botswana",
          "Brazil",
          "British Virgin Islands",
          "Brunei",
          "Bulgaria",
          "Burkina Faso",
          "Burundi",
          "Cambodia",
          "Cameroon",
          "Cape Verde",
          "Cayman Islands",
          "Chad",
          "Chile",
          "China",
          "Colombia",
          "Congo",
          "Cook Islands",
          "Costa Rica",
          "Cote D Ivoire",
          "Croatia",
          "Cruise Ship",
          "Cuba",
          "Cyprus",
          "Czech Republic",
          "Denmark",
          "Djibouti",
          "Dominica",
          "Dominican Republic",
          "Ecuador",
          "Egypt",
          "El Salvador",
          "Equatorial Guinea",
          "Estonia",
          "Ethiopia",
          "Falkland Islands",
          "Faroe Islands",
          "Fiji",
          "Finland",
          "France",
          "French Polynesia",
          "French West Indies",
          "Gabon",
          "Gambia",
          "Georgia",
          "Germany",
          "Ghana",
          "Gibraltar",
          "Greece",
          "Greenland",
          "Grenada",
          "Guam",
          "Guatemala",
          "Guernsey",
          "Guinea",
          "Guinea Bissau",
          "Guyana",
          "Haiti",
          "Honduras",
          "Hong Kong",
          "Hungary",
          "Iceland",
          "India",
          "Indonesia",
          "Iran",
          "Iraq",
          "Ireland",
          "Isle of Man",
          "Israel",
          "Italy",
          "Jamaica",
          "Japan",
          "Jersey",
          "Jordan",
          "Kazakhstan",
          "Kenya",
          "Kuwait",
          "Kyrgyz Republic",
          "Laos",
          "Latvia",
          "Lebanon",
          "Lesotho",
          "Liberia",
          "Libya",
          "Liechtenstein",
          "Lithuania",
          "Luxembourg",
          "Macau",
          "Macedonia",
          "Madagascar",
          "Malawi",
          "Malaysia",
          "Maldives",
          "Mali",
          "Malta",
          "Mauritania",
          "Mauritius",
          "Mexico",
          "Moldova",
          "Monaco",
          "Mongolia",
          "Montenegro",
          "Montserrat",
          "Morocco",
          "Mozambique",
          "Namibia",
          "Nepal",
          "Netherlands",
          "Netherlands Antilles",
          "New Caledonia",
          "New Zealand",
          "Nicaragua",
          "Niger",
          "Nigeria",
          "Norway",
          "Oman",
          "Pakistan",
          "Palestine",
          "Panama",
          "Papua New Guinea",
          "Paraguay",
          "Peru",
          "Philippines",
          "Poland",
          "Portugal",
          "Puerto Rico",
          "Qatar",
          "Reunion",
          "Romania",
          "Russia",
          "Rwanda",
          "Saint Pierre &amp; Miquelon",
          "Samoa",
          "San Marino",
          "Satellite",
          "Saudi Arabia",
          "Senegal",
          "Serbia",
          "Seychelles",
          "Sierra Leone",
          "Singapore",
          "Slovakia",
          "Slovenia",
          "South Africa",
          "South Korea",
          "Spain",
          "Sri Lanka",
          "St Kitts &amp; Nevis",
          "St Lucia",
          "St Vincent",
          "St. Lucia",
          "Sudan",
          "Suriname",
          "Swaziland",
          "Sweden",
          "Switzerland",
          "Syria",
          "Taiwan",
          "Tajikistan",
          "Tanzania",
          "Thailand",
          "Timor L'Este",
          "Togo",
          "Tonga",
          "Trinidad &amp; Tobago",
          "Tunisia",
          "Turkey",
          "Turkmenistan",
          "Turks &amp; Caicos",
          "Uganda",
          "Ukraine",
          "United Arab Emirates",
          "United Kingdom",
          "United States",
          "Uruguay",
          "Uzbekistan",
          "Venezuela",
          "Vietnam",
          "Virgin Islands (US)",
          "Yemen",
          "Zambia",
          "Zimbabwe"
        ],
        bankname: null,
        type: 'customer',
        banknames: [
          "BBL - Bangkok Bank",
          "KBANK - Kasikornbank",
          "KTB - Krung Thai Bank",
          "TMB - TMB Bank",
          "SCB - Siam Commercial Bank"
        ],
        telephone: null,
        point: 0,
        rules: {
          passwordCheck:(v) => this.password2 == this.password ,
          telephone: v =>  v.length == 10 || "Telephone must be 10 numbers",
          required: value => !!value || "Required.",
          email: value => {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || "Invalid e-mail.";
          },
          date: null,
          dateFormatted: null
        }
      }
    },
    created() {
      firebase
        .database()
        .ref()
        .child("account")
        .on("value", snapshot);
    },
    computed: {
      formIsValid() {
        return this.form
      },
      user() {
        return this.$store.getters.user
      }
    },
    methods: {
      reset() {
        this.name = ''
       this.email = ''
       this.dateFormatted = ''
       this.country = ''
       this.password = ''
       this.password2 = ''
       this.gender = ''
       this.address = ''
       this.bankname = ''
       this.bankid = ''
       this.telephone = ''
      console.log('clear')
      },
      submit() {
        console.log(this.user)
        var vm = this
        this.$store
          .dispatch("signUp", { email: this.email, password: this.password })
          .then(() => {
            firebase
              .database()
              .ref()
              .child("account")
              .child(this.user)
              .set({
                name: vm.name,
                email: vm.email,
                date: vm.date,
                password: vm.password,
                gender: vm.gender,
                country: vm.country,
                banknames: vm.bankname,
                banknumber: vm.bankid,
                telephone: vm.telephone,
                isCustomer: true,
                isCompany: false,
                isAdmin: false,
                point: vm.point
              });
            alert("Successfully sign up")
            location.assign('/');
          })
          .catch(err => {
            alert(err)
          })
      },
      formatDate(date) {
        if (!date) {
          return null
        }

        const [year, month, day] = date.split("-")
        return `${month}/${day}/${year}`
      },
      parseDate(date) {
        if (!date) {
          return null
        }

        const [month, day, year] = date.split("/")
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      }
    }
  }
</script>