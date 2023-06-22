import React from 'react'
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LabelList, Label } from 'recharts';
import { useState, useEffect } from 'react';

const SalaryGraph = () => {
    const [responseData, setResponseData] = useState([]);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    useEffect(() => {
        // Fetch data from MongoDB
        fetch('http://localhost:3001/data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                setResponseData(data);
                // Store data in setResponseData
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle the error
            });
    }, []);

    // Data: Salary breakdown in terms of base, retirement and FICA       
    const incomePie = [


        { name: 'Base Income', value: responseData.baseIncomeMean },
        { name: 'Fica Payment', value: responseData.ficaPaymentMean },
        { name: 'Retirement Payment', value: responseData.retirementPaymentMean }

    ]
    // Data: FTE count Bar
    const fteBar = [
        { name: 'Full Time', value: responseData.fullTimeCount },
        { name: 'Part Time', value: responseData.partTimeCount }
    ]
    // Data: Degree count Bar
    const degreeBar = [
        { name: 'MA', value: responseData.MACount },
        { name: 'BA', value: responseData.BACount }
    ]

    //Data: Average Salary for each of the FTEs
    const FTESalaryBar = [
        { name: 'Full Time', value: responseData.fullTimeSalary },
        { name: 'Part Time', value: responseData.partTimeSalary }
    ]

    const DegreeSalaryBar = [
        { name: 'MA', value: responseData.MASalaryMean },
        { name: 'BA', value: responseData.BASalaryMean }
    ]






    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4>Average Total Salary : {responseData.totalSalaryMean}</h4>

            <div>
                <PieChart width={490} height={200}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={incomePie}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label


                    >
                        {incomePie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        <Label
                            content={({ name }) => name}
                            position="inside"
                            fontSize={14}
                            fontWeight="bold"
                            fill="#fff"
                        />
                    </Pie>
                    <Tooltip/>
                </PieChart>
                <br></br>
                <label>Breakdown of total salary in terms of base income, fica and retirement payments</label>
                <br></br>
                <br></br>
            </div>

            <div>
                <BarChart
                    width={500}
                    height={300}
                    data={fteBar}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis dataKey="value" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" >
                        <LabelList dataKey="value" position="top" />
                    </Bar>


                </BarChart>
                <label>Number of employees working full time and part time</label>
                <br></br>
                <br></br>
            </div>

            <div>
                <BarChart
                    width={500}
                    height={300}
                    data={degreeBar}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
                <label>Number of employees with BA and MA degrees</label>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '25px' }}>
                <div>
                    <PieChart width={220} height={350} >
                        <Pie
                            data={FTESalaryBar}
                            cx={120}
                            cy={200}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {FTESalaryBar.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />

                    </PieChart>
                    <label>Average Salary with respect to FTE</label>
                </div>



                <div>
                    <PieChart width={220} height={350} >
                        <Pie
                            data={DegreeSalaryBar}
                            cx={120}
                            cy={200}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {DegreeSalaryBar.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />

                    </PieChart>
                    <label>Average Salary with respect to Degree</label>
                    <br></br>
                    <br></br>
                </div>
            </div>





        </div>
    )
}

export default SalaryGraph