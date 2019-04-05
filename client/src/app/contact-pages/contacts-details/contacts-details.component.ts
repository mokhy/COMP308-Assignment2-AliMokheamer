import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

import { Contacts } from 'src/app/models/contacts';

@Component({
  selector: 'app-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})
export class ContactsDetailsComponent implements OnInit {
  title: string;
  contacts: Contacts;

  // Like Dependency Injection
  constructor(
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private contactsService: ContactsService,
    private router: Router
    ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.contacts = new Contacts();

    this.activatedRoute.params.subscribe(param => {
      this.contacts._id = param.id;
    });

    if (this.title === 'Edit Contact') {
      this.getTheContact(this.contacts);
    }
  }

  private getTheContact(contact: Contacts): void {
    this.contactsService.getContact(contact).subscribe(data => {
      this.contacts = data.contact;
    });
  }

  onDetailsPageSubmit(): void {
    switch (this.title) {
      case 'Add a Contact':
      this.contactsService.addContact(this.contacts).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 5000});
          this.router.navigate(['/contact/contacts']);
         } else {
           this.flashMessage.show('Failed to add a contact', {cssClass: 'alert-danger', timeOut: 5000});
           this.router.navigate(['/contact/contacts']);
         }
      });
      break;
      case 'Edit Contact':
      this.contactsService.editContact(this.contacts).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 5000});
          this.router.navigate(['/contact/contacts']);
         } else {
           this.flashMessage.show('Failed to edit this contact', {cssClass: 'alert-danger', timeOut: 5000});
           this.router.navigate(['/contact/contacts']);
         }
      });
      break;
    }
  }

}
