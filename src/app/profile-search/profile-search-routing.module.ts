import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './Components/search/search.component';
import { ViewSearchResultComponent } from './Components/view-search-result/view-search-result.component';

const routes: Routes = [
  {path:'search',component:SearchComponent},
  {path:'view-results',component:ViewSearchResultComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileSearchRoutingModule { }
