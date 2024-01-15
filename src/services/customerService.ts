// CustomerService.ts
import bcrypt from 'bcrypt';

import CustomerRepository from '../repositories/customerRepository';
import { CustomerEntity } from '../entities/customerEntity';

const CustomerService = () => {
  const customerRepository = CustomerRepository();


  const getCustomerPoints = async (customerId: number): Promise<number | undefined> => {
    try {
      const points = await customerRepository.getCustomerPoints(customerId);
      return points;
    } catch (error) {
      console.error('Error getting customer points:', error);
      throw error;
    }
  };



  const createCustomer = async (customerData: CustomerEntity): Promise<CustomerEntity | undefined> => {
    try {
      const { customer_name, customer_password } = customerData;

      // Check if the customer_name already exists using repository function
      const customerExists = await customerRepository.checkIfCustomerExists(customer_name);

      if (customerExists) {
        throw new DuplicateCustomerError('Customer with this name already exists');
      }

         // Hash the password before storing it
         const hashedPassword = await bcrypt.hash(customer_password, 10);

      // Perform the insert using repository function
      const createdCustomer = await customerRepository.createCustomer(customer_name,hashedPassword);
      return createdCustomer;
    } catch (error) {
      console.error('Error Registering User:', error);
      throw error;
    }
  };




  const loginCustomer = async (customerName: string, customerPassword: string): Promise<{ user: CustomerEntity | null; error: string | null }> => {
    try {
      // Retrieve user from the database using the repository function
      let user = await customerRepository.getCustomerByName(customerName);
  
      // If the user does not exist, return "user not found" error
      if (!user) {
        return { user: null, error: 'User not found' };
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(customerPassword, user.customer_password);
  
      // If the password does not match, return "incorrect password" error
      if (!passwordMatch) {
        return { user: null, error: 'Incorrect password' };
      }
  
      // Return the authenticated user with no error
      user = await customerRepository.updateCustomerAuthentication(customerName);
  
      return { user, error: null };
  
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };




  class DuplicateCustomerError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'DuplicateCustomerError';
    }
  }

  return {
    createCustomer, loginCustomer,  getCustomerPoints,
    DuplicateCustomerError,
  };
};

export default CustomerService;
