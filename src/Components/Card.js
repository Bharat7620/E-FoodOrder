import React, { useRef, useState } from "react";
import { useDispatchCart, useCart } from "./contextreducer";
import { useEffect } from "react";
export default function Card(Props) {
  let data = useCart() || [];
  const priceref = useRef();
  let dispatch = useDispatchCart();
  
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");
  let options = Props.options;
  let priceoptions = Object.keys(options);
  let finalprice = qty * parseInt(options[size]);

  useEffect(() => {
    setsize(priceref.current.value);
  }, []);

  const handleaddtocart = async () => {
    let food = [];
    
    // Search for the item in the cart
    for (const item of data) {
      if (item.id === Props.fooditem._id) {
        food = item;
        break;
      }
    }

    // Update or add item to the cart
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "update", id: Props.fooditem._id, price: finalprice, qty: qty });
        return;
      } else if (food.size !== size) {
        await dispatch({ type: "add", id: Props.fooditem._id, name: Props.fooditem.name, price: finalprice, qty: qty, size: size });
        return
      }
      return
    }

    await dispatch({ type: "add", id: Props.fooditem._id, name: Props.fooditem.name, price: finalprice, qty: qty, size: size });
  };
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={Props.fooditem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "120px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{Props.fooditem.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setqty(e.target.value)}>
                {Array.from({ length: 6 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceref} onChange={(e)=>setsize(e.target.value)}>
                {priceoptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline h-100 fs-5">₹{finalprice}/-</div>
            </div>
          </div>
          <hr />
          <button
            className={"btn btn-success justify-center ms-2"}
            onClick={handleaddtocart}
          >
            Add to cart 
          </button>
        </div>
        <hr />
      </div>
    </div>
  );
}
