import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { QuillModule } from "ngx-quill";
import { AlertComponent } from "../admin/shared/components/alert/alert.component";
import { AlertService } from "../admin/shared/service/alert.service";

@NgModule({
    declarations: [AlertComponent],
    imports: [HttpClientModule, QuillModule.forRoot(), CommonModule],
    exports: [HttpClientModule, QuillModule, AlertComponent],
    providers: [AlertService]
})

export class SharedModule {

}