package com.fintrackr.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fintrackr.app.model.Transaction;
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long>{


}
