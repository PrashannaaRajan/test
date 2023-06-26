import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState();
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState();
  const [review, setReview] = useState("");
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
        label="Image Address"
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
        id="Desc"
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
        variant="contained"
        onClick={() => {
          const newProd = {
            name: name,
            image: image,
            rating: rating,
            desc: desc,
            price: price,
            review: review,
          };
          fetch("https://648bfad38620b8bae7ebff4b.mockapi.io/prod", {
            method: "POST",
            body: JSON.stringify(newProd),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then(() => navigate("/ProductList"));
        }}
      >
        Add Product
      </Button>
    </div>
  );
}
