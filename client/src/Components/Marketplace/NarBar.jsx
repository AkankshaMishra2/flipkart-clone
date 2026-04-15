import { Box, makeStyles, Typography } from '@material-ui/core';
import { navData } from '../../constant/data';

const useStyle = makeStyles(theme => ({
    component: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '55px 130px 0 130px',
        overflowX: 'overlay',
        [theme.breakpoints.down('md')]: {
            margin: 0
        }
    },
    container: {
        padding: '12px 8px',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
            color: '#2874f0'
        }
    },
    image: {
        width: 64
    },
    text: {
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'inherit'
    },
    selected: {
        borderBottom: '3px solid #2874f0',
        color: '#2874f0'
    }
}));

const NavBar = ({ selectedCategory, onCategoryChange }) => {
    const classes = useStyle();
    return (
        <Box className={classes.component}>
            <Box 
                className={`${classes.container} ${!selectedCategory ? classes.selected : ''}`}
                onClick={() => onCategoryChange && onCategoryChange(null)}
            >
                <Typography className={classes.text}>All</Typography>
            </Box>
            {
                navData.map((temp, index) => (
                    <Box 
                        key={index}
                        className={`${classes.container} ${selectedCategory === temp.text ? classes.selected : ''}`}
                        onClick={() => onCategoryChange && onCategoryChange(temp.text)}
                    >
                        <img src={temp.url} className={classes.image} alt="" />
                        <Typography className={classes.text}>{temp.text}</Typography>
                    </Box>
                ))
            }
        </Box>
    )
}

export default NavBar;