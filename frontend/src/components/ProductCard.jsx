const ProductCard = ({ product }) => (
  <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition">
    <img
      src={product.image || '/assets/placeholder.jpg'}
      alt={product.name}
      className="w-full h-48 object-cover rounded"
    />
    <h3 className="text-lg font-bold mt-2">{product.name}</h3>
    <p className="text-gray-600">${product.price.toFixed(2)}</p>
    <p className="text-sm text-gray-500">{product.description}</p>
    <button className="mt-2 p-2 bg-green-500 text-white rounded w-full">
      Add to Cart
    </button>
  </div>
);

export default ProductCard;