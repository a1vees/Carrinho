let cartItems = [];

function addToCart(name, price) {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ name, quantity: 1, price });
    }
    updateCart();
}

function updateCart() {
    const cartTable = document.getElementById('cart-items');
    cartTable.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.quantity * item.price;
        totalPrice += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>R$${item.price.toFixed(2)}</td>
            <td>R$${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Remover</button></td>
        `;
        cartTable.appendChild(row);
    });

    document.getElementById('total-price').innerText = `Total: R$${totalPrice.toFixed(2)}`;
}

function updateQuantity(index, quantity) {
    cartItems[index].quantity = Number(quantity);
    updateCart();
}

function removeItem(index) {
    cartItems.splice(index, 1);
    updateCart();
}

// Inicializar o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', updateCart);
