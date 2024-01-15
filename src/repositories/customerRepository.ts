import { CustomerEntity } from '../entities/customerEntity';
import client from '../config/db';
const CustomerRepository = () => {
  const checkIfCustomerExists = async (customerName: string): Promise<boolean> => {
    const query = 'SELECT * FROM customers WHERE customer_name = $1';
    const values = [customerName];
    const result = await client.query(query, values);
    return result.rows.length > 0;
  };

  const createCustomer = async (customerName: string, customerPassword: string): Promise<CustomerEntity|undefined> => {
    const query = 'INSERT INTO customers (customer_name, customer_password) VALUES ($1, $2) RETURNING *';
    const values = [customerName, customerPassword];
    const result= await client.query(query, values);

    return result.rows[0];
  };


  const getCustomerByName = async (customerName: string): Promise<CustomerEntity | null> => {
    const query = 'SELECT * FROM customers WHERE customer_name = $1 ';
    const values = [customerName];
    const result = await client.query(query, values);

    return result.rows.length > 0 ? result.rows[0] : null;
  };


  const updateCustomerAuthentication = async (customerName: string): Promise<CustomerEntity | null> => {
    const query = 'UPDATE customers SET authenticated = true WHERE customer_name = $1 RETURNING *';
    const values = [customerName];

    const result = await client.query(query, values);

    return result.rows.length > 0 ? result.rows[0] : null;
  }



  const getCustomerPoints = async (customerId: number): Promise<number | undefined> => {
    const query = 'SELECT points FROM customers WHERE customer_id = $1';
    const values = [customerId];
    const result = await client.query(query, values);
    return result.rows[0]?.points;
  };
 
  return {
    getCustomerPoints,
    checkIfCustomerExists,
    createCustomer,getCustomerByName,updateCustomerAuthentication
  };
};

export default CustomerRepository;