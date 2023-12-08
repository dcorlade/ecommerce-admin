'use client';

import Layout from '@/components/Layout';
import LoadingPage from '@/components/LoadingPage';
import axios from 'axios';
import { Types } from 'mongoose';
import { useRouter } from 'next/navigation';
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

export default function DeleteProductPage({ params: { id } }: Props) {
  const router = useRouter();

  const [productInfo, setProductInfo] = useState<FormProps>({
    title: '',
    description: '',
    price: '',
  });
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true); // Start loading when we're about to fetch data
    axios.get('/api/products?id=' + id).then((res) => {
      setProductInfo(res.data);
      setIsLoading(false); // Set loading to false after data is fetched
    });
  }, [id]);

  function goBack(): void {
    router.push('/products');
  }

  async function deleteProduct(): Promise<void> {
    setIsLoading(false);
    await axios.delete('/api/products?id=' + id);
    setIsLoading(true);
    goBack();
  }

  if (isLoading) {
    return <LoadingPage />;
  } else {
    return (
      <Layout>
        <h1 className="text-center">
          Are you sure you want to delete "{productInfo?.title}"?
        </h1>
        <div className="flex gap-2 justify-center">
          <button onClick={deleteProduct} className="btn-red">
            Yes
          </button>
          <button onClick={goBack} className="btn-default">
            No
          </button>
        </div>
      </Layout>
    );
  }
}
