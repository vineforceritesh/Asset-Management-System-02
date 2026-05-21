import {
  Component,
  Injector,
  ChangeDetectorRef,
  EventEmitter,
  Output
} from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { AppComponentBase } from '../../../shared/app-component-base';

import {
  CreateDto,
  AssetsDto,
  AssetsDtoServiceModuleServiceProxy
} from '../../../shared/service-proxies/service-proxies';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';

import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';

import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';

import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

@Component({
  selector: 'app-create-asset',

  templateUrl: './create-asset.component.html',

  styleUrl: './create-asset.component.css',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    AbpModalHeaderComponent,
    AbpValidationSummaryComponent,
    AbpModalFooterComponent,
    LocalizePipe
  ]
})
export class CreateAssetComponent extends AppComponentBase {

  saving = false;

  // form model
  asset: AssetsDto = new AssetsDto();

  @Output() onSave = new EventEmitter<any>();

  assetTypes = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Mouse' },
    { id: 3, name: 'Keyboard' },
    { id: 4, name: 'Monitor' },
    { id: 5, name: 'Printer' },
    { id: 6, name: 'Scanner' },
    { id: 7, name: 'Mobile' },
    { id: 8, name: 'Tablet' },
    { id: 9, name: 'Headphone' },
    { id: 10, name: 'Router' }
  ];

  assetStatus = [
    { id: 0, name: 'InActive' },
    { id: 1, name: 'Active' }
  ];

  constructor(
    injector: Injector,
    private _assetService: AssetsDtoServiceModuleServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  save(): void {

  // Required validation
  if (!this.asset.serialNumber || this.asset.serialNumber.trim() === '') {
    this.notify.warn('Serial Number is required');
    return;
  }

  // Duplicate validation
  this._assetService.getAll().subscribe((assets) => {

    const isDuplicate = assets.some(
      x => x.serialNumber?.trim().toLowerCase() ===
           this.asset.serialNumber?.trim().toLowerCase()
    );

    if (isDuplicate) {
      this.notify.error('Serial Number already exists');
      return;
    }

    this.saving = true;

    const input = new CreateDto();

    input.init(this.asset);

    this._assetService.create(input).subscribe(
      () => {

        this.notify.info(this.l('SavedSuccessfully'));

        this.bsModalRef.hide();

        this.onSave.emit();
      },
      (error) => {

        this.notify.error(error?.error?.error?.message || 'Something went wrong');

        this.saving = false;

        this.cd.detectChanges();
      }
    );
  });
}
}