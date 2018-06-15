import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Enums } from '../../../core/enums/content.enums';
import { MapGenre } from './map-genre';
import { ContentComponent } from '../content/content.component';

@Component({
    selector: 'genre',
    templateUrl: 'genre.component.html',
    styleUrls: ['genre.component.scss']
})

export class GenreComponent implements OnInit {
    message: string;
    required: string;

    toolTips = {
        genre: 'Tool Tip',
        delay: '1000',
    };

    smartControl: FormControl = new FormControl();

    options = [
        Enums.GenreString.AcousticBlues,
        Enums.GenreString.AdultAlternative,
        Enums.GenreString.AdultContemporary,
        Enums.GenreString.Africa,
        Enums.GenreString.AfroBeat,
        Enums.GenreString.AfroPop,
        Enums.GenreString.Alternative,
        Enums.GenreString.AlternativeCountry,
        Enums.GenreString.AlternativeFolk,
        Enums.GenreString.AlternativeRap,
        Enums.GenreString.Alternativo,
        Enums.GenreString.Ambient,
        Enums.GenreString.AmericanTradRock,
        Enums.GenreString.Americana,
        Enums.GenreString.Anime,
        Enums.GenreString.ArenaRock,
        Enums.GenreString.Asian,
        Enums.GenreString.Australia,
        Enums.GenreString.AvantGarde,
        Enums.GenreString.AvantGardeJazz,
        Enums.GenreString.Axe,
        Enums.GenreString.BaileFunk,
        Enums.GenreString.BaladasYBoleros,
        Enums.GenreString.Baroque,
        Enums.GenreString.BigBand,
        Enums.GenreString.Bluegrass,
        Enums.GenreString.Blues,
        Enums.GenreString.BluesRock,
        Enums.GenreString.Bollywood,
        Enums.GenreString.Bop,
        Enums.GenreString.BossaNova,
        Enums.GenreString.Brazilian,
        Enums.GenreString.Breakbeat,
        Enums.GenreString.BritishInvasion,
        Enums.GenreString.Britpop,
        Enums.GenreString.CPop,
        Enums.GenreString.Cajun,
        Enums.GenreString.CantopopHKPop,
        Enums.GenreString.Caribbean,
        Enums.GenreString.CCM,
        Enums.GenreString.Celtic,
        Enums.GenreString.CelticFolk,
        Enums.GenreString.ChamberMusic,
        Enums.GenreString.Chant,
        Enums.GenreString.Chanukah,
        Enums.GenreString.ChicagoBlues,
        Enums.GenreString.ChildrensMusic,
        Enums.GenreString.Chinese,
        Enums.GenreString.ChineseAlt,
        Enums.GenreString.ChineseClassical,
        Enums.GenreString.ChineseFlute,
        Enums.GenreString.ChineseHipHop,
        Enums.GenreString.ChineseOpera,
        Enums.GenreString.ChineseOrchestral,
        Enums.GenreString.ChineseRegionalFolk,
        Enums.GenreString.ChineseRock,
        Enums.GenreString.ChineseStrings,
        Enums.GenreString.Choral,
        Enums.GenreString.Choro,
        Enums.GenreString.ChristianGospel,
        Enums.GenreString.ChristianMetal,
        Enums.GenreString.ChristianPop,
        Enums.GenreString.ChristianRap,
        Enums.GenreString.ChristianRock,
        Enums.GenreString.Christmas,
        Enums.GenreString.ChristmasChildrens,
        Enums.GenreString.ChristmasClassic,
        Enums.GenreString.ChristmasClassical,
        Enums.GenreString.ChristmasJazz,
        Enums.GenreString.ChristmasModern,
        Enums.GenreString.ChristmasPop,
        Enums.GenreString.ChristmasRAndB,
        Enums.GenreString.ChristmasReligious,
        Enums.GenreString.ChristmasRock,
        Enums.GenreString.ClassicBlues,
        Enums.GenreString.ClassicChristian,
        Enums.GenreString.Classical,
        Enums.GenreString.ClassicalCrossover,
        Enums.GenreString.CollegeRock,
        Enums.GenreString.Comedy,
        Enums.GenreString.ContemporaryBluegrass,
        Enums.GenreString.ContemporaryBlues,
        Enums.GenreString.ContemporaryCeltic,
        Enums.GenreString.ContemporaryCountry,
        Enums.GenreString.ContemporaryFolk,
        Enums.GenreString.ContemporaryGospel,
        Enums.GenreString.ContemporaryJazz,
        Enums.GenreString.ContemporaryLatin,
        Enums.GenreString.ContemporaryRAndB,
        Enums.GenreString.ContemporarySingerSongwriter,
        Enums.GenreString.Cool,
        Enums.GenreString.Country,
        Enums.GenreString.CountryBlues,
        Enums.GenreString.CountryGospel,
        Enums.GenreString.CrossoverJazz,
        Enums.GenreString.Dance,
        Enums.GenreString.Dancehall,
        Enums.GenreString.Dangdut,
        Enums.GenreString.DeathMetalBlackMetal,
        Enums.GenreString.DeltaBlues,
        Enums.GenreString.DevotionalAndSpiritual,
        Enums.GenreString.Dini,
        Enums.GenreString.DirtySouth,
        Enums.GenreString.Disco,
        Enums.GenreString.Disney,
        Enums.GenreString.Dixieland,
        Enums.GenreString.DooWop,
        Enums.GenreString.Downtempo,
        Enums.GenreString.DrinkingSongs,
        Enums.GenreString.Dub,
        Enums.GenreString.EarlyMusic,
        Enums.GenreString.EastCoastRap,
        Enums.GenreString.Easter,
        Enums.GenreString.EasyListening,
        Enums.GenreString.ElectricBlues,
        Enums.GenreString.Electronic,
        Enums.GenreString.Electronica,
        Enums.GenreString.Enka,
        Enums.GenreString.Environmental,
        Enums.GenreString.Europe,
        Enums.GenreString.Exercise,
        Enums.GenreString.FitnessAndWorkout,
        Enums.GenreString.FolkRock,
        Enums.GenreString.ForeignCinema,
        Enums.GenreString.Forro,
        Enums.GenreString.France,
        Enums.GenreString.FrenchPop,
        Enums.GenreString.Frevo,
        Enums.GenreString.Funk,
        Enums.GenreString.Fusion,
        Enums.GenreString.GangstaRap,
        Enums.GenreString.Garage,
        Enums.GenreString.GermanFolk,
        Enums.GenreString.GermanPop,
        Enums.GenreString.GlamRock,
        Enums.GenreString.Gospel,
        Enums.GenreString.GothRock,
        Enums.GenreString.Grunge,
        Enums.GenreString.HairMetal,
        Enums.GenreString.Halk,
        Enums.GenreString.Halloween,
        Enums.GenreString.HardBop,
        Enums.GenreString.HardRock,
        Enums.GenreString.Hardcore,
        Enums.GenreString.HardcoreRap,
        Enums.GenreString.Hawaii,
        Enums.GenreString.Healing,
        Enums.GenreString.HeavyMetal,
        Enums.GenreString.HighClassical,
        Enums.GenreString.HipHopRap,
        Enums.GenreString.HipHop,
        Enums.GenreString.Holiday,
        Enums.GenreString.HolidayOther,
        Enums.GenreString.HonkyTonk,
        Enums.GenreString.House,
        Enums.GenreString.IDMExperimental,
        Enums.GenreString.Impressionist,
        Enums.GenreString.Indian,
        Enums.GenreString.IndianClassical,
        Enums.GenreString.IndianPop,
        Enums.GenreString.IndieRock,
        Enums.GenreString.IndoPop,
        Enums.GenreString.IndonesianReligious,
        Enums.GenreString.Industrial,
        Enums.GenreString.Instrumental,
        Enums.GenreString.JPop,
        Enums.GenreString.JamBands,
        Enums.GenreString.Japan,
        Enums.GenreString.JapanesePop,
        Enums.GenreString.Jazz,
        Enums.GenreString.JungleDrumNbass,
        Enums.GenreString.KPop,
        Enums.GenreString.Karaoke,
        Enums.GenreString.Kayokyoku,
        Enums.GenreString.Klezmer,
        Enums.GenreString.Korean,
        Enums.GenreString.KoreanClassical,
        Enums.GenreString.KoreanFolkPop,
        Enums.GenreString.KoreanHipHop,
        Enums.GenreString.KoreanIndie,
        Enums.GenreString.KoreanRock,
        Enums.GenreString.KoreanTradInstrumental,
        Enums.GenreString.KoreanTradSong,
        Enums.GenreString.KoreanTradTheater,
        Enums.GenreString.Latin,
        Enums.GenreString.LatinJazz,
        Enums.GenreString.LatinRap,
        Enums.GenreString.Lounge,
        Enums.GenreString.Lullabies,
        Enums.GenreString.MainstreamJazz,
        Enums.GenreString.MalaysianPop,
        Enums.GenreString.Mandopop,
        Enums.GenreString.ManillaSound,
        Enums.GenreString.Medieval,
        Enums.GenreString.Meditation,
        Enums.GenreString.MiddleEast,
        Enums.GenreString.Minimalism,
        Enums.GenreString.ModernComposition,
        Enums.GenreString.Motown,
        Enums.GenreString.MPB,
        Enums.GenreString.Musicals,
        Enums.GenreString.Nature,
        Enums.GenreString.NeoSoul,
        Enums.GenreString.NewAcoustic,
        Enums.GenreString.NewAge,
        Enums.GenreString.NewWave,
        Enums.GenreString.NorthAmerica,
        Enums.GenreString.Novelty,
        Enums.GenreString.OldSchoolRap,
        Enums.GenreString.Opera,
        Enums.GenreString.Orchestral,
        Enums.GenreString.OriginalPilipinoMusic,
        Enums.GenreString.OriginalScore,
        Enums.GenreString.OutlawCountry,
        Enums.GenreString.Pagode,
        Enums.GenreString.PinoyPop,
        Enums.GenreString.Polka,
        Enums.GenreString.Pop,
        Enums.GenreString.PopLatino,
        Enums.GenreString.PopRock,
        Enums.GenreString.PraiseAndWorship,
        Enums.GenreString.ProgRockArtRock,
        Enums.GenreString.Psychedelic,
        Enums.GenreString.Punk,
        Enums.GenreString.QuietStorm,
        Enums.GenreString.RAndBSoul,
        Enums.GenreString.Ragtime,
        Enums.GenreString.Raices,
        Enums.GenreString.Rap,
        Enums.GenreString.ReggaetonyHipHop,
        Enums.GenreString.RegionalIndian,
        Enums.GenreString.RegionalMexicano,
        Enums.GenreString.Relaxation,
        Enums.GenreString.Renaissance,
        Enums.GenreString.Rock,
        Enums.GenreString.RockAndRoll,
        Enums.GenreString.RockLatino,
        Enums.GenreString.Rockabilly,
        Enums.GenreString.Romantic,
        Enums.GenreString.RootsReggae,
        Enums.GenreString.RootsRock,
        Enums.GenreString.RussianChanson,
        Enums.GenreString.SalsayTropical,
        Enums.GenreString.Samba,
        Enums.GenreString.Sanat,
        Enums.GenreString.Sertanejo,
        Enums.GenreString.SingAlong,
        Enums.GenreString.SingerSongwriter,
        Enums.GenreString.Ska,
        Enums.GenreString.SmoothJazz,
        Enums.GenreString.SoftRock,
        Enums.GenreString.Soul,
        Enums.GenreString.Soundtrack,
        Enums.GenreString.SouthAfrica,
        Enums.GenreString.SouthAmerica,
        Enums.GenreString.SouthernGospel,
        Enums.GenreString.SouthernRock,
        Enums.GenreString.SpokenWord,
        Enums.GenreString.Standards,
        Enums.GenreString.StandupComedy,
        Enums.GenreString.Stories,
        Enums.GenreString.SufiAndGhazals,
        Enums.GenreString.Surf,
        Enums.GenreString.Swing,
        Enums.GenreString.TaiPop,
        Enums.GenreString.TaiwaneseFolk,
        Enums.GenreString.Tamil,
        Enums.GenreString.Techno,
        Enums.GenreString.TeenPop,
        Enums.GenreString.Telugu,
        Enums.GenreString.TexMex,
        Enums.GenreString.ThaiPop,
        Enums.GenreString.Thanksgiving,
        Enums.GenreString.TibetanNativeMusic,
        Enums.GenreString.TradJazz,
        Enums.GenreString.TraditionalBluegrass,
        Enums.GenreString.TraditionalCeltic,
        Enums.GenreString.TraditionalCountry,
        Enums.GenreString.TraditionalFolk,
        Enums.GenreString.TraditionalGospel,
        Enums.GenreString.TraditionalPop,
        Enums.GenreString.Trance,
        Enums.GenreString.Travel,
        Enums.GenreString.Trot,
        Enums.GenreString.TVSoundtrack,
        Enums.GenreString.UndergroundRap,
        Enums.GenreString.UrbanCowboy,
        Enums.GenreString.Vocal,
        Enums.GenreString.VocalJazz,
        Enums.GenreString.VocalPop,
        Enums.GenreString.WeddingMusic,
        Enums.GenreString.WestCoastRap,
        Enums.GenreString.World,
        Enums.GenreString.Worldbeat,
        Enums.GenreString.Zydeco,
    ];

    filteredOptions: Observable<string[]>;

    constructor(
        private content: ContentComponent
    ) { }

    ngOnInit() {
        this.filteredOptions = this.smartControl.valueChanges
            .startWith(null)
            .map(val => val ? this.filter(val) : this.options.slice());
        this.filteredOptions.subscribe((value) => this.mapSelectedGenre(value[0]));
    }

    filter(val: string): string[] {
        return this.options.filter(option =>
            option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    mapSelectedGenre(option) {
        const mg = MapGenre.getMappedGenre(option);
        this.content.mapGenre(this.message, mg);
    }

    selectorParam(text) {
        this.message = text;
    }
}