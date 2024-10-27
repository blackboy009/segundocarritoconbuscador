// Alerta de ingreso al carrito
alert("Bienvenido al primer carrito panda !! Próximamente se sube cambio a la web del curso front !!");

// Variables para el carrito
let cart = [];
let total = 0;

// Función para actualizar el carrito en la interfaz
function updateCart() {
    const cartList = document.getElementById('cart-list');
    const totalElement = document.getElementById('total');

    // Limpiar el carrito actual en la interfaz
    cartList.innerHTML = '';
    total = 0;

    // Añadir cada producto en el carrito a la lista
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = `${item.name} - $${item.price}`;
        
        // Botón de eliminar
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.className = 'btn btn-danger btn-sm';
        removeButton.onclick = () => removeFromCart(index); // Llama a la función para eliminar el item

        li.appendChild(removeButton);
        cartList.appendChild(li);
        total += item.price;
    });

    // Actualizar el total
    totalElement.textContent = `Total: $${total}`;
}

// Función para buscar productos en el carrito
function buscarProducto() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredCart = cart.filter(item => item.name.toLowerCase().includes(searchTerm));
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Limpiar la lista

    filteredCart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = `${item.name} - $${item.price}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.className = 'btn btn-danger btn-sm';
        removeButton.onclick = () => removeFromCart(index); // Función para eliminar el item

        li.appendChild(removeButton);
        cartList.appendChild(li);
    });

    // Actualizar el total solo si hay elementos filtrados
    totalElement.textContent = `Total: $${filteredCart.reduce((sum, item) => sum + item.price, 0)}`;
}

// Event listener para los botones "Añadir al Carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));

        // Solicitar la cantidad
        const quantity = prompt(`¿Cuántas unidades de ${productName} quieres añadir?`, "1");
        const quantityNumber = parseInt(quantity);

        // Validar la cantidad
        if (isNaN(quantityNumber) || quantityNumber <= 0) {
            alert("Introduzca un número válido.");
            return;
        }

        // Calcular el total parcial
        const totalPrice = productPrice * quantityNumber;

        // Añadir el producto al carrito la cantidad correspondiente
        for (let i = 0; i < quantityNumber; i++) {
            cart.push({ name: productName, price: productPrice });
        }

        // Mostrar un mensaje con el total del producto añadido
        alert(`Has añadido ${quantityNumber} unidades de ${productName} por un total de $${totalPrice}.`);

        // Actualizar la interfaz del carrito
        updateCart();
    });
});

// Función para eliminar un item del carrito
function removeFromCart(index) {
    cart.splice(index, 1);  
    updateCart();  
}

// Vaciado del carrito
document.getElementById('empty-cart').addEventListener('click', () => {
    cart = [];  // Vaciar el carrito
    alert("El carrito ha sido vaciado.");
    updateCart();  // Actualizar la interfaz
});

// Event listener para la búsqueda
document.getElementById('search-button').addEventListener('click', buscarProducto);

