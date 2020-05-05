import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

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
            columns: ['Имя', 'Роль'],
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
        async studentProfile(id) {
            location.href = `/students/${id}`
        },
        async studentProfileEdit(id) {
            location.href = `/students/${id}/edit`
        },
        async addNewStudent() {
            location.href = '/students/new';
        },
        async addStudentToDb() {
            const {...students} = this.form;
            await request('/api/students/create', 'POST', students);
            this.students = await request('/api/students', 'GET', null);
            location.href = '/students';
        },
        async changeStudent(id) {
            const {...students} = this.form;
            await request(`/api/students/update/${id}`, 'PUT', students);
            this.students = await request('/api/students', 'GET', null);
            location.href = '/students';
        },
        async removeStudent(id) {
            await request(`/api/students/delete/${id}`, 'DELETE')
            this.students = await request('/api/students', 'GET', null);
            toast('Ученик успешно удален');
        },
        async addContact() {
            const {...contacts} = this.contacts;
            await request('/api/addcontact', 'POST', contacts);
            this.contactsArray = await request('/api/contacts', 'GET', null);
        },
        async changeContact(id, value) {
            await request(`/api/changecontact/${id}`, 'PUT', {value: value})
            this.contactsArray = await request('/api/contacts', 'GET', null);
        },
        async removeContact(id) {
            await request(`/api/removecontact/${id}`, 'DELETE')
            this.contactsArray = await request('/api/contacts', 'GET', null);
        }

    },
    async mounted() {
        this.loading = true;
        this.contacts = await request('/api/students');
        this.loading = false;
    }
})