import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../UserContent/Bayel.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { clientContext } from '../../contexts/ClientContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
const UserCards = ({ item }) => {
    const { addAndDeleteProductInCart, checkProductInCart, addAndDeleteProductInFavorites,
        checkFavoriteInFavorites } = React.useContext(clientContext)

    return (

        <Card className='grid-content-card' sx={{ maxWidth: 300 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="240"
                image={item.image}
            />
            <CardContent>
                <p className='card-title' >
                    {item.name}
                </p>
                <Typography component={'span'} title={item.description} variant="body2" color="text.secondary">
                    <p> {item.description.slice(0, 60)}...</p>
                </Typography>

            </CardContent>
            <CardActions>

                <Button
                    onClick={() => addAndDeleteProductInCart(item)}
                    className='shop-btn' color={checkProductInCart(item.id) ? 'error' : 'success'} variant='outlined' size="large">
                    <ShoppingCartIcon color={checkProductInCart(item.id) ? 'error' : ''} />
                </Button>
                <Button
                    onClick={() => addAndDeleteProductInFavorites(item)}
                    className='shop-btn' color={checkFavoriteInFavorites(item.id) ? 'error' : 'success'} variant='outlined' size="large">
                    <FavoriteIcon color={checkFavoriteInFavorites(item.id) ? 'error' : ''} />
                </Button>

                <Link to={`/product/${item.id}`} >
                    <Button variant="outlined" className='card-btn'>Learn More</Button>
                </Link>
            </CardActions>
        </Card>

    );
};

export default UserCards;