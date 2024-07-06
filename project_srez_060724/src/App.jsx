import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
function App() {
  const [tempProducts, setTempProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      const call = await fetch(`https://reactapi.pautinaweb.ru/objects.php`);
      const response = await call.json();
      setProducts(response);
      setTempProducts(response);
    }
    fetchProducts();
  }, []);

  function sortirovka(type = 'asc'){
    setTempProducts([...tempProducts.sort((a, b) => type === 'asc' ? a.price - b.price : b.price - a.price)]);
  }
  useEffect(() => {
    setTempProducts([...products.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))])
  }, [search]) 

  return(
    <>
    <h1>Products</h1>
    <section className='buttons'>
    <input type='text' className='neon-input' placeholder="Введите текст..." onChange={(event) => setSearch(event.target.value)}></input>
    <button className='neon-button' onClick={() => sortirovka('asc')}>increase</button>
    <button className='neon-button'  onClick={() => sortirovka('desc')}>decreasing</button>
    </section>

    <section className='products'>
    {tempProducts.map((item) => {
          return (
            <article className='card' key={item.id}>
              <h2 className='itemname'>{item.name} </h2>
              <p className='itemdescr'>{item.description}</p>
              <p className='iteprice'>{item.price} руб.</p>
              <p className='itemcount'>{item.sclad} шт.</p>
            </article>
          )
        })}
    </section>

    </>

  )

}

export default App