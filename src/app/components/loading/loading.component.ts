import { Component, Input } from '@angular/core';
import { Loader2, LucideAngularModule } from 'lucide-angular';

type SizeType = 'sm' | 'md' | 'lg' | 'xl';

@Component({
	selector: 'app-loading',
	standalone: true,
	imports: [LucideAngularModule],
	templateUrl: './loading.component.html',
	styleUrl: './loading.component.scss',
})
export class LoadingComponent {
	@Input() size: SizeType = 'xl';
	protected readonly SpinnerIcon = Loader2;
	protected readonly spinnerSize: Record<SizeType, string> = {
		sm: 'size-6',
		md: 'size-8',
		lg: 'size-10',
		xl: 'size-12',
	};
}
