import { Component, Prop, h, State } from '@stencil/core';
import { urlService } from '../../services/url-service';

@Component({
    tag: 'app-environment-nag',
    styleUrl: 'app-environment-nag.scss',
    shadow: false,
  })
  export class AppHeader {
    @State() environmentNag: string 
    = urlService.EnvironmentName === 'PROD' 
    ? '' 
    : urlService.EnvironmentName + ' ENVIRONMENT';
  
    render() {
      return (
        <div class='environment-nag'>      
          {this.environmentNag}
       </div>
      );
    }
  
  }