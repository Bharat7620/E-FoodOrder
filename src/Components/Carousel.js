import React from 'react';

export default function Carousel() {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
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
      </div>
    </div>
  );
}
