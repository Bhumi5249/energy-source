'use client'
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Button } from '@mui/material';
import Layout from '@/components/Layout';
import { Chart, registerables } from 'chart.js'; 
import { useDispatch, useSelector } from 'react-redux';
import { getProductionListByRange } from '@/redux/api/productionApi';
import axios from 'axios';

export default function Dashboard() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { productionsByRange } = useSelector((state) => state.production);
  const [productionData, setProductionData] = useState([]);
  const dispatch = useDispatch()
  Chart.register(...registerables);

  const fetchProductionData = async () => {
    if (startDate && endDate) {
      dispatch(getProductionListByRange({ startDate: startDate, endDate: endDate }))
    }
  };

  useEffect(()=>{
    if(productionsByRange.length){
    setProductionData(productionsByRange)
    }
  }, [productionsByRange])

  // useEffect(() => {
  //   if (startDate && endDate) {
  //     fetchProductionData();
  //   }
  // }, [startDate, endDate]);

  const downloadCSV = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/productions/download`, {
        params: { startDate, endDate },
        responseType: 'blob', // Important for file downloads
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'production_data.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const chartData = {
    labels: productionData && productionData.map(data => new Date(data.date).toLocaleDateString()),
    datasets: [{
      label: 'Total Production',
      data: productionData && productionData.map(data => data.totalProduction),
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
    }],
  };

  return (
    <Layout>
      <h1>Dashboard</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </div>
        <Button variant="contained" color="primary" onClick={fetchProductionData}>
          Fetch Data
        </Button>
        <Button variant="contained" color="primary" onClick={downloadCSV}>
          Export Data
        </Button>
      </LocalizationProvider>
      {productionData && productionData.length > 0 && (
        <Line data={chartData} />
      )}
    </Layout>
  );
}
