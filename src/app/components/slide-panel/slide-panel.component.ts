import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
	selector: 'app-slide-panel',
	standalone: true,
	imports: [LucideAngularModule],
	templateUrl: './slide-panel.component.html',
	styleUrl: './slide-panel.component.scss',
	animations: [
		trigger('fadeSlideInRight', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translateX(100%)' }),
				animate(
					'300ms',
					style({ opacity: 1, transform: 'translateX(0)' }),
				),
			]),
			transition(':leave', [
				animate(
					'300ms',
					style({ opacity: 0, transform: 'translateX(100%)' }),
				),
			]),
		]),
	],
})
export class SlidePanelComponent {
	protected readonly XIcon = X;
	@Input() isOpen = false;
	@Input() headerText = 'Slide Panel Header';
	@Output() handleClose = new EventEmitter();

	onClosePanel() {
		this.handleClose.emit(false);
	}
}
