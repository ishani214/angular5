import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    fromCurrency = '';
    fromSymbol = '';
    toCurrency = '';
    toSymbol = '';
    countries = {};
    symbols = {};
    rates = [];
    fromRate = 0;
    toRate = 0;
    initialFromRate = 0;
    initialToRate = 0;
    from = 0;
    to = 0;

    constructor(private http: HttpClient) { }

    ngOnInit() {
      this.getRates();
      this.getCountries();
    }

    getRates() {
      this.http.get<res.data.rates>('http://data.fixer.io/api/latest?access_key=ddaf2587988d863ad9705f30ec2b87c0')
        .subscribe((resp) => {
          this.rates = resp.rates;
          this.fromRate = resp.rates.USD;
          this.toRate = resp.rates.INR;
          this.initialFromRate = 1;
          this.initialToRate = (this.toRate * this.initialFromRate) / this.fromRate;
          this.from = this.initialFromRate;
          this.to = this.initialToRate;
          this.fromCurrency = 'USD';
          this.fromSymbol = '$';
          this.toCurrency = 'INR';
          this.toSymbol = '₹';
          console.log('currency-rates', resp, this);
      });
    }

    getCountries(){
      this.http.get<resp.data.countries[]>('https://free.currencyconverterapi.com/api/v5/countries')
        .subscribe((resp) => {
           this.countries = resp.results;
           for(const country in this.countries){
             this.symbols[this.countries[country]['currencyId']] = this.countries[country]['currencySymbol'];
           }
          console.log('currency-countries', resp, this);
      });
    }

    updateFromSymbol() {
      this.fromRate = this.rates[this.fromCurrency];
      this.from = this.initialFromRate;
      this.updateFrom();
      this.fromSymbol = this.symbols[this.fromCurrency];
      this.updateToSymbol();
    }

    updateToSymbol() {
      this.toRate = this.rates[this.toCurrency];
      this.initialToRate = (this.toRate * this.initialFromRate)/this.fromRate;
      this.to = this.initialToRate;
      this.updateTo();
      this.toSymbol = this.symbols[this.toCurrency];
    }

    updateTo() {
      this.to = (this.from * this.initialToRate);
    }

    updateFrom() {
      this.from = (this.to) * (this.initialFromRate / this.initialToRate);
    }

}
