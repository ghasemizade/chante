// Login OR SignUp

const getNameInput = document.querySelector('#name')
const getEmailInput = document.querySelector('#email')
const getPasswordInput = document.querySelector('#password')
const getBtn = document.querySelector('.login')

console.log(getNameInput);

let usersInfo = [];

getBtn.addEventListener('click', (ev) => {
    ev.preventDefault()

    nameCheck(getNameInput, getEmailInput, getPasswordInput);
})

const users = [
    {
        "user_id": "1",
        "name": "hosein",
        "email": "ghasemizade.hosein@gmail.com",
        "password": "a123456"
      },
      {
        "user_id": "2",
        "name": "mohammad",
        "email": "abbasi.mohammad@gmail.com",
        "password": "b123456"
      },
      {
        "user_id": "3",
        "name": "amir",
        "email": "mohajeri.amir@gmail.com",
        "password": "c123456"
      }
]

// localStorage.setItem("users", JSON.stringify(users))
 

function nameCheck (name, email, password) {
    let nameToLowerCase = name.value.toLowerCase();
    console.log(nameToLowerCase);
    
    if (nameToLowerCase.length > 0 && nameToLowerCase.length < 3) {
        alert("اسم را بلند تر انتخاب کنید");
    } else if (nameToLowerCase === "" || !isNaN(nameToLowerCase)){
        alert("نام را درست وارد نکردید")
    }
    
    let nameExistDB = users.map(user => user.name)
    let emailExistDB = users.map(user => user.email)
    let checkNameIfExist = nameExistDB.includes(nameToLowerCase);
    let checkEmailIfExist = emailExistDB.includes(email.value);
    let filteredUser = users.filter(user => user.name === nameToLowerCase)
    
    
    
    if (checkNameIfExist && checkEmailIfExist) {
        if (filteredUser[0].email === email.value && filteredUser[0].password === password.value) {
            mainUser();
            redirect();
        } else {
            alert('اطلاعات ورودی نادرست میباشد!');
            name.value = ''
            email.value = ''
            password.value = ''
        }
    } else if (!checkNameIfExist && !checkEmailIfExist) {
        usersInfo = JSON.parse(localStorage.getItem("users"));
        addUser();
        localStorage.setItem("newUsers", JSON.stringify(usersInfo));
        mainUser();
        redirect();
    } else {
        alert('اطلاعات ورودی همخوانی ندارند!');
        name.value = ''
        email.value = ''
        password.value = ''
    }
}


function addUser() {
    usersInfo.push({
        user_id: usersInfo.length + 1,
        name: getNameInput.value,
        email: getEmailInput.value,
        password: getPasswordInput.value,
    })
}

function mainUser() {
    const main_user = users.filter(user => user.name === getNameInput.value);
    localStorage.setItem("mainUser", JSON.stringify(main_user))
}

function redirect() {
    location.replace('/')
}

// console.log(users.filter(user => user.name === 'hosein'));
