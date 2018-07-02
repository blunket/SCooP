<template>
  <form action="" @submit.prevent="addEditSite()" class="pure-form pure-form-stacked">
    <span id="editIconSpan" v-show="showEditIcon"
      @click="focusTitle()">
      <i class="far fa-edit"></i>
    </span>
    <input type="text" id="siteName" class="title"
      maxlength="30"
      v-bind:class="{ 'invalid': !validations.siteName }"
      @focus="showEditIcon = false"
      @blur="showEditIcon = true"
      v-model.trim="siteName">
    <legend>Session Details</legend>
    <fieldset>
      <div class="pure-g">
        <div class="pure-u-1-2">
          <label for="host">Host / IP Address</label>
          <input type="text" id="host"
            v-bind:class="{ 'invalid': !validations.host }"
            v-model.trim="host"
            class="pure-u-23-24"
            placeholder="Host">
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
          <input id="port" v-model.number="port" type="number" class="pure-u-23-24" placeholder="Port"
            v-bind:class="{ 'invalid': !validations.port }">
        </div>

        <div class="pure-u-1-3">
          <label for="name">Username</label>
          <input id="name" v-model.trim="username" type="text" class="pure-u-23-24" placeholder="Username"
            v-bind:class="{ 'invalid': !validations.username }">
        </div>

        <div class="pure-u-1-3">
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" class="pure-u-23-24" placeholder="Password">
        </div>
      </div>
      <div class="form-btns">
        <button @click.prevent="saveAndConnect()" class="pure-button pure-button-primary">
          <i class="fas fa-plug"></i>
          Save & Connect
        </button>
        <button @click.prevent="saveSite()" class="pure-button pure-button-darkgray">
          <i class="fas fa-save"></i>
          Save
        </button>
        <button @click.prevent="deleteSite()" v-if="sel != null" class="pure-button button-warning">
          <i class="far fa-trash-alt"></i>
          Delete
        </button>
      </div>
    </fieldset>

  </form>
</template>

<script>
  const ipAddressRegex = /(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/
  const hostnameRegex = /^(\w+|\w[\w-]*\w\.)*(\w+|\w[\w-]*\w)$/

  export default {
    name: 'site-info-form',
    data: function () {
      return {
        siteName: 'New Site',
        host: '',
        protocol: 'ftpe',
        port: 21,
        username: '',
        password: '',
        showEditIcon: true,
        validations: {
          siteName: true,
          host: true,
          port: true,
          username: true
        }
      }
    },
    methods: {
      saveAndConnect: function () {
        this.saveSite()
      },
      saveSite: function () {
        if (!this.validate()) {
          return
        }
        var siteData = {
          siteName: this.siteName,
          host: this.host,
          protocol: this.protocol,
          port: this.port,
          username: this.username,
          password: this.password
        }
        this.$emit('saveSite', siteData)
      },
      deleteSite: function () {
        this.$emit('deleteSite', this.sel)
      },
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
      },
      validate: function () {
        this.validations.siteName = this.siteName.length >= 2 && this.siteName.length <= 30
        this.validations.host = (ipAddressRegex.test(this.host) || hostnameRegex.test(this.host))
        this.validations.port = /^\d+$/.test(this.port) && this.port >= 1 && this.port <= 65535
        this.validations.username = this.username.trim() !== ''
        return this.validations.siteName && this.validations.host && this.validations.port && this.validations.username
      },
      resetForm: function () {
        this.siteName = this.selectedSite.siteName
        this.host = this.selectedSite.host
        this.protocol = this.selectedSite.protocol
        this.port = this.selectedSite.port
        this.username = this.selectedSite.username
        if (this.selectedSite.password === false) {
          this.password = ''
        } else {
          this.password = this.selectedSite.password
        }
      },
      focusTitle: function () {
        document.getElementById('siteName').focus()
      }
    },
    mounted: function () {
      this.resetForm()
      this.focusTitle()
    },
    watch: {
      sel: function (newVal, oldVal) {
        if (oldVal !== newVal) {
          this.resetForm()
          if (newVal == null) {
            this.focusTitle()
          }
        }
      }
    },
    props: [
      'sel',
      'selectedSite'
    ]
  }
</script>

<style scoped>
  .form-btns {
    margin-top: 5px;
  }

  .form-btns button {
    margin-right: 5px;
  }

  #editIconSpan {
    position: relative;
    top: 2px;
    cursor: text;
  }

  #siteName {
    display: inline-block;
  }

  #siteName:not(:focus):not(.invalid) {
    background-color: transparent;
    padding: 0px;
    border: 0px;
    box-shadow: none;
  }

  .invalid {
    border: 1px solid #f00 !important;
  }
</style>
