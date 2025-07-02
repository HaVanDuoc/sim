'use client';

import { DATA_SIMS } from '@/data/sims/sims';
import React, { useEffect, useState } from 'react';

const COL = {
    RO: 0,
    NHAP: 1,
    LOI: 2,
    TON: 3,
    PICKUP: 4,
    BAN: 5,
    TT: 6,
};

const TOTAL_COLS = 7; // Số cột tính tổng từ RỔ đến TT
const editableCols = [COL.RO, COL.NHAP, COL.LOI, COL.TON, COL.PICKUP];

const BanGiaoTable = () => {
    const [tableData, setTableData] = useState(
        DATA_SIMS.map(() => Array(TOTAL_COLS).fill(''))
    );
    const [totals, setTotals] = useState(Array(TOTAL_COLS).fill(0));

    useEffect(() => {
        const updated = [...tableData];
        const newTotals = Array(TOTAL_COLS).fill(0);

        updated.forEach((row, i) => {
            const ro = parseFloat(row[COL.RO]) || 0;
            const nhap = parseFloat(row[COL.NHAP]) || 0;
            const loi = parseFloat(row[COL.LOI]) || 0;
            let ton = parseFloat(row[COL.TON]) || 0;
            const pickup = parseFloat(row[COL.PICKUP]) || 0;

            const maxBan = ro + nhap - loi;
            if (ton > maxBan) {
                ton = maxBan;
                updated[i][COL.TON] = ton.toString();
            }

            const ban = maxBan - ton;
            const price = DATA_SIMS[i]?.price || 0;
            const tt = ban * price;

            updated[i][COL.BAN] = ban.toString();
            updated[i][COL.TT] = tt.toString();

            newTotals[COL.RO] += ro;
            newTotals[COL.NHAP] += nhap;
            newTotals[COL.LOI] += loi;
            newTotals[COL.TON] += ton;
            newTotals[COL.PICKUP] += pickup;
            newTotals[COL.BAN] += ban;
            newTotals[COL.TT] += tt;
        });

        setTableData(updated);
        setTotals(newTotals);
    }, [tableData]);

    const handleChange = (rowIndex: number, colIndex: number, value: string) => {
        const updated = [...tableData];
        updated[rowIndex][colIndex] = value;
        setTableData(updated);
    };

    return (
        <div className="p-6 bg-white max-w-[1000px] mx-auto">
            <h1 className="text-xl font-bold text-center">BIÊN BẢN BÀN GIAO</h1>
            <p className="text-center mt-1">QUẦY G3 - CA: ....... Ngày: ....... Tháng: ....... Năm: 2025</p>

            <div className="overflow-x-auto mt-4">
                <table className="w-full mt-6 border border-black text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-black px-2 py-1">STT</th>
                            <th className="border border-black px-2 py-1">Loại sim</th>
                            <th className="border border-black px-2 py-1">RỔ</th>
                            <th className="border border-black px-2 py-1">NHẬP</th>
                            <th className="border border-black px-2 py-1">LỖI</th>
                            <th className="border border-black px-2 py-1">TỒN</th>
                            <th className="border border-black px-2 py-1">PICK UP</th>
                            <th className="border border-black px-2 py-1">BÁN</th>
                            <th className="border border-black px-2 py-1">TT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DATA_SIMS.map((sim, rowIndex) => (
                            <tr key={sim.id} className="hover:bg-gray-100">
                                <td className="border border-black px-2 py-1 text-center">{rowIndex + 1}</td>
                                <td className="border border-black px-2 py-1">{sim.name}</td>
                                {tableData[rowIndex].map((value, colIndex) => (
                                    <td key={colIndex} className="border border-black px-1 py-1">
                                        {editableCols.includes(colIndex) ? (
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                                className="w-full outline-none bg-transparent text-xs sm:text-sm text-right"
                                            />
                                        ) : (
                                            <span className="block text-right">{value}</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Tổng */}
                        <tr className="font-semibold bg-yellow-100">
                            <td colSpan={2} className="border border-black px-2 py-1 text-center">Tổng</td>
                            {totals.map((val, i) => (
                                <td key={i} className="border border-black px-2 py-1 text-right">{val.toLocaleString()}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BanGiaoTable;
