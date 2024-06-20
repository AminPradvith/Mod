import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPicklistValues from '@salesforce/apex/UnlimitedRowsAestheticControllers.getPickList';
import getRecommendations from '@salesforce/apex/UnlimitedRowsAestheticControllersUpdated.getRecommendations';
import updateRecommendations from '@salesforce/apex/UnlimitedRowsAestheticControllersUpdated.updateRecommendations';
 
export default class UnlimitedRowsAestheticUpdated extends LightningElement {
 
    @track listOfRecommendations = [];
    @api recordId ;
    @api objectType = 'Esthetician_Coolsculpting_s__c';
    @track isSaveDisabled =true;
    @track CoolSculptAestheticianTable = false;
 
    
    //Esthetician_Coolsculpting_s__c multiselct values list
    @track CoolSculptAestheticianAreaValues = [];
    @track CoolSculptAestheticianApplicatorValues = [];
    @track CoolSculptAestheticianPicklistNamesList = ['Area__c', 'Applicator__c'];
 
   
 
 
    @wire(getRecommendations, { recId: '$recordId' })
    wiredRecommendations({ error, data }) {
        if (data) {
            this.listOfRecommendations = data.map((rec, index) => ({
                ...rec,
                index: index + 1,
                CoolSculptAestheticianAreaInputValue: rec.Area__c || '',
                CoolSculptAestheticianAreaInputValue: rec.Applicator__c || '',
                CoolSculptAestheticianAreaValuesList: rec.Area__c ? rec.Area__c.split(';') : [],
                CoolSculptAestheticianApplicatorValuesList: rec.Applicator__c ? rec.Applicator__c.split(';') : [],
                Number__c: rec.Number__c || '',
                Minutes__c: rec.Minutes__c || '',
                Notes__c: rec.Notes__c || '',
                Area__c : (rec.Area__c !=null && rec.Area__c != undefined && rec.Area__c != '' ? rec.Area__c : '-')
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.listOfRecommendations = [];
        }
    }
 
 
 
 
 
 connectedCallback() {
        if (this.objectType === "Esthetician_Coolsculpting_s__c") {
            this.CoolSculptAestheticianTable = true;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.CoolSculptAestheticianPicklistNamesList })
                .then((data) => {
                    if (data && data.Area__c) {
                        this.CoolSculptAestheticianAreaValues = data.Area__c;
                    }
                    if (data && data.Applicator__c) {
                        this.CoolSculptAestheticianApplicatorValues = data.Applicator__c;
                    }
                    this.initData();
                })
                .catch((error) => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error loading picklist values',
                            message: error.body.message,
                            variant: 'error',
                        })
                    );
                });
        }
    }
 
 
    ///Universal Picklist input Function
    handleInputClick(event) {
        console.log('handleInputClick running');
        let index = parseInt(event.target.dataset.id);
        let fieldName = event.target.name;
 
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, [fieldName]: !account[fieldName] };
            }
            return account;
        });
    }
 
 
 
 
    handleCoolSculptAestheticianAreaSelect(event) {
        
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.CoolSculptAestheticianAreaValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    CoolSculptAestheticianAreaValuesList: selectedMembershipValArray,
                    Area__c: true // Close the dropdown after selection
                };
 
            }
            return account;
 
        });
        this.isSaveDisabled = false;
 
 
 
    }
 
 
    handleRemoveCoolSculptAestheticianAreaPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;
 
        console.log('index:H ' + index);
 
        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
 
                let selectedMembershipValArray = account.CoolSculptAestheticianAreaValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    CoolSculptAestheticianAreaValues: selectedMembershipValArray.join(';'),
                    CoolSculptAestheticianAreaValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        if(!CoolSculptAestheticianAreaValuesList.isEmpty()){
            this.isSaveDisabled = false;
        }
        
 
    }
 
    handleCoolSculptAestheticianApplicatorSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.CoolSculptAestheticianApplicatorValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    CoolSculptAestheticianApplicatorValuesList: selectedMembershipValArray,
                    Applicator__c: true // Close the dropdown after selection
                };
            }
            return account;
        });
        
            this.isSaveDisabled = false;
        
 
    }
 
    handleRemoveCoolSculptAestheticianApplicatorPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;
 
        console.log('index:H ' + index);
 
        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
 
                let selectedMembershipValArray = account.CoolSculptAestheticianApplicatorValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    CoolSculptAestheticianApplicatorValues: selectedMembershipValArray.join(';'),
                    CoolSculptAestheticianApplicatorValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;
 
    }
 
    handleNumberChange(event) {
        const index = event.target.dataset.id;
        const value = event.target.value;
        this.listOfRecommendations = this.listOfRecommendations.map(rec => {
            if (rec.index === parseInt(index, 10)) {
                rec.Number__c = value;
            }
            return rec;
        });
    }
 
    handleMinutesChange(event) {
        const index = event.target.dataset.id;
        const value = event.target.value;
        this.listOfRecommendations = this.listOfRecommendations.map(rec => {
            if (rec.index === parseInt(index, 10)) {
                rec.Minutes__c = value;
            }
            return rec;
        });
    }
       handleNotesChange(event) {
        const index = event.target.dataset.id;
        const value = event.target.value;
        this.listOfRecommendations = this.listOfRecommendations.map(rec => {
            if (rec.index === parseInt(index, 10)) {
                rec.Notes__c = value;
            }
            return rec;
        });
    }
 
 
 
    createRecommendations(event) {
        console.log('1');
 
        const recommendationsToUpdate = this.listOfRecommendations.map(rec => ({
            Id: rec.Id,
            
            Area__c: rec.CoolSculptAestheticianAreaValuesList.join(';'),
            Applicator__c: rec.CoolSculptAestheticianApplicatorValuesList.join(';'),
            Number__c: rec.Number__c,
            Minutes__c: rec.Minutes__c,
            Notes__c: rec.Notes__c,
 
 
 
        }));
        console.log(' recommendationsToUpdate '+ recommendationsToUpdate.Id);
 
        updateRecommendations({ recommendations: recommendationsToUpdate })
        .then(() => {
            this.template.querySelector('c-custom-Toast').showToast('success', 'Aesthetic Consult Recommendations update successfully.', 'utility:success', 10000);
            // Optionally refresh data
        })
        .catch(error => {
            this.showToast('Error', 'Error updating records: ' + error.body.message, 'error');
        });
         
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
            222,  // Single quote
            186, // Semicolon and colon (;:)
            46,//delete
            8 //backspace
        ];
 
        if (invalidKeyCodes.includes(event.keyCode)) {
            event.preventDefault();
        }
    }
}