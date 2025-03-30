import React, { useEffect, useState } from 'react';
import { fetchTrans } from '../../api';

interface TransactionsHeader {
    transaction_id: number;
    transaction_date: string;
    payment_method: string;
    total_amount: number;
    status: string;
}

const Transhistory = () => {
    const [transactions, setTransactions] = useState<TransactionsHeader[]>([]);
    
    useEffect(() => {
        const getTransactions = async () => {
            try {
                const data = await fetchTrans();
                setTransactions(data.transactions);
            } catch (err) {
                console.error("Failed to fetch transactions", err);
            }
        };
        getTransactions();
    }, []);

    return (
        <div className="min-h-screen w-full flex justify-center items-center">
            {/* Background container with margin-top and border shadow */}
            <div className="bg-gray-300 min-h-[700px] min-w-[500px] rounded-lg shadow-lg w-full max-w-5xl p-8">
                <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
                <ul className="space-y-4">
                    {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <li key={transaction.transaction_id} className="bg-white p-4 rounded-lg shadow">
                                <p><strong>ID:</strong> {transaction.transaction_id}</p>
                                <p><strong>Date:</strong> {transaction.transaction_date}</p>
                                <p><strong>Payment Method:</strong> {transaction.payment_method}</p>
                                <p><strong>Total Amount:</strong> ${transaction.total_amount.toFixed(2)}</p>
                                <p><strong>Status:</strong> {transaction.status}</p>
                            </li>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No transactions available</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Transhistory;
