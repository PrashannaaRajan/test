import React from "react";

function Home() {
  return (
    <div>
      <h1>Welcome to home</h1>
      <h3>Available functionalities are:</h3>
      <ul>
        <li>CREATE: use the add product button to create a new product</li>
        <li>Read: navigate to the product list to view all products</li>
        <li>UPDATE: click on the edit button to edit a product</li>
        <li>DELETE: click on the delete button to delete a product</li>
        <li>LIKE: click on the like button to increase amount of likes.</li>
        <li>
          DISLIKE: click on the dislike button to descrease amount of likes. it
          wont go below zero
        </li>
      </ul>
    </div>
  );
}

export default Home;
