package com.example.demo.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Car;
import com.example.demo.repository.CarRepository;

@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "*")
public class CarController {
	
	@Autowired
	private CarRepository carRepository;
	
	@GetMapping
	public List<Car> getAllCars() {
		return carRepository.findAll();
	}
}
