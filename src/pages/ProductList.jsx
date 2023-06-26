import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
function ProductList() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("https://648bfad38620b8bae7ebff4b.mockapi.io/prod", { method: "GET" })
      .then((res) => res.json())
      .then((prod) => setProduct(prod));
  }, []);
  console.log(product);
  return (
    <div className="container">
      {product.map((prod) => {
        return (
          <ProductCard
            key={prod.id}
            name={prod.name}
            img={prod.image}
            rating={prod.rating}
            desc={prod.description}
            price={prod.price}
            review={prod.review}
            id={prod.id}
            like={prod.like}
            setProduct={setProduct}
          />
        );
      })}
    </div>
  );
}

export default ProductList;
