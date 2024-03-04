import { useEffect, useState } from 'react';
import styles from './Pagination.module.css';

const Pagination = (props) => {
    const { itemsCount, itemsPerPage, currentPage, MoveToNextPage } = props;
    
    //Calculating the number of occupied pages
    const numberOfPages = Math.ceil(itemsCount / itemsPerPage);

    const[pages, setPages] = useState([])

    //Setting the max number of visible pages you can navigate to
    const maxVisiblePages = 3;

    useEffect(()=>{
        //An array that start from 1 to the number of occupied pages
        setPages(Array((numberOfPages <= maxVisiblePages) ? numberOfPages : maxVisiblePages).fill().map((_, i) => i+1))
    },[numberOfPages])
    
    const handlePagination = (page) => {
        //Changing the pages state based on which page is clicked, if its the last but not the end of pages, the pages array will update to push another page and drop the first one and vice versa
        if(page === pages[pages.length - 1] && page < numberOfPages) {
            setPages(prev => [...prev.filter((_, i) => i !== 0), page + 1])
        }
        else if(page === pages[0] && page > 1){
            setPages(prev => [page - 1, ...prev.filter((_, i) => i !== pages.length - 1)])
        }
        MoveToNextPage(page)
    }

    return(
        <ul className={styles.container}>
            {
                pages.map( i => 
                                <a href='#productsList' className={
                                        `${styles.num} 
                                        ${currentPage === i ? styles.active : ''}`
                                        } 
                                    key={i} 
                                    onClick={()=>handlePagination(i)
                                }>
                                    {/* Rendering arrows depending on the condition mentioned in the previous comment */}
                                    {i === pages[0] && i > 1 && '<<'}
                                    {i === pages[pages.length - 1] && i < numberOfPages && '>>'}
                                    {!(i === pages[0] && i > 1) && !(i === pages[pages.length - 1] && i < numberOfPages) && i}
                                </a>
                                )
            }
        </ul>
    )
}

export default Pagination;