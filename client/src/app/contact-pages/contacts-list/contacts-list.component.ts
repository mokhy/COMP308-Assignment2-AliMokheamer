import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { Contacts } from 'src/app/models/contacts';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: Contacts[];

  constructor(
    private contactsService: ContactsService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.contacts = new Array<Contacts>();
    this.displayContacts();
  }

  private onDeleteClick(): void {
    if (!confirm('Are You Sure?')) {
      this.router.navigate(['/contact/contact-list']);
    }
  }

  displayContacts(): void {
    this.contactsService.getContacts().subscribe(data => {
      if (data.success) {
        this.contacts = data.contactList;
       } else {
         this.flashMessage.show('User must be logged in', {cssClass: 'alert-danger', timeOut: 5000});
       }
    });
  }
}
