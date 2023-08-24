window.onload = function () {
    const userButton = document.getElementById("users-navigation");
    const productButton = document.getElementById("products-navigation");
    const label = document.getElementById("admin-titulo");
    const productsList = document.getElementById("products-container");
    const userList = document.getElementById("user-container");

    userButton.addEventListener("click", function () {
        label.textContent = "Tus usuarios";
        productsList.style.display = 'none';
        userList.style.display = 'flex';
    });

    productButton.addEventListener("click", function () {
        label.textContent = "Tus productos";
        productsList.style.display = 'flex';
        userList.style.display = 'none';
    });
};