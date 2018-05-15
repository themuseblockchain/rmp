import { Enums } from '../enums/content.enums';
import { Validators } from '@angular/forms';
import { Utils } from '../utils';

export class ContentModel {
    // contentId: string;
    uploader: string;
    ipfsUrl: string; // used as unique Id
    album_meta: {
        part_of_album: boolean;
        album_title: string;
        album_artist: {
            albumArtist: string;
            albumArtistIsni: string;
            albumArtistAliases: {
                albumArtistAlias: string;
            }[]
        }[];
        genre_1: Enums.Genre;
        genre_2: Enums.Genre;
        country_of_origin: Enums.Countries;
        explicit_: Enums.Explicit;
        p_line: string;
        c_line: string;
        upc_or_ean: number;
        release_date: number;
        release_year: number;
        sales_start_date: number;
        album_producer: string;
        album_type: Enums.AlbumType;
        master_label_name: string;
        display_label_name: string;
    };

    track_meta: {
        track_title: string;
        ISRC: string;
        track_artists: {
            trackArtist: string;
            trackArtistIsni: string;
            trackArtistAliases: {
                trackArtistAlias: string;
            }[]
        }[];
        featured_artist: string;
        featured_artist_ISNI: string;
        track_producer: string;
        genre_1: Enums.Genre;
        genre_2: Enums.Genre;
        p_line: string;
        track_no: number;
        track_volume: number;
        track_duration: number;
        samples: boolean;
    };

    // Publishing metadata
    comp_meta: {
        composition_title: string;
        alternate_composition_title: string;
        ISWC: string;
        third_party_publishers: boolean;

        publishers: {
            publisher: string;
            IPI_CAE: string;
            ISNI: number;
        }[];

        writers: {
            writer: string;
            IPI_CAE: string;
            ISNI: number;
            role: Enums.WritersRole;
            publisher: string;
        }[];

        PRO: string;
    };

    distributions: {
        distribution: {
        payee: string, // MuserName having right to receive royalties
        bp: number // Share to receive, in base points
        }[]
    };

    management: {
        management_vote: {
            voter: string, // MuserName having right to receive royalties
            percentage: number // Voting power
        }[]
    };

    management_threshold: number;

    distributions_comp: {
        distribution: {
        payee: string, // MuserName having right to receive royalties
        bp: number // Share to receive, in base points
        }[]
    };

    management_comp: {
        management_vote: {
            voter: string, // MuserName having right to receive royalties
            percentage: number // Voting power
        }[]
    };

    management_threshold_comp: number;
    playing_reward: number;
    publishers_share: number;
    // tempValue: string;

    // normalize: string; // May or may not need to auto format data from user input

    constructor(content?) {
        {
            content = content || {};
            this.uploader = '';
            this.ipfsUrl = 'ipfs://' + Utils.generateGUID();

            // this.contentId = content.contentId || Utils.generateGUID();

            this.album_meta = {
                part_of_album: false,
                album_title: '',
                album_artist: [
                    // {
                    // albumArtist: '',
                    // albumArtistIsni: '',
                    // albumArtistAliases: [{
                    //     albumArtistAlias: ''
                    // }]
                    // }
                ],
                genre_1: Enums.Genre.Default,
                genre_2: Enums.Genre.Default,
                country_of_origin: Enums.Countries.Default,
                explicit_: Enums.Explicit.Default,
                p_line: '',
                c_line: '',
                upc_or_ean: 0,
                release_date: 0,
                release_year: 0,
                sales_start_date: 0,
                album_producer: '',
                album_type: Enums.AlbumType.Default,
                master_label_name: '',
                display_label_name: '',
            };

            this.track_meta = {
                track_title: '',
                ISRC: '',
                track_artists: [
                    // {
                    // trackArtist: '',
                    // trackArtistIsni: '',
                    // trackArtistAliases: [{
                    //     trackArtistAlias: '',
                    // }]
                    // }
                ],
                featured_artist: '',
                featured_artist_ISNI: '',
                track_producer: '',
                genre_1: Enums.Genre.Default,
                genre_2: Enums.Genre.Default,
                p_line: '',
                track_no: 0,
                track_volume: 0,
                track_duration: 0,
                samples: false
            };

            this.comp_meta = {
                composition_title: '',
                alternate_composition_title: '',
                ISWC: '',
                third_party_publishers: false,

                publishers: [
                    //     {
                    //     publisher: '',
                    //     ipiCae: '',
                    //     isni: 0,
                    // }
                ],

                writers: [
                    //     {
                    //     writer: '',
                    //     ipiCae: '',
                    //     isni: 0,
                    //     role: Enums.WritersRole.Default,
                    //     publisher: ''
                    // }
                ],

                PRO: Enums.Pros.Default
            };

            this.distributions = {
                distribution: []
            };

            this.management_threshold = 100;
            this.management = {
                management_vote: []
                };
         

            
            this.distributions_comp = {
                distribution: []
            };

            this.management_threshold_comp = 100;
            this.management_comp = {
                management_vote: []
            };

            this.playing_reward = 1;
            this.publishers_share = 0;
            // this.tempValue = content.tempValue || '';
        }
    }
}
