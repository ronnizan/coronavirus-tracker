import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css'



const Chart = ({data:{confirmed,deaths, recovered},country}) => {

    const [dailyData, setDailyData] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            const dailyData = await fetchDailyData()
            setDailyData(dailyData);
        }

        fetchApi();
    },[])



    const lineChart = (
        dailyData.length !==0 ? <Line
            data={{
                labels: dailyData.map(({date})=> date),
                datasets: [{
                    data:dailyData.map(({confirmed})=>confirmed),
                    label: 'Infected',
                    borderColor: 'black',
                    fill:true,
                }, {
                    data:dailyData.map(({deaths})=>deaths),
                    label: 'deaths',
                    borderColor: 'red',
                    backgroundColor:'rgba(255,0,0,0.5)',
                    fill:true,
                }],
            }}

        /> : null
    );


    const barChart = (
        confirmed ? (
            <Bar
            data={{
                labels:['infected','recovered','deaths'],
                datasets:[{
                    label:'people',
                    backgroundColor:[
                    'rgba(0, 0, 255, 0.5)',
                    'rgba(0, 255, 0, 0.5)',
                    'rgba(255, 0,0 , 0.5)'                    
                    ],
                    data: [confirmed.value,recovered.value,deaths.value]
                }]
            }}
            options={{
                legend:{display:false},
                title:{display:true, text:`current state in ${country}`}
            }} 

            />
        ):null
    )

    return (
        <div className={styles.container}>
        {country ? barChart:lineChart}
        </div>
    )
    
}

export default Chart;