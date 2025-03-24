import '../../App.css';

import DataTable from './data_table';
import { useEffect, useState } from 'react';


function Admin() {
    const [window_width, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {  // listen to window resize
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <main className='flex_center'>
            <section>
                <h1 className="title">Manager Page</h1>
                <br></br>
                <DataTable />
            </section>     
        </main>
        
    );
}

export default Admin;