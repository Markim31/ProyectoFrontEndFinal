

// Productos disponibles en la tienda (JSON)
const productos = [
    {
        id: 1, 
        nombre: "Guitarra eléctrica Squier by Fender .",
         precio: 700000,
          stock: 10, 
        imagen: "https://http2.mlstatic.com/D_NQ_NP_889545-MLU75128427037_032024-O.webp", descripcion: "Guitarra eléctrica Squier by Fender Bullet Stratocaster HT de álamo black brillante con diapasón de laurel indio."
    },
    {
        id: 2,
        nombre: "Guitarra Acustica Sx", 
        precio: 500000,
         stock: 15,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_774542-MLU75918870442_042024-O.webp", descripcion: "Diapasón Rosewood So104 Color Negro."
    },
    {
        id: 3,
        nombre: "Guitarra acústica Parquer Custom GAC109MC",
        precio: 3500000,
        stock: 20,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_722656-MLA74779479779_022024-O.webp%20alt=", descripcion: "Guitarra acústica Parquer Custom GAC109MC para diestros azul."
    }
];





// Carrito de compras vacío
let carrito = [];

// Mostrar productos en la tienda
function mostrarProductos() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar productos anteriores

    productos.forEach(producto => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <p>${producto.nombre}</p> 
            <p>$${producto.precio}.-</p>
            <p>Stock: ${producto.stock} Unidades</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            <button onclick="mostrarMasInfo(${producto.id})">+ Detalles</button>
        `;
        productList.appendChild(productElement);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);

    // Verificar si hay stock disponible
    if (producto.stock > 0) {
        carrito.push(producto);
        producto.stock--; // Reducir el stock
        actualizarCarrito();
    } else {
        alert('Este producto está fuera de stock');
    }
}

// Actualizar el carrito y mostrar total con IVA
function actualizarCarrito() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Limpiar carrito

    let total = 0;

    carrito.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.nombre} - $${item.precio}`;
        cartItems.appendChild(cartItem);
        total += item.precio;
    });

    // Calcular IVA (21%)
    const iva = total * 0.21;
    const totalConIva = total + iva;

    document.getElementById('total').textContent = totalConIva.toFixed(2);
}

// Vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    productos.forEach(p => p.stock = 10); // Restaurar stock inicial
    actualizarCarrito();
}

// Simular compra
function comprar() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. No puedes realizar la compra.');
        return;
    }

    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    const iva = total * 0.21;
    const totalConIva = total + iva;

    alert(`Compra realizada con éxito! Total a pagar: $${totalConIva.toFixed(2)}`);
    vaciarCarrito();
}

// Mostrar más información de un producto
function mostrarMasInfo(id) {
    const producto = productos.find(p => p.id === id);
    const infoDiv = document.getElementById('product-info');
    const infoText = document.getElementById('info');

    infoText.textContent = producto.descripcion;
    infoDiv.style.display = 'block'; // Mostrar el panel de información
}

// Cerrar el panel de más información
function cerrarInfo() {
    const infoDiv = document.getElementById('product-info');
    infoDiv.style.display = 'none';
}

// Inicializar la tienda
function inicializar() {
    mostrarProductos();
    document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
    document.getElementById('comprar').addEventListener('click', comprar);
}

// Llamar a la función de inicialización al cargar la página
inicializar();
