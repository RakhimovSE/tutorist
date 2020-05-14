import Vue
  from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

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
      contacts: {
        studentId: -1,
        contactTypeId: -1,
        value: '',
        description: '',
      },
      students: [],
      contactTypes: [],
      fileName: 'Выберите фотографию',
      formData: null,
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
      this.fileName = files[0].name;
      this.form.photoUrl = `/images/avatars/${this.form.id}.jpg`;
      this.createImage(files[0]);
      this.formData = new FormData();
      this.formData.append('fileInput', files[0]);
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
    async fetchData() {
      this.students = await request('/api/students', 'GET');
      this.contactTypes = await request('/api/students/contact-types', 'GET');
    },
    studentProfile(id) {
      location.href = `/students/${id}`;
    },
    studentProfileEdit(id) {
      location.href = `/students/${id}/edit`;
    },
    async addStudentToDb() {
      const { ...students } = this.form;
      if (!students.photoUrl)
        students.photoUrl = '/images/default-user.png';
      else
        students.photoUrl = '';
      let student = await request('/api/students/create', 'POST', students);
      if (!students.photoUrl)
        fetch(`/api/students/updatePhoto/${student.id}`, {
          method: 'POST',
          body: this.formData
        })
          .then(data => console.log(data.path))
          .catch(error => console.log(error))
      location.href = '/students'
    },
    async changeStudent(id) {
      const { ...students } = this.form;
      await request(`/api/students/update/${id}`, 'PUT', students);
      if (this.formData)
        fetch(`/api/students/updatePhoto/${this.form.id}`, {
          method: 'POST',
          body: this.formData
        })
          .then(response => response.json())
          .then(data => console.log(data.path))
          .catch(error => console.log(error))
      toast('Данные успешно обновлены!')
    },
    async removeStudent(id) {
      await request(`/api/students/delete/${id}`, 'DELETE')
      request('api/students', 'GET')
        .then(response => this.students = response)
        .catch(error => console.log(error));
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