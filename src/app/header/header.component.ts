import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  firstname;
  lastname;
  constructor() {}

  ngOnInit() {
    this.firstname = localStorage.getItem("firstname");
    this.lastname = localStorage.getItem("lastName");
  }

  onLoggedout() {
    localStorage.removeItem("isLoggedin");
  }

  toggleSideBar(){
    let wrapper = document.getElementById('left-nav');
    if(!wrapper.classList.value.includes("open")){
      wrapper.classList.value = "d-none d-sm-none d-md-none col-md-3 d-lg-block d-xl-block open";
    }
    else{
      wrapper.classList.value = "d-none d-sm-none d-md-none col-md-3 d-lg-block d-xl-block";
    }
  }

  openDropdown($event) {
    console.log('hi this is ddp');
    const dropdown = document.getElementsByClassName('dropdown-btn');
    let i;
    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener('click', function() {
        this.classList.toggle('active');
        const dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
        } else {
          dropdownContent.style.display = 'block';
        }
      });
    }
  }
}
