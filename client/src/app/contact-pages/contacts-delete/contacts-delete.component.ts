import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

import { Contacts } from 'src/app/models/contacts';

@Component({
  selector: 'app-contacts-delete',
  templateUrl: './contacts-delete.component.html',
  styleUrls: ['./contacts-delete.component.css']
})
export class ContactsDeleteComponent implements OnInit {
  title: string;
  contact: Contacts;

  constructor(
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private contactsService: ContactsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.contact = new Contacts();

    this.activatedRoute.params.subscribe(param => {
      this.contact._id = param.id;
    });

    this.deleteContact(this.contact);
  }

  private deleteContact(contact: Contacts): void {
    this.contactsService.deleteContact(contact).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-warning', timeOut: 5000});
        this.router.navigate(['/contact/contacts']);
       } else {
         this.flashMessage.show('Failed to delete this contact', {cssClass: 'alert-danger', timeOut: 5000});
         this.router.navigate(['/contact/contacts']);
       }
    });
  }

}
