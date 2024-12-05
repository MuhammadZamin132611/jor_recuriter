import { Component, OnInit } from '@angular/core';

export interface IBatch {
  name: string;
  month: string;
  time: string;
  slots: string;
  color: string;
}

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
  }

  selectedItem = null;

  public batches = [
    { name: 'Privacy Policy', list: 'PrivacyPolicy' },
    { name: 'Consent', list: 'consent' },
    { name: 'Log Files', list: 'logfiles' },
    { name: 'cookiesAndWebBeacons', list: 'cookiesAndWebBeacons' },
    { name: 'Advertising Partners Privacy Policies', list: 'advertisingPartnersPrivacyPolicies' },
    { name: 'Third Party Privacy Policies', list: 'thirdPartyPrivacyPolicies' },
    { name: 'GDPR Data Protection Rights', list: 'gdprDataProtectionRights' },
    { name: 'Terms and Conditions', list: 'termsAndConditions' },
    { name: 'Welcome to FirstMeridian!', list: 'welcomToFirstMeridian' },
    { name: 'Cookies', list: 'cookies' },
    { name: 'License', list: 'license' },
    { name: 'You must not', list: 'youMustNot' },
    { name: 'You warrant and represent that', list: 'youWarrantAndRepresentThat' },
    { name: 'Hyperlinking to our Content', list: 'hyperlinkingToOurContent' },
    { name: 'iFrames', list: 'iFrames' },
    { name: 'Content Liability', list: 'contentLiability' },
    { name: 'Your Privacy', list: 'yourPrivacy' },
    { name: ' Please read Privacy Policy', list: 'pleaseReadPrivacyPolicy' },
    { name: 'Cookie Policy', list: 'cookiePolicy' },
    { name: 'What are cookies?', list: 'cookiePolicy' },
    { name: 'How do we use cookies?', list: 'howDoWeUseCookies' },
    { name: 'How to control cookies', list: 'howToControlCookies' },
  ];

  onClick(item: any) {
    this.selectedItem = item;
  }


}

