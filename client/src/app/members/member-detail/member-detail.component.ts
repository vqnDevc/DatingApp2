import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member : Member | undefined
  activeTab : string = 'tab1'
  memberImages: string[] = [];

  constructor( private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.loadMember();
  }

  loadMember() {
    var username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        this.memberImages = this.getImages();
      }
    })
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

  getImages() {
    if(!this.member) return [];
    const imageUrls = [];
    for (const photo of this.member.photos)
    {
      imageUrls.push(photo.url);
    }
    return imageUrls;
  }

  @HostListener('click')
  imageChange(event: MouseEvent) {
    const target = event.target as HTMLImageElement;
    const src = target.src;
    const prev = document.getElementById("preview") as HTMLImageElement;
    prev.src = src;
    
    const imageSlides = document.getElementsByClassName("img-slide");
    for (let i = 0; i < imageSlides.length; i++) {
      imageSlides[i].classList.remove("active");
    }
    
    target.parentElement?.classList.add("active");
  }

}
