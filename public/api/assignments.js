import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el: "#app",
    data() {
        return {
            form: {
                title: '',
                type: '',
                instructions: ''
            }
        }
    },
    methods: {
        async addInfo() {
            const {...tasks} = this.form;
            await request('/assignments', 'POST', tasks);
            this.form = {};
        }
    }
});

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {};
        let body;

        if (data) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }
        await fetch(url, {
            method,
            headers,
            body
        });
        return await response.json();
    } catch (e) {
        console.warn('Error:', e.message);
    }
}