import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { I18nService } from '@app/services';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-token-modal',
  templateUrl: './token-modal.component.html',
  styleUrls: ['./token-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenModalComponent {
  readonly formGroup = this._fb.group({
    token: ['', Validators.required]
  });

  constructor(
    public i18nS: I18nService,
    private _fb: FormBuilder,
    private _authS: AuthenticationService,
    private _dialogRef: MatDialogRef<TokenModalComponent>
  ) {}

  get tokenControl(): FormControl<string | null> {
    return this.formGroup.controls.token;
  }

  save(): void {
    const token = this.tokenControl.value;

    if (!token) {
      return;
    }

    this._authS.initializeAuthentication$(token).subscribe({
      next: () => this._dialogRef.close(),
      error: () => {
        this.formGroup.controls.token.setErrors({ invalidToken: true });
      }
    });
  }
}
