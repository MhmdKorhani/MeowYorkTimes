import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectToken } from "@core/state/token";
import { Observable } from "rxjs";

export function AuthGuard(): CanActivateFn {

    return () => {
        const store: Store = inject(Store);
        const router: Router = inject(Router);

        return new Observable((observer) => {
            store.select(selectToken).subscribe((data) => {
                if (data) {
                    observer.next(true);
                }
                else {
                    observer.next(false);
                    router.navigateByUrl('signin');
                }
            });
        });
    }
}