<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Email"
      v-model="email"
      :rules="[rules.required, rules.email]"
      required
    ></v-text-field>
    <v-text-field
      name="pass"
      label="Password"
      hint="At least 8 characters"
      v-model="password"
      min="8"
      :error-messages="passwordErrors"
      :append-icon="e1 ? 'visibility' : 'visibility_off'"
      :append-icon-cb="() => (e1 = !e1)"
      :type="e1 ? 'password' : 'text'"
      :rules="[rules.required]"
      required>
    </v-text-field>
    <v-text-field
      name="repeatPass"
      label="Repeat Password"
      hint="At least 8 characters"
      v-model="password2"
      min="8"
      :error-messages="passwordErrors"
      :append-icon="e2 ? 'visibility' : 'visibility_off'"
      :append-icon-cb="() => (e2 = !e2)"
      :type="e2 ? 'password' : 'text'"
      :rules="[rules.required]"
      required>
    </v-text-field>
    <v-text-field
      label="Name"
      v-model="name"
      :rules="[v => !!v || 'Name is required']"
      required
    ></v-text-field>
    <v-text-field
      label="Address"
      v-model="address"
      :rules="[v => !!v || 'Address is required']"
      required
    ></v-text-field>
    <v-text-field
      label="Mobile Phone"
      v-model="mobilePhone"
      hint="Exactly 10 characters"
      :rules="mobilePhoneRules"
      :counter="10"
      type=number
      required
    ></v-text-field>

    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
  export default {
    data: () => {
      return {
      valid: true,
      e1: true,
      e2: true,
      email:'',
      password: '',
      name: '',
      address: '',
      mobilePhone:'',
      mobilePhoneRules: [
        (v) => !!v || 'Mobile phone is required',
        (v) => v && v.length == 10 || 'Mobile phone must be 10 characters'
      ],
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
methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('/api/submit', {
          email: this.email,
          password: this.password,
          name: this.name,
          address: this.address,
          mobilePhone: this.mobilePhone
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  name: 'Admin'
}
</script>
