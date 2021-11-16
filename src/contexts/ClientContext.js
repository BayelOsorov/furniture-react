import React from "react";
import axios from "axios";
import { API } from "../helpers/const";
import { useState, useEffect } from "react";
import { CalcSubPrice, calcTotalPrice } from "../helpers/CalcPrice";
export const clientContext = React.createContext();

const INIT_STATE = {
  products: null,
  detailProduct: null,

  productsCountInCart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).products.length : 0,
  cart: null,
  productsCountInFavorites: JSON.parse(localStorage.getItem('favorite')) ? JSON.parse(localStorage.getItem('favorite')).favorites.length : 0,
  favorites: null

};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_DETAILS":
      return { ...state, detailProduct: action.payload };
    case "ADD_AND_DELETE_CART":
      return { ...state, productsCountInCart: action.payload };
    case "GET_CART":
      return { ...state, cart: action.payload };
    case "ADD_AND_DELETE_FAVORITES":
      return { ...state, productsCountInFavorites: action.payload };
    case "GET_FAVORITES":
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};
const ClientContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    try {
      let filter = window.location.search;
      const response = await axios(`${API}${filter}`);
      dispatch({
        type: "GET_PRODUCTS",
        payload: response.data,
      });
      resetCurrPage();
    } catch (e) {
      console.log(e);
    }
  };
  //! для страницы деталей

  const getDetails = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      dispatch({
        type: "GET_DETAILS",
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
  // ! пагинация
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  useEffect(() => {
    if (state.products) {
      const data = state.products;
      setPosts(data);
    }
  }, [state.products]);

  const numberOfLastPost = currentPage * postsPerPage;
  const numberOfFirstPost = numberOfLastPost - postsPerPage;
  const currentPosts = posts.slice(numberOfFirstPost, numberOfLastPost);
  const totalPosts = posts.length;

  const handlePage = (newPage) => {
    setCurrentPage(newPage);
  };
  function resetCurrPage() {
    setCurrentPage(1);
  }

  // ! cart
  const addAndDeleteProductInCart = (product1) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let product = {
      product1: product1,
      count: 1,
      subPrice: 0,
    };
    product.subPrice = CalcSubPrice(product);
    let checkArr = cart.products.filter((item) => {
      return item.product1.id === product1.id;
    });
    if (checkArr.length === 0) {
      cart.products.push(product);
    } else {
      cart.products = cart.products.filter((item) => {
        return item.product1.id !== product1.id;
      });
    }
    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_AND_DELETE_CART",
      payload: cart.products.length,
    });
  };
  const checkProductInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let checkArr = cart.products.filter((item) => {
      return item.product1.id === id;
    });
    if (checkArr.length === 0) {
      return false;
    } else {
      return true;
    }
  };
  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };
  const changeCountProduct = (count, id) => {
    if (count < 1) {
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    cart.products = cart.products.map((item) => {
      if (item.product1.id === id) {
        item.count = count;
        item.subPrice = CalcSubPrice(item);
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));

    getCart();
  };

  // ! favorites
  const addAndDeleteProductInFavorites = (item) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        favorites: [],
      };
    }
    let favProduct = {
      item: item,
    };
    let checkArr = favorite.favorites.filter((elem) => {
      return elem.item.id === item.id;
    });
    if (checkArr.length === 0) {
      favorite.favorites.push(favProduct);
    } else {
      favorite.favorites = favorite.favorites.filter((elem) => {
        return elem.item.id !== item.id;
      });
    }
    localStorage.setItem("favorite", JSON.stringify(favorite));
    dispatch({
      type: "ADD_AND_DELETE_FAVORITES",
      payload: favorite.favorites.length,
    });
  };
  const checkFavoriteInFavorites = (id) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        favorites: [],
      };
    }
    let checkArr = favorite.favorites.filter((elem) => {
      return elem.item.id === id;
    });
    if (checkArr.length === 0) {
      return false;
    } else {
      return true;
    }
  };
  const getFavorite = () => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    dispatch({
      type: "GET_FAVORITES",
      payload: favorite,
    });
  };

  return (
    <clientContext.Provider
      value={{
        getProducts: getProducts,
        getDetails: getDetails,
        handlePage,
        addAndDeleteProductInCart,
        checkProductInCart,
        changeCountProduct,
        getCart,
        addAndDeleteProductInFavorites,
        checkFavoriteInFavorites,
        getFavorite,
        totalPosts: totalPosts,
        currentPosts: currentPosts,
        postsPerPage: postsPerPage,
        currentPage,
        products: state.products,
        detailProduct: state.detailProduct,
        productsCountInCart: state.productsCountInCart,
        cart: state.cart,
        productsCountInFavorites: state.productsCountInFavorites,
        favorites: state.favorites,
      }}
    >
      {props.children}
    </clientContext.Provider>
  );
};

export default ClientContextProvider;
