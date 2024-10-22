import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC73p-m77kbRw_qbhI0PGPtIx_beB00fwk",
  authDomain: "desarrolloweb-8c7a4.firebaseapp.com",
  projectId: "desarrolloweb-8c7a4",
  storageBucket: "desarrolloweb-8c7a4.appspot.com",
  messagingSenderId: "751535971574",
  appId: "1:751535971574:web:0bbe0ef07772e9dd1f20d7",
  measurementId: "G-KF2LJKC7X1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); 

document.getElementById('registerForm').addEventListener('submit', async function(event) {
  event.preventDefault();  
  
  const user = document.getElementById('user').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    Swal.fire({
      title: 'Error',
      text: 'Las contraseñas no coinciden',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const userQuery = query(collection(db, "tbl_users"), where("username", "==", user));
  const userSnapshot = await getDocs(userQuery);

  if (!userSnapshot.empty) {
    Swal.fire({
      title: 'Error',
      text: 'El usuario ya existe',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return; 
  }

  const newUser = {
    username: user,
    password: password
  };

  try {
    const docRef = await addDoc(collection(db, "tbl_users"), newUser);

    Swal.fire({
      title: 'Éxito!',
      text: 'Registro exitoso',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      window.location.href = '../login/index.html';
    });
    
  } catch (e) {
    Swal.fire({
      title: 'Error',
      text: 'Hubo un error al registrar el usuario',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
});
