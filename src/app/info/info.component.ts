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

  constructor(private eosService: EosService) {
  }

  ngOnInit() {
    this.data = this.eosService.eos.getAccount('baccount1234');
    console.log(this.data)
    // this.getMBal()
  }

  // head = 'No Actions'
  // ifClicked() {
  //   this.head = "You've clicked !"

  async addRec() {
    this.submitted = true;
    this.save();

  }

  private save(): void {
    let data: any;
    console.log(this.bdata);
    this.eosService.addRec(this.bdata).subscribe();
    this.getMBal()
  };
  getMBal() {

    this.bdata2.code = 'baccount1234';
    this.bdata2.symbol = 'SYS';
    this.bdata2.account = 'bktestacc123';

    try {
      this.eosService.getMBal(this.bdata2).subscribe(
        (res: any) => {
          console.log("something", res)
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
