<template>
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input v-model: email="auth.email" type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input v-model: password="auth.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
    <div v-if="auth.message !== ''" class="alert" role="alert"
      : class="{'alert-danger': auth.hasErrors, 'alert-success': !auth.hasErrors}">
      <button @click="dismissAlert" type="button" class="close"><span aria-hidden="true">×</span></button>
      <p><strong>{{ auth.message }}</strong></p>
    </div>
    <button type="button" @click="login" class="btn btn-primary" > Login</button >
    <button type="button" @click="signUp" class="btn btn-success" > Signup</button >
  </form>
</template>

<script>
export default {
  name : "Movies",
  data() {
    return {
      msg : "Movies | LS Media Store"
      }
  }
}
</script>