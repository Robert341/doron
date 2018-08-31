import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Data } from './data';
import { Filter } from './filter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  data: Data[];
  dataFiltered: Data[];
  filterForm: Filter = {
    nameEmailID: null,
    instagram: null,
    facebook: null,
    twitter: null,
    blog: null,
    youtube: null,
    pinterest: null
  };
  checked = [];
  sortedField = 'ID';
  pageLoading = true;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._httpService.getData().subscribe(res => {
      if (res.success === true) {
        this.data = res.data;
        this.dataFiltered = res.data;
        this.pageLoading = false;
      } else {
        window.alert('Error! Could not retrieve data.');
      }
    });
  }

  convertNum(n) {
    if (n / 1000 >= 1) {
      return (Math.floor(n/100)/10 + 'k');
    } else if (n === 0) {
      return '---';
    } else {
      return n;
    }
  }

  checkToggle(id) {
    const ind = this.checked.indexOf(id);
    if (ind === -1) {
      this.checked.push(id);
    } else {
      this.checked.splice(ind, 1);
    }
  }

  checkAllToggle() {
    if (this.allChecked()) {
      for (let i = 0, ind; i < this.dataFiltered.length; i++) {
        ind = this.checked.indexOf(this.dataFiltered[i].ID);
        this.checked.splice(ind, 1);
      }
    } else {
      for (let i = 0; i < this.dataFiltered.length; i++) {
        if (!this.checked.includes(this.dataFiltered[i].ID)) {
          this.checked.push(this.dataFiltered[i].ID);
        }
      }
    }
  }

  allChecked() {
    if (this.dataFiltered.length === 0) {
      return false;
    }
    for (let i = 0; i < this.dataFiltered.length; i++) {
      if (!this.checked.includes(this.dataFiltered[i].ID)) {
        return false;
      }
    }
    return true;
  }

  filter() {
    this.dataFiltered = [];
    for (let i = 0; i < this.data.length; i++) {
      if (
        (this.filterForm.nameEmailID === null ||
         this.data[i].ID == this.filterForm.nameEmailID ||
         this.data[i].name.toLowerCase().includes(this.filterForm.nameEmailID.toLowerCase()) ||
         this.data[i].email.toLowerCase().includes(this.filterForm.nameEmailID.toLowerCase())) &&
        (this.filterForm.instagram === null || this.data[i].instagram >= this.filterForm.instagram) &&
        (this.filterForm.facebook === null || this.data[i].facebook >= this.filterForm.facebook) &&
        (this.filterForm.twitter === null || this.data[i].twitter >= this.filterForm.twitter) &&
        (this.filterForm.blog === null || this.data[i].blog >= this.filterForm.blog) &&
        (this.filterForm.youtube === null || this.data[i].youtube >= this.filterForm.youtube) &&
        (this.filterForm.pinterest === null || this.data[i].pinterest >= this.filterForm.pinterest)
      ) {
        this.dataFiltered.push(this.data[i]);
      }
    }
  }

  sort(fieldName) {
    if (fieldName === this.sortedField) {
      this.dataFiltered.reverse();
    } else {
      if (fieldName === 'name' || fieldName === 'email' || fieldName === 'location') {
        this.dataFiltered.sort(function (a, b) {
          return a[fieldName].localeCompare(b[fieldName]);
        });
      } else if (fieldName === 'ID') {
        this.dataFiltered.sort(function (a, b) {
          if (a[fieldName] > b[fieldName]) {
            return 1;
          } else if (a[fieldName] < b[fieldName]) {
            return -1;
          } else {
            return 0;
          }
        });
      } else {
        this.dataFiltered.sort(function (a, b) {
          if (a[fieldName] > b[fieldName]) {
            return -1;
          } else if (a[fieldName] < b[fieldName]) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      this.sortedField = fieldName;
    }
  }
}
