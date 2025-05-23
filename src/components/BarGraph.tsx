import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { bulan: 'Jan', pemasukan: 4000000, pengeluaran: 2500000 },
    { bulan: 'Feb', pemasukan: 5000000, pengeluaran: 3000000 },
    { bulan: 'Mar', pemasukan: 3000000, pengeluaran: 2000000 },
];

const BarGraph = () => {
    return (
        <div className="w-full h-[400px] bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Laporan Keuangan</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="bulan" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pemasukan" fill="#4ade80" />
                    <Bar dataKey="pengeluaran" fill="#f87171" />
                </BarChart>
            </ResponsiveContainer>
        </div>)
}

export default BarGraph