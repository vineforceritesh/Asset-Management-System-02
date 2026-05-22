import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef
} from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { AppComponentBase } from '../../../shared/app-component-base';

import {
  AssetsDto,
  AssetsDtoServiceModuleServiceProxy,
  UpdateDto
} from '../../../shared/service-proxies/service-proxies';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';

import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';

import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';

import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

@Component({
  selector: 'app-edit-assets',

  templateUrl: './edit-assets.component.html',

  styleUrl: './edit-assets.component.css',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    AbpModalHeaderComponent,
    AbpValidationSummaryComponent,
    AbpModalFooterComponent,
    LocalizePipe,
  ],
})
export class EditAssetsComponent
  extends AppComponentBase
  implements OnInit {

  @Output() onSave = new EventEmitter<any>();

  saving = false;

  id!: number;

  asset: AssetsDto = new AssetsDto();


assetTypes = [
  { value: 'Laptop', name: 'Laptop' },
  { value: 'Mouse', name: 'Mouse' },
  { value: 'Keyboard', name: 'Keyboard' },
  { value: 'Monitor', name: 'Monitor' },
  { value: 'Printer', name: 'Printer' },
  { value: 'Scanner', name: 'Scanner' },
  { value: 'Mobile', name: 'Mobile' },
  { value: 'Tablet', name: 'Tablet' },
  { value: 'Headphone', name: 'Headphone' },
  { value: 'Router', name: 'Router' }
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

  ngOnInit(): void {

    this._assetService.getById(this.id).subscribe(result => {

      this.asset = result;

      this.cd.detectChanges();
    });
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
      x =>
        x.serialNumber?.trim().toLowerCase() ===
          this.asset.serialNumber?.trim().toLowerCase() &&
        x.id !== this.asset.id
    );

    if (isDuplicate) {
      this.notify.error('Serial Number already exists');
      return;
    }

    this.saving = true;

    const input = new UpdateDto();

    input.init(this.asset);

    this._assetService.update(input).subscribe(
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