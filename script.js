// Función para agregar un producto al carrito
function addToCart(name, size) {
    // Obtener el precio según el tamaño seleccionado
    const price = getPrice(name, size);

    // Obtener el carrito del localStorage e iniciar como vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Agregar el nuevo producto al carrito
    cart.push({ name, size, price });
    
    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Notificar al usuario que el producto ha sido agregado
    alert(`${name} (${size}) ha sido agregado al carrito.`);
}

// Función para obtener el precio del producto seleccionado
function getPrice(name, size) {
    // Obtener el precio correspondiente al tamaño del producto
    const priceElement = document.querySelector(`.${name.toLowerCase().replace(/ /g, '-')}-price-${size}`);
    if (priceElement) {
        return parseFloat(priceElement.textContent.split('-')[1].trim().replace('€', ''));
    }
    return 0;  // Si no se encuentra el precio, retornar 0
}

// Función para mostrar los productos en el carrito
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    // Si el carrito está vacío
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    // Iterar sobre los productos del carrito y agregarlos al contenedor
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} (${item.size}) - €${item.data-price}</p>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Eliminar el producto del carrito
    cart.splice(index, 1);
    
    // Actualizar el carrito en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Volver a mostrar el carrito
    displayCart();
}

// Ejecutar la función para mostrar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', displayCart);
