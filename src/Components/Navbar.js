import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Cart from '../Screens/cart';
import { useCart } from './contextreducer';
export default function Navbar() {
  let data = useCart() || [];
  const [cartview, setCartview] = useState(false)
  const Navigate = useNavigate();
  const handlelogout = ()=>{
    localStorage.removeItem("authToken");
    Navigate("/login")
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1" to="/">GoFood</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                </li>
               {(localStorage.getItem("authToken")) ?
                 <li className="nav-item">
                 <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
               </li>
              : "" }
              </ul>
              {(!localStorage.getItem("authToken")) ?
            <div className='d-flex'>

                  <Link className="btn bg-white text-success mx-3" aria-current="page" to="/Login">Login</Link>
            
                  <Link className="btn bg-white text-success mx-3" aria-current="page" to="/createuser">Signup</Link>
                
            </div>
            : 
            <div>
              <div className='btn bg-white text-success mx-2' onClick={()=>{setCartview(true)}}>
              My Cart{" "}
              <Badge pill bg = "danger">{data.length}</Badge>
            </div>
            {cartview ? <modal onClose={()=>setCartview(false)}><Cart/></modal>:null}
            <div className='btn bg-white text-danger mx-2 bg-danger' onClick={handlelogout}>
              Log Out
            </div>
            </div>
            
            }
            </div>
          </div>
        </nav>
    </div>
  );
}
