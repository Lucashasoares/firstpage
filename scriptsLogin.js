import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'

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

async function login(email, password) {

    await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            //window.location.href = "multimedia.html";  

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if(!docSnap.data().coach){
                    window.location.href = "multimedia.html";
                }else{
                    //aqui que entrara a pagina de coach                    
                    window.location.href = "coach.html";
                }
                
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Toastify({
                text: `${errorMessage}`,
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

const btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', function (event) {
    event.preventDefault()
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    // Chama a função createNewUser com os valores do email e senha
    login(email, senha);

})

// Função para redirecionar para a página register.html
function redirectToRegisterPage() {
    window.location.href = "register.html";
}

// Adiciona um evento de clique ao botão "Register" para chamar a função de redirecionamento
const btnRegister = document.getElementById('btnRegister');
btnRegister.addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário
    redirectToRegisterPage();
});