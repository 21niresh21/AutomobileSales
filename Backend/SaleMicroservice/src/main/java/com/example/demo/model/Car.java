package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="cars")
public class Car{
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	Long id;
	@Column(name="brand")
	String brand;
	@Column(name="model")
	String model;
	@Column(name="varient" )
	String varient;
	@Column(name="category" )
	String category;
	@Column(name="price")
	String price;
	@Column(name="engine" )
	String engine;
	@Column(name="fuel")
	String fuel;
	@Column(name="tankCapacity" )
	String tankCapacity;
	
	//Constructor
	public Car(Long id, String brand, String model, String varient, String category, String price, String engine,
			String fuel, String tankCapacity) {
		super();
		this.id = id;
		this.brand = brand;
		this.model = model;
		this.varient = varient;
		this.category = category;
		this.price = price;
		this.engine = engine;
		this.fuel = fuel;
		this.tankCapacity = tankCapacity;
	}
	
	public Car() {
		super();
	}
	
	
	
	

	public Car(Long id) {
		super();
		this.id = id;
	}

	public Car(String brand, String model, String varient, String category, String price, String engine, String fuel,
			String tankCapacity) {
		super();
		this.brand = brand;
		this.model = model;
		this.varient = varient;
		this.category = category;
		this.price = price;
		this.engine = engine;
		this.fuel = fuel;
		this.tankCapacity = tankCapacity;
	}

	//Getter and Setters
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getVarient() {
		return varient;
	}
	public void setVarient(String varient) {
		this.varient = varient;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getEngine() {
		return engine;
	}
	public void setEngine(String engine) {
		this.engine = engine;
	}
	public String getFuel() {
		return fuel;
	}
	public void setFuel(String fuel) {
		this.fuel = fuel;
	}
	public String getTankCapacity() {
		return tankCapacity;
	}
	public void setTankCapacity(String tankCapacity) {
		this.tankCapacity = tankCapacity;
	}
	
	
}
