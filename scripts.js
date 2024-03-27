import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDNyqUfWBr5WvagK6M25ShW_jaczAxhJwI",
    authDomain: "login-74c63.firebaseapp.com",
    projectId: "login-74c63",
    storageBucket: "login-74c63.appspot.com",
    messagingSenderId: "475982993755",
    appId: "1:475982993755:web:3a58c278219bb961e8627e"
};

let auth;

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

function validatePassword(password) {
    if (!/^\d+$/.test(password)) {
        return false;
    }

    return password.length >= 6;
}

async function createNewUser(name, email, password) {

    console.log("1")

    if (!validateEmail(email) || !validatePassword(password)) {
        Toastify({
            text: "email or password invalid",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #DC143C, #DC143C)",
            }
        }).showToast();
        return;
    }
    console.log("2")

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log("3")
            const user = userCredential.user;
            console.log("4")

            updateProfile(auth.currentUser, {
                displayName: name
            })

            Toastify({
                text: "User created",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, green, green)",
                }
            }).showToast();
            window.location.href = "multimedia.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}


//document.addEventListener('DOMContentLoaded', function() {

    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);


const btnCriar = document.getElementById('btnCriar');
btnCriar.addEventListener('click', function (event) {
    event.preventDefault()
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Chama a função createNewUser com os valores do email e senha
    createNewUser(name, email, senha);
})


function currentUser() {
    console.log(auth.currentUser)
}

const btnCurrentUser = document.getElementById('btnCurrentUser');
btnCurrentUser.addEventListener('click', function (event) {
    event.preventDefault()
    currentUser();

})

function logout() {
    signOut(auth)
}

const btnSignOut = document.getElementById('btnSignOut');
btnSignOut.addEventListener('click', function (event) {
    event.preventDefault()
    logout();
    
})

const btnRegister = document.getElementById('btnRegister');
btnRegister.addEventListener('click', function (event) {
    event.preventDefault()
    window.location.href = "register.html";

})


// Referência para o serviço de autenticação
//const auth = firebase.auth();

// Lidar com o envio do formulário de login
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    // Autenticar o usuário com email e senha
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login bem-sucedido, redirecionar para a página desejada
            window.location.href = "multimedia.html";
        })
        .catch((error) => {
            // Lidar com erros de autenticação
            console.error(error.message);
            alert("Failed to login: " + error.message);
        });
    });
//});