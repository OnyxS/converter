import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromValue, setFromValue] = React.useState(0);
  const [toValue, setToValue] = React.useState(0);
  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const ratesRef = React.useRef({});
  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((json) => (ratesRef.current = json.rates))
      .catch((err) => {
        console.warn(err);
        alert('Error fetch');
      });
  }, []);

  React.useEffect(() => {
    onChangeToValue(toValue);
  }, [toCurrency]);

  React.useEffect(() => {
    onChangeFromValue(fromValue);
  }, [fromCurrency]);

  const onChangeFromValue = (value) => {
    let result = (value / ratesRef.current[fromCurrency]) * ratesRef.current[toCurrency];
    setFromValue(value);
    setToValue(result);
  };

  const onChangeToValue = (value) => {
    let result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromValue(result);
    setToValue(value);
  };

  return (
    <div className="App">
      <Block
        onChangeValue={onChangeFromValue}
        value={fromValue}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
      />
      <Block
        onChangeValue={onChangeToValue}
        value={toValue}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
      />
    </div>
  );
}

export default App;
