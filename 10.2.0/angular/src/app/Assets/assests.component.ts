import {
  Component,
  Injector,
  ChangeDetectorRef,
  ViewChild,
  OnInit
} from '@angular/core';

import { finalize } from 'rxjs/operators';

import { BsModalService } from 'ngx-bootstrap/modal';

import { Table, TableModule } from 'primeng/table';

import { LazyLoadEvent, PrimeTemplate } from 'primeng/api';

import {
  Paginator,
  PaginatorModule
} from 'primeng/paginator';

import { FormsModule } from '@angular/forms';

import { CommonModule, NgIf } from '@angular/common';

import { appModuleAnimation } from '../../shared/animations/routerTransition';

import { PagedListingComponentBase } from '../../shared/paged-listing-component-base';

import { LocalizePipe } from '../../shared/pipes/localize.pipe';

import {
  AssetsDto,
  AssetsDtoServiceModuleServiceProxy
} from '../../shared/service-proxies/service-proxies';

import { EditAssetsComponent } from './edit-assets/edit-assets.component';

import { CreateAssetComponent } from './create-asset/create-asset.component';

@Component({
  selector: 'app-assets',

  templateUrl: './assests.component.html',

  styleUrls: ['./assests.component.css'],

  animations: [appModuleAnimation()],

  standalone: true,

  imports: [
    FormsModule,
    TableModule,
    PrimeTemplate,
    NgIf,
    PaginatorModule,
    LocalizePipe,
    CommonModule
  ],
})
export class AssetsComponent
  extends PagedListingComponentBase<AssetsDto>
  implements OnInit {

  @ViewChild('dataTable', { static: true })
  dataTable!: Table;

  @ViewChild('paginator', { static: true })
  paginator!: Paginator;

  assets: AssetsDto[] = [];

  keyword = '';

  primengTableHelper: any;

  assetStatus = [
    { id: 0, name: 'InActive' },
    { id: 1, name: 'Active' }
  ];

  constructor(
    injector: Injector,
    private _assetService: AssetsDtoServiceModuleServiceProxy,
    private _modalService: BsModalService,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  ngOnInit(): void {

    this.getAllAssets();
  }

  getAllAssets(): void {

    this.primengTableHelper.showLoadingIndicator();

    this._assetService
      .getAll()
      .pipe(
        finalize(() => {
          this.primengTableHelper.hideLoadingIndicator();
        })
      )
      .subscribe((result) => {

        this.assets = result;

        this.primengTableHelper.records = result;

        this.primengTableHelper.totalRecordsCount = result.length;

        this.cd.detectChanges();
      });
  }

  list(event?: LazyLoadEvent): void {

    if (this.primengTableHelper.shouldResetPaging(event)) {

      this.paginator.changePage(0);

      if (this.primengTableHelper.records?.length) {
        return;
      }
    }

    this.getAllAssets();
  }

  createAsset(): void {

    const modalRef = this._modalService.show(
      CreateAssetComponent,
      {
        class: 'modal-lg',
      }
    );

    modalRef.content?.onSave.subscribe(() => {

      this.getAllAssets();

      this.refresh();
    });
  }

  editAsset(asset: AssetsDto): void {

    const modalRef = this._modalService.show(
      EditAssetsComponent,
      {
        class: 'modal-lg',

        initialState: {
          id: asset.id,
        },
      }
    );

    modalRef.content?.onSave.subscribe(() => {

      this.getAllAssets();

      this.refresh();
    });
  }

  delete(asset: AssetsDto): void {

    abp.message.confirm(
      'AssetDeleteWarningMessage',
      undefined,
      (result: boolean) => {

        if (result) {

          this._assetService.delete(asset.id).subscribe(() => {

            abp.notify.success('SuccessfullyDeleted');

            this.getAllAssets();

            this.refresh();
          });
        }
      }
    );
  }

  getAssetStatusName(statusId: number): string {

    const status = this.assetStatus.find(x => x.id === statusId);

    return status ? status.name : 'Unknown';
  }
}