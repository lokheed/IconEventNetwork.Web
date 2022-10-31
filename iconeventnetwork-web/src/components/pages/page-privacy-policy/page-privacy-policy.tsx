import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'page-privacy-policy',
  styleUrl: 'page-privacy-policy.scss',
  shadow: false,
})
export class PagePrivacyPolicy {
  render() {
    return (
      <Host>
        <h1>Privacy Policy</h1>
        <div class='legal'>
          <p>At the Icon Network, accessible from https://iconeventnetwork.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by the Icon Network and how we use it.</p>

          <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>

          <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect on this website. This policy is not applicable to any information collected offline or via channels other than this website.</p>

          <h3>Consent</h3>

          <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

          <h3>Information We Collect</h3>

          <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
          <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
          <p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>

          <h3>How We Use Your Information</h3>

          <p>We use the information we collect in various ways including to:</p>

          <ul>
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
          </ul>


          <h3>CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>

          <p>Under the CCPA, among other rights, California consumers have the right to:</p>
          <p>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
          <p>Request that a business delete any personal data about the consumer that a business has collected.</p>
          <p>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</p>
          <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

          <h3>GDPR Data Protection Rights</h3>

          <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
          <p>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>
          <p>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>
          <p>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</p>
          <p>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
          <p>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</p>
          <p>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p>
          <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

          <h3>Children's Information</h3>

          <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>

          <p>The Icon Network does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
        </div>
      </Host>
    );
  }
}
