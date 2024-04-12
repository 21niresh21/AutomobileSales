import { Component, ElementRef, ViewChild, AfterViewInit, 
Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements AfterViewInit {
  @ViewChild('toastElement', {static:true}) toastElement: ElementRef;
  @Input() message: string;
  @Output() undo: EventEmitter<void> = new EventEmitter<void>();

  ngAfterViewInit(): void {
      const toast = new bootstrap.Toast(this.toastElement.nativeElement);
      toast.show();
  }

  onUndo(): void {
    this.undo.emit();
  }

}
