import { Box, makeStyles } from '@material-ui/core';
import NavBar from './Marketplace/NarBar';
import Banner from './Marketplace/Banner';
import MidSlide from './Marketplace/MidSlide';
import MidSection from './Marketplace/MidSection';
import Slide from './Marketplace/Slide';
import React,  { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../redux/actions/productActions';

const useStyle = makeStyles({
    component: {
        padding: 10,
        background: '#F2F2F2'
    }
})

const Marketplace = () => {
    const classes = useStyle();
    const [selectedCategory, setSelectedCategory] = useState(null);

    const getProducts = useSelector(state => state.getProducts);
    const { products} = getProducts;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    // Filter products by category
    const filteredProducts = selectedCategory 
        ? products.filter(product => {
            const shortTitle = (product.title?.shortTitle || '').toLowerCase();
            const category = selectedCategory.toLowerCase();
            return shortTitle.includes(category) || category.includes(shortTitle);
          })
        : products;

    return (
        <> 
            <NavBar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
            <Box className={classes.component}>
                {!selectedCategory && <Banner />}
                <MidSlide products={filteredProducts.length > 0 ? filteredProducts : products} />
                {!selectedCategory && <MidSection />}
                <Slide
                    data={filteredProducts.length > 0 ? filteredProducts : products} 
                    title={selectedCategory ? `${selectedCategory} Products` : 'Discounts for You'}
                    timer={false} 
                    multi={true} 
                />
                {!selectedCategory && (
                    <>
                        <Slide
                            data={products} 
                            title='Suggested Items'
                            timer={false} 
                            multi={true} 
                        />
                        <Slide
                            data={products} 
                            title='Top Selection'
                            timer={false} 
                            multi={true} 
                        />
                        <Slide
                            data={products} 
                            title='Recommended Items'
                            timer={false} 
                            multi={true} 
                        />
                    </>
                )}
            </Box>
        </>
    )
}

export default Marketplace;