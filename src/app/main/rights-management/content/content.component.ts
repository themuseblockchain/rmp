import { Component, OnInit, AfterViewInit, ViewChild, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DataService } from '../../../core/services/data.service';
import { Observable } from 'rxjs/Rx';
import { MuserService } from '../../../core/services/muser.service';
import { CryptoService } from '../../../core/services/crypto.service';
import { AlertService } from '../../../core/services/alert.service';
import { AlertBtnText } from '../../../core/enums/alert-btn-text.enums';
import { MatDialog, MatDialogRef, MatTableDataSource, MatTable } from '@angular/material';
import { ErrorCodes } from '../../../core/enums/error-codes.enums';
import { PublishersComponent } from '../../components/modal/content/publishers/publishers.component';
import { ArtistComponent } from '../../components/modal/content/artist/artist.component';
import { WritersComponent } from '../../components/modal/content/writers/writers.component';
import { Enums } from '../../../core/enums/content.enums';
import { ContentModel } from '../../../core/models/content.model';
import { UIService } from '../../../core/services/ui.service';
import { Utils } from './../../../core/utils';
import { SharedModule } from '../../../core/common/shared.module';
import { DataSource } from '@angular/cdk/collections';

import { CdkTable } from '@angular/cdk/table';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})



export class ContentComponent implements OnInit, AfterViewInit {

  max = 100;
  mastValue;
  streamValue;
  compValue;

  mastMax;
  streamMax;
  compMax;

  mastMin;
  streamMin;
  compMin;

  step = .5;
  thumbLabel = true;

  // region to move out of component
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
    { value: 2, viewValue: 'Clean' } // has explicit that has been bleeped out
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
    trackArtistAliases: 'A NAME THAT A PERSON OR GROUP ASSUMES, WHICH CAN DIFFER FROM THEIR FIRST OR TRUE NAME ',
    trackArtistIsni: 'THE ISO STANDARD IDENTIFIER FOR NAMES',
    featuredArtist: 'IF THE TRACK CONTAINS FEATURED ARTISTS NOTE: FOR NAMING GROUPS AS WELL AS INDIVIDUALS',
    // IF A TRACK CONTAINS ONE OR MORE , EACH ARTIST MUST BE ADDED SEPARATELY.',
    featuredArtistIsni: 'THE ISO STANDARD IDENTIFIER FOR NAMES',
    isrc: 'A UNIQUE AND PERMANENT IDENTIFIER FOR A SPECIFIC RECORDING, INDEPENDENT OF THE FORMAT OR THE RIGHTS HOLDERS.',
    country: 'RECORDING LOCATION.',
    explicit: 'AN EXPLICIT TRACK MUST BE TAGGED AS EXPLICIT. A CLEAN VERSIONS OF EXPLICIT TRACKS MUST BE TAGGED AS CLEAN. TRACKS SHOULD ONLY BE FLAGGED CLEAN IF THERE IS AN EXPLICIT VERSION OF THE TRACK.',
    genre: 'THE FIRST GENRE MUST BE THE BEST DESCRIPTION FOR THE CONTENT. A SECOND GENRE IS NOT ALWAYS REQUIRED, BUT IT SHOULD BE USED WHEN APPLICABLE.',
    trackPLine: 'THIS IS GENERALLY THE ENTITY ENTITLED TO ROYALTIES FOR THE TRACK.',
    trackNo: 'USED TO ORDER TRACKS WITHIN AN ALBUM.',
    trackVolumeNo: 'THE VOLUME NUMBER (DISC NUMBER) ON WHICH THE TRACK RESIDES.',
    trackDuration: 'THE DURATION OF THE CONTENT USING THE FOLLOWING FORMAT hhmmss. (E.G. TWO MINUTE AND 30 SECONDS WOULD BE 000230)',
    trackProducer: 'A PARTY RESPONSIBLE FOR AN ARTISTIC INPUT TO THE PRODUCTION OF A RESOURCE (E.G. A SOUNDRECORDING OR AUDIOVISUAL RECORDING).',
    releaseDate: 'THE ORIGINAL RELEASE DATE (YYYY/MM/DD) MUST BE THE EARLIEST DATE THAT THE ORIGINAL PRODUCT WAS FIRST RELEASED REGARDLESS OF THE RELEASING LABEL, OR FORMAT TYPE.',
    releaseYear: 'THE ORIGINAL RELEASE DATE YEAR (YYYY)',
    salesStartDate: 'THE SALES START DATE (YYYY/MM/DD) IS THE DATE WHEN CONTENT BECOMES AVAILABLE ON MUSE.',
    upcEan: 'SET OF NUMBERS THAT IDENTIFY A PACKAGED COLLECTION OF MUSIC',
    albumTitle: 'ALBUM TITLE MUST MATCH THE ORIGINAL TITLE UPON ITS INITIAL RELEASE.',
    partOfAlbum: 'CHECK IF DOES THE TRACK BELONGS TO AN ALBUM',
    albumArtist: 'A PRINCIPAL CONTRIBUTOR TO A PERFORMANCE OF THE TRACK. NOTE: FOR NAMING GROUPS AS WELL AS INDIVIDUALS.',
    albumProducer: 'A PARTY RESPONSIBLE FOR AN ARTISTIC INPUT TO THE PRODUCTION OF A RESOURCE (E.G. A SOUNDRECORDING OR AUDIOVISUAL RECORDING).',
    albumType: '',
    albumPLine: '',
    albumCLine: '',
    masterLabel: '',
    displayLabel: '',
    isThirdPartyPublishers: '',
    pros: 'THE ORGANIZATION THAT PROVIDES INTERMEDIARY FUNCTIONS',
    publisher: 'A PARTY THAT MAKES A RESOURCE AVAILABLE',
    writer: ' THE CREATOR OF THE MUSICAL ELEMENTS OF A TRACK.',
    threshold: 'TOTAL WEIGHT FOR A CHANGE TO TAKE PLACE ON THE SMART CONTRACT.',

    management: '',
    // matTooltipShowDelay
    delay: '1000',
  };

  // endregion

  content = new ContentModel();
  contentForm: FormGroup;

  formErrors: any;
  dialogRefPublishers: MatDialogRef<PublishersComponent>;
  dialogRefArtist: MatDialogRef<ArtistComponent>;
  dialogRefWriters: MatDialogRef<WritersComponent>;

  private muserName: string;
  public maxDate: Date;
  public maxYear: number;
  public maxBp: number;
  public maxPercentage: number;

  masterRoyaltyInput = {
    muserName: this.muserService.getMuserName,
    income: '100',
    management: '',
    weight: '100'
  };

  compRoyaltyInput = {
    muserName: '',
    income: '',
    management: '',
    weight: ''
  };

  masterRoyaltyList = [];
  compRoyaltyList = [];
  trackArtistList = [];
  albumArtistList = [];
  writersList = [];
  publishersList = [];


  public data: any;

  masterManagesContract: boolean;
  masterMultiManagers: boolean;
  compManagesContract: boolean;
  compMultiManagers: boolean;

  constructor(
    public dataService: DataService,
    private _fb: FormBuilder,
    private muserService: MuserService,
    private alert: AlertService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private ui: UIService
  ) {
    this.currentDate();
  }

  ngOnInit() {
    this.muserName = this.muserService.getMuserName;
    this.content = new ContentModel();

    this.contentForm = this.createContentForm();
    this.contentForm.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
      this.onChanges();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ui.hideLoading();
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

  addList(listName) {
    switch (listName) {
      case 'masterRoyaltyList':
        this.masterRoyaltyList.push({
          muserName: this.masterRoyaltyInput.muserName,
          income: this.masterRoyaltyInput.income,
          management: this.masterRoyaltyInput.management,
          weight: this.masterRoyaltyInput.weight
        });
        break;
      case 'compRoyaltyList':
        this.compRoyaltyList.push({
          muserName: this.compRoyaltyInput.muserName,
          income: this.compRoyaltyInput.income,
          management: this.compRoyaltyInput.management,
          weight: this.compRoyaltyInput.weight
        });
        break;
      // default:
    }

  }

  updateMasterManagesContract() {
    if (!this.masterManagesContract) {
      this.masterManagesContract = true;
    }
    else {
      this.masterManagesContract = false;
      this.masterRoyaltyInput.weight = null;
    }
  }

  updateCompManagesContract() {
    if (!this.compManagesContract) {
      this.compManagesContract = true;
    }
    else {
      this.compManagesContract = false;
      this.compRoyaltyInput.weight = null;
    }
  }

  updateMasterMultiManagers() {
    if (!this.masterMultiManagers) {
      this.masterMultiManagers = true;
    }
    else {
      this.masterMultiManagers = false;
      this.masterManagesContract = false;
      this.masterRoyaltyInput.weight = null;
    }
  }

  updateCompMultiManagers() {
    if (!this.compMultiManagers) {
      this.compMultiManagers = true;
    }
    else {
      this.compMultiManagers = false;
      this.compManagesContract = false;
      this.compRoyaltyInput.weight = null;
    }
  }

  // region functions
  createContentForm() {
    return this._fb.group({
      uploader: [this.muserName],
      url: 'ipfs://' + Utils.generateGUID(),
      album_meta: this._fb.group({
        partOfAlbum: [''],
        albumTitle: [''],
        albumArtists: this._fb.group({
          artist: [''],
          aliases: [[]],
          // TODO: fix validation
          ISNI: [''],
        }),
        albumGenre1: [''],
        albumGenre2: [''],
        countryOrigin: [''],
        explicit: [''],
        albumPLine: [''],
        albumCLine: [''],
        // TODO: fix validation
        // upcEan: ['', [Validators.pattern('^8\d{11}$|^8\d{13}$')]],
        upcEan: [''],
        releaseDate: ['', Validators.required],
        releaseYear: [''],
        salesStartDate: ['', Validators.required],
        albumProducer: [''],
        albumType: [''],
        masterLabelName: ['', Validators.required],
        displayLabelName: [''],
      }),

      track_meta: this._fb.group({
        trackTitle: ['', Validators.required],
        isrc: [''],
        trackArtists: this._fb.group({
          artist: [''],
          aliases: [[]],
          ISNI: [''],
        }), 
        featuredArtist: [''],
        featuredArtistIsni: [''],
        trackProducer: [''],
        trackGenre1: [''],
        trackGenre2: [''],
        trackPLine: [''],
        // TODO: fix validation
        // trackNo: ['', [Validators.min(0), Validators.pattern('^[0-9][0-9]*([.][0-9]{2}|)$')]],
        // trackVolumeNo: ['', [Validators.min(0), Validators.pattern('^[0-9][0-9]*([.][0-9]{2}|)$')]],
        // trackDuration: ['', [Validators.pattern('^[0-9][0-9]*([.][0-9]{2}|)$')]],
        // trackDuration: ['', Validators.pattern('^[0-9]*$"')],
        trackNo: [''],
        trackVolumeNo: [''],
        trackDuration: [''],
        hasSample: [''],
      }),

      comp_meta: this._fb.group({
        compTitle: [''],
        compTitleAlt: [''],
        compTitleIswc: [''],
        isThirdPartyPublishers: [''],
        publishers: this._fb.group({
          publisher: [''],
          IPI_CAE: [''],
          ISNI: ['']
        }),

        writers: this._fb.group({
          writer: [''],
          IPI_CAE: [''],
          ISNI: [''],
          role: [Enums.WritersRole.Default],
          publisher: ['']
        }),

        performingRightsOrg: [''],
      }),

      distributions: this._fb.group({
        payee: [''],
        bp: ['']
      }),

      management: this._fb.group({
        voter: [''],
        percentage: ['', [Validators.min(0), Validators.max(100)]]
      }),

      management_threshold: [100, [Validators.min(0), Validators.max(100)]],

      distributionsComp: this._fb.group({
        payee: [''],
        bp: ['']
      }),

      managementComp: this._fb.group({
        voter: [''],
        percentage: ['', [Validators.min(0), Validators.max(100)]]
      }),

      management_threshold_comp: [''],

      master_share: [45, [Validators.min(0), Validators.max(10000)]], // Only used for clarification in UI.
      // The master_share value doesnt need to be submitted to the chain,
      // the value is inferred from the total balance minus the
      // publishers_share

      publishers_share: [50, [Validators.min(0), Validators.max(10000)]], // On the chain, the remaining balance is inferred as the composition side shares 

      playing_reward: [5, [Validators.required, Validators.min(1), Validators.max(10000)]],

      masterSplitView: [''],
      compSplitView: ['']
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

  onChanges(): void { // TODO: needs work
    this.contentForm.get('master_share').valueChanges.subscribe(val => {
      this.streamValue = val;
      this.syncGeneralSplits();
    });

    this.contentForm.get('publishers_share').valueChanges.subscribe(val => {
      this.mastValue = val;
      this.syncGeneralSplits();
    });

    this.contentForm.get('playing_reward').valueChanges.subscribe(val => {
      this.compMax = val;
      this.syncGeneralSplits();
    });

    // this.contentForm.get('playing_reward').valueChanges.subscribe(val => {
    // this.compMax = val;
    // this.syncGeneralSplits();
    // });

    // alert(this.royaltyList.values());
  }

  syncGeneralSplits() { // TODO: needs work
    /// replace with getGeneralSplitValuse()

    this.mastValue = this.contentForm.value.master_share;
    // console.log('mastValue: ' + this.mastValue);
    this.compValue = this.contentForm.value.publishers_share;
    // console.log('compValue: ' + this.compValue);
    this.streamValue = this.contentForm.value.playing_reward;
    // console.log('mastValue: ' + this.streamValue);

    /// .then(() => {this.mastMax = (this.max - this.compValue - this.streamValue);})
    this.mastMax = (this.max - this.compValue - this.streamValue);
    this.compMax = (this.max - this.mastValue - this.streamValue);
    this.streamMax = (this.max - this.mastValue - this.compValue);
    // TODO: Add if general royalty comp split is > 0 set is third party managed = true

    this.mastMin = 0;
    this.compMin = 0;
    this.streamMin = 1;
  }

  getGeneralSplitValuse() {
    // promise to get values
    this.mastValue = this.contentForm.value.master_share;
    this.compValue = this.contentForm.value.publishers_share;
    this.streamValue = this.contentForm.value.playing_reward;

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
          this.publishersList.push({
            publisher: data.publisher,
            IPI_CAE: data.IPI_CAE,
            ISNI: data.ISNI
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
          this.writersList.push({
            writer: data.writer,
            IPI_CAE: data.IPI_CAE,
            ISNI: data.ISNI,
            publisher: data.publisher,
            role: data.role
          });
        }
      });

  }

  addArtist(headerTxt) {
    this.dialogRefArtist = this.dialog.open(ArtistComponent, {
      disableClose: true,
      data: {
        header: headerTxt,
        btnStart: AlertBtnText.Cancel,
        btnEnd: AlertBtnText.Add
      }
    });
    this.dialogRefArtist.afterClosed().subscribe(
      data => {
        if (data !== undefined) {
          switch (headerTxt) {
            case 'trackArtist':
              this.trackArtistList.push({
                artist: data.artist,
                isni: data.isni,
                aliases: data.aliases
              });
              break;
            case 'albumArtist':
              this.albumArtistList.push({
                artist: data.artist,
                isni: data.isni,
                aliases: data.aliases
              });
              break;
          }
        }
      });
  }
// region DELETE
  // addManagementSplit(headerTxt) {
  //   this.dialogRefManagement = this.dialog.open(ManagementComponent, {

  //     disableClose: true,
  //     data: {
  //       header: headerTxt,
  //       btnStart: AlertBtnText.Cancel,
  //       btnEnd: AlertBtnText.Add
  //     }
  //   });
  //   this.dialogRefManagement.afterClosed().subscribe(
  //     data => {
  //       if (data !== undefined) {

  //         let distributions = [];
  //         let management = [];
  //         let masterSplitList = [];

  //         let distributionsComp = [];
  //         let managementComp = [];
  //         let compSplitList = [];

  //         switch (headerTxt) {
  //           case 'Master\'s Management Content':
  //             // if (!this.contentForm.value.distributions) {
  //             distributions = this.contentForm.value.distributions;
  //             // }
  //             // console.log('001' + distributionList);
  //             distributions.push({
  //               payee: data.muserName,
  //               bp: data.bp,
  //             });

  //             // if (!this.contentForm.value.management) {
  //             management = this.contentForm.value.management;
  //             // }
  //             // console.log('002' + management);
  //             management.push({
  //               voter: data.muserName,
  //               percentage: data.percentage
  //             });

  //             // if (!this.contentForm.value.masterSplitView) {
  //             masterSplitList = this.contentForm.value.masterSplitView;
  //             // }
  //             // console.log('003' + masterSplitList);
  //             masterSplitList.push({
  //               muserName: data.muserName,
  //               bp: data.bp,
  //               percentage: data.percentage
  //             });
  //             break;
  //           case 'Composition\'s Management Content':

  //             // if (!this.contentForm.value.distributionsComp) {
  //             distributionsComp = this.contentForm.value.distributionsComp;
  //             // }
  //             distributionsComp.push({
  //               payee: data.muserName,
  //               bp: data.bp,
  //             });

  //             // if (!this.contentForm.value.managementComp) {
  //             managementComp = this.contentForm.value.managementComp;
  //             // }
  //             managementComp.push({
  //               voter: data.muserName,
  //               percentage: data.percentage
  //             });
  //             // compSplitList = this.contentForm.value.compSplitView;
  //             // if (!this.contentForm.value.compSplitView) {
  //             compSplitList = this.contentForm.value.compSplitView;
  //             // }
  //             compSplitList.push({
  //               muserName: data.muserName,
  //               bp: data.bp,
  //               percentage: data.percentage
  //             });
  //             break;
  //         }
  //       }
  //     });
  // }

  // addRoyaltiesSplit(headerTxt) {
  //   // this.dialogRefManagement = this.dialog.open(ManagementComponent, {
  //   this.dialogRefRoyalties = this.dialog.open(RoyaltiesComponent, {

  //     disableClose: true,
  //     data: {
  //       header: headerTxt,
  //       btnStart: AlertBtnText.Cancel,
  //       btnEnd: AlertBtnText.Add
  //     }
  //   });
  //   // this.dialogRefManagement.afterClosed().subscribe(
  //   this.dialogRefRoyalties.afterClosed().subscribe(
  //     data => {
  //       if (data !== undefined) {

  //         let distributions = [];
  //         let management = [];
  //         let masterSplitList = [];

  //         let distributionsComp = [];
  //         let managementComp = [];
  //         let compSplitList = [];

  //         switch (headerTxt) {
  //           case 'Master\'s Management Content':
  //             // if (!this.contentForm.value.distributions) {
  //             distributions = this.contentForm.value.distributions;
  //             // }
  //             // console.log('001' + distributionList);
  //             distributions.push({
  //               payee: data.muserName,
  //               bp: data.bp,
  //             });

  //             // if (!this.contentForm.value.management) {
  //             management = this.contentForm.value.management;
  //             // }
  //             // console.log('002' + management);
  //             management.push({
  //               voter: data.muserName,
  //               percentage: data.percentage
  //             });

  //             // if (!this.contentForm.value.masterSplitView) {
  //             masterSplitList = this.contentForm.value.masterSplitView;
  //             // }
  //             // console.log('003' + masterSplitList);
  //             masterSplitList.push({
  //               muserName: data.muserName,
  //               bp: data.bp,
  //               percentage: data.percentage
  //             });
  //             break;
  //           case 'Composition\'s Management Content':

  //             // if (!this.contentForm.value.distributionsComp) {
  //             distributionsComp = this.contentForm.value.distributionsComp;
  //             // }
  //             distributionsComp.push({
  //               payee: data.muserName,
  //               bp: data.bp,
  //             });

  //             // if (!this.contentForm.value.managementComp) {
  //             managementComp = this.contentForm.value.managementComp;
  //             // }
  //             managementComp.push({
  //               voter: data.muserName,
  //               percentage: data.percentage
  //             });
  //             // compSplitList = this.contentForm.value.compSplitView;
  //             // if (!this.contentForm.value.compSplitView) {
  //             compSplitList = this.contentForm.value.compSplitView;
  //             // }
  //             compSplitList.push({
  //               muserName: data.muserName,
  //               bp: data.bp,
  //               percentage: data.percentage
  //             });
  //             break;
  //         }
  //       }
  //     });
  // }
// endregion
  
removeFromList(listName: string, i) {
    this[listName].splice(i, 1);
  }

  postContent() {
    this.ui.showLoading();
    this.prepContnetForm().then(() => {
      const data = this.contentForm.getRawValue();
      const authPassword = CryptoService.decrypt();
      this.dataService.postContent(
        authPassword,
        this.muserName,
        this.content,
      ).then(() => {
        this.contentForm.reset();
        this.ngOnInit();
        this.ui.hideLoading();
        // this.ui.getLoadingMessage();
      }).catch((err) => {
        this.alert.showErrorMessage('Failed to Post Content - Error: ' + err);
      });
    });
  }

  setCountry(country) {
    this.contentForm.patchValue({ countryOrigin: country });
  }

  mapGenre(selectorParam: string, genre: number) {
    this.contentForm.patchValue({ [selectorParam]: genre });
  }

  formatValues() { // TODO: Double check all values are correct!!!
    const num_salesStartDate = Number.parseInt(this.datePipe.transform(this.contentForm.value.salesStartDate, 'yyyyMMdd'));
    this.contentForm.patchValue({ salesStartDate: num_salesStartDate });
    const num_releaseDate = Number.parseInt(this.datePipe.transform(this.contentForm.value.releaseDate, 'yyyyMMdd'));
    this.contentForm.patchValue({ releaseDate: num_releaseDate });

    const releaseYear = num_releaseDate.toString().substring(0, 4);
    const num_releaseYear = Number.parseInt(releaseYear);

    this.contentForm.patchValue({ releaseYear: num_releaseYear });

    const pubSharToBp = this.percentageToBp(this.contentForm.controls.publishers_share.value);
    const playRewardToBp = this.percentageToBp(this.contentForm.controls.playing_reward.value);

    this.contentForm.patchValue({ publishers_share: pubSharToBp });
    this.contentForm.patchValue({ playing_reward: playRewardToBp });

    if (this.contentForm.controls.album_meta.get('albumTitle').value === '') {
      this.contentForm.patchValue({ albumTitle: this.contentForm.controls.trackTitle.value });
    }
    // if (this.contentForm.controls.albumTitle.value === '') {
    //   this.contentForm.patchValue({ albumTitle: this.contentForm.controls.trackTitle.value });
    // }

    if (this.contentForm.controls.comp_meta.get('publishers.publisher').value === '') {

      this.contentForm.controls.comp_meta.get('publishers').patchValue({
        // publisher: this.contentForm.controls.trackTitle.value
        publisher: ' '
      });
    }

    if (this.masterMultiManagers === false) {
      this.contentForm.get('management_threshold').patchValue({
        management_threshold: 100
      });
    }

    if (this.compMultiManagers === false) {
      this.contentForm.get('management_threshold_comp').patchValue({
        management_threshold_comp: 100,
        // this.contentForm.value.management_threshold = 100;
      });



      if (this.contentForm.value.publishers_share === 0) {
        this.contentForm.controls.comp_meta.get('isThirdPartyPublishers').patchValue({
          isThirdPartyPublishers: false
        });
      } else {
        this.contentForm.controls.comp_meta.get('isThirdPartyPublishers').patchValue({
          isThirdPartyPublishers: true
        });
      }

      if (this.compMultiManagers === false) {
        this.contentForm.get('management_threshold_comp').patchValue({
          management_threshold_comp: 100,
          // this.contentForm.value.management_threshold = 100;
        });
      }
    }
  }

  currentDate() {
    const today = new Date();
    this.maxDate = new Date(this.datePipe.transform(today, 'yyyy/MM/dd'));
    this.maxYear = Number.parseInt(this.datePipe.transform(today, 'yyyy'));
  }

  prepContnetForm() {
    return new Promise((resolve, reject) => {
      this.formatValues();
      const isValid = this.formValid();

      if (isValid) {
        resolve(true);
      } else {
        this.ui.hideLoading();
        this.alert.showErrorMessage(ErrorCodes.invalidContentForm);

        reject(false);
      }
    });
  }

  formValid() {
    if (this.masterRoyaltyList.length === 0 || this.trackArtistList.length === 0 || this.writersList.length === 0 ) {
      return false;
    }
    return true;
  }

  percentageToBp(num: number) {
    return (num * 100);
  }
  // endregion
}

