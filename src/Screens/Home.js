import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";


export default function Home() {
  const [Search, setSearch] = useState('')
  const [foodcat, setFoodcat] = useState([]);
  const [fooditem, setFooditem] = useState([]);
console.log("foodcategory", foodcat);

  const loaddata = async () => {
    let response = await fetch("http://localhost:5000/api/fooddata", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log("API Respnse",response);
    setFoodcat(response['food_categories']);
    setFooditem(response['food_items']);
    console.log("api data", response[0],response[1]);
  };

  useEffect(() => {
    loaddata();
  }, []);

  console.log("foodcat: ", foodcat);
  console.log("fooditem: ", fooditem);

  return (
    
    <div>
      <div><Navbar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={Search} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://media.istockphoto.com/id/1266980508/photo/burger-food-photography.jpg?s=612x612&w=0&k=20&c=R8fd_RBV3IgibRezdPH8dvTE76mcgfLFTNTcSTnloh4=" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover", height: "500px" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=D1z4xPCs-qQIZyUqRcHrnsJSJy_YbUD9udOrXpilNpI=" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover", height: "500px" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://media.istockphoto.com/id/1387309804/photo/juicy-mini-snack-burger-hamburger-or-cheeseburger-with-one-chicken-patties-with-sauce-and.jpg?s=612x612&w=0&k=20&c=9E7b3tqwkIuqJvuI1SePfkjb1yV0QUSuE28kWEtMRxk=" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover", height: "500px" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div></div>

      <div className="container">
        {
      foodcat !== []  
          ? foodcat.map((data) => {
            return (
              <div className="row mb-3">
              <div key={data._id}
                 className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {fooditem !== []
                ?
                  fooditem.filter((item) => item.CategoryName === data.CategoryName)
                    .map((filteritems) => {
                      return (
                        <div key={filteritems._id} className="col-12 col-md-6 col-lg-3 m-auto">
                          <Card fooditem={filteritems}
                          options ={filteritems.options[0]}
                          ></Card>
                        </div>
                      );
                    })
          
                  : <div>No Such Data Found</div>
                }
              </div>
            );
          })
        : <div>No Categories Found</div>
      }
      </div>

      <div>
        <Footer />
      </div>
    </div>
    
  );
  
  
}
