import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DataService } from '../../../core/services/data.service';
import { Observable } from 'rxjs/Rx';
import { MuserService } from '../../../core/services/muser.service';
import { MuseService } from '../../../core/services/muse.service';
import { CryptoService } from '../../../core/services/crypto.service';
import { AlertService } from '../../../core/services/alert.service';
import { AlertBtnText } from '../../../core/enums/alert-btn-text.enums';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ErrorCodes } from '../../../core/enums/error-codes.enums';
import { ManagementComponent } from '../../components/modal/content/management/management.component';
import { PublishersComponent } from '../../components/modal/content/publishers/publishers.component';
import { ArtistComponent } from '../../components/modal/content/artist/artist.component';
import { WritersComponent } from '../../components/modal/content/writers/writers.component';
import { Enums } from '../../../core/enums/content.enums';
import { ContentModel } from '../../../core/models/content.model';
import { UIService } from '../../../core/services/ui.service';
// import { isArray } from 'lodash-es/isArray';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {

  productType = [
    { value: 'Album (Live)' },
    { value: 'Album (Compilation)' },
    { value: 'Album (Studio)' },
    { value: 'EP' },
    { value: 'Music Video' },
    { value: 'Ringtone' },
    { value: 'Single' }
  ];

  explicit = [
    { value: 0, viewValue: 'Yes' },
    { value: 1, viewValue: 'No' },
    { value: 2, viewValue: 'Clean' }
  ];

  pros = [
    { value: 'ACEMLA' },
    { value: 'ACUM' },
    { value: 'AEPI' },
    { value: 'AGADU' },
    { value: 'AKM' },
    { value: 'APDAYC' },
    { value: 'APRA' },
    { value: 'APRA' },
    { value: 'ARTISJUS' },
    { value: 'ASCAP' },
    { value: 'BMI' },
    { value: 'BUMA' },
    { value: 'CASH' },
    { value: 'COMPASS' },
    { value: 'COTT' },
    { value: 'EAU' },
    { value: 'ECAD' },
    { value: 'FILSCAP' },
    { value: 'GEA' },
    { value: 'GEMA' },
    { value: 'HDS' },
    { value: 'IMA' },
    { value: 'IPRS' },
    { value: 'JASRAC' },
    { value: 'KODA' },
    { value: 'KOMCA' },
    { value: 'KOSCAP' },
    { value: 'LATGA-A' },
    { value: 'MACP' },
    { value: 'MCT' },
    { value: 'MRCSN' },
    { value: 'MUST' },
    { value: 'OSA' },
    { value: 'PPCA' },
    { value: 'PRS, PPL' },
    { value: 'RAO' },
    { value: 'SABAM' },
    { value: 'SACEM' },
    { value: 'SACM' },
    { value: 'SACVEN' },
    { value: 'SADAIC' },
    { value: 'SAMRO' },
    { value: 'SAS' },
    { value: 'SAYCO/ACINPRO' },
    { value: 'SCD' },
    { value: 'SENAPI' },
    { value: 'SGAE' },
    { value: 'SIAE' },
    { value: 'SOKOJ' },
    { value: 'SOZA' },
    { value: 'SPAC' },
    { value: 'SPACEM' },
    { value: 'STIM' },
    { value: 'SUISA' },
    { value: 'TEOSTO' },
    { value: 'TONO' },
    { value: 'UACRR' },
    { value: 'UCMR' },
    { value: 'ZAIKS' }
  ];

  // Samples
  yes_no = [
    { value: true, viewValue: 'Yes' },
    { value: false, viewValue: 'No' }
  ];

  toolTips = {
    trackTitle: 'EACH TRACK TITLE IN AN ALBUM MUST BE UNIQUE, THE EXCEPTION IS DIFFERENT VERSIONS OF THE SAME TRACK, SUCH AS CLEAN/EXPLICIT.',
    url: 'EACH TRACK MUST INCLUDE A UNIQUE INTERPLANETARY FILE SYSTEM (IPFS) URL TO THE TRACK FILE. (ipfs://)',
    sample: 'SPECIFY IF THE TRACK CONTAINS A SAMPLE.',
    trackArtist: 'CLICK TO ADD AT LEAST ONE MAIN ARTIST.',
    trackArtistName: 'ARTIST FULL NAME AND PROPER SPELLING ARE REQUIRED IN THE MOST WIDELY KNOWN FORM.',
    trackArtistAliases: '',
    trackArtistIsni: '',
    featuredArtist: 'IF A TRACK CONTAINS ONE OR MORE FEATURED ARTISTS, EACH ARTIST MUST BE ADDED SEPARATELY.',
    featuredArtistIsni: '',
    isrc: 'A UNIQUE AND PERMANENT IDENTIFIER FOR A SPECIFIC RECORDING, INDEPENDENT OF THE FORMAT OR THE RIGHTS HOLDERS.',
    country: 'RECORDING LOCATION.',
    explicit: 'AN EXPLICIT TRACK MUST BE TAGGED AS EXPLICIT. A CLEAN VERSIONS OF EXPLICIT TRACKS MUST BE TAGGED AS CLEAN. TRACKS SHOULD ONLY BE FLAGGED CLEAN IF THERE IS AN EXPLICIT VERSION OF THE TRACK.',
    genre: 'THE FIRST GENRE MUST BE THE BEST DESCRIPTION FOR THE CONTENT. A SECOND GENRE IS NOT ALWAYS REQUIRED, BUT IT SHOULD BE USED WHEN APPLICABLE.',
    trackPLine: 'THIS IS GENERALLY THE ENTITY ENTITLED TO ROYALTIES FOR THE TRACK.',
    trackNo: 'USED TO ORDER TRACKS WITHIN AN ALBUM.',
    trackVolumeNo: 'THE VOLUME NUMBER (DISC NUMBER) ON WHICH THE TRACK RESIDES.',
    trackDuration: 'THE DURATION OF THE CONTENT USING THE FOLLOWING FORMAT hhmmss. (E.G. TWO MINUTE AND 30 SECONDS WOULD BE 000230)',
    trackProducer: 'TODO: HINT',
    releaseDate: 'THE ORIGINAL RELEASE DATE (YYYY/MM/DD) MUST BE THE EARLIEST DATE THAT THE ORIGINAL PRODUCT WAS FIRST RELEASED REGARDLESS OF THE RELEASING LABEL, OR FORMAT TYPE.',
    releaseYear: 'THE ORIGINAL RELEASE DATE YEAR (YYYY)',
    salesStartDate: 'THE SALES START DATE (YYYY/MM/DD) IS THE DATE WHEN CONTENT BECOMES AVAILABLE ON MUSE.',
    upcEan: 'SET OF NUMBERS THAT IDENTIFY A PACKAGED COLLECTION OF MUSIC',
    albumTitle: 'ALBUM TITLE MUST MATCH THE ORIGINAL TITLE UPON ITS INITIAL RELEASE.',
    partOfAlbum: 'TODO: HINT',
    albumArtist: 'TODO: HINT',
    albumProducer: 'TODO: HINT',
    albumType: 'TODO: HINT',
    albumPLine: 'TODO: HINT',
    albumCLine: 'TODO: HINT',
    masterLabel: 'TODO: HINT',
    displayLabel: 'TODO: HINT',


    isThirdPartyPublishers: 'TODO: HINT',
    pros: 'TODO: HINT',
    publisher: 'TODO: HINT',
    writer: 'TODO: HINT',

    management: 'TODO: HINT',
    // matTooltipShowDelay
    delay: '1000',
  };

  content = new ContentModel();
  contentForm: FormGroup;

  formErrors: any;
  dialogRefManagement: MatDialogRef<ManagementComponent>;
  dialogRefPublishers: MatDialogRef<PublishersComponent>;
  dialogRefTrackArtist: MatDialogRef<ArtistComponent>;
  dialogRefWriters: MatDialogRef<WritersComponent>;

  private muserName: any;
  public maxDate: Date;
  public maxYear: number;

  constructor(
    public dataService: DataService,
    private formBuilder: FormBuilder,
    private muserService: MuserService,
    private museService: MuseService,
    private alert: AlertService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private ui: UIService
  ) {
    this.currentDate();
    // this.formErrors = {
    //   trackTitle: {},
    // };
  }

  // content: ContentModel = new ContentModel();

  ngOnInit() {
    // this.ui.showLoading();
    this.muserName = this.muserService.getMuserName;
    this.content = new ContentModel();
    this.contentForm = this.createContentForm();
    this.contentForm.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }
  // region test

  // endregion

  createContentForm() {

    return this.formBuilder.group({

      uploader: [this.content.uploader],
      ipfsUrl: [this.content.ipfsUrl],

      // album_meta: this.formBuilder.group({
      partOfAlbum: [this.content.album_meta.part_of_album],
      albumTitle: [this.content.album_meta.album_title],
      albumArtists: [this.content.album_meta.album_artist],
      albumGenre1: [this.content.album_meta.genre_1],
      albumGenre2: [this.content.album_meta.genre_2],
      countryOrigin: [this.content.album_meta.country_of_origin],
      explicit: [this.content.album_meta.explicit_],
      albumPLine: [this.content.album_meta.p_line],
      albumCLine: [this.content.album_meta.c_line],
      upcEan: [this.content.album_meta.upc_or_ean],
      releaseDate: [this.content.album_meta.release_date],
      releaseYear: [this.content.album_meta.release_year],
      salesStartDate: [this.content.album_meta.sales_start_date],
      albumProducer: [this.content.album_meta.album_producer],
      albumType: [this.content.album_meta.album_type],
      masterLabelName: [this.content.album_meta.master_label_name],
      displayLabelName: [this.content.album_meta.display_label_name],
      // }),

      // track_meta: this.formBuilder.group({
      trackTitle: [this.content.track_meta.track_title, Validators.required],
      isrc: [this.content.track_meta.ISRC],
      trackArtists: [this.content.track_meta.track_artists
        //   , [{
        //   trackArtist: [],
        //   trackArtistIsni: [],
        //   trackArtistAlias: {
        //     trackArtistAliasList: []
        //   }
        // }],
      ],

      featuredArtist: [this.content.track_meta.featured_artist],
      featuredArtistIsni: [this.content.track_meta.featured_artist_ISNI],
      trackProducer: [this.content.track_meta.track_producer],
      trackGenre1: [this.content.track_meta.genre_1],
      trackGenre2: [this.content.track_meta.genre_2],
      trackPLine: [this.content.track_meta.p_line],
      trackNo: [this.content.track_meta.track_no],
      trackVolumeNo: [this.content.track_meta.track_volume],
      trackDuration: [this.content.track_meta.track_duration],
      hasSample: [this.content.track_meta.samples],
      // }),

      // comp_meta: this.formBuilder.group({
      // Publishing metadata
      compTitle: [this.content.comp_meta.composition_title],
      compTitleAlt: [this.content.comp_meta.alternate_composition_title],
      compTitleIswc: [this.content.comp_meta.ISWC],
      isThirdPartyPublishers: [this.content.comp_meta.third_party_publishers],
      publishers: [this.content.comp_meta.publishers
        //   , [{
        //   publisher: [],
        //   ipiCae: [],
        //   isni: []
        // }]
      ],

      writers: [this.content.comp_meta.writers
        //   , [{
        //   writer: [],
        //   ipiCae: [],
        //   isni: [],
        //   role: [],
        //   publisher: [],
        // }]
      ],

      performingRightsOrg: [this.content.comp_meta.PRO],
      // }),


      distributions: [this.content.distributions],

      management: [this.content.management],


      management_threshold: [this.content.management_threshold],

      distributionsComp: [this.content.distributions_comp
        //   , [{
        // payee: '',
        // bp: 0
        // }]
      ],

      management_threshold_comp: [this.content.management_threshold],

      playing_reward: [this.content.playing_reward],
      publishers_share: [this.content.publishers_share],

      masterSplit: [],
      compSplit: [],
    });
  }

  onFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }
      this.formErrors[field] = {};
      const control = this.contentForm.get(field);
      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }

  addArtist(headerTxt) {
    this.dialogRefTrackArtist = this.dialog.open(ArtistComponent, {
      disableClose: true,
      data: {
        header: headerTxt,
        btnStart: AlertBtnText.Cancel,
        btnEnd: AlertBtnText.Add
      }
    });
    this.dialogRefTrackArtist.afterClosed().subscribe(
      data => {
        if (data !== undefined) {
          let artistList = [];
          switch (headerTxt) {
            case 'Track Artist Content':
              // artistList = this.contentForm.value.trackArtistList;
              artistList = this.contentForm.value.trackArtists;
              break;
            case 'Album Artist Content':
              artistList = this.contentForm.value.albumArtists;
              break;
          }
          artistList.push({
            'artist': data.artist,
            'muserName': data.muserName,
            'isni': data.isni,
            'aliases': data.aliases
          });
        }
      });
  }

  addPublisher() {
    this.dialogRefPublishers = this.dialog.open(PublishersComponent, {
      disableClose: true,
      data: {
        btnStart: AlertBtnText.Cancel,
        btnEnd: AlertBtnText.Add
      }
    });
    this.dialogRefPublishers.afterClosed().subscribe(
      data => {
        if (data !== undefined) {
          this.contentForm.value.publishers.push({
            'publisher': data.publisher,
            'muserName': data.muserName,
            'ipi_cae': data.ipi_cae,
            'isni': data.isni
          });
        }
      });
  }

  addWriter() {
    this.dialogRefWriters = this.dialog.open(WritersComponent, {
      disableClose: true,
      data: {
        btnStart: AlertBtnText.Cancel,
        btnEnd: AlertBtnText.Add
      }
    });
    this.dialogRefWriters.afterClosed().subscribe(
      data => {
        if (data !== undefined) {
          this.contentForm.value.writers.push({
            'writer': data.writer,
            'muserName': data.muserName,
            'ipi_cae': data.ipi_cae,
            'isni': data.isni,
            'writersPublisher': data.writersPublisher,
            'writersRole': data.writersRole
          });
        }
      });

  }

  addManagementSplit(headerTxt) {
    this.dialogRefManagement = this.dialog.open(ManagementComponent, {
      disableClose: true,
      data: {
        header: headerTxt,
        btnStart: AlertBtnText.Cancel,
        btnEnd: AlertBtnText.Add
      }
    });
    this.dialogRefManagement.afterClosed().subscribe(
      data => {

        if (data !== undefined) {
          let splitList = [];
          switch (headerTxt) {
            case 'Master\'s Management Content':
              splitList = this.contentForm.value.masterSplit;
              break;
            case 'Composition\'s Management Content':
              splitList = this.contentForm.value.compSplit;
              break;
          }
          splitList.push({
            'muserName': data.muserName,
            'bp': data.bp,
            'percentage': data.percentage
            // 'threshold': data.threshold
          });
        }
      });
  }

  removeFromList(listName: string, i) {
    this.contentForm.value[listName].splice(i, 1);
  }

  postContent() {
    this.ui.showLoading();
    // this.checkSplits().then(() => {
    this.prepDates();
    const authPassword = CryptoService.decrypt();
    this.dataService.postContent(
      authPassword,
      this.muserName,
      this.contentForm.value,
    ).then(() => {
      this.ui.hideLoading();
      this.ui.getLoadingMessage();
    }).catch((err) => {
      this.alert.showErrorMessage('Failed to Post Content - Error: ' + err);
    });
  }

  setCountry(country) {
    this.contentForm.value.countryOrigin = country;
  }

  mapGenre(selectorParam: string, genre: number) {
    this.contentForm.value[selectorParam] = genre;
  }

  prepDates() {
    if (this.contentForm.value.salesStartDate) {
      const salesStartDate = this.formatDate(this.contentForm.value.salesStartDate);
      this.contentForm.value.salesStartDate = salesStartDate;
    }
    if (this.contentForm.value.releaseDate) {
      const releaseDate = this.formatDate(this.contentForm.value.releaseDate);
      this.contentForm.value.releaseDate = releaseDate;
    }
  }

  formatDate(contentDate: Date) {
    const date = this.datePipe.transform(contentDate, 'yyyyMMdd');
    return Number.parseInt(date);
  }

  currentDate() {
    const today = new Date();
    this.maxDate = new Date(this.datePipe.transform(today, 'yyyy/MM/dd'));
    this.maxYear = Number.parseInt(this.datePipe.transform(today, 'yyyy'));
  }

  checkSplits() {
    // math to verify that splits do not exceed max allowed
    return new Promise((resolve, reject) => {
      // const db = firebase.database();
      // const ref = db.ref('BetaTesterKey/');
      // ref.on('value', (snap) => {
      //   if (snap.val() === inputKey) {
      //     resolve(true);
      //   } else {
      //     reject(false);
      //   }
      // });
    });
  }

}
