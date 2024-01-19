'use client';

import axios from 'axios';
import { create } from 'domain';
import { Types } from 'mongoose';
import { redirect } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Spinner from './Spinner';

type Props = {
  _id?: Types.ObjectId;
  title?: string;
  description?: string;
  price?: string;
  images?: string[];
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
  images: existingImages,
}: Props) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [goToProducts, setGoToProducts] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  async function saveProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = { title, description, price, images };

    if (_id) {
      //update
      try {
        await axios.put(`/api/products/`, { ...data, _id });
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

  async function uploadImages(ev: any) {
    const files = ev.target?.files;

    if (files?.length > 0) {
      setIsUploading(true);
      //upload files
      const data = new FormData();

      for (const file of files) {
        data.append('file', file);
      }

      const response = await axios.post('/api/upload', data);

      setImages((oldImages) => {
        return [...oldImages, ...response.data.links];
      });

      setIsUploading(false);
    }
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

      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {!!images?.length &&
          images.map((link) => (
            <div key={link} className="inline-block h-24 w-24 ">
              <img
                src={link}
                alt=""
                className="rounded-lg object-cover h-full w-full"
              ></img>
            </div>
          ))}
        {isUploading && (
          <div className="h-24 flex items-center gap-1">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 cursor-pointer border text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-700 rounded-lg bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
          <input
            type="file"
            onChange={uploadImages}
            className="hidden "
          ></input>
        </label>

        {!images?.length && <div>No photos for this product</div>}
      </div>
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
