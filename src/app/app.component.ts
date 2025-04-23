import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {PostsService} from './core/api/posts.service';
import {AuthService} from './core/api/auth.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {IfUserExistsDirective} from './core/directives/if-user-exists.directive';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TranslatePipe, IfUserExistsDirective],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-app';

  constructor(private authService: AuthService, private translateService: TranslateService) {
    this.translateService.addLangs(['en', 'it']);

    this.translateService.setDefaultLang('en');
  }

  switchLanguage() {
    let current = this.translateService.currentLang;

    this.translateService.use(current === 'en' ? 'it': 'en');
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
