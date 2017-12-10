<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
        <v-form-title class="headline">Register</v-form-title>
          <label for="inputEmail">Email</label>
          <input type="email" class="form-control" name="inputEmail" placeholder="Email">
          <div class="form-group">
            <label for="inputPassword">Password</label>
            <input type="password" class="form-control" name="inputPassword" placeholder="Password">
          </div>
          <div class="form-group">
            <label for="inputName">Name</label>
            <input type="text" class="form-control" name="inputName" placeholder="Marvel Studio">
          </div>
          <div class="form-group">
            <label for="inputAddress">Address</label>
            <input type="text" class="form-control" name="inputAddress" placeholder="1234 Main St">
          </div>
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
          <button type="submit" class="btn btn-primary float-right" name="submit" style="margin-bottom: 20px; margin-left: 5%;">Submit</button>
          <button type="reset" class="btn float-right" name="button">Cancel</button>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "Register"
  };
</script>