<template>
  <v-container fluid="">
    <v-row justify="center" align="center">
      <v-card
        width="100%"
        max-width="400"
        class="mx-auto mt-12 px-5 py-5 rounded-card"
      >
        <v-card-text>
          <TitleText :component="'h1'" class="text-center mb-7">
            {{ 'Register' }}
          </TitleText>
          <v-form>
            <v-text-field
              v-model="username"
              :label="'User Name'"
              :class="isLocaleMm ? 'mmBodyFont' : ''"
              dense
              height="40"
              type="text"
              outlined
              color="primary"
              @keyup.enter="onSubmit"
            ></v-text-field>

            <v-text-field
              v-model="email"
              :label="'Email Name'"
              :class="isLocaleMm ? 'mmBodyFont' : ''"
              dense
              height="40"
              type="text"
              outlined
              color="primary"
              @keyup.enter="onSubmit"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :label="'Password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :class="isLocaleMm ? 'mmBodyFont' : ''"
              :type="show ? 'text' : 'password'"
              dense
              height="40"
              outlined
              color="primary"
              @keyup.enter="onSubmit"
              @click:append="show = !show"
            ></v-text-field>

            <v-btn
              :disabled="!isNotEmpty"
              :class="isLocaleMm ? 'mmBodyFont' : ''"
              :loading="isLoading"
              color="primary"
              block
              @click="onSubmit"
            >
              {{ 'Submit' }}
            </v-btn>
          </v-form>

          <v-btn
            color="primary"
            depressed
            block
            text
            class="mt-3"
            :to="'/login'"
          >
            Already Account ?
          </v-btn>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { errorHandler } from '~/assets/util/helper'

export default {
  middleware: ['isAuth', 'checkAuth'],
  data() {
    return {
      username: '',
      password: '',
      email: '',
      isLoading: false,
      show: false,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => "The email and password you entered don't match"
      }
    }
  },
  computed: {
    // Getters
    ...mapGetters({
      type: 'locale'
    }),

    isNotEmpty() {
      return !!this.password && !!this.username && !!this.email
    },

    isLocaleMm() {
      return this.type === 'mm'
    }
  },
  methods: {
    // Actions
    ...mapActions({
      submitRegister: 'auth/submitRegister',

      // Global Snack Message Show Hide
      showSnack: 'snackbar/showSnack',
      setSnackMessage: 'snackbar/setSnackMessage',
      setSnackColor: 'snackbar/setSnackColor'
    }),

    async onSubmit() {
      // Is not valid
      if (!this.isNotEmpty) return

      this.isLoading = true

      const payloads = {
        email: this.email,
        password: this.password,
        name: this.username
      }

      try {
        await this.submitRegister(payloads)
        this.isLoading = false
      } catch (e) {
        // const Console = console
        // Console.log('Error Response ::::: ', e)
        errorHandler(e, this)
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
#CustomInput {
  height: 20px;
  font-size: 10pt;
  background-color: red;
}
.CustomInput label[for] {
  height: 20px;
  font-size: 10pt;
}
.rounded-card {
  border-radius: 24px !important;
}
</style>
