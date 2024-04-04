import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-token-modal',
  templateUrl: './token-modal.component.html',
  styleUrls: ['./token-modal.component.scss']
})
export class TokenModalComponent {
  readonly formGroup = this._fb.group({
    token: ['', Validators.required],
    resource: ['', Validators.required]
  });

  constructor(
    private _fb: FormBuilder,
    private _authS: AuthenticationService,
    private _dialogRef: MatDialogRef<TokenModalComponent>
  ) {}

  save(): void {
    const { token, resource } = this.formGroup.value;

    if (token && resource) {
      this._authS.setAuthData(token, resource);
    }

    this._dialogRef.close();
  }
}
