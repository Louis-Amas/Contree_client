<template>

      <v-container
        ma-0 pa-0
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="green darken-3"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    >
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="username"
                    :rules="usernameRules"
                    @keypress.enter="emitCredentials"
                    required
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                    @keypress.enter="emitCredentials"
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn 
                    :disabled="!valid" 
                    color="green darken-2"                      
                    @click="emitCredentials"
                >
                    Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
  export default {
    data() {
        return {
            valid: false,
            username: '',
            usernameRules: [
                v => !!v || 'Username is required',
                v => (v 
                    && v.length >= 3 
                    && v.length <= 20) || 'Name must be between 4 and 20 chars'
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v 
                    && v.length >= 3 
                    && v.length <= 20) || 'Password must be between 5 and 20 chars'
                ]

        }
    },
      methods: {
          emitCredentials() {
              this.$emit('user', {
                  username: this.username,
                  password: this.password
              })
          }
      }
  }
</script>
