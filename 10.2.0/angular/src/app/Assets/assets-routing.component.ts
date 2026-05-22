import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssetsComponent } from './assests.component';

import { CreateAssetComponent } from './create-asset/create-asset.component';
import { EditAssetsComponent } from './edit-assets/edit-assets.component';

const routes: Routes = [
  {
    path: '',
    component: AssetsComponent,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreateAssetComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit/:id',
    component: EditAssetsComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetsRoutingModule {}