// Importando as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, collection, getDocs, updateDoc, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDNyqUfWBr5WvagK6M25ShW_jaczAxhJwI",
    authDomain: "login-74c63.firebaseapp.com",
    projectId: "login-74c63",
    storageBucket: "login-74c63.appspot.com",
    messagingSenderId: "475982993755",
    appId: "1:475982993755:web:3a58c278219bb961e8627e"
};

// Inicializando o aplicativo Firebase com a configuração fornecida
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Array para armazenar os usuários do aplicativo
const appUsers = [];

// Função para preencher a tabela com os dados do array
function preencherTabela() {
    const tabela = document.getElementById("tabelaDados");

    // Limpa o corpo da tabela
    tabela.getElementsByTagName("tbody")[0].innerHTML = '';

    // Itera sobre o array de dados e adiciona-os à tabela
    appUsers.forEach((objeto) => {
        const row = tabela.insertRow();
        const propriedades = [
            'name',
            'dtbirth',
            'parentGuardian',
            'address',
            'city',
            'province',
            'postalcode',
            'phone',
            'nameEmergency',
            'ralationshipParticipant',
            'phoneRalationshipParticipant',
            'medicalInformation',
            'ageGroup',
            'creditCardInput',
            'monthYear',
            'threeDigits',
            'timestamp',
            'coach'
        ];
        // Preenchendo as células da linha com os valores das propriedades
        propriedades.forEach(propriedade => {
            const cell = row.insertCell();
            cell.textContent = objeto[propriedade];
        });
    });
}

// Função assíncrona para obter todos os documentos da coleção 'users' no Firestore
// async function getAll() {
//     const querySnapshot = await getDocs(collection(db, "users"));
//     querySnapshot.forEach((doc) => {
//         appUsers.push(doc.data());
//         //console.log(doc.data())
//     });
//     preencherTabela();
// }
// getAll();

// Função assíncrona para obter todos os documentos da coleção 'users' no Firestore
async function getAll() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        // Obtendo os dados do documento
        const data = doc.data();
        // Obtendo o uid do documento
        const uid = doc.id;
        // Adicionando os dados do documento e o uid ao array appUsers
        appUsers.push({ ...data, uid });
    });
    // Chamando a função para preencher a tabela após obter os dados
    preencherTabela();
}
// Chamando a função getAll() para obter os dados ao carregar a página
getAll();

// Propriedades dos usuários
const propriedades = [
    'name',
    'dtbirth',
    'parentGuardian',
    'address',
    'city',
    'province',
    'postalcode',
    'phone',
    'nameEmergency',
    'ralationshipParticipant',
    'phoneRalationshipParticipant',
    'medicalInformation',
    'ageGroup',
    'creditCardInput',
    'monthYear',
    'threeDigits',
    'timestamp',
    'coach'
];

// Função para preencher o resultado da pesquisa na tabela
function preencherResultado(resultado) {
    const resultadoPesquisa = document.getElementById("resultadoPesquisa");
    resultadoPesquisa.innerHTML = "";

    if (!resultado || resultado.length === 0) {
        resultadoPesquisa.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    // Criando uma tabela para exibir os resultados da pesquisa
    const tabela = document.createElement("table");
    const cabecalho = document.createElement("tr");
    
    // Criando os cabeçalhos da tabela com base nas propriedades
    propriedades.forEach(propriedade => {
        const th = document.createElement("th");
        th.textContent = propriedade;
        cabecalho.appendChild(th);
    });

    // Adiciona uma coluna extra para o botão
    const thBotao = document.createElement("th");
    thBotao.textContent = "Alternar Coach";
    cabecalho.appendChild(thBotao);
    tabela.appendChild(cabecalho);

    // Preenchendo as linhas da tabela com os resultados da pesquisa
    resultado.forEach(objeto => {
        const linha = document.createElement("tr");

        // Preenchendo as células da linha com os valores das propriedades
        propriedades.forEach(propriedade => {
            const td = document.createElement("td");
            td.textContent = objeto[propriedade];
            linha.appendChild(td);
        });

        // Adiciona um botão para alternar o coach
        const botao = document.createElement("button");
        botao.textContent = "Alternar";

        // Define o atributo de dados (data attribute) 'uid' com o valor do uid
        botao.dataset.uid = objeto.uid;
        console.log(objeto)
        botao.addEventListener("click", async (event) => {

            // Obtém o uid do atributo de dados (data attribute)
            const uid = event.target.dataset.uid;

            await alternarCoach(uid); // Chama a função alternarCoach com o uid correspondente
            
            // Atualiza a tabela após a alteração
            const novoResultado = await getAll(); // Obtem os dados atualizados
            preencherResultado(novoResultado); // Preenche a tabela com os novos dados
        });
        const tdBotao = document.createElement("td");
        tdBotao.appendChild(botao);
        linha.appendChild(tdBotao);
        tabela.appendChild(linha);
    });

    resultadoPesquisa.appendChild(tabela);
}

// Função para alternar o valor do campo 'coach' entre true e false
async function alternarCoach(uid) {
    try {
        // Referenciando o documento no Firestore usando o UID
        const userRef = doc(db, "users", uid);

        // Obtendo os dados do documento
        const docSnap = await getDoc(userRef);

        console.log(userRef);

        // Verificando se o documento existe
        if (docSnap.exists()) {
            // Obtendo o valor atual do campo 'coach'
            const coachAtual = docSnap.data().coach;            

            // Alternando o valor do campo 'coach'
            const novoValorCoach = !coachAtual;

            // Atualizando o campo 'coach' no Firestore
            await updateDoc(userRef, {
                coach: novoValorCoach
            });

            console.log("Campo 'coach' atualizado com sucesso para:", novoValorCoach);
        } else {
            console.error("Documento não encontrado!");
        }
    } catch (error) {
        console.error("Erro ao alternar o valor do campo 'coach':", error);
    }
}



// Função de pesquisa
function pesquisar() {
    const termo = document.getElementById("inputPesquisa").value.toLowerCase();
    
    // Filtrando os resultados com base no termo de pesquisa
    const resultado = appUsers.filter(objeto => {
        return propriedades.some(propriedade => {
            const valor = objeto[propriedade];
            if (typeof valor === 'string') {
                return valor.toLowerCase().includes(termo);
            }
            return false;
        });
    });
    preencherResultado(resultado);
}

// Adicionando um listener para o botão de pesquisa
document.getElementById("botaoPesquisar").addEventListener("click", pesquisar);

