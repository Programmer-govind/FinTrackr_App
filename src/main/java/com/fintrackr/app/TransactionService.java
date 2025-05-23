package com.fintrackr.app;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fintrackr.app.model.Transaction;
import com.fintrackr.app.repository.TransactionRepository;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository repository;

	// save transaction
	public String saveTransaction(Transaction object) {
		repository.save(object);
		return "Transaction saved successfully..";
	}

	// get transaction by Id
	public Transaction getTransaction(Long Id) throws Exception {
		return repository.findById(Id).orElseThrow(()-> new Exception("Transaction not found.."));
	}

	// get all transactions
	public List<Transaction> getAllTransactions() {
		return repository.findAll();
	}

	// update transaction
	public String updateTransaction(Long Id, Transaction object) {
		String message = "";
		if (repository.existsById(Id)) {
			Optional<Transaction> exists = repository.findById(Id);
			Transaction transaction = exists.get();
			transaction.setType(object.getType());
			transaction.setAmount(object.getAmount());
			transaction.setCategory(object.getCategory());
			transaction.setDescription(object.getDescription());
			repository.save(transaction);	
			message = "Transaction updated successfully..";
		} else {
			message = "Transaction does not exists..";
		}
		return message;
	}

	// delete transaction
	public String deleteTransaction(Long Id) {
		String message = "";
		boolean existsById = repository.existsById(Id);
		if (existsById) {
			repository.deleteById(Id);
			message = "Transaction deleted successfully..";
		} else {
			message = "Transaction does not exists..";
		}
		return message;
	}

}
