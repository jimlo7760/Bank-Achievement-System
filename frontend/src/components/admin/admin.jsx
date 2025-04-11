import '../../App.css';
import './admin.css';

import DataTable from './data_table';
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import GeneralQuestionFrame from '../employee/general_question_frame';
import SubmitDate from '../employee/SubmitDate';


function Admin() {
    const [window_width, setWindowWidth] = useState(window.innerWidth);

    const [max_date, setMaxDate] = useState(dayjs());
    const [min_date, setMinDate] = useState(dayjs().subtract(7, 'day'));
    const min_width = 250;

    useEffect(() => {  // listen to window resize
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        // <main className='flex_center'>
        //     <section>
        //         <h1 className="title">Manager Page</h1>
        //         <br></br>
        //         <DataTable />
        //     </section>     
        // </main>
        <main className="flex_center" style={{ padding: '40px' }}>
            <section style={{ display: 'flex', gap: '40px', width: '100%', maxWidth: '1280px' }}>
        
                <div style={{
                flex: 1,
                background: 'white',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                }}>
                <h2 className="employee_title">Filter by Date</h2>
                <GeneralQuestionFrame
                    type="admin"
                    question="Start Date"
                    input={
                    <SubmitDate
                        date={min_date}
                        onDateChange={setMinDate}
                        minwidth={min_width}
                    />
                    }
                />
                <GeneralQuestionFrame
                    type="admin"
                    question="End Date"
                    input={
                    <SubmitDate
                        date={max_date}
                        onDateChange={setMaxDate}
                        minwidth={min_width}
                    />
                    }
                />
                </div>

              
                <div style={{
                flex: 3,
                background: 'white',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                }}>
                <h1 className="title">Manager Page</h1>
                <DataTable min_date={min_date} max_date={max_date} />
                </div>
            </section>
            </main>

        
    );
}

export default Admin;