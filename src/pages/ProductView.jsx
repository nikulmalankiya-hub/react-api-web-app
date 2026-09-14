import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductView = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(false);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`https://dummyjson.com/products/${id}`);
            if (!res.ok) throw new Error('Product not found');
            const json = await res.json();
            setItem(json);
        } catch (fetchError) {
            console.error(fetchError);
            setError(true);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (error)
        return (
            <div className="p-6 text-center">
                <p className="text-xl text-red-600">Product not found</p>
                <Link to="/" className="mt-4 inline-block text-blue-600">Back to products</Link>
            </div>
        )

    if (!item)
        return (
            <h2 className="text-center text-xl mt-20">Loading....</h2>
        )

    const sharMessage = `
    product : ${item.title}
    Description ${item.description}
    price : ₹ ${item.price}
    Category : ${item.category}
    Check this product : ${window.location.origin + window.location.pathname}
     `;

    const whatappsLink = `https://wa.me/?text=${encodeURIComponent(sharMessage)}`;

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

            <div className="bg-white shadow-xl p-6 rounded-xl max-w-3xl w-full">

                {/* Back Button */}
                <Link
                    to="/"
                    className="text-white bg-gray-500 mb-4 inline-block px-4 py-2 rounded"
                >
                    Back
                </Link>

                <div className="flex flex-col md:flex-row gap-6">

                    {/* Product Image */}
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full md:w-1/2 rounded object-contain"
                    />

                    {/* Product Details */}
                    <div>
                        <h1 className="text-3xl font-bold">
                            {item.title}
                        </h1>

                        <p className="text-gray-700 mt-3">
                            {item.description}
                        </p>

                        <p className="mt-4 text-lg">
                            <span className="font-semibold">
                                category: {item.category}
                            </span>
                        </p>

                        <p className="text-2xl font-bold mt-3">
                            ₹ {item.price}
                        </p>

                        <div className="mt-6 flex gap-4 items-center">

                            {/* Buy Now */}
                            <button className="px-6 py-2 bg-green-600 text-white rounded-lg">
                                Buy Now
                            </button>

                            <a href={whatappsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                             className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-green-500">
                                <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z" /></svg>Share</a>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;