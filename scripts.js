import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyDNyqUfWBr5WvagK6M25ShW_jaczAxhJwI",
    authDomain: "login-74c63.firebaseapp.com",
    projectId: "login-74c63",
    storageBucket: "login-74c63.appspot.com",
    messagingSenderId: "475982993755",
    appId: "1:475982993755:web:3a58c278219bb961e8627e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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

// Função para criar novo usuário
async function createNewUser(email, password) {

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

    await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {

            const user = userCredential.user;
            
            const name = document.getElementById('name').value;
            const dtbirth = document.getElementById('dtbirth').value;
            const phone = document.getElementById('phone').value;
            const parentGuardian = document.getElementById('parentGuardian').value;
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const province = document.getElementById('province').value;
            const postalcode = document.getElementById('postalcode').value;            
            const nameEmergency = document.getElementById('nameEmergency').value;
            const ralationshipParticipant = document.getElementById('ralationshipParticipant').value;
            const phoneRalationshipParticipant = document.getElementById('phoneRalationshipParticipant').value;
            const medicalInformation = document.getElementById('medicalInformation').value;
            const ageGroup = document.getElementById('ageGroup').value;
            const creditCardInput = document.getElementById('creditCardInput').value;
            const monthYear = document.getElementById('monthYear').value;
            const threeDigits = document.getElementById('threeDigits').value;
            
            const timeWeek = document.getElementById('timeWeek').value;
            const ageRegistration = document.getElementById('ageRegistration').value;
            const phoneParent1 = document.getElementById('phoneParent1').value;
            const emailParent1 = document.getElementById('emailParent1').value;
            const parentGuardian2 = document.getElementById('parentGuardian2').value;
            const phoneParent2 = document.getElementById('phoneParent2').value;
            const emailParent2 = document.getElementById('emailParent2').value;
            const tShirth = document.getElementById('tShirth').value;
            const shorts = document.getElementById('shorts').value;

            const timestamp = serverTimestamp();
            const coach = false;


            await setDoc(doc(db, "users", user.uid), {
                name: name,
                dtbirth: dtbirth,
                phone: phone,                
                parentGuardian: parentGuardian,
                address: address,
                city: city,
                province: province,
                postalcode: postalcode,                
                nameEmergency: nameEmergency,
                ralationshipParticipant: ralationshipParticipant,
                phoneRalationshipParticipant: phoneRalationshipParticipant,
                medicalInformation: medicalInformation,
                ageGroup: ageGroup,
                creditCardInput: creditCardInput,
                monthYear: monthYear,
                threeDigits: threeDigits,
                
                timeWeek: timeWeek,
                ageRegistration: ageRegistration,
                phoneParent1: phoneParent1,
                emailParent1: emailParent1,
                parentGuardian2: parentGuardian2,
                phoneParent2: phoneParent2,
                emailParent2: emailParent2,
                tShirth: tShirth,    
                shorts: shorts,            

                timestamp: timestamp,
                coach: coach

            })

                .then(() => {
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
                    Toastify({
                        text: `${errorCode}: ${errorMessage}`,
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
                });


        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            Toastify({
                text: `${errorCode}: ${errorMessage}`,
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
        });
}

const btnCriar = document.getElementById('btnCriar');
btnCriar.addEventListener('click', function (event) {
    event.preventDefault()
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    ////////////////////////////////////////////////////////
    // Verifica se todos os campos estão preenchidos
    const camposPreenchidos = Array.from(document.querySelectorAll('.form-control')).every(field => field.value.trim() !== '');

    if (!camposPreenchidos) {
        Toastify({
            text: "Please fill in all fields",
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
    ////////////////////////////////////////////////////////

    // Chama a função createNewUser com os valores do email e senha
    createNewUser(email, senha);

})

//retorna os dados do uauario logado para a tela
auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log(user);
        const currentUser = document.getElementById('currentUser');
        currentUser.innerHTML = user.email
    }
});

function logout() {
    signOut(auth)
}

const btnSignOut = document.getElementById('btnSignOut');
btnSignOut.addEventListener('click', function (event) {
    event.preventDefault()
    logout();

})

// Adicionar evento de clique ao botão "Update"
const btnUpdate = document.getElementById('btnUpdate');
btnUpdate.addEventListener('click', function () {
    window.location.href = 'profile.html';
});
//Fim do código para o botão Update

console.log("antes do dom")
document.addEventListener('DOMContentLoaded', function() {    
    const btnVideos = document.getElementById('btnVideos');
    if (btnVideos) {
        console.log("dentro do bntVideos")
        btnVideos.addEventListener('click', function () {
            console.log("dentro do envio de pagina")
            window.location.href = 'coach.html';
        });
    }

    console.log("antes do bntVideos")
    const btnPdf = document.getElementById('btnPdf');
    btnPdf.addEventListener('click', function () {
        window.location.href = 'pdf.html';
    });
});


// const btnRegister = document.getElementById('btnRegister');
// btnRegister.addEventListener('click', function (event) {
//     event.preventDefault()
//     window.location.href = "register.html";

// })


// Referência para o serviço de autenticação
//const auth = firebase.auth();

// Lidar com o envio do formulário de login
// const loginForm = document.getElementById('loginForm');
// loginForm.addEventListener('submit', function(event) {
//     event.preventDefault(); // Evita o envio do formulário

//     const email = loginForm.email.value;
//     const password = loginForm.password.value;

//     // Autenticar o usuário com email e senha
//     auth.signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // Login bem-sucedido, redirecionar para a página desejada
//             window.location.href = "multimedia.html";
//         })
//         .catch((error) => {
//             // Lidar com erros de autenticação
//             console.error(error.message);
//             alert("Failed to login: " + error.message);
//         });
//     });