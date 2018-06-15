import { Enums } from '../enums/content.enums';
import { Validators } from '@angular/forms';
import { Utils } from '../utils';


export class ContentModel {

    uploader: string;
    url: string; // used as unique Id
    album_meta: {
        part_of_album: boolean;
        album_title: string;
        album_artist: {
            artist: string,
            aliases: string[],
            ISNI: number
        }[];
        genre_1: Enums.Genre;
        genre_2?: Enums.Genre;
        country_of_origin: Enums.Countries;
        explicit_: Enums.Explicit;
        p_line: string;
        c_line: string;
        upc_or_ean: number;
        release_date: number;
        release_year: number;
        sales_start_date: number;
        album_producer?: string;
        album_type?: Enums.AlbumType;
        master_label_name: string;
        display_label_name: string;
    };

    track_meta: {
        track_title: string;
        ISRC: string;
        track_artists: {
            artist: string,
            aliases: string[],
            ISNI: number
        }[];
        // track_artists: [[string]];
        featured_artist?: string;
        featured_artist_ISNI?: number;
        track_producer?: string;
        genre_1: Enums.Genre;
        genre_2?: Enums.Genre;
        p_line: string;
        track_no: number;
        track_volume: number;
        copyright?: string,
        track_duration: number;
        samples: boolean;
    };

    comp_meta: {
        composition_title: string;
        alternate_composition_title?: string;
        ISWC?: string;
        third_party_publishers: boolean;
        publishers: {
            publisher: string,
            IPI_CAE?: string,
            ISNI?: number
        }[];

        writers: {
            writer: string,
            IPI_CAE?: string,
            ISNI?: number,
            role?: string,
            publisher: string
        }[];
        PRO: Enums.Pros;
    };

    distributions: {
        payee: string;
        bp: number;
    }[];

    management: {
        voter: string;
        percentage: number;
    }[];

    management_threshold: number;

    distributions_comp?: {
        payee: string;
        bp: number;
    }[];

    management_comp?: {
        voter: string;
        percentage: number;
    }[];

    management_threshold_comp?: number;

    playing_reward: number;

   
    publishers_share: number; // On the chain, the remaining balance is inferred as the composition side shares 

    master_share: number; // Only used for clarification in UI.
    // The master_share value doesnt need to be submitted to the chain,
    // the value is inferred from the total balance minus the
    // publishers_share


    masterSplitView: {
        muserName: string;
        bp: number;
        percentage: number;
    }[];

    compSplitView: {
        muserName: string;
        bp: number;
        percentage: number;
    }[];

    // normalize: string; // May or may not need to auto format data from user input

} // TODO: if uncomment constructor, remove this {

// region constructor
    // constructor(content?) {
    //     {
    //         content = content || {};
    //         this.uploader = '';
    //         this.url = 'ipfs://' + Utils.generateGUID();
    //         this.album_meta = {
    //             part_of_album: false,
    //             album_title: ' ',
    //             album_artist: [],
    //             genre_1: Enums.Genre.Default,
    //             genre_2: Enums.Genre.Default,
    //             country_of_origin: Enums.Countries.Default,
    //             explicit_: Enums.Explicit.Clean,
    //             p_line: '',
    //             c_line: '',
    //             upc_or_ean: 0,
    //             release_date: 0,
    //             release_year: 0,
    //             sales_start_date: 0,
    //             album_producer: '',
    //             album_type: Enums.AlbumType.Default,
    //             master_label_name: '',
    //             display_label_name: '',
    //         };
    //         this.track_meta = {
    //             track_title: '',
    //             ISRC: '',
    //             track_artists: [],
    //             featured_artist: '',
    //             featured_artist_ISNI: 0,
    //             track_producer: '',
    //             genre_1: Enums.Genre.Default,
    //             genre_2: Enums.Genre.Default,
    //             p_line: '',
    //             track_no: 0,
    //             track_volume: 0,
    //             track_duration: 0,
    //             samples: false
    //         };

    //         this.comp_meta = {
    //             composition_title: '',
    //             alternate_composition_title: '',
    //             ISWC: '',
    //             third_party_publishers: false,
    //             publishers: [],
    //             writers: [],

    //             PRO: Enums.Pros.Default
    //         };

    //         this.distributions = [];

    //         this.management = [];

    //         this.management_threshold = 100;

    //         this.distributions_comp = [];
    //         this.management_comp = [];

    //         this.management_threshold_comp = 100;

            
    //         this.publishers_share = 50;
    //         this.master_share = 50;
            
    //         this.playing_reward = 5;


    //         this.masterSplitView = [];
    //         this.compSplitView = [];
    //     }
    // }
// }

// export interface IArtist {
//     artist: string;
//     aliases: string[];
//     ISNI: number;
// }

// export class Artist {
//     constructor(
//         artist: string,
//         aliases: string[],
//         ISNI: number
//     ) { }
// }

// export class Publisher {
//     constructor(
//         publisher: string,
//         IPI_CAE?: string,
//         ISNI?: number
//     ) { }
// }

// export class Writer {
//     constructor(
//         writer: string,
//         IPI_CAE?: string,
//         ISNI?: number,
//         role?: Enums.WritersRole,
//         publisher?: string
//     ) { }
// }

// export class Distribution {
//     constructor(
//         payee: string,
//         bp: number
//     ) { }
// }
// export class ManagementVote {
//     constructor(
//         voter: string,
//         percentage: number
//     ) { }
// }

// endregion
