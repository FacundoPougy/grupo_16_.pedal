import React, { useState, useEffect, useRef } from "react";

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
          console.log(dataUser);
          dataUser.users.forEach((user) => {
            idsUser.push(user.id);
          });
          const maxIdUser = Math.max(...idsUser);
          const lastUser = dataUser.users.find((user) => user.id === maxIdUser);

          console.log(lastUser);

          setLastProducts(lastProduct);
          setlastUser(lastUser);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
    console.log(lastUsers.image);

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="app">
      <div className="app">
        <h1>Estadísticas del último producto creado</h1>
        <div className="total-panels">
          {lastProducts && (
            <div>
              <h3>Último Producto:</h3>
              <p>Nombre: {lastProducts.name}</p>
              <p>Descripción: {lastProducts.description}</p>
              <p>Precio: {lastProducts.price}</p>
              <h4>Items:</h4>
              {lastProducts.items.map((item) => (
                <React.Fragment key={item.color}>
                  <p>Color:{item.color}</p>
                  <p>Stock:{item.stock}</p>
                  <img
                    src={item.main_image}
                    alt={`Imagen de ${lastProducts.category}`}
                  />
                </React.Fragment>
              ))}
            </div>
          )}
          <h3>Último Producto:</h3>
          <p>
            Nombre completo: {lastUsers.name} {lastUsers.lastName}
          </p>
          <p>E-mail: {lastUsers.email}</p>
          <p>Tipo: {lastUsers.type}</p>
          <img
            src={lastUsers.image}
            alt={`Imagen de ${lastProducts.category}`}
          />
        </div>
      </div>
    </div>
  );
};

export default LastPanel;
