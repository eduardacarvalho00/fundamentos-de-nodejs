const express = require('express');
const { v4 : uuidv4 } = require('uuid');

const app = express();
app.use(express.json())

const customers = [];

//Middleware
function verifyExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find( customer => customer.cpf === cpf);

  if(!customer){
    return response.status(400).json({ error: "Customer not found"})
  }

  request.customer = customer;
  return next();
};

app.post('/user', (request, response) => {
  const { cpf, name } = request.body;

  const cpfExists = customers.some(
    (customer) => customer.cpf === cpf 
  );

  if(cpfExists){
    response.status(400).json({ 
      error : "Customer already exists" 
    })
  }

  customers.push({
    cpf,
    name,
    id:  uuidv4(),
    statement: []
  }) 

  return response.status(201).send()
});

app.get('/statement', verifyExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement)
});

app.post('/deposit', verifyExistsAccountCPF,(request, response) => {
  const { description, amount } = request.body;
  const { customer } = request; 

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  }

  customer.statement.push(statementOperation);

  return response.status(201).send()
});

app.listen(3000);