package com.example.demo.model;

import org.junit.jupiter.api.Test;
import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class SaleTest {

    @Test
    public void testConstructorAndGetters() {
        Long saleId = 1L;
        Car car = new Car();
        Customer customer = new Customer();
        Timestamp saleDate = new Timestamp(System.currentTimeMillis());
        Double salePrice = 1000.0;

        Sale sale = new Sale(saleId, car, customer, saleDate, salePrice);

        assertEquals(saleId, sale.getSaleId());
        assertEquals(car, sale.getCar());
        assertEquals(customer, sale.getCustomer());
        assertEquals(saleDate, sale.getSaleDate());
        assertEquals(salePrice, sale.getSalePrice());
    }

    @Test
    public void testDefaultConstructor() {
        Sale sale = new Sale();

        assertNotNull(sale);
        assertEquals(null, sale.getSaleId());
        assertEquals(null, sale.getCar());
        assertEquals(null, sale.getCustomer());
        assertEquals(null, sale.getSaleDate());
        assertEquals(null, sale.getSalePrice());
    }
    
    @Test
    public void testSetters() {
        Sale sale = new Sale();
        Long saleId = 1L;
        Car car = new Car();
        Customer customer = new Customer();
        Timestamp saleDate = new Timestamp(System.currentTimeMillis());
        Double salePrice = 1000.0;

        sale.setSaleId(saleId);
        sale.setCar(car);
        sale.setCustomer(customer);
        sale.setSaleDate(saleDate);
        sale.setSalePrice(salePrice);

        assertEquals(saleId, sale.getSaleId());
        assertEquals(car, sale.getCar());
        assertEquals(customer, sale.getCustomer());
        assertEquals(saleDate, sale.getSaleDate());
        assertEquals(salePrice, sale.getSalePrice());
    }

}
