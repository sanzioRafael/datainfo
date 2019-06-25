/* any other core modules */
// (optional) Additional Covalent Modules imports
//import { CovalentHttpModule } from '@covalent/http';
//import { CovalentHighlightModule } from '@covalent/highlight';
//import { CovalentMarkdownModule } from '@covalent/markdown';
//import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
// other imports

import {
    CovalentLayoutModule,
    CovalentVirtualScrollModule,
    CovalentMediaModule,
    CovalentDataTableModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentLoadingModule,
    CovalentFileModule,
    CovalentMessageModule
} from '@covalent/core';
import { NgModule } from '@angular/core';
import { CovalentCommonModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentDialogsModule } from '@covalent/core';

@NgModule({
    imports: [
        CovalentCommonModule,
        CovalentLayoutModule,
        CovalentDataTableModule,
        //CovalentStepsModule,
        //CovalentSearchModule,
        CovalentDialogsModule,
        // (optional) Additional Covalent Modules imports
        //CovalentHttpModule.forRoot(),
        //CovalentHighlightModule,
        //CovalentMarkdownModule,
        //CovalentDynamicFormsModule,
        CovalentLoadingModule,
        CovalentMediaModule,
        CovalentFileModule,
        CovalentMessageModule,
    ],
    exports: [
        CovalentCommonModule,
        CovalentLayoutModule,
        CovalentDataTableModule,
        //CovalentStepsModule,
        CovalentSearchModule,
        CovalentDialogsModule,
        CovalentVirtualScrollModule,
        CovalentMediaModule,
        CovalentNotificationsModule,
        CovalentMenuModule,
        CovalentLoadingModule,
        //CovalentDynamicFormsModule,
        CovalentFileModule,
        CovalentMessageModule,
    ]
})
export class ConvalentModule {
}