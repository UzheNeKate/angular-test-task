import {Directive, effect, inject, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserStoreService} from '../services/user-store.service';

@Directive({
  selector: '[ifUserExists]',
  standalone: true,
})
export class IfUserExistsDirective {
  private userStore = inject(UserStoreService);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      this.viewContainer.clear();

      if (this.userStore.user()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
