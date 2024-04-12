package com.example.demo.model;

import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Sale {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id")
	private Long saleId;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinColumn(name = "car_id")
	private Car car;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinColumn(name = "customer_id")
	private Customer customer;
	
	@Column(name = "sale_date")
	private Timestamp saleDate;
	
	@Column(name = "sale_price")
	private Double salePrice;

	public Sale() {
		super();
	}

	public Sale(Long saleId, Car car, Customer customer, Timestamp saleDate, Double salePrice) {
		super();
		this.saleId = saleId;
		this.car = car;
		this.customer = customer;
		this.saleDate = saleDate;
		this.salePrice = salePrice;
	}
	
	

	public Sale(Long saleId, Car car, Customer customer, Double salePrice) {
		super();
		this.saleId = saleId;
		this.car = car;
		this.customer = customer;
		this.salePrice = salePrice;
	}

	public Sale(Car car2, Customer customer2, double d) {
		// TODO Auto-generated constructor stub
		this.car = car2;
		this.customer = customer2;
		this.salePrice = d;
	}

	public Long getSaleId() {
		return saleId;
	}

	public void setSaleId(Long saleId) {
		this.saleId = saleId;
	}

	public Car getCar() {
		return car;
	}

	public void setCar(Car car) {
		this.car = car;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Timestamp getSaleDate() {
		return saleDate;
	}

	public void setSaleDate(Timestamp saleDate) {
		this.saleDate = saleDate;
	}

	public Double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}
	
}
