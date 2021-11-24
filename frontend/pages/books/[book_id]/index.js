import axios from "axios";
import { useEffect } from "react";
import { useRouter } from 'next/router'

export default function Book(){
    const router = useRouter();
    const { book_id } = router.query

    useEffect(() => {
        if(!book_id) return;

        axios.get(`books/${book_id}`).then((res) => {
           // get book details 
        });
    }, [book_id])
    return <div>
        
        Hello
        
    </div>;
}