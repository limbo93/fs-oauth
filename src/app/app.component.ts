import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fs-oauth';

  constructor(private authService: AuthService,
    private router: Router, private route: ActivatedRoute) {

  }

  goToSecret() {
    this.router.navigate(['secret'], { relativeTo: this.route });
  }
}
