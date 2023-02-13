import { Component, Host, h, State } from '@stencil/core';
import { DataResponse } from '../../components';
import { PersonInfo } from '../../services/clients/client-base';
import { GetRequestingPersonResponse, PersonClient } from '../../services/clients/person-client';
import { localStorageKeyService } from '../../services/local-storage-key-service';
import { ProfileImageDisc } from '../functionalComponents/ProfileImageDisc';

@Component({
  tag: 'app-nav-user-info',
  styleUrl: 'app-nav-user-info.scss',
  shadow: false,
  scoped: true,
})
export class AppNavUserInfo {
  private readonly personClient: PersonClient;
  private popdown!: HTMLDivElement;

  
  @State() person: DataResponse<PersonInfo>;
  @State() me: GetRequestingPersonResponse;


  constructor() {
    this.personClient = new PersonClient();
  }

  componentWillLoad() {
    return new Promise<void>(resolve => {
      this.getMe()
      .then(() => resolve());
    })
  }

  private async getMe() {
    var storedMe = sessionStorage.getItem(localStorageKeyService.Me);
    if (storedMe) {
      this.me = JSON.parse(storedMe);
      this.getPerson(this.me.id);
      return;
    }
    this.personClient.getRequestingPerson()
    .then((response) => {
      this.me = response;
      sessionStorage.setItem(localStorageKeyService.Me, JSON.stringify(this.me));
      this.getPerson(this.me.id);
    })
    .catch(reason => console.error(reason));
  }

  private getPerson(personId) {
    this.personClient.getPerson(personId, {
        fields: ['FirstName', 'MiddleName', 'LastName', 'DirectoryName', 'updatedAt'],
        populate: {
            Addresses: {
                 populate: ['country', 'country_subdivision', 'address_type'],
            },
            EmailAddresses: {
                populate: ['email_address_type'],
            },
            PhoneNumbers: {
                populate: ['phone_number_type'],
            },
            prefix: {
                fields: ['Name'],
            },
            ProfileImage: {
                fields: ['formats'],
            },
            Pronoun: {
                fields: ['Name'],
            },
            SocialMediaAccounts: {
                populate: ['social_media_type'],
            },
            Suffix: {
                fields: ['Name'],
            },
        },
      })
      .then((response) => {
        this.person = response.data;
     })
      .catch(reason => console.error(reason));  
  }

  render() {
    console.log(this.me);
    return (
      <Host
        onMouseEnter={() => this.popdown.classList.add('show')}
        onMouseLeave={() => this.popdown.classList.remove('show')}
      >
        <button
          class="nav-profile-button"
          onClick={() => this.popdown.classList.toggle('show')}
        >
          <ProfileImageDisc
            profileImage={this.person?.attributes?.ProfileImage}
            firstName={this.person?.attributes?.FirstName}
            lastName={this.person?.attributes?.LastName}
          />
        </button>
        <div class="popdown" ref={el => this.popdown = el}>
          <div class="content">
            <div class="basic-info">
              <ProfileImageDisc
                profileImage={this.person?.attributes?.ProfileImage}
                firstName={this.person?.attributes?.FirstName}
                lastName={this.person?.attributes?.LastName}
              />
              <strong>{this.person?.attributes?.FirstName} {this.person?.attributes?.LastName}</strong>
              <span>{this.me.Users[0].email}</span>
            </div>
            <div class="controls">
              <a href="/profile-person">Edit my profile</a>
              <a href="/profile-pacs">Edit my companies</a>
              <a href="/logout">Log Out</a>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
