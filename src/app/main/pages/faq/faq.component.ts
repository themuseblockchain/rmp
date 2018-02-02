import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { FaqService } from './faq.service';
import { Utils } from '../../../core/utils';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector   : 'faq',
    templateUrl: './faq.component.html',
    styleUrls  : ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy
{
    faqs: any;
    faqsFiltered: any;
    step = 0;
    searchInput;
    onFaqsChanged: Subscription;

    constructor(private faqService: FaqService)
    {
        this.searchInput = new FormControl('');
    }

    ngOnInit()
    {
        this.onFaqsChanged =
            this.faqService.onFaqsChanged
                .subscribe(response => {
                    this.faqs = response;
                    this.faqsFiltered = response;
                });

        this.searchInput.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchText => {
                this.faqsFiltered = Utils.filterArrayByString(this.faqs, searchText);
            });
    }

    setStep(index: number)
    {
        this.step = index;
    }

    nextStep()
    {
        this.step++;
    }

    prevStep()
    {
        this.step--;
    }

    ngOnDestroy()
    {
        this.onFaqsChanged.unsubscribe();
    }
}
