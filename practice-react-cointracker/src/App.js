import { useState, useEffect } from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [cost, setCost] = useState(1);
    const [amount, setAmount] = useState("");
    const onChange = (event) => {
        setCost(event.target.value);
        setAmount(1);
    };
    const onInputChange = (event) => {
        setAmount(event.target.value);
    };
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setCoins(json);
                setLoading(false);
            });
    }, []);
    return (
        <div>
            <h1>The coins!{loading ? "" : `(${coins.length})`}</h1>
            {loading ? (
                <strong>loading...</strong>
            ) : (
                <select onChange={onChange}>
                    <option>Select Coin</option>
                    {coins.map((coin, index) => (
                        <option key={index} value={coin.quotes.USD.price} id={coin.id} symbol={coin.symbol}>
                            {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
                        </option>
                    ))}
                </select>
            )}
            <div>
                <input type="number" value={amount} onChange={onInputChange} placeholder="Enter the amount you want" /> USD
            </div>
            <h2> {amount / cost} </h2>
        </div>
    );
}
export default App;
