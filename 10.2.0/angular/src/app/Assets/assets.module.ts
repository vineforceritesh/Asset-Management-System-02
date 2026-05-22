import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "primeng/api";

import { AssetsRoutingModule } from "./assets-routing.component";

import { AssetsComponent } from "./assests.component";
import { CreateAssetComponent } from "./create-asset/create-asset.component";
import { EditAssetsComponent } from "./edit-assets/edit-assets.component";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AssetsRoutingModule,

        // standalone components
        AssetsComponent,
        CreateAssetComponent,
        EditAssetsComponent
    ],
})
export class AssetsModule {}