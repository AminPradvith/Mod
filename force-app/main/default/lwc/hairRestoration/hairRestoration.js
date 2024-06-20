import { LightningElement, api, track, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
//import saveMultipleConsults from '@salesforce/apex/restorationClass.saveMultipleConsults';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';

// import CONSULT_OBJECT from '@salesforce/schema/Hair_Restoration_consult__c';
// import FUT_VS_FUE_FIELD from '@salesforce/schema/Hair_Restoration_consult__c.HPI_FUT_vs_FUE__c';
// import GRAFTS_FIELD from '@salesforce/schema/Hair_Restoration_consult__c.HPI_No_of_Grafts__c';
// import YEAR_FIELD from '@salesforce/schema/Hair_Restoration_consult__c.HPI_Year__c';
// import SURGEON_FIELD from '@salesforce/schema/Hair_Restoration_consult__c.HPI_Surgeon__c';
// import Restore from '@salesforce/apex/restorationClass.Restore';

export default class AddMultipleConsults extends LightningElement {
    @api recordId;
    @track consults = [];
    isLoading = false;

    @wire(getObjectInfo, { objectApiName: CONSULT_OBJECT })
    consultObjectInfo;

    @wire(getPicklistValues, { recordTypeId: '$consultObjectInfo.data.defaultRecordTypeId', fieldApiName: GENDER_IDENTITY_FIELD })
    genderPicklistValues;

    get getGenderPicklistValues() {
        return this.genderPicklistValues?.data?.values;
    }

    connectedCallback() {
        this.addNewClickHandler();
    }

    addNewClickHandler(event) {
        this.consults.push({
            tempId: Date.now()
        })
    }

    deleteClickHandler(event) {
        if (this.consults.length == 1) {
            this.showToast('You cannot delete the last consult.');
            return;
        }
        let tempId = event.target?.dataset.tempId;
        this.consults = this.consults.filter(a => a.tempId != tempId);
    }

    elementChangeHandler(event) {
        let consultRow = this.consults.find(a => a.tempId == event.target.dataset.tempId);
        if (consultRow) {
            consultRow[event.target.name] = event.target?.value;
        }
    }

    async submitClickHandler(event) {
        const allValid = this.checkControlsValidity();
        if (allValid) {
            this.isLoading = true;
            this.consults.forEach(a => a.AccountId = this.recordId);
            let response = await saveMultipleConsults({ consults: this.consults });
            if (response.isSuccess) {
                this.showToast('Consults saved successfully', 'Success', 'success');
                this.dispatchEvent(new CloseActionScreenEvent());
            }
            else {
                this.showToast('Something went wrong while saving consults - ' + response.message);
            }
            this.isLoading = false;
        }
        else {
            this.showToast('Please correct the errors below to proceed further.');
        }
    }

    checkControlsValidity() {
        let isValid = true,
            controls = this.template.querySelectorAll('lightning-input, lightning-combobox');

        controls.forEach(field => {
            if (!field.checkValidity()) {
                field.reportValidity();
                isValid = false;
            }
        });
        return isValid;
    }

    showToast(message, title = 'Error', variant = 'error') {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
}