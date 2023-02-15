import { Component, Host, h, State } from '@stencil/core';
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
      return;
    }
    this.personClient.getRequestingPerson()
    .then((response) => {
      this.me = response;
      sessionStorage.setItem(localStorageKeyService.Me, JSON.stringify(this.me));
    })
    .catch(reason => console.error(reason));
  }

  // hacky way to do this, talk to Daniel to clean up
  // Basically, the query for Me returns a flatter structure tna the other calls, so the types don't match
  getProfileImage() {
    return {
      data: {
        id: this.me?.ProfileImage?.id,
        attributes: {
          alternativeText: '',
          url: '',
          formats: this.me?.ProfileImage?.formats
        }
      }
    }
  }

  render() {
    return (
      <Host
        onMouseEnter={() => this.popdown.classList.add('show')}
        onMouseLeave={() => this.popdown.classList.remove('show')}
      >
        <button
          class="nav-profile-button"
          onClick={() => this.popdown.classList.toggle('show')}
        >
          {
            this.me &&
              <ProfileImageDisc
                profileImage={this.getProfileImage()}
                firstName={this.me?.FirstName}
                lastName={this.me?.LastName}
              />
        }
        </button>
        <div class="popdown" ref={el => this.popdown = el}>
          <div class="content">
            <div class="basic-info">
              <ProfileImageDisc
                profileImage={this.getProfileImage()}
                firstName={this.me?.FirstName}
                lastName={this.me?.LastName}
              />
              <strong>{this.me?.FirstName} {this.me?.LastName}</strong>
              <span>{this.me?.Users[0]?.email}</span>
            </div>
            <div class="controls">
              <a href="/profile-person">My Personal Profile</a>
              <a href="/profile-pacs">My Work Profiles</a>
            </div>
            <div class="controls">
              <a href="/logout">Log Out</a>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
