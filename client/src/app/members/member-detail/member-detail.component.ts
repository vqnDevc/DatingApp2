import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member = {} as Member;
  activeTab : string = 'tab1'
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  messages: Message[] = [];

  constructor( private memberService: MembersService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })

      this.route.queryParams.subscribe(params => {
        params['activeTab'] && this.openTab(params['activeTab']) ;
      })

      this.galleryOptions = [
        {
          width: '500px',
          height: '500px',
          imagePercent: 100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false
        }
      ]

      this.galleryImages = this.getImages();
  }

  getImages() {
    if (!this.member) return [];
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }
    return imageUrls;
  }


  openTab(tabName: string): void {
    this.activeTab = tabName;
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
      (tabContents[i] as HTMLElement).style.display = "none";
    }
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
      (selectedTab as HTMLElement).style.display = "block";
    }
  }
}
