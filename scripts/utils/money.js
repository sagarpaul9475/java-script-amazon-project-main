export function formatCurrency(money){
     return `$${(Math.round(money)/100).toFixed(2)}`;
}

export default formatCurrency;