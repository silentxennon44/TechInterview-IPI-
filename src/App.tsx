import { useEffect, useRef, useState } from "react";
import "./index.css";
import { getData } from "./utils/routines";
import styles from "./styles.module.scss";
import GoogleInputBox from "./components/googleInputBox";
import { FaSearch } from "react-icons/fa";


async function getTodos(setItems:React.Dispatch<React.SetStateAction<Product[]>>, name?: string) {
  if (name) {
    const { items: newsItems } = await getData({ name });
    if (newsItems.length > 1) {
      setItems(newsItems);
    }
    return;
  }
  const { items: newsItems } = await getData({
    sort: "featured",
    
  });

  if (newsItems.length > 1) {
    setItems(newsItems);
  }
}

type CartItems = {
  id: bigint;
  name: string;
  description: string;
  category: string; // You can adjust this to include more categories
  price: number;
  sizes: string[]; // S, M, L, XL, etc.
  colors: string[]; // Array of color strings
  material: string;
  gender: string; // You can expand this as needed
  stock: number;
  brand: string;
  discount: number;
  isOnSale: boolean; // It's better to use boolean instead of a string
  isHot: boolean;
  tags: string[]; // Array of tags like "Casual", "Basic"
  images: string[]; // Array of image URLs
  thumbnail: string; // URL of the thumbnail image
  sales?: number;
  featured?: boolean;
  created_at: Date;
  qty: number;
};

function App() {
  const [items, setItems] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItems[]>([]);
  const [search, setSearch] = useState("");
  const [cash, setCash] = useState(0);
  const [qty, setQty] = useState<Record<number, number>>({});
  

  useEffect(() => {
    getTodos(setItems);
  }, []);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.topArea}>
          <div className={styles.searchArea}>
            <GoogleInputBox
              value={search}
              onChange={(val) => setSearch(val)}
              placeholder="Search"
            />
            <button onClick={() => getTodos(setItems, search)}>
              <i>
                <FaSearch />
              </i>
            </button>
          </div>
          <div className={styles.total}>
            <span>Total Amount: {cart.reduce((acc, item) => acc + item.price, 0)}</span>
            <span className={styles.cash}>{<GoogleInputBox value={String(cash)} type="number" placeholder="Cash" onChange={(val) => setCash(Number(val))}/>}</span>
            <span>Change: {cash - cart.reduce((acc, item) => acc + item.price, 0)}</span>
            <button onClick={() => {
              
            }}>Save Transaction</button>
          </div>
        </div>

        <div className={styles.itemsArea}>
          <div className={styles.items}>
            <div className={styles.header}>
              <span className={styles.itemName}>Product Name</span>
              <span className={styles.itemCost}>Cost</span>
              <span className={styles.itemQty}>Quantity</span>
              <span className={styles.itemAmt}>Amount</span>
              <span className={styles.itemAxn}>Action</span>
            </div>
            {items.map((item) => {
              return (
                <div key={item.id}  className={styles.item}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemCost}>
                    {" "}
                    ₱
                    {(item.price - item.price * (item.discount / 100)).toFixed(
                      2
                    )}
                  </span>
                  <span className={styles.itemQty}>
                    <input type="number" defaultValue={0} value={qty[Number(item.id)]} onChange={(e) => setQty({...qty, [Number(item.id)]: Number(e.target.value)})}/>
                  </span>
                  <span className={styles.itemAmt}>{(Number(qty[Number(item.id)] * item.price) || 0).toFixed(2)}</span>
                  <span className={styles.itemAxn}>
                    <button onClick={()=>{
                      const newItem = {...item, qty: qty[Number(item.id)] || 1};

                      if (!cart.find((i) => i.id === item.id)) {
                        console.log(newItem);
                        setCart([...cart, newItem]);
                      } else {
                        const newCart = cart.map((i) => {
                          if (i.id === item.id) {
                            return {...i, qty: i.qty + (qty[Number(item.id)] || 1)};
                          }
                          return i;
                        });
                        setCart(newCart);
                      }
                    }}>Add</button>
                  </span>
                </div>
              );
            })}
          </div>
          <div className={styles.cart}>
            <div className={styles.header}>
              <span className={styles.itemName}>Product Name</span>
              <span className={styles.itemCost}>Cost</span>
              <span className={styles.itemQty}>Quantity</span>
              <span className={styles.itemAmt}>Amount</span>
              <span className={styles.itemAxn}>Action</span>
            </div>
            {cart.map((item) => {
              return (
                <div key={item.id} className={styles.cartItem}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemCost}>
                    {" "}
                    ₱
                    {(item.price - item.price * (item.discount / 100)).toFixed(
                      2
                    )}
                  </span>
                  <span className={styles.itemQty}>
                    {item.qty}
                  </span>
                  <span className={styles.itemAmt}>{(item.qty * item.price).toFixed(2)}</span>
                  <span>
                    <button onClick={()=>{
                      setCart(cart.filter((i) => i.id !== item.id))
                    }}>Remove</button>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
