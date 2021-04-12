/* Add your Application JavaScript */
// Instantiate our main Vue Instance
const Home = {
    name: 'Home',
    template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
    `,
    data() {
        return {}
    }
};

const app = Vue.createApp({
    data() {
        return {

        }
    }/*,components: {
        'home': Home,
        'upload': upload-form
      }*/
});

app.component('upload-form', {
    name: 'upload-form',
    template: `
        <div class = "form">
            <form id = "uploadForm" action="" method = "POST" enctype = "multipart/form-data" @submit.prevent="uploadPhoto">
                {{ form.csrf_token }}
                
                {{form.descrip.label}}
                {{form.descrip}}
            
                {{ form.file.label}}
                {{ form.file}}

                {{ form.submitbtn}}
            </form>
            /*
            <form id = "uploadForm" action="" method = "POST" enctype = "multipart/form-data" @submit.prevent="uploadPhoto">
                <textarea name="message" ></textarea>
                <br><br>
                <input type="file" id="file" >
                <br><br>
                <input type="submit">
            </form>
            */
        </div>
    `,
    methods: {
        uploadPhoto(){
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm);
            fetch('/api/upload', {
                method: 'POST', body: form_data,headers: {'X-CSRFToken': token},credentials: 'same-origin'
               })
                .then(function (response) {
                return response.json();
                })
                .then(function (jsonResponse) {
                // display a success message
                console.log(jsonResponse);
                })
                .catch(function (error) {
                console.log(error);
                });
        }
    }
    
});

app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Upload <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

app.component('app-footer', {
    name: 'AppFooter',
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; {{ year }} Flask Inc.</p>
        </div>
    </footer>
    `,
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

const NotFound = {
    name: 'NotFound',
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data() {
        return {}
    }
};

// Define Routes
const routes = [
    { path: "/", component: Home },
    // Put other routes here
    { path: "/upload", component: upload-form },
    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');