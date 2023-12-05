'use client';

import Layout from '@/components/Layout';
import axios from 'axios';
import React, { useState } from 'react';

const NewProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  async function createProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { title, description, price };

    try {
      const response = await axios.post('/api/products', data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>New product</h1>
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
    </Layout>
  );
};

export default NewProduct;
