'use client';

import Layout from '@/components/Layout';
import LoadingPage from '@/components/LoadingPage';
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { useEffect, useState } from 'react';

type Props = {
  params: { id: Types.ObjectId };
};

type FormProps = {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  price: string;
};
export default function EditProductPage({ params: { id } }: Props) {
  const [productInfo, setProductInfo] = useState<FormProps>({
    title: '',
    description: '',
    price: '',
  });
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    if (!id) {
      setIsLoading(false); // If there's no ID, we're not loading data
      return;
    }
    setIsLoading(true); // Start loading when we're about to fetch data
    axios.get('/api/products?id=' + id).then((res) => {
      setProductInfo(res.data);
      setIsLoading(false); // Set loading to false after data is fetched
    });
  }, [id]);

  if (isLoading) {
    return <LoadingPage />;
  } else {
    return (
      <Layout>
        <h1>Edit product</h1>
        {productInfo && <ProductForm {...productInfo} />}
      </Layout>
    );
  }
}
