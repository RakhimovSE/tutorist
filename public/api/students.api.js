import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

Vue.component('loader', {
    template: `
    <div style="display: flex;justify-content: center;align-items: center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  `
})

new Vue({
    el: '#student',
    data() {
        return {
            loading: false,
            form: {
                firstName: '',
                lastName: '',
                middleName: '',
                photoUrl: '',
                role: ''
            },
            contacts:{
                studentId: -1,
                contactTypeId: -1,
                value: '',
                description: '',
            },
            students: [],
            contactsArray: [],
            contactTypes: []
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
          request('/api/students', 'GET', null)
              .then((response) => this.students = response);
          request('/api/contacttypes', 'GET', null)
              .then((response) => this.contactTypes = response);
          request('/api/contacts', 'GET', null)
              .then((response) => this.contactsArray = response);
        },
        async addStudent() {
            const {...students} = this.form;
            await request('/api/addstudent', 'POST', students);
            request('/api/students', 'GET', null)
                .then((response) => this.students = response);
            this.form = {};
        },
        async removeStudent(id) {
            await request(`/api/removestudent/${id}`, 'DELETE')
            request('/api/students', 'GET', null)
                .then((response) => this.students = response);
        },
        async addContact() {
            const {...contacts} = this.contacts;
            await request('/api/addcontact', 'POST', contacts);
            request('/api/contacts', 'GET', null)
                .then((response) => this.contactsArray = response);
            this.contacts = {};
        },
        async changeContact(id, value) {
            await request(`/api/changecontact/${id}`, 'PUT', {value: value})
            request('/api/contacts', 'GET', null)
                .then((response) => this.contactsArray = response);
        },
        async removeContact(id) {
            await request(`/api/removecontact/${id}`, 'DELETE')
            request('/api/contacts', 'GET', null)
                .then((response) => this.contactsArray = response);
        }
    },
    async mounted() {
        this.loading = true;
        this.contacts = await request('/api/students');
        this.loading = false;
    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {};
        let body;

        if (data) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

       const response = await fetch(url, {
            method,
            headers,
            body
        });
        return await response.json();
    } catch (e) {
        console.warn('Error:', e.message);
    }
}