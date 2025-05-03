import React, { useState } from 'react';
import './App.css';
import TransactionModal from './components/TransactionModal';
import TransactionList from './components/TransactionList';

function App() {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem('transactions')) || []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransactionIndex, setCurrentTransactionIndex] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredTransactions =
    filterCategory === 'All'
      ? transactions
      : transactions.filter((transaction) => transaction.category === filterCategory);

  const totalCredits = transactions
    .filter((transaction) => transaction.type === 'Credit')
    .reduce((sum, transaction) => sum + (transaction.amount || 0), 0);

  const totalDebits = transactions
    .filter((transaction) => transaction.type === 'Debit')
    .reduce((sum, transaction) => sum + (transaction.amount || 0), 0);

  const netBalance = totalCredits - totalDebits;

  console.log('Total Credits:', totalCredits);
  console.log('Total Debits:', totalDebits);
  console.log('Net Balance:', netBalance);

  const addTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const updateTransaction = (index, updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction, i) =>
      i === index ? updatedTransaction : transaction
    );
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
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