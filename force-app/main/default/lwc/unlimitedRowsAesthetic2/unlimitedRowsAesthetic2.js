import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPicklistValues from '@salesforce/apex/UnlimitedRowsAestheticControllers.getPickList';
import insertRecommendations from '@salesforce/apex/UnlimitedRowsAestheticControllers.insertRecommendations';
 
export default class UnlimitedRowsAesthetic2 extends LightningElement {
 
    @track listOfRecommendations = [];
    @api recordId = 'a1ODh000002Qf7yMAC';
    @api objectType = '';//Hydrafacial__c//IPL__c
 
    @track FacialProcedureTable = false;
    @track IplTreatmentTable = false;
    @track SculpSureTreatmentTable = false;
 
    @track FacialProcedureList = ['Type__c', 'Location__c'];
    @track Type__cValues = '';
    @track Location__cValues = '';

    @track IplTreatmentList = ['Tx__c', 'Area__c', 'Handpiece__c', 'Sunscreen_App__c'];
    @track Tx__cValues = '';
    @track Area__cValues = '';
    @track Handpiece__cValues = '';
    @track Sunscreen_App__cValues = '';

    @track SculpSureTreatmentList = [];
 
 
 
    connectedCallback() {
        if (this.objectType == "Facial_Treatment_s__c") {
            this.FacialProcedureTable = true;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.FacialProcedureList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Type__c) {
                        console.log('runing data');
                        this.Type__cValues = data.Type__c;
                        console.log('Type__cValues: ' + this.Type__cValues);
                    }
 
                    if (data && data.Location__c) {
                        console.log('runing data');
                        this.Location__cValues = data.Location__c;
                        console.log('Location__cValues: ' + this.Location__cValues);
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
         else if (this.objectType == "IPL_Treatment_s__c") {
            this.IplTreatmentTable = true;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.IplTreatmentList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Tx__c) {
                        console.log('runing data');
                        this.Tx__cValues = data.Tx__c;
                        console.log('Tx__cValues: ' + this.Tx__cValues);
                    }
                    if (data && data.Area__c) {
                        console.log('runing data');
                        this.Area__cValues = data.Area__c;
                        console.log('Area__cValues: ' + this.Area__cValues);
                    }
                    if (data && data.Handpiece__c) {
                        console.log('runing data');
                        this.Handpiece__cValues = data.Handpiece__c;
                        console.log('Handpiece__cValues: ' + this.Handpiece__cValues);
                    }
                    if (data && data.Sunscreen_App__c) {
                        console.log('runing data');
                        this.Sunscreen_App__cValues = data.Sunscreen_App__c;
                        console.log('Sunscreen_App__cValues: ' + this.Sunscreen_App__cValues);
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
        else if (this.objectType == "Sculpsure_Treatments_s__c") {
            this.SculpSureTreatmentTable = true;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.SculpSureTreatmentList })
                .then((data) => {
                    console.log('runing then');
                   
                   
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
initData() {
    let listOfRecommendations = [];
    this.createRow(listOfRecommendations);
    this.listOfRecommendations = listOfRecommendations;
    console.log("list of accounts init :" + JSON.stringify(this.listOfRecommendations));
}
 
createRow(listOfRecommendations) {
    let accountObject = {
        index: listOfRecommendations.length > 0 ? listOfRecommendations[listOfRecommendations.length - 1].index + 1 : 1,
        //Fractional Laser
       
        Type__cValues: '',
        Type__c: false,
        Type__cValuesLists: [],
        Location__cValues: '',
        Location__c: false,
        Location__cValuesList: [],
        Cleanser__c : '',
        Toner__c : '',
        Steam__c : '',
        Extractions__c : '',
        Mask__c : '',
        Moisturizer__c : '',
        Notes__c : '',

        Tx__cValues: '',
        Tx__c: false,
        Tx__cValuesLists: [],
        Area__cValues: '',
        Area__c: false,
        Area__cValuesLists: [],
        Handpiece__cValues: '',
        Handpiece__c: false,
        Handpiece__cValuesLists: [],
        Sunscreen_App__cValues: '',
        Sunscreen_App__c: false,
        Sunscreen_App__cValuesLists: [],
        SkinTel_c__c : '',
        Baseline_Skintel_c__c : '',
        Joules_c__c : '',
        Pulse_Width_c__c : '',
        Last_Skintel__c : '',
        Notes__c : '',


        Tx_Area__c : '',
        Energy_in_Build__c : '',
        End_Build_Zone__c : '',
        Energy_Adj_Zo__c : '',
        PAC_1__c : '',
        PAC_2__c : '',
        PAC_3__c : '',
        PAC_4__c : '',

    };
    listOfRecommendations.push(accountObject);
    console.log("list of accounts createRow :" + JSON.stringify(this.listOfRecommendations));
}
 
addNewRow() {
    this.createRow(this.listOfRecommendations);
}
 
removeRow(event) {
    let toBeDeletedRowIndex = parseInt(event.target.name);
    let listOfRecommendations = this.listOfRecommendations.filter(account => account.index !== toBeDeletedRowIndex);
    this.listOfRecommendations = listOfRecommendations.map((account, idx) => ({ ...account, index: idx + 1 }));
    console.log("list of accounts removeRow :" + JSON.stringify(this.listOfRecommendations));
}

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
HandleFacialProcedureTypeSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Type__cValuesLists || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Type__cValuesLists: selectedMembershipValArray,
                Type__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
}
HandleFacialProcedureTypePill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); 
    let industryToRemove = event.target.closest('button').name;
 
    console.log('index:H ' + index);
 
    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
 
            let selectedMembershipValArray = account.Type__cValuesLists.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Type__cValues: selectedMembershipValArray.join(';'),
                Type__cValuesLists: selectedMembershipValArray
            };
        }
        return account;
    });
}

HandleFacialProcedureLocationSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Location__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Location__cValuesList: selectedMembershipValArray,
                Location__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
}
HandleFacialProcedureLocationPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); 
    let industryToRemove = event.target.closest('button').name;
 
    console.log('index:H ' + index);
 
    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
 
            let selectedMembershipValArray = account.Location__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Location__cValues: selectedMembershipValArray.join(';'),
                Location__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
}



HandleIplTreatmentTxSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Tx__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Tx__cValuesList: selectedMembershipValArray,
                Tx__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
}
HandleIplTreatmentTxPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); 
    let industryToRemove = event.target.closest('button').name;
 
    console.log('index:H ' + index);
 
    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
 
            let selectedMembershipValArray = account.Tx__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Tx__cValues: selectedMembershipValArray.join(';'),
                Tx__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
}
HandleIplTreatmentAreaSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Area__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Area__cValuesList: selectedMembershipValArray,
                Area__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
}
HandleIplTreatmentAreaPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); 
    let industryToRemove = event.target.closest('button').name;
 
    console.log('index:H ' + index);
 
    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
 
            let selectedMembershipValArray = account.Area__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Area__cValues: selectedMembershipValArray.join(';'),
                Area__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
}
HandleFacialIplTreatmentHandpieceSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Handpiece__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Handpiece__cValuesList: selectedMembershipValArray,
                Handpiece__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
}
HandleIplTreatmentHandpiecePill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); 
    let industryToRemove = event.target.closest('button').name;
 
    console.log('index:H ' + index);
 
    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
 
            let selectedMembershipValArray = account.Handpiece__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Handpiece__cValues: selectedMembershipValArray.join(';'),
                Handpiece__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
}
HandleIplTreatmentSunscreenAppSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Sunscreen_App__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Sunscreen_App__cValuesList: selectedMembershipValArray,
                Sunscreen_App__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
}
HandleIplTreatmentSunscreenAppPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); 
    let industryToRemove = event.target.closest('button').name;
 
    console.log('index:H ' + index);
 
    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
 
            let selectedMembershipValArray = account.Sunscreen_App__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Sunscreen_App__cValues: selectedMembershipValArray.join(';'),
                Sunscreen_App__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
}
 
 
handleInputFacialProcedureCleanser(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Cleanser__c: newValue };
        }
        return account;
    });
}
handleInputFacialProcedureToner(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Toner__c: newValue };
        }
        return account;
    });
}

changeSteamHandler(event) {
    console.log('This event is working');
    let index = parseInt(event.target.dataset.id);
    console.log('index==>',index);
    let newValue = event.target.value;
    console.log('newValue==>',newValue);
 
    let checkValue =  event.target.checked;
    console.log('checkValue==>',checkValue);
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Steam__c: checkValue };
        }
        return account;
    });
}
changeExtractionsHandler(event) {
    console.log('This event is working');
    let index = parseInt(event.target.dataset.id);
    console.log('index==>',index);
    let newValue = event.target.value;
    console.log('newValue==>',newValue);
 
    let checkValue =  event.target.checked;
    console.log('checkValue==>',checkValue);
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Extractions__c: checkValue };
        }
        return account;
    });
}
handleInputFacialProcedureMask(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Mask__c: newValue };
        }
        return account;
    });
}
handleInputFacialProcedureMoisturizer(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Moisturizer__c: newValue };
        }
        return account;
    });
}
handleInputFacialProcedureNotes(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Notes__c: newValue };
        }
        return account;
    });
}

////

handleInputIplTreatmentSkinTel(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, SkinTel_c__c: newValue };
        }
        return account;
    });
}
handleInputIplTreatmentBaselineSkintel(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Baseline_Skintel_c__c: newValue };
        }
        return account;
    });
}
handleInputIplTreatmentJoules(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Joules_c__c: newValue };
        }
        return account;
    });
}
handleInputIplTreatmentPulseWidth(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Pulse_Width_c__c: newValue };
        }
        return account;
    });
}
handleInputIplTreatmentLastSkinTel(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Last_Skintel__c: newValue };
        }
        return account;
    });
}
handleInputIplTreatmentNotes(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Notes__c: newValue };
        }
        return account;
    });
}
handleInputSculpSureTreatmentTxArea(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Tx_Area__c: newValue };
        }
        return account;
    });
}
handleInputSculpSureTreatmentEnergyInBuild(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Energy_in_Build__c: newValue };
        }
        return account;
    });
}
handleInputSculpSureTreatmentEndBuildZone(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, End_Build_Zone__c: newValue };
        }
        return account;
    });
}
handleInputSculpSureTreatmentEnergyAdj(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Energy_Adj_Zo__c: newValue };
        }
        return account;
    });
}
handleInputSculpSureTreatmentPac1(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, PAC_1__c: newValue };
        }
        return account;
    });
}
handleInputSculpSureTreatmentPac2(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, PAC_2__c: newValue };
        }
        return account;
    });
}
handleInputSculpSureTreatmentPac3(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, PAC_3__c: newValue };
        }
        return account;
    });
}
handleInputSculpSureTreatmentPac4(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, PAC_4__c: newValue };
        }
        return account;
    });
}
 
 
createRecommendations() {
    if (this.FacialProcedureTable == true) {
        let isValidationFailed = false;
        for (let i = 0; i < this.listOfRecommendations.length; i++) {
            if (this.listOfRecommendations[i].Type__cValuesLists.length === 0) {
                isValidationFailed = true;
                break;
            }
        }
        if (isValidationFailed) {
            this.template.querySelector('c-custom-Toast').showToast(
                'error',
                ' Fractional Laser Area is required to fill.',
                'utility:error',
                3000
            );
            return;
        }
        if (!isValidationFailed) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Facial Procedure saved successfully.', 'utility:success', 10000);
                })
 
                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }
    }
     else if (this.IplTreatmentTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'IplTreatment saved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }
        else if (this.SculpSureTreatmentTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'SculpSure Treatment saved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }
    this.initData();
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