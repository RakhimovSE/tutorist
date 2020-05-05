import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el: '#tutor',
    data() {
      return{
          form: {
              firstName: '',
              lastName: '',
              middleName: '',
              email: ''

          }
      }
    },
    methods: {
        async changeData() {
            const {...users} = this.form;
            await request(`/api/users/update`, 'PUT', users);
            toast('Данные успешно обновлены');
        }
    }

})