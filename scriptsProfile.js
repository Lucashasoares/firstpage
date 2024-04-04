import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'

// Configuração do Firebase com as informações do seu projeto
const firebaseConfig = {
    apiKey: "AIzaSyDNyqUfWBr5WvagK6M25ShW_jaczAxhJwI",
    authDomain: "login-74c63.firebaseapp.com",
    projectId: "login-74c63",
    storageBucket: "login-74c63.appspot.com",
    messagingSenderId: "475982993755",
    appId: "1:475982993755:web:3a58c278219bb961e8627e"
};

// Inicializa o aplicativo Firebase com a configuração fornecida
const app = initializeApp(firebaseConfig);

// Obtém o serviço de autenticação do Firebase
const auth = getAuth(app);

// Obtém o serviço do Firestore do Firebase
const db = getFirestore(app)


//retorna os dados do usuario logado para a tela
auth.onAuthStateChanged(async function (user) {
    if (user) {
        console.log(user.uid);
        const userRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            const name = document.getElementById("name")
            const dtbirth = document.getElementById("dtbirth")
            const parentGuardian = document.getElementById("parentGuardian")
            const address = document.getElementById("address")
            const city = document.getElementById("city")
            const province = document.getElementById("province")
            const postalcode = document.getElementById("postalcode")
            const phone = document.getElementById("phone")
            const nameEmergency = document.getElementById("nameEmergency")
            const ralationshipParticipant = document.getElementById("ralationshipParticipant")
            const phoneRalationshipParticipant = document.getElementById("phoneRalationshipParticipant")
            const medicalInformation = document.getElementById("medicalInformation")
            const ageGroup = document.getElementById("ageGroup")
            const creditCardInput = document.getElementById("creditCardInput")
            const monthYear = document.getElementById("monthYear")
            const threeDigits = document.getElementById("threeDigits")


            name.value = docSnap.data().name
            dtbirth.value = docSnap.data().dtbirth
            parentGuardian.value = docSnap.data().parentGuardian
            address.value = docSnap.data().address
            city.value = docSnap.data().city
            province.value = docSnap.data().province
            postalcode.value = docSnap.data().postalcode
            phone.value = docSnap.data().phone
            nameEmergency.value = docSnap.data().nameEmergency
            ralationshipParticipant.value = docSnap.data().ralationshipParticipant
            phoneRalationshipParticipant.value = docSnap.data().phoneRalationshipParticipant
            medicalInformation.value = docSnap.data().medicalInformation
            ageGroup.value = docSnap.data().ageGroup
            creditCardInput.value = docSnap.data().creditCardInput
            monthYear.value = docSnap.data().monthYear
            threeDigits.value = docSnap.data().threeDigits

            //Início do código para o botão Back
            const profileForm = document.getElementById("profileForm");

            profileForm.addEventListener("submit", function (event) {
                event.preventDefault(); // Previne o envio padrão do formulário
            });

            // Adicionar evento de clique ao botão "Back"
            const btnBack = document.getElementById('bntBack');
            btnBack.addEventListener('click', async function (event) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef); // Espera pela obtenção do documento
                if (docSnap.exists()) {
                    if (!docSnap.data().coach) {
                        window.location.href = "multimedia.html"; // Redireciona para a tela de multimídia
                    } else {
                        window.location.href = "coach.html"; // Redireciona para a tela de coach
                    }
                } else {
                    console.log("No such document!");
                }
            });
            //Fim do código para o botão Back

        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }
});

const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário
});

// Adicionar evento de clique ao botão
const updateButton = document.getElementById("updateButton");
updateButton.addEventListener("click", async function () {
    const user = auth.currentUser;
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const name = document.getElementById("name").value;
        const dtbirth = document.getElementById("dtbirth").value;
        const parentGuardian = document.getElementById("parentGuardian").value;
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const province = document.getElementById("province").value;
        const postalcode = document.getElementById("postalcode").value;
        const phone = document.getElementById("phone").value;
        const nameEmergency = document.getElementById("nameEmergency").value;
        const ralationshipParticipant = document.getElementById("ralationshipParticipant").value;
        const phoneRalationshipParticipant = document.getElementById("phoneRalationshipParticipant").value;
        const medicalInformation = document.getElementById("medicalInformation").value;
        const ageGroup = document.getElementById("ageGroup").value;
        const creditCardInput = document.getElementById("creditCardInput").value;
        const monthYear = document.getElementById("monthYear").value;
        const threeDigits = document.getElementById("threeDigits").value;


        try {
            await updateDoc(userRef, {
                name: name,
                dtbirth: dtbirth,
                parentGuardian: parentGuardian,
                address: address,
                city: city,
                province: province,
                postalcode: postalcode,
                phone: phone,
                nameEmergency: nameEmergency,
                ralationshipParticipant: ralationshipParticipant,
                phoneRalationshipParticipant: phoneRalationshipParticipant,
                medicalInformation: medicalInformation,
                ageGroup: ageGroup,
                creditCardInput: creditCardInput,
                monthYear: monthYear,
                threeDigits: threeDigits

            });

            console.log("Data updated successfully!");

            Toastify({
                text: "Data updated successfully!",
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
            

        } catch (error) {
            console.error("Erro ao atualizar os dados:", error);
        }
    } else {
        console.log("Nenhum usuário logado.");
    }
});


