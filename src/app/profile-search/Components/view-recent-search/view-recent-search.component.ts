import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileSearchService } from '../../Services/profile-search.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-recent-search',
  templateUrl: './view-recent-search.component.html',
  styleUrls: ['./view-recent-search.component.scss']
})
export class ViewRecentSearchComponent implements OnInit {
  Searchswich1: boolean = true;
  Searchswich2: boolean = false;
  RecentSearchs: any = [
    {
      searchTitle:"Java",
      minExp:"2",
      maxExp:"10",
      location:"Chennai",
      minSalary:"3.5",
      maxSalary:"5"
    }, 
    {
      searchTitle:"Full Stack Developer",
      minExp:"2",
      maxExp:"5",
      location:"Bangalore",
      minSalary:"5",
      maxSalary:"7"
    },
    {
      searchTitle:"UI Developer",
      minExp:"0",
      maxExp:"3",
      location:"Mumbai",
      minSalary:"4.5",
      maxSalary:"6"
    },
    {
      searchTitle:"UX Designer",
      minExp:"3",
      maxExp:"5",
      location:"Bangalore",
      minSalary:"5",
      maxSalary:"7.5"
    },
    {
      searchTitle:"Quality Analyst",
      minExp:"0",
      maxExp:"3",
      location:"Bangalore",
      minSalary:"4",
      maxSalary:"6"
    },
    {
      searchTitle:"HR",
      minExp:"3",
      maxExp:"5",
      location:"Mysore",
      minSalary:"5",
      maxSalary:"7.5"
    },
    {
      searchTitle:"Back-end Developer",
      minExp:"3",
      maxExp:"5",
      location:"Chennai",
      minSalary:"5",
      maxSalary:"8"
    },
  ]
  SelectedSearch: any;
  fillSearchbtn: boolean = true;
  SavedSeacrhes: any = [
    {
      searchTitle:"HR",
      minExp:"3",
      maxExp:"5",
      location:"Mysore",
      minSalary:"5",
      maxSalary:"7.5"
    },
    {
      searchTitle:"Java",
      minExp:"2",
      maxExp:"10",
      location:"Chennai",
      minSalary:"3.5",
      maxSalary:"5"
    }, 
    {
      searchTitle:"UI Developer",
      minExp:"0",
      maxExp:"3",
      location:"Mumbai",
      minSalary:"4.5",
      maxSalary:"6"
    },
    {
      searchTitle:"Full Stack Developer",
      minExp:"2",
      maxExp:"5",
      location:"Bangalore",
      minSalary:"5",
      maxSalary:"7"
    },
   
    {
      searchTitle:"Quality Analyst",
      minExp:"0",
      maxExp:"3",
      location:"Bangalore",
      minSalary:"4",
      maxSalary:"6"
    },
    {
      searchTitle:"UX Designer",
      minExp:"3",
      maxExp:"5",
      location:"Bangalore",
      minSalary:"5",
      maxSalary:"7.5"
    },
    {
      searchTitle:"Back-end Developer",
      minExp:"3",
      maxExp:"5",
      location:"Chennai",
      minSalary:"5",
      maxSalary:"8"
    }  
  ];
  @Output()
  closePop = new EventEmitter<boolean>()
  profileSearch!: FormGroup;
  isAscendic = true;
  @Input()
  height: number = 0
  constructor(private api: ProfileSearchService) { }

  ngOnInit(): void {
    // this.recentSearch();
    // this.SavedSaech();
    // this.height = window.innerHeight-324

  }

  togglesearch() {
    this.Searchswich1 = !this.Searchswich1;
    this.Searchswich2 = !this.Searchswich2;
  }
  //recent Search
  recentSearch() {
    const data = localStorage.getItem('accountId')
    this.api.recentSearch(data).subscribe((res: any) => {
      this.RecentSearchs = res;
    })
  }
  //Saved Search
  SavedSaech() {
    const data = localStorage.getItem('accountId')
    this.api.svaedSearch(data).subscribe((res: any) => {
      this.SavedSeacrhes = res;
    })
  }
  //selected Search
  selectSearch(e: any, value: any) {
    if (e.checked) {
      this.SelectedSearch = value;
      this.fillSearchbtn = false;
    }
  }

  //fill search
  fillSearch() {
    this.profileSearch.controls['searchTitle'].setValue(this.SelectedSearch.searchTitle);
    this.profileSearch.controls['minSalary'].setValue(this.SelectedSearch.minSalary);
    this.profileSearch.controls['maxSalary'].setValue(this.SelectedSearch.maxSalary);
    this.profileSearch.controls['mustHaveKeyWord'].setValue(this.SelectedSearch.mustHaveKeyWord.split(','))
    this.profileSearch.controls['location'].setValue(this.SelectedSearch.location.split(','))
    // this.profileSearch.controls['educationQualifications'].setValue(this.SelectedSearch.educationQualifications)
    this.profileSearch.controls['noticePeriod'].setValue(this.SelectedSearch.noticePeriod)
    this.profileSearch.controls['minExp'].setValue(this.SelectedSearch.minExp)
    this.profileSearch.controls['maxExp'].setValue(this.SelectedSearch.maxExp)
    this.profileSearch.controls['industry'].setValue(this.SelectedSearch.industry)
    this.profileSearch.controls['designation'].setValue(this.SelectedSearch.designation)
    this.profileSearch.controls['startdate'].setValue(this.SelectedSearch.startdate)
    this.profileSearch.controls['enddate'].setValue(this.SelectedSearch.enddate)
    localStorage.setItem('search', this.SelectedSearch.searchId);
  }
  quickSearch() {
    localStorage.setItem('search', this.SelectedSearch.searchId);
  }

  sort() {
    this.isAscendic ? this.ascendic() : this.descendic()
  }

  ascendic() {
    this.isAscendic = false;
    this.RecentSearchs = this.RecentSearchs.sort((n1: any, n2: any) => {
      if (n1.searchTitle < n2.searchTitle) {
        return 1;
      }
      if (n1.searchTitle > n2.searchTitle) {
        return -1;
      }
      return 0;
    });
  }

  descendic() {
    this.isAscendic = true
    this.RecentSearchs = this.RecentSearchs.sort((n1: any, n2: any) => {
      if (n1.searchTitle > n2.searchTitle) {
        return 1;
      }
      if (n1.searchTitle < n2.searchTitle) {
        return -1;
      }
      return 0;
    });
  }


  closePops() {
    this.closePop.emit(false)
  }
}
