import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionModal from './components/TransactionModal';
import TransactionList from './components/TransactionList';
import {
  fetchTransactions,
  addTransaction as apiAddTransaction,
  updateTransaction as apiUpdateTransaction,
  deleteTransaction as apiDeleteTransaction,
} from './api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransactionIndex, setCurrentTransactionIndex] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchTransactions()
      .then(data => setTransactions(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredTransactions =
    filterCategory === 'All'
      ? transactions
      : transactions.filter((transaction) => transaction.category === filterCategory);

  const totalCredits = transactions
    .filter((transaction) => transaction.type && transaction.type.toLowerCase() === 'credit')
    .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);

  const totalDebits = transactions
    .filter((transaction) => transaction.type && transaction.type.toLowerCase() === 'debit')
    .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);

  const netBalance = totalCredits - totalDebits;

  const refreshTransactions = () => {
    setLoading(true);
    fetchTransactions()
      .then(data => setTransactions(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  const addTransaction = async (transaction) => {
    setLoading(true);
    setError(null);
    try {
      await apiAddTransaction(transaction);
      refreshTransactions();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateTransaction = async (index, updatedTransaction) => {
    setLoading(true);
    setError(null);
    try {
      const id = transactions[index].id;
      await apiUpdateTransaction(id, updatedTransaction);
      refreshTransactions();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteTransaction = async (index) => {
    setLoading(true);
    setError(null);
    try {
      const id = transactions[index].id;
      await apiDeleteTransaction(id);
      refreshTransactions();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    setCurrentTransactionIndex(index);
    setIsModalOpen(true);
  };

  const saveTransaction = (transaction) => {
    if (currentTransactionIndex !== null) {
      updateTransaction(currentTransactionIndex, transaction);
      setCurrentTransactionIndex(null);
    } else {
      addTransaction(transaction);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>FinTrackr</h1>
        <p style={{ fontSize: '1.2rem', margin: '10px 0 25px 0', color: '#b3e5fc', fontWeight: 500 }}>
          Your Smart Personal Finance Tracker &amp; Insights Dashboard
        </p>
        <p style={{ fontSize: '1rem', margin: '0 0 30px 0', color: '#e0f7fa' }}>
          Effortlessly manage your credits and debits, analyze spending by category, and gain real-time insights into your financial health.
        </p>
        <button onClick={() => setIsModalOpen(true)}>Add Transaction</button>
        <label>
          Filter by Category:
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Billing">Billing</option>
            <option value="Others">Others</option>
          </select>
        </label>
        <div className="insights">
          <h2>Transaction Insights</h2>
          <p><strong>Total Credits:</strong> ${totalCredits.toFixed(2)}</p>
          <p><strong>Total Debits:</strong> ${totalDebits.toFixed(2)}</p>
          <p><strong>Net Balance:</strong> ${netBalance.toFixed(2)}</p>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}
        <TransactionList 
          transactions={filteredTransactions} 
          onDelete={deleteTransaction} 
          onEdit={handleEdit} 
        />
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={saveTransaction}
          transaction={currentTransactionIndex !== null ? transactions[currentTransactionIndex] : null}
        />
      </header>
    </div>
  );
}

export default App;