import React, { useState, useEffect, useRef } from "react";
import "../static/css/LastPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";

const LastPanel = () => {
  const [lastProducts, setLastProducts] = useState(0);
  const [lastUsers, setlastUser] = useState(0);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        const responseUser = await fetch("http://localhost:3000/api/users");
        const dataUser = await responseUser.json();

        /* ARRAYS VACIOS PARA GUARDAR LOS IDS */
        const ids = [];
        const idsUser = [];

        if (isMounted.current) {
          data.products.forEach((product) => {
            ids.push(product.id);
          });
          const maxId = Math.max(...ids);
          const lastProduct = data.products.find(
            (product) => product.id === maxId
          );

          dataUser.users.forEach((user) => {
            idsUser.push(user.id);
          });
          const maxIdUser = Math.max(...idsUser);
          const lastUser = dataUser.users.find((user) => user.id === maxIdUser);

          setLastProducts(lastProduct);
          setlastUser(lastUser);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="biggest-panel">
      <div>
        <h2 className="title-last-panel">Ultimo registro</h2>
        <div className="last-created">
          {lastProducts && (
            <div className="last-product-container">
              <div className="last-product">
                <h3 className="last-title">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="cart-icon"
                  />
                  Producto:
                </h3>
                <div className="info">
                  <h4>Nombre:</h4>
                  <p className="info-new">{lastProducts.name}</p>
                </div>
                <div className="info">
                  <h4>Descripcion:</h4>
                  <p className="info-new">{lastProducts.description}</p>
                </div>
                <div className="info">
                  <h4>Precio:</h4>
                  <p className="info-new">${lastProducts.price}</p>
                </div>

                {lastProducts.items.map((item) => (
                  <div className="info expand">
                    <h4>Color:</h4>
                    <p className="info-new" key={item.color}>
                      {item.color}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {lastUsers && (
            <div className="last-user-container">
              <div className="last-user">
                <h3 className="last-title">
                  <FontAwesomeIcon icon={faUser} className="user-icon" />
                  Usuario:
                </h3>
                <div className="info">
                  <h4>Nombre:</h4>
                  <p className="info-new">
                    {lastUsers.name} {lastUsers.lastName}
                  </p>
                </div>
                <div className="info">
                  <h4>Email:</h4>
                  <p className="info-new">{lastUsers.email}</p>
                </div>
                <div className="info infoUser">
                  <h4>Tipo:</h4>
                  <p className="info-new">{lastUsers.type}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LastPanel;
