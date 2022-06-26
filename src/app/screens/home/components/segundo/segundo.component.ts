import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-segundo',
  templateUrl: './segundo.component.html',
  styleUrls: ['./segundo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegundoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
