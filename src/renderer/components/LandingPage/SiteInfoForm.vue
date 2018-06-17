<template>
  <form action="" @submit.prevent="addEditSite()" class="pure-form pure-form-stacked">
    <input type="hidden" name="siteId" v-model="sel">
    <legend>Session Details</legend>
    <fieldset>
      <div class="pure-g">
        <div class="pure-u-1-2">
          <label for="host">Host / IP Address</label>
          <input id="host" v-model="host" name="host" type="text" class="pure-u-23-24" placeholder="Host">
        </div>

        <div class="pure-u-1-3">
          <label for="protocol">Protocol</label>
          <select @change="suggestPort()" id="protocol" v-model="protocol" type="text" class="pure-u-23-24">
            <option value="ftpe">FTP / Explicit TLS</option>
            <option value="ftpi">FTP / Implicit TLS</option>
            <option value="ftpn">FTP / No Encryption</option>
            <option value="sftp">SFTP</option>
            <option value="scp">SCP</option>
          </select>
        </div>

        <div class="pure-u-1-6">
          <label for="port">Port</label>
          <input id="port" v-model="port" name="port" type="text" class="pure-u-23-24" placeholder="Port">
        </div>

        <div class="pure-u-1-3">
          <label for="name">Username</label>
          <input id="name" v-model="name" type="text" class="pure-u-23-24" placeholder="Username">
        </div>

        <div class="pure-u-1-3">
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" class="pure-u-23-24" placeholder="Password">
        </div>
      </div>

      <button type="submit" class="pure-button pure-button-primary connect-btn save-btn">Save & Connect</button>
      <button type="submit" class="pure-button pure-button-secondary connect-btn">Connect</button>
    </fieldset>

  </form>
</template>

<script>
  export default {
    name: 'site-info-form',
    data: function () {
      return {
        host: '',
        protocol: 'ftpe',
        port: 21,
        name: '',
        password: ''
      }
    },
    methods: {
      suggestPort: function () {
        switch (this.protocol) {
          case 'sftp':
          case 'scp':
            this.port = 22
            break
          case 'ftpi':
            this.port = 990
            break
          case 'ftpn':
          case 'fpte':
          default:
            this.port = 21
            break
        }
      }
    },
    props: {
      sel: Number
    }
  }
</script>

<style>
  .connect-btn {
    border: 1px solid #aaa;
    margin-top: 5px;
    margin-right: 5px;
  }
  .save-btn { border: 1px solid #0078e7; }
</style>
