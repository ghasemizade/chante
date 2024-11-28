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

const users = JSON.parse(localStorage.getItem('users'))
console.log(users);
 

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
    
    
    
    if (checkNameIfExist && checkEmailIfExist) {
        let filteredUser = users.filter(user => user.name === nameToLowerCase)
        if (filteredUser[0].email === email.value && filteredUser[0].password === password.value) {
            localStorage.setItem('userInfo', JSON.stringify(filteredUser))
            redirect();
        } else {
            alert('اطلاعات ورودی نادرست میباشد!');
            name.value = ''
            email.value = ''
            password.value = ''
        }
    } else if (!checkNameIfExist && !checkEmailIfExist) {
        usersInfo = JSON.parse(localStorage.getItem("users"))
        addUser();
        localStorage.setItem("users", JSON.stringify(usersInfo))
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

function redirect() {
    location.replace('' + '/')
}

// console.log(users.filter(user => user.name === 'hosein'));
