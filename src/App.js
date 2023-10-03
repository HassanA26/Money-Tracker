import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const[name,setName]= useState('');
  const[date,setDate]= useState('');
  const[description,setDescription] = useState('');
  const[transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(transactions => {
      setTransactions(transactions);
    });
  },[]);
  
  async function getTransactions(){
    const url = process.env.REACT_APP_API_URL+'/transactions';
    const response = await fetch(url);
    return await response.json();
  };

  function addNewTransaction (ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/transaction';
    const price = name.split(' ')[0];
    fetch(url, { 
      method:'POST',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1), 
        description, 
        date})
    }).then(response => {
        response.json().then(json =>{
          setName('');
          setDescription('');
          setDate('');
          console.log('result', json);
        });
    });
  }
  let balance = 0;
  for(const transaction of transactions){
    balance = balance + transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    <main>
      <h1>{balance}<span>.{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input type="text" 
                 value={name} 
                 onChange={ev => setName(ev.target.value)}
                 placeholder={'-40 eating out'}/>
          
          <input value={date}
                 onChange={ev => setDate(ev.target.value)} 
                 type="date" />
        </div>
        <div className='description'>
          <input type="text" 
                 value={description} 
                 onChange={ev => setDescription(ev.target.value)}
                 placeholder={'description'}/>
        </div>
        <div className="container">
        <button type='submit'>Add new transaction</button>
        </div>
        
      </form>
      <div className="transactions">
        {transactions.length > 0 && transactions.map (transaction => (
          <div> <div className="transaction">
          <div className="left">
            <div className="name">{transaction.name}</div>
            <div className="description">{transaction.description}</div>
          </div>
          <div className="right">
            <div className={"price " + (transaction.price < 0 ? "red":"green")}>{transaction.price}</div>
            <div className="date">2023-12-18</div>
          </div>
        </div></div>
        ))}
      </div>
    </main>
  );
}

export default App;
