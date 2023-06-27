import React from 'react'
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LabelList, Label, } from 'recharts';
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

    const FeedbackBar = [
        { name: 'Satisfied', value: responseData.satisfiedCount },
        { name: 'Neutral', value: responseData.neutralCount },
        { name: 'Dissatisfied', value: responseData.dissatisfiedCount },

    ]

    // const x = responseData.years;   
    // const y = responseData.total;

    // const jsonList = Object.keys(x).map((key) => {
    //     return { x: x[key], y: y[key] };
    //   });
      
    //   console.log(jsonList);
      //console.log(FeedbackBar)

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          const { name, value } = payload[0];
          return (
            <div style={{'background-color': '#fff',
                'border': '1px solid #ccc',
                'padding': '10px',
                'width': '200px',
                'height': '65px'}}>
              <p>{`${name} : ${value}`}</p>
            </div>
          );
        }
      
        return null;
      };




    return (
        <>


        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4>Average Total Salary : {responseData.totalSalaryMean}</h4>

            <div>
                <PieChart width={800} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={incomePie}
                        cx='50%'
                        cy='50%'
                        outerRadius={80}
                        fill="#8884d8"
                        label


                    >
                        {incomePie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}

                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>

                <br></br>
                <label style={{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }}>Breakdown of total salary in terms of base income, fica and retirement payments</label>
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
                    <Tooltip content={<CustomTooltip />} />

                    <Bar dataKey="value" fill="#8884d8" >
                        <LabelList dataKey="value" position="top" />
                    </Bar>


                </BarChart>
                <label style={{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }}>Number of employees working full time and part time</label>
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
                    <Tooltip content={<CustomTooltip />} />

                    <Bar dataKey="value" fill="#8884d8" >
                        <LabelList dataKey="value" position="top" />
                    </Bar>

                </BarChart>
                <label style={{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }}>Number of employees with BA and MA degrees</label>

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
                        <Tooltip content={<CustomTooltip />} />

                    </PieChart>
                    <label style={{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }}>Average Salary with respect to FTE</label>
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
                        <Tooltip content={<CustomTooltip />} />

                    </PieChart>
                    <label style={{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }}>Average Salary with respect to Degree</label>
                    <br></br>
                    <br></br>
                </div>
            </div>

            <div>
                <BarChart
                    width={500}
                    height={300}
                    data={FeedbackBar}
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
                    <Tooltip content={<CustomTooltip />} />

                    <Bar dataKey="value" fill="#8884d8" >
                        <LabelList dataKey="value" position="top" />
                    </Bar>

                </BarChart>
                <label style={{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }}>Feedback from teachers</label>

            </div>

            <br></br>

            {/* <div>
            <LineChart
      width={500}
      height={300}
      data={jsonList}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
      
    </LineChart>
    </div>

    <div>
    <ScatterChart
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey="x" name="stature" unit="cm" />
      <YAxis type="number" dataKey="y" name="weight" unit="kg" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="A school" data={jsonList} fill="#8884d8" />
    </ScatterChart>
    </div> */}




        </div>
    </>
    )
}

export default SalaryGraph