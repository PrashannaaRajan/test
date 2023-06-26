import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function EditProduct() {
  const { prodid } = useParams();
  console.log({ prodid });
  const [prod, setProd] = useState(null);

  useEffect(() => {
    fetch(`https://648bfad38620b8bae7ebff4b.mockapi.io/prod/${prodid}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setProd(res));
  }, []);

  return prod ? <EditProductForm prod={prod} /> : "Loading...";
}

function EditProductForm({ prod }) {
  const [name, setName] = useState(prod.name);
  const [image, setImage] = useState(prod.image);
  const [rating, setRating] = useState(prod.rating);
  const [desc, setDesc] = useState(prod.description);
  const [price, setPrice] = useState(prod.price);
  const [review, setReview] = useState(prod.review);

  const navigate = useNavigate();
  return (
    <div className="ff">
      <TextField
        id="name"
        label="Name"
        variant="filled"
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
      <TextField
        id="image"
        label="Image URL"
        variant="filled"
        onChange={(event) => setImage(event.target.value)}
        value={image}
      />
      <TextField
        id="rating"
        label="Rating"
        variant="filled"
        onChange={(event) => setRating(event.target.value)}
        value={rating}
      />
      <TextField
        id="desc"
        label="Description"
        variant="filled"
        onChange={(event) => setDesc(event.target.value)}
        value={desc}
      />
      <TextField
        id="price"
        label="Price"
        variant="filled"
        onChange={(event) => setPrice(event.target.value)}
        value={price}
      />
      <TextField
        id="review"
        label="Review"
        variant="filled"
        onChange={(event) => setReview(event.target.value)}
        value={review}
      />
      <Button
        color="success"
        variant="contained"
        onClick={() => {
          const updatedProd = {
            name: name,
            image: image,
            rating: rating,
            desc: desc,
            price: price,
            review: review,
          };
          fetch(`https://648bfad38620b8bae7ebff4b.mockapi.io/prod/${prod.id}`, {
            method: "PUT",
            body: JSON.stringify(updatedProd),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then(() => navigate("/ProductList"));
        }}
      >
        SAVE
      </Button>
    </div>
  );
}

export default EditProduct;
