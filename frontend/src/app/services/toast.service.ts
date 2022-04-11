import { Injectable } from '@angular/core';
import { ToastrService,TOAST_CONFIG } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private opts = {
    positionClass: "toast-bottom-right",
    timeOut: 3000
  }

  constructor(private toastrSvc: ToastrService) { }

  public toast(msg: string, type: string): void {
    try {
      const switchType: any = {
        "success": () => this.toastrSvc.success(msg, "", this.opts),
        "info": () => this.toastrSvc.info(msg, "", this.opts),
        "error": () => this.toastrSvc.error(msg, "", this.opts)
      }
      switchType[type]();
    } catch (error) {
      this.toastrSvc.error("Error !", "Toast");
    }
  }
}
