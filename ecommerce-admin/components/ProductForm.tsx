'use client';

import axios from 'axios';
import { create } from 'domain';
import { Types } from 'mongoose';
import { redirect } from 'next/navigation';
import { useState } from 'react';

type Props = {
  _id?: Types.ObjectId;
  title?: string;
  description?: string;
  price?: string;
};

/**
 * Renders a form for creating or updating a product and handles
 * the form submission by sending a POST request to the server.
 *
 * @param {Props} Props - Object containing existing product data
 * @return {JSX.Element} A form element with input fields for product
 *                       details and a submit button.
 */
export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}: Props) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [goToProducts, setGoToProducts] = useState(false);

  async function saveProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { title, description, price };

    if (_id) {
      //update
      try {
        await axios.put(`/api/products/`, { ...data, _id });
        console.log('Product was updated');
      } catch (error) {
        console.log('ERROR put: ' + error);
      }
    } else {
      //create
      try {
        const response = await axios.post('/api/products', data);
      } catch (error) {
        console.log('ERROR post: ' + error);
      }
    }
    setGoToProducts(true);
  }
  if (goToProducts === true) {
    redirect('/products');
  }
  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price (in RON)</label>
      <input
        type="text"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
