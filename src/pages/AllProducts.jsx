import React, { useContext, useEffect, useState } from "react";
import UserCards from "../components/UserContent/UserCards";
import { clientContext } from "../contexts/ClientContext";
import "../components/UserContent/Bayel.css";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router";
import MyPagination from "../components/UserContent/MyPagination";
import MyNavbar from "../components/MyNavbar";

const AllProducts = () => {
  const { products, getProducts, currentPosts } = useContext(clientContext);
  useEffect(() => {
    getProducts();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  let obj = new URLSearchParams(window.location.search);
  let navigate = useNavigate();
  const [typeValue, setTypeValue] = useState("")// eslint-disable-line
  const filterProducts = (key, value) => {
    obj.set(key, value);
    let newUrl = `${window.location.pathname}?${obj.toString()}`;
    navigate(newUrl);
    getProducts();
    setTypeValue(value);
  };
  useEffect(() => {
    setTypeValue(obj.get("type"));
  }, [obj])
  return (
    <>
      <MyNavbar />
      <Container fixed className="card-container">

        <div className='radio-content' >
          <FormControl className="radio-btn" component="fieldset">
            <FormLabel component="legend">Type of Furniture</FormLabel>
            <RadioGroup
              onChange={(e) => filterProducts("type", e.target.value)}
              row
              aria-label="type"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="диван"
                control={<Radio />}
                label="Sofas"
              />
              <FormControlLabel
                value="кресло"
                control={<Radio />}
                label="Arm Chairs"
              />
              <FormControlLabel value="стол" control={<Radio />} label="Tables" />
              <FormControlLabel
                value="кровать"
                control={<Radio />}
                label="Beds"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <Grid container>
          {products ? (
            currentPosts.map((item) => <UserCards key={item.id} item={item} />)
          ) : (
            <h2>Loading...</h2>
          )}
        </Grid>
        <MyPagination />
      </Container>
    </>
  );
};

export default AllProducts;
