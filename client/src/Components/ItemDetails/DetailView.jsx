import { useState, useEffect } from 'react';
import { Box, Typography, makeStyles, Grid } from '@material-ui/core';
import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { getProductById } from '../../service/api';

const useStyles = makeStyles(theme => ({
    component: {
        marginTop: 55,
        background: '#F2F2F2'
    },
    container: {
        background: '#FFFFFF',
        // margin: '0 80px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            margin: 0
        }
    },
    rightContainer: {
        marginTop: 50,
        '& > *': {
            marginTop: 10
        }
    },
    price: {
        fontSize: 28
    },
    smallText: {
        fontSize: 14,
    },
    greyTextColor: {
        color: '#878787'
    }
}));

const data = { 
    id: '',
    url: '', 
    detailUrl: '',
    title: {
        shortTitle: '',
        longTitle: '',
    }, 
    price: {
        mrp: 0,
        cost: 0,
        discount: ''
    },
    description: '',
    discount: '', 
    tagline: '' 
};

const DetailView = () => {
    const classes = useStyles();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    const [ product, setProduct ] = useState(data);
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const getProductValues = async () => {
            setLoading(true);
            try {
                const response = await getProductById(id);
                if (response && response.data) {
                    setProduct(response.data);
                }
            } catch (error) {
                console.log('Error fetching product:', error);
            }
            setLoading(false);
        };
        getProductValues();
    }, [id]);

    return (
        <Box className={classes.component}>
            <Box></Box>
            { loading ? (
                <Box style={{ textAlign: 'center', padding: 50 }}>
                    <Typography>Loading product details...</Typography>
                </Box>
            ) : product && product.id ? (
                <Grid container className={classes.container}> 
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={product} />
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12} className={classes.rightContainer}>
                        <Typography>{product.title.longTitle}</Typography>
                        <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{marginTop: 5}}>
                            8 Ratings & 1 Reviews
                            <span><img src={fassured} style={{width: 77, marginLeft: 20}} alt="" /></span>
                        </Typography>
                        <Typography>
                            <span className={classes.price}>₹{product.price.cost}</span>&nbsp;&nbsp;&nbsp; 
                            <span className={classes.greyTextColor}><strike>₹{product.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                            <span style={{color: '#388E3C'}}>{product.price.discount} off</span>
                        </Typography>
                        <ProductDetail product={product} />
                    </Grid>
                </Grid>
            ) : (
                <Box style={{ textAlign: 'center', padding: 50 }}>
                    <Typography>Product not found</Typography>
                </Box>
            )}
        </Box>
    )
}

export default DetailView;