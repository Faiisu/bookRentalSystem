import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Assuming your FastAPI backend is running on port 8000

type Product = {
  _id: string;  // ✅ Change `_id` to string (not number)
  name: string;
  price: number;
  image?: string;
  category?: string;
  rating?: number;
};


// Set up axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export const fetchUsers = async () => {
  try{
    const response = await api.get("/users");
    return response.data.users;
  } catch(error){
    console.error("Error fetching users:", error);
    throw error;
  }
}

export const addUser = async (email:string, password:string) => {
  try {
    const response = await api.post("/users",
      {email, password},
      { headers: { "Content-Type": "application/json" } } // ✅ กำหนด Content-Type
    );

    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Axios requests for Product management
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<{ products: Product[] }>('/products');
    return response.data.products.map((product) => ({
      ...product,
      _id: String(product._id), // ✅ Ensure _id is always a string
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addProduct = async (product: { name: string; price: number; category: string }) => {
  try {
    const response = await api.post('/products', product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const fetchProduct = async (productId: string) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const updateProduct = async (productId: string, updatedProduct: { name: string; price: number; category: string }) => {
  try {
    const response = await api.put(`/products/${productId}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Axios requests for User authentication (Login and Signup)
export const signupUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/users', { email, password });
    return response.data;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;  // This will contain the access token
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Axios requests for Cart management
export const addToCart = async (userEmail: string, productId: string, quantity: number) => {
  try {
    const response = await api.post('/cart', { user_email: userEmail, product_id: productId, quantity });
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

export const fetchCart = async (userEmail: string) => {
  try {
    const response = await api.get(`/cart/${userEmail}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Axios requests for Order management
export const placeOrder = async (userEmail: string, cartItems: string[]) => {
  try {
    const response = await api.post('/order', { user_email: userEmail, cart_items: cartItems });
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export const fetchOrder = async (orderId: string) => {
  try {
    const response = await api.get(`/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export default api;