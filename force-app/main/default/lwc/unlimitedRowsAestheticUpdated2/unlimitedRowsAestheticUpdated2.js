import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPicklistValues from '@salesforce/apex/UnlimitedRowsAestheticControllersUpdated.getPickList';
import updateRecommendations2 from '@salesforce/apex/UnlimitedRowsAestheticControllersUpdated.updateRecommendations2';
import getRecommendations2 from '@salesforce/apex/UnlimitedRowsAestheticControllersUpdated.getRecommendations2';

export default class UnlimitedRowsAestheticUpdated2 extends LightningElement {
    @track listOfRecommendations = [];
    @api recordId;
    @api objectType = 'Hydrafacial_Treatment_s__c';
    @track isSaveDisabled = true;
    @track HydrafacialTreatmentTable = false;

    @track HydrafacialTreatmentLocationValues = [];
    @track HydrafacialTreatmentPicklistNamesList = ['Location__c'];

    @wire(getRecommendations2, { recId: '$recordId' })
    wiredRecommendations({ error, data }) {
        if (data) {
            this.listOfRecommendations = data.map((rec, index) => ({
                ...rec,
                index: index + 1,
                HydrafacialTreatmentLocationInputValue: rec.Location__c || '',
                HydrafacialTreatmentLocationValuesList: rec.Location__c ? rec.Location__c.split(';') : [],
                Cleanser__c: rec.Cleanser__c || '',
                Peel__c: rec.Peel__c || '',
                Serum__c: rec.Serum__c || '',
                Booster__c: rec.Booster__c || '',
                Moisturizer__c: rec.Moisturizer__c || '',
                Notes__c: rec.Notes__c || '',
                Location__c: rec.Location__c || '-'
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.listOfRecommendations = [];
            this.showToast('Error', 'Error loading recommendations: ' + error.body.message, 'error');
        }
    }

    connectedCallback() {
        if (this.objectType === 'Hydrafacial_Treatment_s__c') {
            this.HydrafacialTreatmentTable = true;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.HydrafacialTreatmentPicklistNamesList })
                .then((data) => {
                    if (data && data.Location__c) {
                        this.HydrafacialTreatmentLocationValues = data.Location__c;
                    }
                    this.initData();
                })
                .catch((error) => {
                    this.showToast('Error', 'Error loading picklist values: ' + error.body.message, 'error');
                });
        }
    }

    handleInputClick(event) {
        let index = parseInt(event.target.dataset.id);
        let fieldName = event.target.name;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, [fieldName]: !account[fieldName] };
            }
            return account;
        });
    }

    handleHydrafacialTreatmentLocationSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.HydrafacialTreatmentLocationValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    HydrafacialTreatmentLocationValuesList: selectedMembershipValArray,
                    Location__c: true // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;
    }

    handleRemoveHydrafacialTreatmentLocationPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id);
        let industryToRemove = event.target.closest('button').name;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.HydrafacialTreatmentLocationValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    HydrafacialTreatmentLocationValues: selectedMembershipValArray.join(';'),
                    HydrafacialTreatmentLocationValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false; // Adjust this logic based on your requirements
    }

    handleInputField(event, field) {
        const index = event.target.dataset.id;
        const value = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(rec => {
            if (rec.index === parseInt(index, 10)) {
                rec[field] = value;
            }
            return rec;
        });
    }

    createRecommendations2(event) {
        const recommendationsToUpdate = this.listOfRecommendations.map(rec => ({
            Id: rec.Id,
            Location__c: rec.HydrafacialTreatmentLocationValuesList.join(';'),
            Cleanser__c: rec.Cleanser__c,
            Peel__c: rec.Peel__c,
            Serum__c: rec.Serum__c,
            Booster__c: rec.Booster__c,
            Moisturizer__c: rec.Moisturizer__c,
            Notes__c: rec.Notes__c
        }));

        updateRecommendations2({ recommendations: recommendationsToUpdate })
            .then(() => {
                this.showToast('Success', 'Hydrafacial Treatment updated successfully.', 'success');
                // Optionally refresh data
            })
            .catch(error => {
                this.showToast('Error', 'Error updating records: ' + error.body.message, 'error');
            });
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(evt);
    }

    handleKeydown(event) {
        const invalidKeyCodes = [
            ...Array(26).fill(65).map((code, idx) => code + idx), // A-Z
            ...Array(26).fill(97).map((code, idx) => code + idx), // a-z
            ...Array(10).fill(48).map((code, idx) => code + idx), // 0-9
            ...Array(10).fill(96).map((code, idx) => code + idx), // Numpad 0-9
            32, // Space
            189, // Dash
            187, // Equals
            188, // Comma
            190, // Period
            191, // Slash
            192, // Backtick
            219, // Open bracket
            220, // Backslash
            221, // Close bracket
            222, // Single quote
            186, // Semicolon and colon (;:)
            46, // Delete
            8 // Backspace
        ];

        if (invalidKeyCodes.includes(event.keyCode)) {
            event.preventDefault();
        }
    }
}