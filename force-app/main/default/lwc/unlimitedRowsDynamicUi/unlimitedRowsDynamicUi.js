import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPicklistValues from '@salesforce/apex/UnlimitedRowsDynamicUiController.getPickList';
import insertRecommendations from '@salesforce/apex/UnlimitedRowsDynamicUiController.insertRecommendations';

export default class UnlimitedRecordInsertLWC extends LightningElement {
    @track listOfRecommendations = [];
    @api recordId ;
    @api objectType = 'Recommendations_for_Aesthetic_consult__c';//Hair_Restoration_consult__c
    @track isSaveDisabled =true;
    @track RecommendationsTable = false;
    @track HairConsultTable = false;
    @track TattooRemovalTable = false;
    //Aesthetic_Consult_Recommendations__c multiselct values list 
    @track MembershipValues = [];
    @track ProductValues = [];
    @track TreatmentValues = [];
    @track AreaValues = [];
    @track RecommendationsPicklistNamesList = ['Aesthetic_consult_Membership__c', 'Aesthetic_consult_Products__c', 'Aesthetic_consult_Treatments__c', 'Aesthetic_consult_Area__c'];
    @track HairConsultPicklistNameList = ['HPI_FUT_vs_FUE__c'];
    @track HPI_FUT_vs_FUE__cValues = [];
    @track TattooRemovelNamesList = ['Tattoo_Removal_Skin_Type__c','Tattoo_Removal_Location__c','Tattoo_Removal_Amount_of_Ink__c','Tattoo_Removal_Ink_Layering__c','Tattoo_Removal_Scarring_Tissue_Change__c','Tattoo_Removal_Colors__c','Tattoo_Removal_Tattoo_Type__c','Tattoo_Removal_Age__c','Tattoo_Removal_Size__c'];
    @track Tattoo_Removal_Skin_Type__cValues =[];
    @track Tattoo_Removal_Location__cValues =[];
    @track Tattoo_Removal_Amount_of_Ink__cValues =[];
    @track Tattoo_Removal_Ink_Layering__cValues =[];
    @track Tattoo_Removal_Scarring_Tissue_Change__cValues =[];
    @track Tattoo_Removal_Colors__cValues =[];
    @track Tattoo_Removal_Tattoo_Type__cValues =[];
    @track Tattoo_Removal_Age__cValues =[];
    @track Tattoo_Removal_Size__cValues =[];




    connectedCallback() {
     


        if (this.objectType == "Recommendations_for_Aesthetic_consult__c") {
            this.RecommendationsTable = true;
            console.log('object then');
            getPicklistValues({ objApi: this.objectType, fieldApis: this.RecommendationsPicklistNamesList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Aesthetic_consult_Membership__c) {
                        console.log('runing data');
                        this.MembershipValues = data.Aesthetic_consult_Membership__c;
                        console.log('Aesthetic_consult_Membership__cPicklist: ' + this.MembershipValues);

                    }
                    if (data && data.Aesthetic_consult_Products__c) {
                        this.ProductValues = data.Aesthetic_consult_Products__c;
                        console.log('Aesthetic_consult_Products__cPicklist: ' + this.ProductsValues);

                    }
                    if (data && data.Aesthetic_consult_Treatments__c) {
                        this.TreatmentValues = data.Aesthetic_consult_Treatments__c;
                        console.log('Aesthetic_consult_Products__cPicklist: ' + this.TreatmentsValues);

                    }
                    if (data && data.Aesthetic_consult_Area__c) {
                        this.AreaValues = data.Aesthetic_consult_Area__c;
                        console.log('Aesthetic_consult_Area__cPicklist: ' + this.AreaValues);

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
        else if (this.objectType == "Consult_Hair_Restoration__c") {
            this.HairConsultTable = true;
            this.RecommendationsTable = false;
            console.log('object then');
            getPicklistValues({ objApi: this.objectType, fieldApis: this.HairConsultPicklistNameList })
                .then((data) => {
                    if (data && data.HPI_FUT_vs_FUE__c) {
                        console.log('runing data');
                        this.HPI_FUT_vs_FUE__cValues = data.HPI_FUT_vs_FUE__c;
                        console.log('HPI_FUT_vs_FUE__cValues: ' + this.HPI_FUT_vs_FUE__cValues);

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
        else if (this.objectType == "Tattoo_Removal_Consult_S__c") {
            this.TattooRemovalTable = true;
            this.RecommendationsTable = false;
            console.log('object then');
            getPicklistValues({ objApi: this.objectType, fieldApis: this.TattooRemovelNamesList })
                .then((data) => {
                    if (data && data.Tattoo_Removal_Skin_Type__c) {
                        console.log('runing data');
                        this.Tattoo_Removal_Skin_Type__cValues = data.Tattoo_Removal_Skin_Type__c;
                        console.log('Tattoo_Removal_Skin_Type__cValues: ' + this.Tattoo_Removal_Skin_Type__cValues);

                    }

                    if (data && data.Tattoo_Removal_Location__c) {
                        console.log('runing data');
                        this.Tattoo_Removal_Location__cValues = data.Tattoo_Removal_Location__c;
                        console.log('Tattoo_Removal_Location__cValues: ' + this.Tattoo_Removal_Location__cValues);

                    }

                    if (data && data.Tattoo_Removal_Amount_of_Ink__c) {
                        console.log('runing data');
                        this.Tattoo_Removal_Amount_of_Ink__cValues = data.Tattoo_Removal_Amount_of_Ink__c;
                        console.log('Tattoo_Removal_Amount_of_Ink__cValues: ' + this.Tattoo_Removal_Amount_of_Ink__cValues);

                    }

                    if (data && data.Tattoo_Removal_Ink_Layering__c) {
                        console.log('runing data');
                        this.Tattoo_Removal_Ink_Layering__cValues = data.Tattoo_Removal_Ink_Layering__c;
                        console.log('Tattoo_Removal_Ink_Layering__cValues: ' + this.Tattoo_Removal_Ink_Layering__cValues);

                    }

                    if (data && data.Tattoo_Removal_Scarring_Tissue_Change__c) {
                        console.log('runing data');
                        this.Tattoo_Removal_Scarring_Tissue_Change__cValues = data.Tattoo_Removal_Scarring_Tissue_Change__c;
                        console.log('Tattoo_Removal_Scarring_Tissue_Change__cValues: ' + this.Tattoo_Removal_Scarring_Tissue_Change__cValues);

                    }

                    if (data && data.Tattoo_Removal_Colors__c) {
                        console.log('runing data');
                        this.Tattoo_Removal_Colors__cValues = data.Tattoo_Removal_Colors__c;
                        console.log('Tattoo_Removal_Colors__cValues: ' + this.Tattoo_Removal_Colors__cValues);

                    }

                    if (data && data.Tattoo_Removal_Tattoo_Type__c) {
                        console.log('runing data');
                        this.Tattoo_Removal_Tattoo_Type__cValues = data.Tattoo_Removal_Tattoo_Type__c;
                        console.log('Tattoo_Removal_Tattoo_Type__cValues: ' + this.Tattoo_Removal_Tattoo_Type__cValues);

                    }
                    if (data && data.Tattoo_Removal_Age__c) {
                        console.log('runing data');
                        this.Tattoo_Removal_Age__cValues = data.Tattoo_Removal_Age__c;
                        console.log('Tattoo_Removal_Age__cValues: ' + this.Tattoo_Removal_Age__cValues);

                    }
                    if (data && data.Tattoo_Removal_Size__c) {
                        console.log('runing data');
                        this.Tattoo_Removal_Size__cValues = data.Tattoo_Removal_Size__c;
                        console.log('Tattoo_Removal_Size__cValues: ' + this.Tattoo_Removal_Size__cValues);

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
            /*Recommendations Field starts*/
            MembershipValues: '',
            Aesthetic_consult_Membership__c: false,
            MembershipValuesList: [],
            ProductValues: '',
            Aesthetic_consult_Products__c: false,
            ProductValuesList: [],
            TreatmentValues: '',
            Aesthetic_consult_Treatments__c: false,
            TreatmentValuesList: [],
            AreaValues: '',
            Aesthetic_consult_Area__c: false,
            AreaValuesList: [],
            Units_Syringe: '',
            comments: '',
            /* Recommendations field Ends*/

            /* HAir consult Field Starts*/
            HPI_FUT_vs_FUE__cValues: '',
            HPI_FUT_vs_FUE__c: false,
            HPI_FUT_vs_FUE__cValuesList: [],
            HPI_Date__c: '',
            HPI_No_of_Grafts__c: '',
            HPI_Year__c: '',
            HPI_Surgeon__c: '',
            // Hair Consult Fields End

            //Tattoo Removal Start
            Tattoo_Removal_Skin_Type__cValues: '',
            Tattoo_Removal_Skin_Type__c: false,
            Tattoo_Removal_Skin_Type__cValuesList: [],
            Tattoo_Removal_Location__cValues: '',
            Tattoo_Removal_Location__c: false,
            Tattoo_Removal_Location__cValuesList: [],
            Tattoo_Removal_Amount_of_Ink__cValues:'',
            Tattoo_Removal_Amount_of_Ink__c: false,
            Tattoo_Removal_Amount_of_Ink__cValuesList:[],
            Tattoo_Removal_Ink_Layering__cValues:'',
            Tattoo_Removal_Ink_Layering__c: false,
            Tattoo_Removal_Ink_Layering__cValuesList:[],
            Tattoo_Removal_Scarring_Tissue_Change__cValues:'',
            Tattoo_Removal_Scarring_Tissue_Change__c: false,
            Tattoo_Removal_Scarring_Tissue_Change__cValuesList:[],
            Tattoo_Removal_Colors__cValues:'',
            Tattoo_Removal_Colors__c: false,
            Tattoo_Removal_Colors__cValuesList:[],
            Tattoo_Removal_Kirby_Score__c: '',
            Tattoo_Removal_Tattoo_Type__cValues:'',
            Tattoo_Removal_Tattoo_Type__c: false,
            Tattoo_Removal_Tattoo_Type__cValuesList:[],
            Tattoo_Removal_Age__cValues:'',
            Tattoo_Removal_Age__c: false,
            Tattoo_Removal_Age__cValuesList:[],
            Tattoo_Removal_Size__cValues:'',
            Tattoo_Removal_Size__c: false,
            Tattoo_Removal_Size__cValuesList:[],
            Tattoo_Removal_Notes__c: '',





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

    removeAllRows() {
        this.initData();
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






    //Membership Picklist
    handlePicklistSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.MembershipValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    MembershipValuesList: selectedMembershipValArray,
                    Aesthetic_consult_Membership__c: false // Close the dropdown after selection
                };

            }
            return account;

        });
        this.isSaveDisabled = false;



    }


    handleRemoveMembershipPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.MembershipValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    MembershipValues: selectedMembershipValArray.join(';'),
                    MembershipValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        if(!MembershipValuesList.isEmpty()){
            this.isSaveDisabled = true;
        }
        

    }
    //Membership Picklist Ends


    ////Product picklist sart
    handleProductSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.ProductValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    ProductValuesList: selectedMembershipValArray,
                    Aesthetic_consult_Products__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        if(!ProductValuesList.isEmpty()){
            this.isSaveDisabled = true;
        }

    }

    handleRemoveProductPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.ProductValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    ProductValues: selectedMembershipValArray.join(';'),
                    ProductValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    ////Product picklist Over

    // Treatment Picklist Start
    handleTreatmentSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.TreatmentValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    TreatmentValuesList: selectedMembershipValArray,
                    Aesthetic_consult_Treatments__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;


    }

    handleRemoveTreatmentPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.TreatmentValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    TreatmentValues: selectedMembershipValArray.join(';'),
                    TreatmentValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Treatment Picklist Ends

    ////Area picklist sart
    handleAreaSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.AreaValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    AreaValuesList: selectedMembershipValArray,
                    Aesthetic_consult_Area__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;


    }

    handleRemoveAreaPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.AreaValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    AreaValues: selectedMembershipValArray.join(';'),
                    AreaValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    ////Area picklist End
    handleUnitsChange(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Units_Syringe: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleCommentsChange(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, comments: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
     // HPI_FUT_vs_FUE__c Picklist start
     handleHPI_FUT_vs_FUE__cSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.HPI_FUT_vs_FUE__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    HPI_FUT_vs_FUE__cValuesList: selectedMembershipValArray,
                    HPI_FUT_vs_FUE__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveHPI_FUT_vs_FUE__cPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.HPI_FUT_vs_FUE__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    HPI_FUT_vs_FUE__cValues: selectedMembershipValArray.join(';'),
                    HPI_FUT_vs_FUE__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    //HPI_FUT_vs_FUE__c picklist ends

    handleInputOnChange(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, HPI_Date__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

 handleInputGrafts(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, HPI_No_of_Grafts__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputyear(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, HPI_Year__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

     handleInputSurgeon(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, HPI_Surgeon__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }



    ///Tattoo Removal Skin Type Picklist Start

handleTattoo_Removal_Skin_Type__cSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Tattoo_Removal_Skin_Type__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Skin_Type__cValuesList: selectedMembershipValArray,
                Tattoo_Removal_Skin_Type__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

handleRemoveTattoo_Removal_Skin_Type__cPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;

    console.log('index:H ' + index);

    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {

            let selectedMembershipValArray = account.Tattoo_Removal_Skin_Type__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Tattoo_Removal_Skin_Type__cValues: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Skin_Type__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}
//Tattoo Removal Skin Type End

///Tattoo Removal Location start
handleTattoo_Removal_Location__cSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Tattoo_Removal_Location__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Location__cValuesList: selectedMembershipValArray,
                Tattoo_Removal_Location__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

handleRemoveTattoo_Removal_Location__cPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;

    console.log('index:H ' + index);

    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {

            let selectedMembershipValArray = account.Tattoo_Removal_Location__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Tattoo_Removal_Location__cValues: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Location__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}
//Tattoo Removel Location End

//Tattoo Removel Amount Of Ink Start
Tattoo_Removal_Amount_of_Ink__cSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Tattoo_Removal_Amount_of_Ink__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Amount_of_Ink__c: selectedMembershipValArray,
                Tattoo_Removal_Amount_of_Ink__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

handleRemoveTattoo_Removal_Amount_of_Ink__cPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;

    console.log('index:H ' + index);

    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {

            let selectedMembershipValArray = account.Tattoo_Removal_Amount_of_Ink__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Tattoo_Removal_Amount_of_Ink__cValues: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Amount_of_Ink__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}
//Tattoo Removel Amount Of Ink End

//Tattoo Removal Ink Layering Start

Tattoo_Removal_Ink_Layering__cSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Tattoo_Removal_Ink_Layering__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Ink_Layering__c: selectedMembershipValArray,
                Tattoo_Removal_Ink_Layering__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

handleRemoveTattoo_Removal_Ink_Layering__cPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;

    console.log('index:H ' + index);

    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {

            let selectedMembershipValArray = account.Tattoo_Removal_Ink_Layering__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Tattoo_Removal_Ink_Layering__cValues: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Ink_Layering__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}
//Tattoo Removal Ink Layering End

//Scarring/Tissue Change Start
Tattoo_Removal_Scarring_Tissue_Change__cSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Tattoo_Removal_Scarring_Tissue_Change__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Scarring_Tissue_Change__c: selectedMembershipValArray,
                Tattoo_Removal_Scarring_Tissue_Change__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

handleRemoveTattoo_Removal_Scarring_Tissue_Change__cPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;

    console.log('index:H ' + index);

    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {

            let selectedMembershipValArray = account.Tattoo_Removal_Scarring_Tissue_Change__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Tattoo_Removal_Scarring_Tissue_Change__cValues: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Scarring_Tissue_Change__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}
//Scarring/Tissue Change End

//Tattoo Removal colors  Start

Tattoo_Removal_Colors__cSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Tattoo_Removal_Colors__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Colors__c: selectedMembershipValArray,
                Tattoo_Removal_Colors__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

handleRemoveTattoo_Removal_Colors__cPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;

    console.log('index:H ' + index);

    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {

            let selectedMembershipValArray = account.Tattoo_Removal_Colors__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Tattoo_Removal_Colors__cValues: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Colors__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}
//Tattoo Removal colors  End

//Tattoo Kirby Start
handleInputKirby(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;

    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Tattoo_Removal_Kirby_Score__c: newValue };
        }
        return account;
    });
    this.isSaveDisabled = false;

}
//Tattoo Kirby End

//Tattoo Type Start
Tattoo_Removal_Tattoo_Type__cSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Tattoo_Removal_Tattoo_Type__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Tattoo_Type__c: selectedMembershipValArray,
                Tattoo_Removal_Tattoo_Type__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

handleRemoveTattoo_Removal_Tattoo_Type__cPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;

    console.log('index:H ' + index);

    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {

            let selectedMembershipValArray = account.Tattoo_Removal_Tattoo_Type__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Tattoo_Removal_Tattoo_Type__cValues: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Tattoo_Type__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}
//Tattoo Type End

//Tattoo Age Start
Tattoo_Removal_Age__cSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Tattoo_Removal_Age__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Age__c: selectedMembershipValArray,
                Tattoo_Removal_Age__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

handleRemoveTattoo_Removal_Age__cPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;

    console.log('index:H ' + index);

    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {

            let selectedMembershipValArray = account.Tattoo_Removal_Age__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Tattoo_Removal_Age__cValues: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Age__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}
//Tattoo Age End

//Tattoo Size Start
Tattoo_Removal_Size__cSelect(event) {
    let index = parseInt(event.target.dataset.id);
    let selectedValue = event.target.getAttribute('value');
    let fieldName = event.target.getAttribute('name');
    console.log('fieldName: ' + fieldName);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            let selectedMembershipValArray = account.Tattoo_Removal_Size__cValuesList || [];
            if (selectedMembershipValArray.includes(selectedValue)) {
                selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
            } else {
                selectedMembershipValArray.push(selectedValue);
            }
            return {
                ...account,
                [fieldName]: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Size__c: selectedMembershipValArray,
                Tattoo_Removal_Size__c: false // Close the dropdown after selection
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}

handleRemoveTattoo_Removal_Size__cPill(event) {
    let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
    let industryToRemove = event.target.closest('button').name;

    console.log('index:H ' + index);

    console.log('industryToRemove: ' + industryToRemove);
    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {

            let selectedMembershipValArray = account.Tattoo_Removal_Size__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
            return {
                ...account,
                Tattoo_Removal_Size__cValues: selectedMembershipValArray.join(';'),
                Tattoo_Removal_Size__cValuesList: selectedMembershipValArray
            };
        }
        return account;
    });
    this.isSaveDisabled = false;

}
//Tattoo Size End


//Tattoo Notes Start
handleInputNotes(event) {
    let index = parseInt(event.target.dataset.id);
    let newValue = event.target.value;

    this.listOfRecommendations = this.listOfRecommendations.map(account => {
        if (account.index === index) {
            return { ...account, Tattoo_Removal_Notes__c: newValue };
        }
        return account;
    });
    this.isSaveDisabled = false;

}
//Tattoo Notes End

    createRecommendations() {
        if (this.RecommendationsTable == true) {
            let isValidationFailed = false;
            for (let i = 0; i < this.listOfRecommendations.length; i++) {
               
            }
      
            if (!isValidationFailed) {
                insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                    .then(async (data) => {
                        console.log('data==>',data);
                        this.recordId = data;
                        console.log('recordId==>',this.recordId);
                        this.initData();
                        this.template.querySelector('c-custom-Toast').showToast('success', 'Aesthetic Consult Recommendations saved successfully.', 'utility:success', 10000);
                    })

                    .catch(error => {
                        this.ShowSpinner = false;
                        this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                    });
            }
        }

        else if (this.HairConsultTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Hair Restoration consult saved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }



        else if (this.TattooRemovalTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Tattoo Removal consult saved successfully.', 'utility:success', 10000);
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