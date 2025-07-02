export function formatCurrency(money){
     return `$${(money/100).toFixed(2)}`;
}

export default formatCurrency;