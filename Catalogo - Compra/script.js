import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

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

async function showProducts() {
    const productsCollection = collection(db, "tbl_products");
    const productSnapshot = await getDocs(productsCollection);
    const productsContainer = document.getElementById('productsContainer');

    productsContainer.innerHTML = '';

    productSnapshot.forEach(doc => {
        const product = doc.data();
        const productHTML = `
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div class="single-product">
                    <div class="product-thumb">
                        <img src="${product.image}" alt="${product.name}" />
                    </div>
                    <div class="product-title">
                        <h3><span>${product.name}</span></h3>
                    </div>
                    <div class="product-btns">
                        <span class="btn-small mr-2">$${product.price}</span>
                    </div>
                </div>
            </div>`;
        productsContainer.innerHTML += productHTML;
    });
}

async function addProduct(product) {
    const productsCollection = collection(db, "tbl_products");
    try {
        await addDoc(productsCollection, product);
        console.log(`Producto agregado: ${product.name}`);
        Swal.fire({
            title: 'Éxito!',
            text: 'Producto agregado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            showProducts(); 
        });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un error al agregar el producto.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}

document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').value;

    const newProduct = {
        name: productName,
        price: productPrice,
        image: productImage
    };

    addProduct(newProduct);
});

showProducts();
