import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPicklistValues from '@salesforce/apex/UnlimitedRowsDynamicUiController.getPickList';
import insertRecommendations from '@salesforce/apex/UnlimitedRowsDynamicUiController.insertRecommendations';
export default class UnlimitedRowsDynamicUi2 extends LightningElement {
    @track listOfRecommendations = [];
    @api recordId = [];
    @api objectType ;//Botox_Dysport__c//Emsculpt__c//Facial__c
    @track BotoxDysportTable = false;
    @track DermalFillerTable = false;
    @track EmsculptTable = false;
    @track FacialTable = false;
    @track isSaveDisabled = true;

    @track BotoxPicklistNamesList = ['Botox_Dysport_Injectable_Procedure_Area__c', 'Botox_Dysport_Procedure_Injectable__c', 'Botox_Dysport_Procedure_Reconstituted__c'];
    @track Botox_Dysport_Injectable_Procedure_Area__cValues = [];
    @track Botox_Dysport_Procedure_Injectable__cValues = [];
    @track Botox_Dysport_Procedure_Reconstituted__cValues = [];
    // Botox End

    //DermalFiller Start
    @track DermalFillerPicklistNamesList = ['Dermal_Filler_Procedure_Area__c', 'Dermal_Filler_Procedure_Injectable__c', 'Dermal_Filler_Procedure_Reconstituted__c'];
    @track Dermal_Filler_Procedure_Area__cValues = [];
    @track Dermal_Filler_Procedure_Injectable__cValues = [];
    @track Dermal_Filler_Procedure_Reconstituted__cValues = [];
    //DermalFiller End

    //Emsculpt Start
    @track EmsculptPicklistNamesList = ['Emsculpt_body_area__c','Emsculpt_Tx_Time__c'];
    @track Emsculpt_body_area__cValues = [];
    @track Emsculpt_Tx_Time__cValues =[];
    //Emsculpt End

    //Facial Start
    @track FacialPicklistNamesList = ['Facial_Location__c', 'Facial_Type__c'];
    @track Facial_Location__cValues = [];
    @track Facial_Type__cValues = [];
    //Facial End


    connectedCallback() {
        console.log("recordId: " + this.recordId);
        if (this.objectType == "Botox_Dysport_S__c") {
            this.BotoxDysportTable = true;
           
            console.log('object then');
            getPicklistValues({ objApi: this.objectType, fieldApis: this.BotoxPicklistNamesList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Botox_Dysport_Injectable_Procedure_Area__c) {
                        console.log('runing data');
                        this.Botox_Dysport_Injectable_Procedure_Area__cValues = data.Botox_Dysport_Injectable_Procedure_Area__c;
                        console.log('Botox_Dysport_Injectable_Procedure_Area__cValues: ' + this.Botox_Dysport_Injectable_Procedure_Area__cValues);
                    }

                    if (data && data.Botox_Dysport_Procedure_Injectable__c) {
                        console.log('runing data');
                        this.Botox_Dysport_Procedure_Injectable__cValues = data.Botox_Dysport_Procedure_Injectable__c;
                        console.log('Botox_Dysport_Procedure_Injectable__cValues: ' + this.Botox_Dysport_Procedure_Injectable__cValues);
                    }
                    if (data && data.Botox_Dysport_Procedure_Reconstituted__c) {
                        console.log('runing data');
                        this.Botox_Dysport_Procedure_Reconstituted__cValues = data.Botox_Dysport_Procedure_Reconstituted__c;
                        console.log('Botox_Dysport_Procedure_Reconstituted__cValues: ' + this.Botox_Dysport_Procedure_Reconstituted__cValues);
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
        //Botox End

        else if (this.objectType == "Dermal_Filler_S__c") {
            this.DermalFillerTable = true;
         
            console.log('object then');
            getPicklistValues({ objApi: this.objectType, fieldApis: this.DermalFillerPicklistNamesList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Dermal_Filler_Procedure_Area__c) {
                        console.log('runing data');
                        this.Dermal_Filler_Procedure_Area__cValues = data.Dermal_Filler_Procedure_Area__c;
                        console.log('Dermal_Filler_Procedure_Area__cValues: ' + this.Dermal_Filler_Procedure_Area__cValues);
                    }

                    if (data && data.Dermal_Filler_Procedure_Injectable__c) {
                        console.log('runing data');
                        this.Dermal_Filler_Procedure_Injectable__cValues = data.Dermal_Filler_Procedure_Injectable__c;
                        console.log('Dermal_Filler_Procedure_Injectable__cValues: ' + this.Dermal_Filler_Procedure_Injectable__cValues);
                    }
                    if (data && data.Dermal_Filler_Procedure_Reconstituted__c) {
                        console.log('runing data');
                        this.Dermal_Filler_Procedure_Reconstituted__cValues = data.Dermal_Filler_Procedure_Reconstituted__c;
                        console.log('Dermal_Filler_Procedure_Reconstituted__cValues: ' + this.Dermal_Filler_Procedure_Reconstituted__cValues);
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

        else if (this.objectType == "Emsculpt_S__c") {
           this.EmsculptTable = true;
            console.log('object then');
            getPicklistValues({ objApi: this.objectType, fieldApis: this.EmsculptPicklistNamesList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Emsculpt_body_area__c) {
                        console.log('runing data');
                        this.Emsculpt_body_area__cValues = data.Emsculpt_body_area__c;
                        console.log('Emsculpt_body_area__cValues: ' + this.Emsculpt_body_area__cValues);
                    }

                    if (data && data.Emsculpt_Tx_Time__c) {
                        console.log('runing data');
                        this.Emsculpt_Tx_Time__cValues = data.Emsculpt_Tx_Time__c;
                        console.log('Emsculpt_Tx_Time__cValues: ' + this.Emsculpt_Tx_Time__cValues);
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

        else if (this.objectType == "Facial_S__c") {
            this.FacialTable = true;
            console.log('object then');
            getPicklistValues({ objApi: this.objectType, fieldApis: this.FacialPicklistNamesList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Facial_Type__c) {
                        console.log('runing data');
                        this.Facial_Type__cValues = data.Facial_Type__c;
                        console.log('Facial_Type__cValues: ' + this.Facial_Type__cValues);
                    }
                    if (data && data.Facial_Location__c) {
                        console.log('runing data');
                        this.Facial_Location__cValues = data.Facial_Location__c;
                        console.log('Facial_Location__cValues: ' + this.Facial_Location__cValues);
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
            /*Botox_Dysport Field starts*/
            Botox_Dysport_Injectable_Procedure_Area__cValues: '',
            Botox_Dysport_Injectable_Procedure_Area__c: false,
            Botox_Dysport_Injectable_Procedure_Area__cValuesList: [],
            Botox_Dysport_Procedure_Injectable__cValues: '',
            Botox_Dysport_Procedure_Injectable__c: false,
            Botox_Dysport_Procedure_Injectable__cValuesList: [],
            Botox_Dysport_Procedure_Units_Syringes__c: '',
            Botox_Dysport_Procedure_Reconstituted__cValues: '',
            Botox_Dysport_Procedure_Reconstituted__c: false,
            Botox_Dysport_Procedure_Reconstituted__cValuesList: [],
            Botox_Dysport_Procedure_Lot__c: '',
            Botox_Dysport_Procedure_Expiration__c: '',
            /* Botox_Dysport field Ends*/
            Dermal_Filler_Procedure_Area__cValues: '',
            Dermal_Filler_Procedure_Area__c: false,
            Dermal_Filler_Procedure_Area__cValuesList: [],
            Dermal_Filler_Procedure_Injectable__cValues: '',
            Dermal_Filler_Procedure_Injectable__c: false,
            Dermal_Filler_Procedure_Injectable__cValuesList: [],
            Dermal_Filler_Procedure_Units_Syringes__c: '',
            Dermal_Filler_Procedure_Reconstituted__cValues: '',
            Dermal_Filler_Procedure_Reconstituted__c: false,
            Dermal_Filler_Procedure_Reconstituted__cValuesList: [],
            Dermal_Filler_Procedure_Lot__c: '',
            Dermal_Filler_Procedure_Expiration__c: '',
            // Dermal Filler End

            //Emsculpt Start
            Emsculpt_body_area__cValues: '',
            Emsculpt_body_area__c: false,
            Emsculpt_body_area__cValuesList: [],
            Emsculpt_Notes__c: '',
            Emsculpt_Power_Used__c: '',
            Emsculpt_Tx_Time__cValues: '',
            Emsculpt_Tx_Time__c: false,
            Emsculpt_Tx_Time__cValuesList: [],
            Emsculpt_date__c: '',
            //Emsculpt End

            //FAcial Start
            Facial_Type__cValues: '',
            Facial_Type__c: false,
            Facial_Type__cValuesList: [],
            Facial_Location__cValues: '',
            Facial_Location__c: false,
            Facial_Location__cValuesList: [],
            Facial_Cleanser__c: '',
            Facial_Toner__c: '',
            Facial_Steam__c: false,
            Facial_Extractions__c: false,
            Facial_Mask__c: '',
            Facial_Moisturizer__c: '',
            Facial_Notes__c: '',
/// Facial End

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

    //Area Picklist
    handleBotox_Dysport_Injectable_Procedure_Area__cSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Botox_Dysport_Injectable_Procedure_Area__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Botox_Dysport_Injectable_Procedure_Area__cValuesList: selectedMembershipValArray,
                    Botox_Dysport_Injectable_Procedure_Area__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveBotox_Dysport_Injectable_Procedure_Area__cPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Botox_Dysport_Injectable_Procedure_Area__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Botox_Dysport_Injectable_Procedure_Area__cValues: selectedMembershipValArray.join(';'),
                    Botox_Dysport_Injectable_Procedure_Area__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Area Picklist Ends


    //Injectable Picklist Start
    Botox_Dysport_Procedure_Injectable__cSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Botox_Dysport_Procedure_Injectable__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Botox_Dysport_Procedure_Injectable__cValuesList: selectedMembershipValArray,
                    Botox_Dysport_Procedure_Injectable__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveBotox_Dysport_Procedure_Injectable__cPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Botox_Dysport_Procedure_Injectable__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Botox_Dysport_Procedure_Injectable__cValues: selectedMembershipValArray.join(';'),
                    Botox_Dysport_Procedure_Injectable__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Injectable Picklist Ends

    //UnitsSyringes Start
    handleInputUnitsSyringes(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Botox_Dysport_Procedure_Units_Syringes__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //UnitsSyringes End


    //Reconstituted Picklist Start
    handleBotox_Dysport_Procedure_Reconstituted__cSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Botox_Dysport_Procedure_Reconstituted__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Botox_Dysport_Procedure_Reconstituted__cValuesList: selectedMembershipValArray,
                    Botox_Dysport_Procedure_Reconstituted__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveBotox_Dysport_Procedure_Reconstituted__cPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Botox_Dysport_Procedure_Reconstituted__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Botox_Dysport_Procedure_Reconstituted__cValues: selectedMembershipValArray.join(';'),
                    Botox_Dysport_Procedure_Reconstituted__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Reconstituted Picklist Ends

    //Lot Start
    handleInputLot(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Botox_Dysport_Procedure_Lot__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Lot End

    //Expiration Start
    handleInputExpiration(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Botox_Dysport_Procedure_Expiration__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Expiration End

    //DermalFiller Start////

    //Area Picklist
    handleDermal_Filler_Procedure_Area__cSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Dermal_Filler_Procedure_Area__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Dermal_Filler_Procedure_Area__cValuesList: selectedMembershipValArray,
                    Dermal_Filler_Procedure_Area__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveDermal_Filler_Procedure_Area__cPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Dermal_Filler_Procedure_Area__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Dermal_Filler_Procedure_Area__cValues: selectedMembershipValArray.join(';'),
                    Dermal_Filler_Procedure_Area__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Area Picklist Ends


    //Injectable Picklist Start
    Dermal_Filler_Procedure_Injectable__cSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Dermal_Filler_Procedure_Injectable__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Dermal_Filler_Procedure_Injectable__cValuesList: selectedMembershipValArray,
                    Dermal_Filler_Procedure_Injectable__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveDermal_Filler_Procedure_Injectable__cPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Dermal_Filler_Procedure_Injectable__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Dermal_Filler_Procedure_Injectable__cValues: selectedMembershipValArray.join(';'),
                    Dermal_Filler_Procedure_Injectable__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Injectable Picklist Ends

    //UnitsSyringes Start
    handleInputDermalfillerUnitsSyringes(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Dermal_Filler_Procedure_Units_Syringes__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //UnitsSyringes End


    //Reconstituted Picklist Start
    handleDermal_Filler_Procedure_Reconstituted__cSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Dermal_Filler_Procedure_Reconstituted__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Dermal_Filler_Procedure_Reconstituted__cValuesList: selectedMembershipValArray,
                    Dermal_Filler_Procedure_Reconstituted__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveDermal_Filler_Procedure_Reconstituted__cPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Dermal_Filler_Procedure_Reconstituted__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Dermal_Filler_Procedure_Reconstituted__cValues: selectedMembershipValArray.join(';'),
                    Dermal_Filler_Procedure_Reconstituted__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Reconstituted Picklist Ends

    //Lot Start
    handleInputDermalFillerLot(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Dermal_Filler_Procedure_Lot__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Lot End

    //Expiration Start
    handleInputDermalFillerExpiration(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Dermal_Filler_Procedure_Expiration__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Expiration End
    //Emsculpt date start
    handleEmsculpt_date__cChange(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Emsculpt_date__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Date End

    //Body Area Start
    handleEmsculpt_body_area__cSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Emsculpt_body_area__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Emsculpt_body_area__cValuesList: selectedMembershipValArray,
                    Emsculpt_body_area__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveEmsculpt_body_area__cPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Emsculpt_body_area__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Emsculpt_body_area__cValues: selectedMembershipValArray.join(';'),
                    Emsculpt_body_area__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Body Area End

    //Time Start

    handleEmsculpt_Tx_Time__cSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Emsculpt_Tx_Time__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Emsculpt_Tx_Time__cValuesList: selectedMembershipValArray,
                    Emsculpt_Tx_Time__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveEmsculpt_Tx_Time__cPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Emsculpt_Tx_Time__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Emsculpt_Tx_Time__cValues: selectedMembershipValArray.join(';'),
                    Emsculpt_Tx_Time__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Time End

    //PowerUsed Start

    handleInputEmsculpt_Power_Used__c(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Emsculpt_Power_Used__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //PowerUsed End

    //Notes Start


    handleInputEmsculpt_Notes__c(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Emsculpt_Notes__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Notes End
/// Facial Type
handleFacial_Type__cSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Facial_Type__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Facial_Type__cValuesList: selectedMembershipValArray,
                Facial_Type__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

handleRemoveFacial_Type__cPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;

    console.log('index:H ' + index);

    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {

            let selectedMembershipValArray = account.Facial_Type__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Facial_Type__cValues: selectedMembershipValArray.join(';'),
                Facial_Type__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}
// Facial type end

//Facial Location
Facial_Location__cSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Facial_Location__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Facial_Location__cValuesList: selectedMembershipValArray,
                Facial_Location__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

handleRemoveFacial_Location__cPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;

    console.log('index:H ' + index);

    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {

            let selectedMembershipValArray = account.Facial_Location__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Facial_Location__cValues: selectedMembershipValArray.join(';'),
                Facial_Location__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}
//Location End

// cleanser 
handleInputFacial_Cleanser__c(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;

    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Facial_Cleanser__c: newValue };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

handleInputFacial_Toner__c(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;

    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Facial_Toner__c: newValue };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

changeStemHandler(event) {
    console.log('This event is working');
    let index = parseInt(event.target.dataset.id);
    console.log('index==>',index);
    let newValue = event.target.value;
    console.log('newValue==>',newValue);

    let checkValue =  event.target.checked;
    console.log('checkValue==>',checkValue);

    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Facial_Steam__c: checkValue };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

changeExtractionHandler(event) {
    console.log('This event is working');
    let index = parseInt(event.target.dataset.id);
    console.log('index==>',index);
    let newValue = event.target.value;
    console.log('newValue==>',newValue);

    let checkValue =  event.target.checked;
    console.log('checkValue==>',checkValue);

    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Facial_Extractions__c: checkValue };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

handleInputFacial_Mask__c(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;

    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Facial_Mask__c: newValue };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

handleInputFacial_Moisturizer__c(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;

    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Facial_Moisturizer__c: newValue };
        }
        return account;
    });
    this.isSaveDisabled = false;

}


handleInputFacial_Notes__c(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;

    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Facial_Notes__c: newValue };
        }
        return account;
    });
    this.isSaveDisabled = false;

}
    createRecommendations() {
        if (this.BotoxDysportTable == true) {
            let isValidationFailed = false;
            for (let i = 0; i < this.listOfRecommendations.length; i++) {
                
            }
           
            if (!isValidationFailed) {
                insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                    .then(async (data) => {
                        this.initData();
                        this.template.querySelector('c-custom-Toast').showToast('success', 'Botox/Dysport saved successfully.', 'utility:success', 10000);
                    })

                    .catch(error => {
                        this.ShowSpinner = false;
                        this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                    });
            }
        }
        else if (this.DermalFillerTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Dermal Filler saved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }

        else if (this.EmsculptTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Emsclpt saved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }

        else if (this.FacialTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Facial saved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }


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