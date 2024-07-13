import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addProductToCart } from "../features/cartSlice";
import { Card, Image, Text, Group, Loader, Container, Title, Badge, Button, Center } from '@mantine/core';
import { FaStar } from 'react-icons/fa';

const baseUrl = 'https://timbu-get-all-products.reavdev.workers.dev/';

const fetchProducts = async (page) => {
  const response = await axios.get(baseUrl, {
    params: {
      organization_id: 'e7d7a8603b13425d92fb6570d1bad0de',
      reverse_sort: false,
      page: page,
      size: 10,
      Appid: 'MGDBMROP0DL7QWW',
      Apikey: '697326cbd56f495394e1c6bb4294abba20240713001448325131'
    }
  });
  return response.data;
};

const Home = () => {
  const dispatch = useDispatch();
  const [productsData, setProductsData] = useState([]);
  const [filter, setFilter] = useState({
    price: "all",
    rating: "all",
    bestSeller: "all",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await fetchProducts(page);
        setProductsData(data.items);
        setIsEmpty(data.total === 0);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const addProduct = (product) => {
    const newProduct = { ...product, quantity: 1 };
    dispatch(addProductToCart(newProduct));
  };

  const filteredProducts = productsData.filter((product) => {
    const { price, rating, bestSeller } = filter;
    const productPrice = product.current_price[0]?.NGN[0];
    const productRating = 4; // Placeholder
    const productBestSeller = true; // Placeholder

    return (
      (price === "all" || (price === "low" && productPrice < 5000) || (price === "high" && productPrice >= 5000)) &&
      (rating === "all" || (rating === "low" && productRating < 4) || (rating === "high" && productRating >= 4)) &&
      (bestSeller === "all" || (bestSeller === "yes" && productBestSeller) || (bestSeller === "no" && !productBestSeller))
    );
  });

  if (isLoading) return <Center><Loader /></Center>;
  if (isError) return <div>Error fetching products</div>;
  if (isEmpty) return <div>No products found</div>;

  return (
    <Container className="bg-customPink p-5">
      <Title className="font-bold text-center text-3xl mb-5 text-gray-500">Products</Title>
      <div className="filter-options mb-5 flex flex-col md:flex-row justify-center items-center gap-5">
        <Text className="font-semibold text-gray-700">Filter By:</Text>
        <select name="price" value={filter.price} onChange={handleFilterChange} className="p-2 rounded-lg border border-gray-300">
          <option value="all">Price</option>
          <option value="low">Below 5000</option>
          <option value="high">5000 and above</option>
        </select>
        <select name="rating" value={filter.rating} onChange={handleFilterChange} className="p-2 rounded-lg border border-gray-300">
          <option value="all">Rating</option>
          <option value="low">Below 4</option>
          <option value="high">4 and above</option>
        </select>
        <select name="bestSeller" value={filter.bestSeller} onChange={handleFilterChange} className="p-2 rounded-lg border border-gray-300">
          <option value="all">Best Seller</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} shadow="sm" padding="lg" radius="md" withBorder className="border border-gray-300 rounded-lg flex flex-col">
            <Card.Section className="flex-shrink-0">
              <Image src={`https://api.timbu.cloud/images/${product?.photos[0]?.url}`} height={160} alt={product.name} className="rounded-t-lg object-cover w-full h-full" />
            </Card.Section>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={700} className='font-bold'>{product.name}</Text>
              <Badge color="pink" variant="light">
                <span className="font-bold">&#8358;</span>{product.current_price[0]?.NGN[0]}
              </Badge>
            </Group>
            <Text size="sm">{product.description}</Text>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="text-yellow-400" />
              ))}
            </div>
            <Button onClick={() => addProduct(product)} className="bg-pink-400 text-black text-2xl p-2 rounded-lg mt-auto">Add to Cart</Button>
          </Card>
        ))}
      </div>
      <Group position="center" mt="md">
        <Button onClick={() => setPage(page > 1 ? page - 1 : 1)} className="bg-gray-500 border rounded mt-5 h-full w-1/3 font-extrabold text-pink-400">Prev</Button>
        <Button onClick={() => setPage(page + 1)} className="bg-gray-500 ml-5 border rounded h-full w-1/3 font-extrabold text-pink-400">Next</Button>
      </Group>
    </Container>
  );
};

export default Home;
