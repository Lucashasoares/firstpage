import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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

function verifyUser() {
    if (window.location.pathname.includes('multimedia.html') || window.location.pathname.includes('coach.html') || window.location.pathname.includes('pdf.html')) {
        auth.onAuthStateChanged(function (user) {
            if (!user) {
                window.location.href = "index.html";
                // O usuário está autenticado, permita o acesso à página
                // Aqui você pode colocar o código para exibir a página protegida
            }
        });
    }
}

verifyUser()