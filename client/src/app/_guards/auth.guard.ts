import { ToastrService } from 'ngx-toastr';
// import { AuthGuard } from './auth.guard';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastr: ToastrService) {
    
  }

  canActivate() : Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) {
          return true;
        }
        this.toastr.error("you shall not pass ")
        return false;
      })
    )
  }
  
}