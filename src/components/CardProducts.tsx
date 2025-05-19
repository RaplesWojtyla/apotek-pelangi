import React from "react";
import ProductCard from "./ProductCard";

const products = [
		{
			name: "Rhinus SR 60 Kapsul",
			price: "Rp21.000/strip",
			image: "/logo.png",
		},
		{
			name: "Rhinofed 4.5mg/60ml",
			price: "Rp21.500/botol",
			image: "/logo.png",
		},
		{
			name: "Termorex Sirup 60 ml",
			price: "Rp8.000/botol",
			image: "/logo.png",
		},
		{
			name: "Termorex Sirup 60 ml",
			price: "Rp8.000/botol",
			image: "/logo.png",
		},
		{
			name: "Rhinus SR 60 Kapsul",
			price: "Rp21.000/strip",
			image: "/logo.png",
		},
		{
			name: "Rhinofed 4.5mg/60ml",
			price: "Rp21.500/botol",
			image: "/logo.png",
		},
		{
			name: "Termorex Sirup 60 ml",
			price: "Rp8.000/botol",
			image: "/logo.png",
		},
		{
			name: "Termorex Sirup 60 ml",
			price: "Rp8.000/botol",
			image: "/logo.png",
		},
	];

const CardProducts = () => {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
			{products.map((product, i) => (
				<ProductCard key={i} product={product} />
			))}
		</div>
	)
};

export default CardProducts;
