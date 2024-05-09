let products = [
    {id: 1, name: 'Girlwood Lip Care Set', image: 'фото1.png', description: 'Комплекс з догляду за губами', price: '20$'},
    {id: 2, name: 'Hadat Cosmetics Hydro Nutrient Nourishing Conditioner', image: 'фото2.png', description: 'Зволожуючий Кондиціонер', price: '10$'},
    {id: 3, name: 'Єва колаген Єгипетський', image: 'фото3.png', description: 'Антивіковий крем поживний для зрілої шкіри', price: '14$'},
    {id: 4, name: 'Missha Signature M Real Complete BB Cream', image: 'фото4.png', description: 'SPF30/PA++ (45ml)', price: '22$'},
    {id: 5, name: 'ПІНКА ДЛЯ ВМИВАННЯ', image: 'фото5.png', description: 'Ed Cosmetics Men Cleansing Foam', price: '21$'},
    {id: 6, name: 'Гідрофільна олійка', image: 'фото6.png', description: 'Anti acne для жирної і проблемної шкіри обличчя', price: '18$'},
    {id: 7, name: 'Набір карбоксітерапії з фруктовими кислотами', image: 'фото7.png', description: 'Для всіх типів шкіри', price: '14$'},
    {id: 8, name: 'Крем для обличчя Anti acne', image: 'фото8.png', description: 'Лікувальний, проти акне та запальних процесів', price: '19$'},
];

let cart = [];

function loadProducts() {
    let container = document.getElementById('container');
    products.forEach(elem => {
        let productItem = document.createElement('div');
        productItem.classList.add('product-item');

        let img = document.createElement('img');
        img.src = elem.image;
        img.alt = elem.name;
        img.style.width = "200px";
        productItem.appendChild(img);

        let h3 = document.createElement('h3');
        h3.textContent = elem.name;
        productItem.appendChild(h3);

        let pDescription = document.createElement('p');
        pDescription.textContent = elem.description;
        productItem.appendChild(pDescription);

        let pPrice = document.createElement('p');
        pPrice.textContent = elem.price;
        productItem.appendChild(pPrice);

        let button = document.createElement('button');
        button.textContent = 'Купити';
        button.addEventListener('click', function() {
            addProductToCart(elem.id);
        });
        productItem.appendChild(button);

        container.appendChild(productItem);
    });
}

function addProductToCart(id) {
    cart.push(products.find(elem => elem.id === id));
    displayCartItems();
}

function openCart() {
    if (!isLoggedIn) {
        alert('Будь ласка, спочатку зареєструйтесь або увійдіть!');
        return;
    }
    displayCartItems();
    addSortButtonsToCartModal();
    let modal = document.getElementById('myModal');
    modal.style.display = 'block';
}


function modifyQuantity(id, action) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        if (action === 'increase') {
            cart[index].quantity = cart[index].quantity ? cart[index].quantity + 1 : 1;
        } else if (action === 'decrease') {
            cart[index].quantity = cart[index].quantity && cart[index].quantity > 1 ? cart[index].quantity - 1 : 1;
        }
        displayCartItems();
    }
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    displayCartItems();
}

function calculateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += parseFloat(item.price) * (item.quantity || 1);
    });
    return total.toFixed(2);
}

function displayCartItems() {
    let cartItems = document.getElementById('cart-items');
    let containerHtml = '';
    let totalItems = cart.length;
    containerHtml += `<p>Кількість товарів: ${totalItems}</p>`;
    cart.forEach(elem => {
        containerHtml += `
            <div>
                <h3>${elem.name}</h3>
                <p>Ціна за одиницю: ${elem.price}</p>
                <p>Кількість: 
                    <button onclick="modifyQuantity(${elem.id}, 'decrease')">-</button>
                    ${elem.quantity || 1}
                    <button onclick="modifyQuantity(${elem.id}, 'increase')">+</button>
                </p>
                <button onclick="removeItem(${elem.id})">Видалити</button>
            </div>`;
    });
    containerHtml += `<p>Остаточна вартість: ${calculateTotal()}$</p>`;
    cartItems.innerHTML = containerHtml;
}

loadProducts();

let modalContent = document.querySelector('.modal-content');
modalContent.insertAdjacentHTML('afterbegin', '<h2>Ваш кошик</h2>');

let scrollBtn = document.getElementById('scrollBtn');
scrollBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop > window.innerHeight * 2 / 3) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

function addSortButtonsToCartModal() {
    let sortOptionsCart = document.getElementById('sort-options-cart');
    sortOptionsCart.innerHTML = `
        <button onclick="window.myApp.sortBy('name')">Сортувати за назвою</button>
        <button onclick="window.myApp.sortBy('price')">Сортувати за ціною</button>
    `;
}

window.myApp = {
    sortBy: function(criteria) {
        if (criteria === 'name') {
            cart.sort((a, b) => a.name.localeCompare(b.name));
        } else if (criteria === 'price') {
            cart.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        }
        displayCartItems();
    },
    displayCartItems: function() {
        displayCartItems();
    }
};

const ctx = document.getElementById('myChart');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Girlwood Lip Care Set', 'Hadat Cosmetics Hydro Nutrient Nourishing Conditioner', 'Єва колаген Єгипетський', 'Missha Signature M Real Complete BB Cream', 'ПІНКА ДЛЯ ВМИВАННЯ', 'Гідрофільна олійка', 'Набір карбоксітерапії з фруктовими кислотами', 'Крем для обличчя Anti acne'],
        datasets: [{
            label: 'Ціна',
            data: [20, 10, 14, 22, 21, 18, 14, 19],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


// ф. від. прих. фор. реє.
function toggleRegistrationForm() {
    var registrationForm = document.getElementById("registrationForm");
    if (registrationForm.style.display === "none" || registrationForm.style.display === "") {
        registrationForm.style.display = "block";
    } else {
        registrationForm.style.display = "none"; 
    }
}

var closeButton = document.querySelector(".modal-content .close");

//закрити
closeButton.addEventListener("click", function() {
    closeModal(); 
});

function closeRegistrationForm() {
    var registrationForm = document.getElementById('registrationForm');
    registrationForm.style.display = 'none';
}


// відоб і прихов. форми
function openRegistrationForm() {
    toggleRegistrationForm(); 
}

function generateAndFillPassword() {
    var passwordField = document.getElementById("password");
    var password = generatePassword(); 
    passwordField.value = password;
}

function togglePasswordVisibility() {
    var passwordField = document.getElementById("password");
    var passwordVisibilityButton = document.getElementById("passwordVisibilityButton");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        passwordVisibilityButton.textContent = "Приховати пароль";
    } else {
        passwordField.type = "password";
        passwordVisibilityButton.textContent = "Показати пароль";
    }
}

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}

// закр. форму
function closeModal() {
    let modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

var closeButton = document.querySelector("#registrationForm .close");

function registerUser() {
    // validateRegistrationForm(); // перевіряю форму реєстрації перед реєстрацією

    // після успішної реєстрації відображаємо вікно з повідомленням
    
    let successModal = document.getElementById('successModal');
    successModal.style.display = 'block';

    let closeButton = successModal.querySelector('.close');
    closeButton.style.display = 'none';

    setTimeout(function() {
        successModal.style.display = 'none';
        closeButton.style.display = 'block'; 
    }, 3000);

    openCart(); 
}

// перевірка паролів
function validatePasswords() {
    var password1 = document.getElementById("password").value;
    var password2 = document.getElementById("confirmPassword").value;

    if (password1 !== password2) {
        alert("Паролі не співпадають! Будь ласка, введіть паролі ще раз.");
        // очищається поля паролів
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
        toggleRegistrationForm();
    } else {
        // якщо паролі співпадають
        registerUser();
    }
}

var isLoggedIn = false; // початково користувач не авторизований
let userLoggedIn = null;

function validateRegistration() {
    var errorMessages = document.getElementById("errorMessages");
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    errorMessages.innerHTML = "";

    if (firstName === "") {
        errorMessages.innerHTML += "Введіть ім'я.<br>";
    }
    if (lastName === "") {
        errorMessages.innerHTML += "Введіть прізвище.<br>";
    }
    if (email === "") {
        errorMessages.innerHTML += "Введіть email.<br>";
    }
    if (password.length < 8) {
        errorMessages.innerHTML += "Пароль повинен містити принаймні 8 символів.<br>";
    }
    if (password !== confirmPassword) {
        errorMessages.innerHTML += "Паролі не співпадають.<br>";
    }

    var user = users
        .find(u => u.password == password && u.userName == email);
    if(user == null){
        errorMessages.innerHTML += "Not registered.<br>";
    }
    if (errorMessages.innerHTML === "") {
        document.getElementById("registrationForm").style.display = "none";
        document.getElementById("successModal").style.display = "block";
        setTimeout(function(){ document.getElementById("successModal").style.display = "none"; }, 2000); 
        isLoggedIn = true; 
    }
    
    
    userLoggedIn = user;
    registerUser();
}

//(function addToCart() {
    //if (isLoggedIn) {
   // } else {
   //     alert("Додавання товару до кошика доступне лише зареєстрованим користувачам. Будь ласка, увійдіть або зареєструйтесь.");
    //    openRegistrationForm(); 
  //  }
//}

function closeCartModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}





function closeModal() {
    let registrationForm = document.getElementById('registrationForm');
    registrationForm.style.display = 'none';
}

//адмін
function toggleAdminPanel() {
    let adminPanel = document.getElementById('adminPanel');
    if (adminPanel.style.display === "none" || adminPanel.style.display === "") {
        adminPanel.style.display = "block"; 
    } else {
        adminPanel.style.display = "none"; 
    }
}

function addProduct() {
    alert("Функція додавання товару буде реалізована пізніше.");
}

function editProduct() {
    alert("Функція редагування товару буде реалізована пізніше.");
}

function deleteProduct() {
    alert("Функція видалення товару буде реалізована пізніше.");
}


    function showLoginForm() {
        let username = prompt("Введіть логін:");
        let password = prompt("Введіть пароль:");
        if (authenticateAdmin(username, password)) {
            alert("Ви успішно увійшли як адміністратор.");
            showAdminPanel(); 
        } else {
            alert("Невірний логін або пароль. Спробуйте ще раз.");
        }
    }

    function showAdminPanel() {
        let adminPanel = document.getElementById('adminPanel');
        adminPanel.style.display = 'block';
    }

    function authenticateAdmin(username, password) {
        return username === 'admin' && password === 'admin';
    }
function addProduct() {
    let name = prompt("Введіть назву товару:");
    let image = prompt("Введіть посилання на зображення товару:");
    let description = prompt("Введіть опис товару:");
    let price = prompt("Введіть ціну товару:");

    if (name && image && description && price) {
        let newProduct = {
            id: products.length + 1, // генеруємо id для нового товару
            name: name,
            image: image,
            description: description,
            price: price
        };
        products.push(newProduct); // додаємо новий товар до списку
        alert("Товар успішно додано!");
        loadProducts(); // перезавантажуємо список товарів
    } else {
        alert("Будь ласка, заповніть всі поля!");
    }
}

function editProduct() {
    let id = prompt("Введіть id товару, який ви хочете редагувати:");
    let product = products.find(item => item.id === parseInt(id));

    if (product) {
        let name = prompt("Нова назва товару:", product.name);
        let image = prompt("Нове посилання на зображення товару:", product.image);
        let description = prompt("Новий опис товару:", product.description);
        let price = prompt("Нова ціна товару:", product.price);

        if (name && image && description && price) {
            product.name = name;
            product.image = image;
            product.description = description;
            product.price = price;
            alert("Інформацію про товар успішно оновлено!");
            loadProducts(); // перезавантажуємо список товарів
        } else {
            alert("Будь ласка, заповніть всі поля!");
        }
    } else {
        alert("Товар з введеним id не знайдено!");
    }
}

function deleteProduct() {
    let id = prompt("Введіть id товару, який ви хочете видалити:");
    let index = products.findIndex(item => item.id === parseInt(id));

    if (index !== -1) {
        products.splice(index, 1); // видаляємо товар зі списку
        alert("Товар успішно видалено!");
        loadProducts(); // перезавантажуємо список товарів
    } else {
        alert("Товар з введеним id не знайдено!");
    }
}

