import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { clientContext } from '../contexts/ClientContext';
import MyNavbar from "../components/MyNavbar";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'

// snack
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const DetailPage = () => {
    const { getDetails, detailProduct, addAndDeleteProductInCart, checkProductInCart, addAndDeleteProductInFavorites, checkFavoriteInFavorites } = useContext(clientContext)
    const params = useParams()
    useEffect(() => {
        getDetails(params.id)
    }, [])
    // snackbar
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    //  error snack
    const [open1, setOpen1] = React.useState(false);

    const handleClick1 = () => {
        setOpen1(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };
    const [open3, setOpen3] = React.useState(false);

    const handleClick3 = () => {
        setOpen3(true);
    };

    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen3(false);
    };
    const [open4, setOpen4] = React.useState(false);

    const handleClick4 = () => {
        setOpen4(true);
    };

    const handleClose4 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen4(false);
    };
    return (
        <>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Добавлено в корзину
                    </Alert>
                </Snackbar>
            </Stack>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose1}>
                    <Alert severity="error">Удалено из корзины</Alert>
                </Snackbar>
            </Stack>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open3} autoHideDuration={2000} onClose={handleClose3}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Добавлено в избранное
                    </Alert>
                </Snackbar>
            </Stack>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open4} autoHideDuration={2000} onClose={handleClose4}>
                    <Alert severity="error">Удалено из избранных</Alert>
                </Snackbar>
            </Stack>
            <MyNavbar />
            <div className='detail-page'>
                {
                    detailProduct ? (

                        <div className="details" key={detailProduct.id}>
                            <div className="big-img">
                                <img src={detailProduct.image} alt="" />
                            </div>

                            <div className="box">
                                <div className="row">
                                    <h2>{detailProduct.name}</h2>
                                    <span>${detailProduct.price}</span>
                                </div>
                                <p><strong>Модель : </strong>{detailProduct.model}</p>
                                <p><strong>Описание : </strong>{detailProduct.description}</p>

                                {
                                    checkProductInCart(detailProduct.id) ? (
                                        <Button
                                            onClick={() => {
                                                addAndDeleteProductInCart(detailProduct)
                                                handleClick1()
                                            }}
                                            className='shop-btn' color='error' variant='outlined' size="large">
                                            Удалить из корзины
                                        </Button>

                                    ) : (
                                        <Button
                                            onClick={() => {
                                                addAndDeleteProductInCart(detailProduct)
                                                handleClick()
                                            }}
                                            className='shop-btn' color='success' variant='outlined' size="large">
                                            Добавить в корзину
                                        </Button>
                                    )
                                }
                                {
                                    checkFavoriteInFavorites(detailProduct.id) ? (
                                        <Button
                                            onClick={() => {
                                                addAndDeleteProductInFavorites(detailProduct)
                                                handleClick4()

                                            }}
                                            className='shop-btn' color='error' variant='outlined' size="large">
                                            Удалить из избранных
                                        </Button>

                                    ) : (
                                        <Button
                                            onClick={() => {
                                                addAndDeleteProductInFavorites(detailProduct)
                                                handleClick3()

                                            }}
                                            className='shop-btn' color='success' variant='outlined' size="large">
                                            Добавить в избранное
                                        </Button>
                                    )
                                }
                            </div>
                        </div>
                    ) : (
                        <h2>Loading...</h2>
                    )
                }

            </div>
        </>
    );
};

export default DetailPage;