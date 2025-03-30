import axios from 'axios';
import { Product } from './type';
import { Book } from './type';

const API_URL = 'http://localhost:8000'; // Assuming your FastAPI backend is running on port 8000

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
    return response.data;
  } catch(error){
    console.error("Error fetching users:", error);
    throw error;
  }
}

export const fetchTrans = async () => {
  try{
    const response = await api.get("/transactionsHeader");
    return response.data
  } catch(error){
    console.error("error fetching transaction: ", error);
    throw error;
  }
} 

export const fetchUserByEmail = async(email: string) => {
  try {
    const res = await api.get(`/users/${email}`)
    return res.data;
  } catch (error){
    console.error("Error fetching user by email", error);
    throw error;
  }
}

export const addUser = async (email:string, username:string, password:string, firstName:string, lastName:string) => {
  try {   
    const response = await api.post("/users",
      {email, username, password, firstName, lastName},
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.get(`/users/${email}/${password}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;  // This will contain the access token
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const loginAdmin = async (email: string, password: string) => {
  try {
    const response = await api.get(`/admins/${email}/${password}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;  // This will contain the access token
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const deleteMember = async(email: string) =>{
  try {
    const response = await api.delete(`/deleteuser/${email}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;  // This will contain the access token
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}

export const updateMember = async (
  email: string,
  updateData: {
    username?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
  }
) => {
  try {
    const response = await api.put(`/users/${email}`, updateData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating member:", error);
    throw error;
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch("http://localhost:8000/books");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Full API Response:", data); // ✅ Debugging log
    console.log("Books Array:", data.books); // ✅ Check if books exist

    return data.books || []; // ✅ Return books or empty array
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const fetchBook = async (id: string): Promise<Book | null> => {
  try {
    const response = await axios.get(`http://localhost:8000/books/${id}`);
    console.log("Fetched Book:", response.data); // ✅ Debugging log
    return response.data;
  } catch (error: any) {
    console.error("Error fetching book:", error.response?.data || error.message);
    return null; // ✅ Ensures we don't crash if the book isn't found
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