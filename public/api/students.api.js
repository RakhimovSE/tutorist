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
            form: student,
            contacts:{
                studentId: -1,
                contactTypeId: -1,
                value: '',
                description: '',
            },
            students: [],
            contactTypes: [],
            image: ''
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
            let formData = new FormData();
            formData.append('fileInput', files[0]);
            console.log(formData.values(), files);
            fetch('/api/students/saveImage', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => console.log(data.path))
                .catch(error => console.log(error))
        },
        createImage(file) {
            let image = new Image();
            let reader = new FileReader();
            let vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function (e) {
            this.image = '';
        },
        fetchData() {
          request('/api/students', 'GET', null)
              .then((response) => this.students = response);
          request('/api/contacttypes', 'GET', null)
              .then((response) => this.contactTypes = response);
        },
        async studentProfile(id) {
            location.href = `/students/${id}`;
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
            request('/api/students', 'GET', null)
                .then((response) => this.students = response);
        },
        async changeStudent(id) {
            const {...students} = this.form;
            await request(`/api/students/update/${id}`, 'PUT', students);
            request('/api/students', 'GET', null)
                .then((response) => this.students = response);
        },
        async removeStudent(id) {
            await request(`/api/students/delete/${id}`, 'DELETE')
            request('/api/students', 'GET', null)
                .then((response) => this.students = response);
        },
        async addContact() {
            this.form.Contacts.push({
                studentId: -1,
                contactTypeId: -1,
                value: '',
                description: ''
            });
        },
        async deleteContact(index) {
            this.form.Contacts.splice(index, 1);
        },
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