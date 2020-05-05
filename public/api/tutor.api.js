import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el: '#tutor',
    data() {
      return{
          form: user
      }
    },
    methods: {
        async changeData() {
            const {...data} = this.form;
            await request(`/api/users/update`, 'PUT', data);
            toast('Данные успешно обновлены');
        }
    }

})