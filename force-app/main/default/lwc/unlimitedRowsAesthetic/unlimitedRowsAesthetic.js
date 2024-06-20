import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPicklistValues from '@salesforce/apex/UnlimitedRowsAestheticControllers.getPickList';
import insertRecommendations from '@salesforce/apex/UnlimitedRowsAestheticControllers.insertRecommendations';
export default class UnlimitedRowsAesthetic extends LightningElement {
    
    @track listOfRecommendations = [];
    @api recordId = 'a1ODh000002Qf7yMAC';
    @api objectType = '';//Hydrafacial__c//IPL__c
 
    @track CoolSculptingTable = false;
    @track HydrafacialTable = false;
    @track ChemicalPeelTable = false;
    @track ThermageTreatmentTable = false;

    @track CoolSculptingAreaList = ['Area__c', 'Applicator__c'];
    @track 	Area__cValuess = '';
    @track Applicator__cValues = '';

    @track HydrafacialLocationList = ['Location__c'];
    @track Location__cValues = '';

    @track chemicalPeelLocationList = ['Location__c', 'Type__c', 'Cooling_Method__c', 'Instructions__c'];
    @track Location__cValues = '';
    @track Type__cValues = '';
    @track Cooling_Method__cValues = '';
    @track Instructions__cValues = '';

    @track ThermageTreatmentList = ['Pain_Management__c', 'Return_Pad_Area__c', 'Return_Pad_Moved_to__c'];
    @track Pain_Management__cValues = '';
    @track Return_Pad_Area__cValues = '';
    @track Return_Pad_Moved_to__cvalues = '';



 
    connectedCallback() {
        if (this.objectType == "Esthetician_Coolsculpting_s__c") {
            this.CoolSculptingTable = true;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.CoolSculptingAreaList})
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Area__c) {
                        console.log('runing data');
                        this.Area__cValuess = data.Area__c;
                        console.log('Area__cValuess: ' + this.Area__cValuess);
                    }
 
                    if (data && data.Applicator__c) {
                        console.log('runing data');
                        this.Applicator__cValues = data.Applicator__c;
                        console.log('Applicator__cValues: ' + this.Applicator__cValues);
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
        else if (this.objectType == "Hydrafacial_Treatment_s__c") {
            this.HydrafacialTable = true;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.HydrafacialLocationList })
                .then((data) => {
                    console.log('runing then');
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
        else if (this.objectType == "Chemical_Peel_Treatment_s__c") {
            this.ChemicalPeelTable = true;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.chemicalPeelLocationList})
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Location__c) {
                        console.log('runing data');
                        this.Location__cValues = data.Location__c;
                        console.log('Location__cValues: ' + this.Location__cValues);
                    }
                    if (data && data.Type__c) {
                        console.log('runing data');
                        this.Type__cValues = data.Type__c;
                        console.log('Type__cValues: ' + this.Type__cValues);
                    }
                    if (data && data.Cooling_Method__c) {
                        console.log('runing data');
                        this.Cooling_Method__cValues = data.Cooling_Method__c;
                        console.log('Cooling_Method__cValues: ' + this.Cooling_Method__cValues);
                    }
                    if (data && data.Instructions__c) {
                        console.log('runing data');
                        this.Instructions__cValues = data.Instructions__c;
                        console.log('Instructions__cValues: ' + this.Instructions__cValues);
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
         else if (this.objectType == "Thermage_Treatment_s__c") {
            this.ThermageTreatmentTable = true;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.ThermageTreatmentList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Pain_Management__c) {
                        console.log('runing data');
                        this.Pain_Management__cValues = data.Pain_Management__c;
                        console.log('Pain_Management__cValues: ' + this.Pain_Management__cValues);
                    }
                    if (data && data.Return_Pad_Area__c) {
                        console.log('runing data');
                        this.Return_Pad_Area__cValues = data.Return_Pad_Area__c;
                        console.log('Return_Pad_Area__cValues: ' + this.Return_Pad_Area__cValues);
                    }
                    if (data && data.Return_Pad_Moved_to__c) {
                        console.log('runing data');
                        this.Return_Pad_Moved_to__cValues = data.Return_Pad_Moved_to__c;
                        console.log('Return_Pad_Moved_to__cValues: ' + this.Return_Pad_Moved_to__cValues);
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
initData() {
    let listOfRecommendations = [];
    this.createRow(listOfRecommendations);
    this.listOfRecommendations = listOfRecommendations;
    console.log("list of accounts init :" + JSON.stringify(this.listOfRecommendations));
}
 
createRow(listOfRecommendations) {
    let accountObject = {
        index: listOfRecommendations.length > 0 ? listOfRecommendations[listOfRecommendations.length - 1].index + 1 : 1,

       
        Area__cValuess: '',
        Area__c: false,
        Area__cValuessList: [],
        Applicator__cValues: '',
        Applicator__c: false,
        Applicator__cValuesList: [],
        Number__c : '',
        Minutes__c : '',
        Notes__c : '',

        Location__cValues: '',
        Location__c: false,
        Location__cValuesList: [],
        Cleanser__c : '',
        Peel__c : '',
        Extractions__c: '',
        Serum__c : '',
        Booster__c : '',
        Moisturizer__c : '',
        Notes__c : '',

        Location__cValues: '',
        Location__c: false,
        Location__cValuesList: [],
        Type__cValues: '',
        Type__c: false,
        Type__cValuesList: [],
        Cooling_Method__cValues: '',
        Cooling_Method__c: false,
        Cooling_Method__cValuesList: [],
        Instructions__cValues: '',
        Instructions__c: false,
        Instructions__cValuesList: [],
        Peel__c : '',
        Duration__c : '',
        Notes__c : '',

        Pain_Management__cValues: '',
        Pain_Management__c: false,
        Pain_Management__cValuesList: [],
        Return_Pad_Area__cValues: '',
        Return_Pad_Area__c: false,
        Return_Pad_Area__cValuesList: [],
        Return_Pad_Moved_to__cValues: '',
        Return_Pad_Moved_to__c: false,
        Return_Pad_Moved_to__cValuesList: [],
        //Pre_Tx_Weight__c;
       // Pre_Tx_Measurement__c; 
       // Pre_Tx_Waist_at_Umbilicus__c; 
        Date__c: '',
        End__c: '',
        Start__c: '',
        Lot_c__c: '',



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
HandleCoolSculptAreaSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Area__cValuessList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Area__cValuessList: selectedMembershipValArray,
                Area__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
}
HandleCoolSculptAreaPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;
 
    console.log('index:H ' + index);
 
    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
 
            let selectedMembershipValArray = account.Area__cValuessList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Area__cValuess: selectedMembershipValArray.join(';'),
                Area__cValuessList: selectedMembershipValArray
            };
        }
        return account;
    });
}

HandleCoolSculptApplicatorSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Applicator__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Applicator__cValuesList: selectedMembershipValArray,
                Applicator__c: false 
            };
        }
        return account;
    });
}
HandleCoolSculptApplicatorPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;
 
    console.log('index:H ' + index);
 
    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
 
            let selectedMembershipValArray = account.Applicator__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Applicator__cValues: selectedMembershipValArray.join(';'),
                Applicator__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
}
HandleHydrafacialLocationSelect(event) {
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
HandleHydrafacialLocationPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
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
HandleChemicalPeelLocationSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' +fieldName);
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
HandleChemicalPeelLocationPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
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
HandleChemicalPeelTypeSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Type__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Type__cValuesList: selectedMembershipValArray,
                Type__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
}
HandleChemicalPeelTypePill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;
 
    console.log('index:H ' + index);
 
    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
 
            let selectedMembershipValArray = account.Type__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Type__cValues: selectedMembershipValArray.join(';'),
                Type__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
}
HandleChemicalPeelCoolingMethodSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Cooling_Method__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Cooling_Method__cValuesList: selectedMembershipValArray,
                Cooling_Method__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
}
HandleChemicalPeelCoolingMethodPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;
 
    console.log('index:H ' + index);
 
    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
 
            let selectedMembershipValArray = account.Cooling_Method__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Cooling_Method__cValues: selectedMembershipValArray.join(';'),
                Cooling_Method__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
}
HandleChemicalPeelInstructionsSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Instructions__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Instructions__cValuesList: selectedMembershipValArray,
                Instructions__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
}
HandleChemicalPeelInstructionsPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;
 
    console.log('index:H ' + index);
 
    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
 
            let selectedMembershipValArray = account.Instructions__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Instructions__cValues: selectedMembershipValArray.join(';'),
                Instructions__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
}
HandleThermageTreatmentPainManagementSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Pain_Management__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Pain_Management__cValuesList: selectedMembershipValArray,
                Pain_Management__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
}
HandleThermageTreatmentPainManagementPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;
 
    console.log('index:H ' + index);
 
    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
 
            let selectedMembershipValArray = account.Pain_Management__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Pain_Management__cValues: selectedMembershipValArray.join(';'),
                Pain_Management__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
}

HandleThermageTreatmentPadAreaSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Return_Pad_Area__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Return_Pad_Area__cValuesList: selectedMembershipValArray,
                Return_Pad_Area__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
}
HandleThermageTreatmentPadAreaPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;
 
    console.log('index:H ' + index);
 
    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
 
            let selectedMembershipValArray = account.Return_Pad_Area__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Return_Pad_Area__cValues: selectedMembershipValArray.join(';'),
                Return_Pad_Area__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
}


HandleThermageTreatmentReturnPadMovedToSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Return_Pad_Moved_to__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Return_Pad_Moved_to__cValuesList: selectedMembershipValArray,
                Return_Pad_Moved_to__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
}
HandleThermageTreatmentReturnPadMovedToPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;
 
    console.log('index:H ' + index);
 
    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
 
            let selectedMembershipValArray = account.Return_Pad_Moved_to__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Return_Pad_Moved_to__cValues: selectedMembershipValArray.join(';'),
                Return_Pad_Moved_to__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
}

 
 
handleInputNumber(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Number__c: newValue };
        }
        return account;
    });
}

handleInputMinutes(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Minutes__c: newValue };
        }
        return account;
    });
}
handleInputMinutes(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Notes__c: newValue };
        }
        return account;
    });
}


handleInputNumber(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Cleanser__c: newValue };
        }
        return account;
    });
}
handleInputNumber(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Peel__c: newValue };
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

handleInputNumber(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Serum__c: newValue };
        }
        return account;
    });
}
handleInputNumber(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Booster__c: newValue };
        }
        return account;
    });
}
handleInputNumber(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Moisturizer__c: newValue };
        }
        return account;
    });
}
handleInputNumber(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Notes__c: newValue };
        }
        return account;
    });
}
handleInputNumber(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Peel__c: newValue };
        }
        return account;
    });
}
handleInputNumber(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Duration__c: newValue };
        }
        return account;
    });
}
handleInputNumber(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Notes__c: newValue };
        }
        return account;
    });
}
  handleInputOnChange(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;
 
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Date__c: newValue };
            }
            return account;
        });
    }
    handleInputNumber(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Pre_Tx_Weight__c: newValue };
        }
        return account;
    });
}
   handleInputNumber(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Pre_Tx_Measurement__c: newValue };
        }
        return account;
    });
}
   handleInputNumber(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Pre_Tx_Waist_at_Umbilicus__c: newValue };
        }
        return account;
    });
}
  handleInputOnChange(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;
 
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Start__c: newValue };
            }
            return account;
        });
    }
      handleInputOnChange(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;
 
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, End__c: newValue };
            }
            return account;
        });
    }
    handleInputNumber(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;
 
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Lot_c__c: newValue };
        }
        return account;
    });
}


createRecommendations() {
    if (this.CoolSculptingTable == true) {
        let isValidationFailed = false;
        for (let i = 0; i < this.listOfRecommendations.length; i++) {
            if (this.listOfRecommendations[i].Area__cValuessList.length === 0) {
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
                    this.template.querySelector('c-custom-Toast').showToast('success', ' Cool Sculpting saved successfully.', 'utility:success', 10000);
                })
 
                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }
    }
        else if (this.HydrafacialTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Hydrafacial saved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }
            else if (this.ChemicalPeelTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'ChemicalPeel saved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }
          else if (this.ThermageTreatmentTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Thermage Treatment saved successfully.', 'utility:success', 10000);
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