import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { Observable } from 'rxjs/Rx';
import { MuserService } from '../../core/services/muser.service';
import { CryptoService } from '../../core/services/crypto.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postForm: FormGroup;
  formErrors: any;

  private muserName: any;

  private masterUser: any;
  private masterWeight: any;
  private masterSplit: any;
  private compUser: any;
  private compWeight: any;
  private compSplit: any;



  constructor(
    public dataService: DataService,
    private formBuilder: FormBuilder,
    private muserService: MuserService
  ) {
    this.formErrors = {
    };
  }




  ngOnInit() {
    this.muserName = this.muserService.getMuserName;
    this.postForm = this.formBuilder.group({

      ipfsUrl: ['', Validators.required],
      albumTitle: ['', Validators.required],
      albumGenre: [0, Validators.max(1)],

      albumArtistlist: [[this.muserName]],
      albumArtist: [''],
      partofAlbum: [false],
      explicit: [0, Validators.max(1)], // this must be 1, zero or clean
      albumPline: [''],
      albumCline: [''],

      countryOrigin: ['', Validators.required],
      upcEan: [0], // int
      releaseDate: [0, Validators.required], // int
      releaseYear: [0, Validators.required], // int
      salesStartDate: [0, Validators.required], // int
      albumProducer: [''],
      albumType: [''],

      masterLabelName: [''],
      displayLabelName: [''],
      samples: [false], // bool

      trackTitle: ['', Validators.required],
      featuredArtist: [''],
      featuredArtistISNI: [0], // int
      trackArtist: [''],
      trackartistalias: [''],
      trackartistisni: [''],
      trackArtistlist: [[]], // gets parsed to array before fire
      trackGenre: [0, Validators.max(1)], // int
      trackArtistAlias: [''],
      trackVolumeNumber: [0], // int
      trackPline: [''],
      isrc: [''],
      trackNo: [0], // int
      compositionTitle: [''],
      compositionTitleAlt: [''],
      compositionTitleISWC: [''],
      compositionPublisherslist: [[]], // gets parsed to array before fire
      compositionPublishers: [''],
      compositionPublishersIPI_CAE: [''],
      compositionPublishersISNI: [''],
      compositionWriterslist: [[]], // gets parsed to array before fire
      compositionWriters: [''],
      compositionWritersIPI_CAE: [''],
      compositionWritersISNI: [''],
      compositionWritersrole: [0],
      compositionWritersPublisher: [''],
      thirdParty: [false],
      pro: [''],
      masterUser: [''],
      masterWeight: [''],
      masterSplit: [''],
      masterUsersList: [[{ 'user': this.muserName, 'percentage': 100, 'bp': 10000 }]],
      masterdist: [[{ 'payee': this.muserName, 'bp': 10000 }]], // array
      masterright: [[{ 'voter': this.muserName, 'percentage': 100 }]], // array
      masterthresh: [100], // percent
      compUser: [''],
      compWeight: [''],
      compSplit: [''],
      compUsersList: [[{ 'user': this.muserName, 'percentage': 100, 'bp': 10000 }]],
      compdist: [[{ 'payee': this.muserName, 'bp': 10000 }]], // array
      compright: [[{ 'voter': this.muserName, 'percentage': 100 }]], // array
      compthresh: [100], // percent
      playreward: [100], // int
      pubshare: [5000], // int
      tempValue: ['']
    });

    this.postForm.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }
  onFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.formErrors[field] = {};
      // Get the control
      const control = this.postForm.get(field);
      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }
  firecontent() {
    const authPassword = CryptoService.decrypt();
    this.dataService.postContent(
      authPassword,
      this.muserName,
      this.postForm.value,
    );
    // console.log(this.postForm);
  }
  addtoMasterArray() {
    const User = this.postForm.value.masterUser;
    const Weight = parseInt(this.postForm.value.masterWeight, 10);
    const Split = parseInt(this.postForm.value.masterSplit, 10);
    this.postForm.value.masterdist.push({ 'payee': User, 'bp': Split });
    this.postForm.value.masterright.push({ 'voter': User, 'percentage': Weight });
    this.postForm.value.masterUsersList.push({ 'user': User, 'percentage': Weight, 'bp': Split });
  }
  editMasterArray(userIndex) {

    this.postForm.patchValue({ masterUser: this.postForm.value.masterUsersList[userIndex].user });
    this.postForm.patchValue({ masterWeight: this.postForm.value.masterUsersList[userIndex].percentage });
    this.postForm.patchValue({ masterSplit: this.postForm.value.masterUsersList[userIndex].bp });
    this.postForm.value.masterdist.splice(userIndex, 1);
    this.postForm.value.masterright.splice(userIndex, 1);
    this.postForm.value.masterUsersList.splice(userIndex, 1);

  }
  addtoCompArray() {
    const User = this.postForm.value.compUser;
    const Weight = parseInt(this.postForm.value.compWeight, 10);
    const Split = parseInt(this.postForm.value.compSplit, 10);

    this.postForm.value.compdist.push({ 'payee': User, 'bp': Split });
    this.postForm.value.compright.push({ 'voter': User, 'percentage': Weight });
    this.postForm.value.compUsersList.push({ 'user': User, 'percentage': Weight, 'bp': Split });

  }
  editCompArray(userIndex) {

    this.postForm.patchValue({ compUser: this.postForm.value.compUsersList[userIndex].user });
    this.postForm.patchValue({ compWeight: this.postForm.value.compUsersList[userIndex].percentage });
    this.postForm.patchValue({ compSplit: this.postForm.value.compUsersList[userIndex].bp });
    this.postForm.value.compdist.splice(userIndex, 1);
    this.postForm.value.compright.splice(userIndex, 1);
    this.postForm.value.compUsersList.splice(userIndex, 1);

  }
  addtoalbumarray() {
    const Artist = this.postForm.value.albumArtist;

    this.postForm.value.albumArtistlist.push(Artist);

    this.postForm.patchValue({ albumArtist: '' });
  }
  addtotrackarray() {
    const Artist = this.postForm.value.trackArtist;
    const Alias = this.postForm.value.trackartistalias;
    const isni = this.postForm.value.trackartistisni;

    this.postForm.value.trackArtistlist.push({ 'artist': Artist, 'aliases': [Alias], 'ISNI': isni });

    this.postForm.patchValue({ trackArtist: '' });
    this.postForm.patchValue({ trackartistalias: '' });
    this.postForm.patchValue({ trackartistisni: '' });
  }
  addtopublisherarray() {
    const Pub = this.postForm.value.compositionPublishers;
    const ipi = this.postForm.value.compositionPublishersIPI_CAE;
    const isni = this.postForm.value.compositionPublishersISNI;

    this.postForm.value.compositionPublisherslist.push({ 'publisher': Pub, 'IPI_CAE': ipi, 'ISNI': isni });

    this.postForm.patchValue({ compositionPublishers: '' });
    this.postForm.patchValue({ compositionPublishersIPI_CAE: '' });
    this.postForm.patchValue({ compositionPublishersISNI: '' });
  }
  addtowriterarray() {
    const Writer = this.postForm.value.compositionWriters;
    const ipi = this.postForm.value.compositionWritersIPI_CAE;
    const isni = this.postForm.value.compositionWritersISNI;
    const role = parseInt(this.postForm.value.compositionWritersrole, 10);
    const Pub = this.postForm.value.compositionWritersPublisher;

    this.postForm.value.compositionWriterslist.push(
      { 'writer': Writer, 'IPI_CAE': ipi, 'ISNI': isni, 'role': role, 'publisher': Pub });
  }
  removefromarray(array, i) {
    switch (array) {
      case 'albumArtistlist':
        this.postForm.value.albumArtistlist.splice(i, 1);
        break;
      case 'trackArtistlist':
        this.postForm.value.trackArtistlist.splice(i, 1);
        break;
      case 'compositionPublisherslist':
        this.postForm.value.compositionPublisherslist.splice(i, 1);
        break;
      case 'compositionWriterslist':
        this.postForm.value.compositionWriterslist.splice(i, 1);
        break;
    }
  }
}
