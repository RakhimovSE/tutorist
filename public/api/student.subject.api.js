import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el: '#subject',
    data() {
        return{
            form: {
                subcategory:''
            }
        }
    },
    methods: {
        async addSubcategory() {
            const {...data} = this.form;
            await request(`/api/users/post`, 'POST', data);
        }
    }

})