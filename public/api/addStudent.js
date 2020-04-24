import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el: '#student',
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                middleName: '',
                photoUrl: '',
                role: ''
            }
        }
    },
    methods: {
        async addStudent() {
            const {...formData} = this.form;
            const newStudent = await request('/api/addstudent', 'POST', formData)
            this.form = {};
        }
    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        console.log(response)
        return await response.json()
    } catch (e) {
        console.warn('Error:', e.message)
    }
}