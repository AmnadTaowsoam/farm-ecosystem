"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
// src/services/customer.service.ts
const dataSource_1 = require("../utils/dataSource");
const customer_model_1 = require("../models/customer.model");
class CustomerService {
    constructor() {
        this.repo = dataSource_1.AppDataSource.getRepository(customer_model_1.Customer);
    }
    /**
     * Fetch all customers.
     */
    async findAll() {
        return this.repo.find();
    }
    /**
     * Fetch a single customer by ID.
     * @param id Customer ID
     */
    async findOne(id) {
        return this.repo.findOne({ where: { customer_id: id } });
    }
    /**
     * Create a new customer.
     * @param data Partial<Customer> payload
     */
    async create(data) {
        const customer = this.repo.create(data);
        return this.repo.save(customer);
    }
    /**
     * Update an existing customer.
     * @param id Customer ID
     * @param data Partial<Customer> fields to update
     */
    async update(id, data) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }
    /**
     * Delete a customer by ID.
     * @param id Customer ID
     */
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.CustomerService = CustomerService;
