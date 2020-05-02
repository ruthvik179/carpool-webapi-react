export class HelperService {
    formatCurrency (amount : number) {
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(amount);
    }
}