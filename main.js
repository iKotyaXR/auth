console.clear();

class API {
  api_link = 'https://blog.kata.academy/api/';

  constructor() {
    this.method = 'GET';
  }

  set_method(data) {
    this.method = data;
  }

  async send_request(path, body) {
    return new Promise(async (reslove, reject) => {
      try {
        let data = await fetch(this.api_link + path, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(body),
          method: this.method,
        });
        let json_data = await data.json();
        data.ok ? reslove(json_data) : reject(json_data);
      } catch (e) {
        reject(new Error('Ошибка api: ' + e.message));
      }
    });
  }
}

class User extends API {
  constructor() {
    super();
  }

  register(username, email, password) {
    return new Promise(async (resolve, reject) => {
      this.set_method('POST');
      let request_data = await this.send_request('/users', {
        user: {
          username: username,
          email: email,
          password: password,
        },
      }).catch((err) => {
        reject(err);
      });

      resolve(request_data);
    });
  }

  login(email, password) {
    return new Promise(async (resolve, reject) => {
      this.set_method('POST');
      let request_data = await this.send_request('/users/login', {
        user: {
          email: email,
          password: password,
        },
      }).catch((err) => {
        reject(err);
      });

      resolve(request_data);
    });
  }
}

let user = new User();

let register_form = document.querySelector('#register');
let register_button = register_form.querySelector('button');
let register_login = register_form.querySelector('[placeholder=Логин]');
let register_email = register_form.querySelector('[placeholder=Email]');
let register_password = register_form.querySelector('[placeholder=Пароль]');
let register_result = register_form.querySelector('p');
register_button.addEventListener('click', () => {
  user
    .register(register_login.value, register_email.value, register_password.value)
    .then((res) => {
      let text = '';
      register_result.style.color = ""
      for (key in res.user) {
        text += `${key}: ${res.user[key]}\n`
      }
      register_result.textContent = text;
    })
    .catch((err) => {
      let text = '';
      register_result.style.color = "red"
      for (key in err.errors) {
        text += `${key}: ${err.errors[key]}\n`
      }
      register_result.textContent = text;
    });
  console.log(register_email.value);
});

let login_form = document.querySelector('#login');
let login_button = login_form.querySelector('button');
let login_login = login_form.querySelector('[placeholder=Логин]');
let login_email = login_form.querySelector('[placeholder=Email]');
let login_password = login_form.querySelector('[placeholder=Пароль]');
let login_result = login_form.querySelector('p');
login_button.addEventListener('click', () => {
  user
    .login(login_email.value, login_password.value)
    .then((res) => {
      let text = '';
      login_result.style.color = ""
      for (key in res.user) {
        text += `${key}: ${res.user[key]}\n`
      }
      login_result.textContent = text;
    })
    .catch((err) => {
      let text = '';
      login_result.style.color = "red"
      for (key in err.errors) {
        text += `${key}: ${err.errors[key]}\n`
      }
      login_result.textContent = text;
    });
  console.log(login_email.value);
});
// console.log(register_email)
// let email = 'ece@bk.ru';
// let login = 'ece';
// let pass = '123123';
// user
//   .register(login, email, pass)
//   .then((res) => {})
//   .catch((err) => {
//     console.error(err);
//   });

// user
//   .login(email, pass)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
