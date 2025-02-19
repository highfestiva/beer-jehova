export function formatCurrency(amount: number) {
  const s = amount.toLocaleString('da-DK', { minimumFractionDigits: 2 });
  const parts = s.split(',');
  if (parts[1] === '00') {
    return (
      <div className="price">
        <span>{parts[0]}</span>
        <span className="stack-chars">,-</span>
      </div>
    );
  }
  return (<span className="price">{parts[0]}<sup>{parts[1]}</sup></span>);
};
