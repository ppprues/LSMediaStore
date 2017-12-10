<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed clipped app v-model="drawer">
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-list-tile v-bind:href="item.url">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="deep-orange" dark app clipped-left fixed>
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-avatar size="32px" tile>
          <router-link to="/">
            <img src="./assets/LS-logo-full.png" alt="LS Media Store" style="width: auto; height: 32px; padding-left: 120px;">
          </router-link>
        </v-avatar>
      </v-toolbar-title>
      <v-text-field light solo prepend-icon="search" placeholder="Search"></v-text-field>
      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn icon @click.native.stop="login = true">
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-dialog v-model="login" max-width="290">
          <v-card>
            <v-card-title class="headline">Login</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field label="Email" v-model="email" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()"
                  required></v-text-field>
                <v-text-field label="Password" hint="At least 8 characters" v-model="password" min="8" :error-messages="passwordErrors" :append-icon="e1 ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" counter @input="$v.password.$touch()"
                  @blur="$v.password.$touch()" required></v-text-field>
                <v-card-actions>
                  <router-link to="Register" @click.native.stop="login = false" >
                    <v-btn flat @click="">Register</v-btn>
                  </router-link>
                  <v-spacer></v-spacer>
                  <v-btn flat @click="submit">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      e1: true,
      password: '',
      methods: {
        addressCheck () {
          this.errorMessages = this.address && !this.name
            ? ['Hey! I\'m required']
            : []
          return true
        },
        resetForm () {
          this.errorMessages = []
          this.formHasErrors = false
          Object.keys(this.form).forEach(f => {
            this.$refs[f].reset()
          })
        },
        submit () {
          this.formHasErrors = false
          Object.keys(this.form).forEach(f => {
            if (!this.form[f]) this.formHasErrors = true
            this.$refs[f].validate(true)
          })
        }
      },
      login: false,
      drawer: false,
      items: [
        { icon: 'music_note', text: 'Music', url: './Music' },
        { icon: 'movie', text: 'Movies', url: './Movies' },
        { icon: 'settings', text: 'Settings', url: './' }
      ]
    })
  }
</script>