window.onload = function () {
    const userButton = document.getElementById("users-navigation");
    const productButton = document.getElementById("products-navigation");
    const label = document.getElementById("admin-titulo");
    const productsList = document.getElementById("products-container");
    const userList = document.getElementById("user-container");
    const openCrearLink = document.getElementById("open-crear");

    userButton.addEventListener("click", function () {
        label.textContent = "Tus usuarios";
        productsList.style.display = 'none';
        userList.style.display = 'flex';
        openCrearLink.href = "/admin-user/crear";
    });

    productButton.addEventListener("click", function () {
        label.textContent = "Tus productos";
        productsList.style.display = 'flex';
        userList.style.display = 'none';
        openCrearLink.href = "admin/crear";
    });
};