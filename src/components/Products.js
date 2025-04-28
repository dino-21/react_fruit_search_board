import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Products = (props) => {
   const { id, title, price, imgUrl, content} = props.fruit;
   let navigate = useNavigate();
  return (
    
    <div className="col-md-4" style={{ marginBottom: "50px" }}>
         <Nav.Link   onClick={() => { navigate("/detail/" +id) }}   className="c1">
                <img src={imgUrl} width="80%" />
                <h5 style={{ marginTop: "10px" }}>{title}</h5>
                <p>{content}</p>
                <span>{price}</span>
         </Nav.Link>
    </div>
  );
};

export default Products;
