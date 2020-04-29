import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el: "#studApp",
    data() {
        return {
            form: {
                student: '',
                assignment: '',
                dueDate: '',
                points: ''
            }
        }
    },
    methods: {
        async addInfo() {
            const {...tasks} = this.form;
            await request('/StudentAssignments', 'POST', tasks);
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