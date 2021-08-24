import { Component, OnInit } from '@angular/core';
import { EosService } from '../services/eos.service';
import { blockData } from '../services/block';
import { transData } from '../services/transfer';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  data: any;
  data2: any;
  bdata = new blockData();
  bdata2 = new transData();
  submitted = false;
  innerHtml = '';
  innerHtml2 = '';

  constructor(private eosService: EosService) {
  }

  ngOnInit() {
    // 
    // console.log(this.data)
    // // this.getMBal()
  }

  // head = 'No Actions'
  // ifClicked() {
  //   this.head = "You've clicked !"

  async addRec() {
    this.submitted = true;
    this.save();

    this.data = this.eosService.eos.getAccount(this.bdata.from);
    console.log(this.data)
    this.innerHtml = this.data;


  }

  private save(): void {
    let data: any;
    this.eosService.addRec(this.bdata).subscribe();
    this.getMBal()
  };
  getMBal() {

    try {
      this.eosService.getMBal(this.bdata2).subscribe(
        (res: any) => {
          this.data2 = res;
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (excep) {
      console.log(excep);
    }
  }


}
